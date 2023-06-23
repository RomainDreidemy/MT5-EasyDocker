import { type TConnectorManager } from './Connector.manager'
import { type TStateCanvas } from './State.Canvas'
import { type TBaseManager } from './Base.manager'
import { type TMouseEventManager } from './MouseEvent.manager'
import { type TKeyboardEventManager } from './KeyboardEvent.manager'

export type TEventsCanvas =
  TBaseManager &
  TStateCanvas &
  TConnectorManager &
  TMouseEventManager &
  TKeyboardEventManager &
  {
    startup: () => void
  }
