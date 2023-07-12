import {type TMouseEventManager} from '../../types/canvas/MouseEvent.manager'
import {Events} from '../../enums/events'
import {type IPosition} from '../../interfaces/Position.interface'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import {DrawerManager} from './Drawer.manager'
import {type TConnector, type TConnectorOrNullify} from '../../types/Connector'
import {type TDrawer, type TDrawerOrNullify} from '../../types/Drawer'
import eventEmitter from '../apps/Event.emitter'
import {EventEmitters} from '../../enums/eventEmitters'
import debounce from "../apps/Debounce";

const MouseEventManager: TMouseEventManager = {
  ...BaseManager,
  ...LinkerManager,
  ...DrawerManager,

  mouseStartup(): void {
    this.canvas!.addEventListener(Events.ON_MOUSE_DOWN, (event: MouseEvent): void => {
      this.handleMouseDown(event)
    })
    this.canvas!.addEventListener(Events.ON_MOUSE_UP, (event: MouseEvent): void => {
      this.handleMouseUp(event)
    })
    this.canvas!.addEventListener(Events.ON_MOUSE_MOVE, (event: MouseEvent): void => {
      this.handleMouseMove(event)
    })
    this.canvas!.addEventListener(Events.ON_MOUSE_MOVE,
      debounce(() => {
        if (!this.isMoving && this.historicalDrawer) {
          eventEmitter.emit(EventEmitters.ON_MOVED_DRAWER, this.historicalDrawer)
        }
      }, this.mouseDebounce)
    );
  },

  handleMouseUp(event: MouseEvent): void {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    if ((this.selectedConnector != null) && (this.onHoverDrawer != null)) {
      this.createLinker(position)
    }

    this.isMoving = false
    this.selectedConnector = undefined

    this.clearOnHoverDrawer()
    this.updateScreen()

    if (this.selectedDrawer != null) {
      eventEmitter.emit(EventEmitters.ON_SELECTED_DRAWER, this.selectedDrawer)
    }
  },

  handleMouseMove(event: MouseEvent): void {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    const isMovingWithDrawer = this.isMoving && (this.selectedDrawer != null) && (this.selectedConnector == null)
    if (isMovingWithDrawer) {
      const movePosition: IPosition = this.boundingClientPosition(event)

      const drawerPosition: IPosition = {
        x: movePosition.x - this.onDrawerClickOffset!.x,
        y: movePosition.y - this.onDrawerClickOffset!.y
      }

      this.selectedDrawer!.factory!.updatePosition(drawerPosition)
      this.updateScreen()

    } else if (this.selectedConnector != null) {
      this.drawConnectorLine(this.selectedConnector, position)
      this.updateHoverDrawer(position)
    }
  },

  handleMouseDown(event: MouseEvent): void {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}
    this.isMoving = true

    if (this.selectedDrawer != null) {
      this.selectedConnector = this.handleMouseUpOnLinker(this.selectedDrawer, position)
    }

    const drawer: TDrawerOrNullify = this.findDrawer(position)

    if (drawer != null) {
      const clickPosition: IPosition = this.boundingClientPosition(event)

      this.onDrawerClickOffset = {
        x: clickPosition.x - drawer.factory!.positionX,
        y: clickPosition.y - drawer.factory!.positionY
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

  handleMouseUpOnLinker(drawer: TDrawer, position: IPosition): TConnectorOrNullify {
    return drawer.connectors.find((connector: TConnector) => connector.isSelected(position))
  },

  boundingClientPosition(event: MouseEvent): IPosition {
    const rect: DOMRect = this.context!.canvas.getBoundingClientRect()

    return {x: event.clientX - rect.left, y: event.clientY - rect.top}
  }
}

export default MouseEventManager
