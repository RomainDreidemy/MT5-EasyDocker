import { type TMouseEventManager } from '../../types/canvas/MouseEvent.manager'
import { Events } from '../../enums/events'
import { type IPosition } from '../../interfaces/Position.interface'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { DrawerManager } from './Drawer.manager'
import { type TConnectorOrNullify } from '../../types/Connector'
import { type TDrawer } from '../../types/Drawer'

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
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if ((this.selectedConnector != null) && (this.onHoverDrawer != null)) {
      this.createLink(position)
    }

    this.isMoving = false
    this.selectedConnector = undefined
    this.updateScreen()
  },

  handleMouseMove (event: MouseEvent): void {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if (this.isMoving && (this.selectedDrawer != null) && (this.selectedConnector == null)) {
      this.selectedDrawer.factory!.updatePosition(position)
      this.updateScreen()
    } else if (this.selectedConnector != null) {
      this.drawConnectorLine(this.selectedConnector, position)
      this.updateHoverDrawer(position)
    }
  },

  handleMouseDown (event: MouseEvent): void {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }
    this.isMoving = true

    if (this.selectedDrawer != null) {
      this.selectedConnector = this.handleMouseUpOnLinker(this.selectedDrawer, position)
    }

    const element = this.findDrawer(position)

    if (element != null) {
      this.selectDrawer(element)
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
    return drawer.connectors.find(drawer => drawer.isSelected(position))
  }
}

export default MouseEventManager
