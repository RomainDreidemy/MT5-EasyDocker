import {TConnectorManager} from "./Connector.manager";
import {TStateCanvas} from "./State.Canvas";
import {TBaseManager} from "./Base.manager";
import {TMouseEventManager} from "./MouseEvent.manager";
import {TKeyboardEventManager} from "./KeyboardEvent.manager";

export type TEventsCanvas =
  TBaseManager &
  TStateCanvas &
  TConnectorManager &
  TMouseEventManager &
  TKeyboardEventManager &
  {
    startup: () => void
  }
