import { type TMouseEventManager } from '../../types/canvas/MouseEvent.manager'
import { Events } from '../../enums/events'
import { type IPosition } from '../../interfaces/Position.interface'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { DrawerManager } from './Drawer.manager'
import { type TConnector, type TConnectorOrNullify } from '../../types/Connector'
import { type TDrawer, type TDrawerOrNullify } from '../../types/Drawer'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'

const MouseEventManager: TMouseEventManager = {
  ...BaseManager,
  ...LinkerManager,
  ...DrawerManager,

  mouseStartup (): void {
    this.canvas!.addEventListener(Events.ON_MOUSE_DOWN, (event: MouseEvent): void => {
      this.handleMouseDown(event)
    })
    this.canvas!.addEventListener(Events.ON_MOUSE_UP, (event: MouseEvent): void => {
      this.handleMouseUp(event)
    })
    this.canvas!.addEventListener(Events.ON_MOUSE_MOVE, (event: MouseEvent): void => {
      this.handleMouseMove(event)
    })
  },

  handleMouseUp (event: MouseEvent): void {
    const position: IPosition = this.boundingClientPosition(event)

    if ((this.selectedConnector != null) && (this.onHoverDrawer != null)) {
      this.createLinker(position)
    }

    if (this.mouseClickPosition != null) {
      eventEmitter.emit(EventEmitters.ON_MOVED_DRAWERS)
      this.mouseClickPosition = undefined
    }

    this.clearOnHoverDrawer()
    this.updateScreen()

    if (this.selectedDrawer != null) {
      if (this.selectedDrawer.hasMoved(this.initialDrawerPosition)) {
        eventEmitter.emit(EventEmitters.ON_MOVED_DRAWER, this.selectedDrawer)
      } else {
        eventEmitter.emit(EventEmitters.ON_SELECTED_DRAWER, this.selectedDrawer)
      }
    }

    this.gradCursor()
    this.isMoving = false
    this.selectedConnector = undefined
    this.initialDrawerPosition = undefined
  },

  handleMouseMove (event: MouseEvent): void {
    const position: IPosition = this.boundingClientPosition(event)

    this.mouseMovePosition = position

    if (this.isMouseScrollClick(event)) {
      this.onMouseScroll(position)
    }

    const isMovingWithDrawer = this.isMoving && (this.selectedDrawer != null) && (this.selectedConnector == null)
    if (isMovingWithDrawer) {
      const drawerPosition: IPosition = {
        x: position.x - this.onDrawerClickOffset!.x,
        y: position.y - this.onDrawerClickOffset!.y
      }

      this.selectedDrawer!.factory!.updatePosition(drawerPosition)
      this.updateScreen()
    } else if (this.selectedConnector != null) {
      this.drawConnectorLine(this.selectedConnector, position)
      this.updateHoverDrawer(position)
    }
  },

  handleMouseDown (event: MouseEvent): void {
    const position: IPosition = this.boundingClientPosition(event)
    this.isMoving = true

    if (this.isMouseScrollClick(event)) {
      this.mouseClickPosition = position
      this.gradCursor(true)
    }

    if (this.selectedDrawer != null) {
      this.selectedConnector = this.handleMouseUpOnLinker(this.selectedDrawer, position)
    }

    const drawer: TDrawerOrNullify = this.findDrawer(position)

    if (drawer != null) {
      this.initialDrawerPosition = drawer.factory!.position()

      this.onDrawerClickOffset = {
        x: position.x - drawer.factory!.positionX,
        y: position.y - drawer.factory!.positionY
      }

      this.selectDrawer(drawer)
    } else if (this.selectedConnector == null) {
      this.clearSelectedDrawer()
    }

    const linker = this.findLinker(position)

    if (linker != null) {
      this.selectLinker(linker)
    } else {
      this.clearSelectedLinker()
    }
  },

  handleMouseUpOnLinker (drawer: TDrawer, position: IPosition): TConnectorOrNullify {
    return drawer.connectors.find((connector: TConnector) => connector.isSelected(position))
  },

  isMouseScrollClick (event: MouseEvent): boolean {
    return event.buttons === 4
  },

  onMouseScroll (position: IPosition) {
    const delta: IPosition = {
      x: position.x - this.mouseClickPosition!.x,
      y: position.y - this.mouseClickPosition!.y
    }

    this.drawers.forEach((drawer: TDrawer) => {
      const drawerPosition: IPosition = {
        x: drawer.factory!.positionX + delta.x,
        y: drawer.factory!.positionY + delta.y
      }

      drawer.factory?.updatePosition(drawerPosition)
    })

    this.mouseClickPosition = position
    this.updateScreen()
  }
}

export default MouseEventManager
