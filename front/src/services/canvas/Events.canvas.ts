import { type TEventsCanvas } from '../../types/canvas/Events.canvas'

import { DrawerManager } from './Drawer.manager'
import StateCanvas from './State.canvas'
import BaseManager from './Base.manager'
import MouseEventManager from './MouseEvent.manager'
import LinkerManager from './Linker.manager'
import { ConnectorManager } from './Connector.manager'
import KeyboardEventManager from './KeyboardEvent.manager'
import ScreenEventManager from "./ScreenEvent.manager";

const EventsCanvas: TEventsCanvas = {
  ...StateCanvas,
  ...BaseManager,
  ...DrawerManager,
  ...LinkerManager,
  ...ConnectorManager,
  ...MouseEventManager,
  ...ScreenEventManager,
  ...KeyboardEventManager,

  startup (): void {
    this.draw()
    this.screenStartup()
    this.mouseStartup()
    this.keyboardStartup()
  }
}

export default EventsCanvas
