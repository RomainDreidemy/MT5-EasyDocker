import { type TConnectorManager } from './Connector.manager'
import { type TStateCanvas } from './State.canvas'
import { type TBaseManager } from './Base.manager'
import { type TMouseEventManager } from './MouseEvent.manager'
import { type TKeyboardEventManager } from './KeyboardEvent.manager'
import { type TScreenEventManager } from './ScreenEvent.manager'

export type TEventsCanvas =
  TBaseManager &
  TStateCanvas &
  TConnectorManager &
  TMouseEventManager &
  TScreenEventManager &
  TKeyboardEventManager &
  {
    startup: () => void
  }
