import {TEventsCanvas} from "../../types/canvas/Events.canvas";

import {DrawerManager} from "./Drawer.manager";
import StateCanvas from "./State.canvas";
import BaseManager from "./Base.manager";
import MouseEventManager from "./MouseEventManager";
import LinkerManager from "./Linker.manager";
import {ConnectorManager} from "./Connector.manager";

const EventsCanvas: TEventsCanvas = {
  ...StateCanvas,
  ...BaseManager,
  ...DrawerManager,
  ...LinkerManager,
  ...ConnectorManager,
  ...MouseEventManager,
}

export default EventsCanvas
