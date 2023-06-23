import { type TEventsCanvas } from '../../types/canvas/Events.canvas'

import { DrawerManager } from './Drawer.manager'
import StateCanvas from './State.canvas'
import BaseManager from './Base.manager'
import MouseEventManager from './MouseEventManager'
import LinkerManager from './Linker.manager'
import { ConnectorManager } from './Connector.manager'
import KeyboardEventManager from './KeyboardEvent.manager'

const EventsCanvas: TEventsCanvas = {
  ...StateCanvas,
  ...BaseManager,
  ...DrawerManager,
  ...LinkerManager,
  ...ConnectorManager,
  ...MouseEventManager,
  ...KeyboardEventManager,

  startup (): void {
    this.draw()
    this.mouseStartup()
    this.keyboardStartup()
  }
}

export default EventsCanvas
