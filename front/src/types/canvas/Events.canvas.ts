import {TBaseCanvas} from "./Base.canvas";
import {Drawers} from "../Drawer";
import {TConnectorManager} from "./Connector.manager";
import {TStateCanvas} from "./State.Canvas";
import {TBaseManager} from "./Base.manager";
import {TMouseEventManager} from "./MouseEvent.manager";

export type TEventsCanvas =
  TBaseManager &
  TStateCanvas &
  TMouseEventManager &
  TConnectorManager &
  {
    add: (...drawers: Drawers) => void,
    draw: () => void,
    updateScreen: () => void,
  }
