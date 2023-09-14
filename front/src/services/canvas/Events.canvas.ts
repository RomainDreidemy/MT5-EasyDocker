import { type TEventsCanvas } from '../../types/canvas/Events.canvas'

import { DrawerManager } from './Drawer.manager'
import StateCanvas from './State.canvas'
import BaseManager from './Base.manager'
import MouseEventManager from './MouseEvent.manager'
import LinkerManager from './Linker.manager'
import { ConnectorManager } from './Connector.manager'
import KeyboardEventManager from './KeyboardEvent.manager'
import ScreenEventManager from './ScreenEvent.manager'
import WheelEventManager from './WheelEvent.manager'

const EventsCanvas: TEventsCanvas = {
  ...StateCanvas,
  ...BaseManager,
  ...DrawerManager,
  ...LinkerManager,
  ...ConnectorManager,
  ...MouseEventManager,
  ...WheelEventManager,
  ...ScreenEventManager,
  ...KeyboardEventManager,

  startup (): void {
    this.draw()
    this.screenStartup()
    this.mouseStartup()
    this.wheelStartup()
    this.keyboardStartup()
  },

  reset (): void {
    this.drawers = []

    this.selectedLinker = undefined
    this.selectedDrawer = undefined
    this.selectedConnector = undefined
    this.onHoverDrawer = undefined

    this.mouseClickPosition = undefined
    this.initialDrawerPosition = undefined
  }
}

export default EventsCanvas
