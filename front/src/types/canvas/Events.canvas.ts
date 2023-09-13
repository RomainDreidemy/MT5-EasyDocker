import { type TConnectorManager } from './Connector.manager'
import { type TStateCanvas } from './State.canvas'
import { type TBaseManager } from './Base.manager'
import { type TMouseEventManager } from './MouseEvent.manager'
import { type TKeyboardEventManager } from './KeyboardEvent.manager'
import { type TScreenEventManager } from './ScreenEvent.manager'
import { type TWheelEventManager } from './WheelEvent.manager'

export type TEventsCanvas =
  TBaseManager &
  TStateCanvas &
  TConnectorManager &
  TMouseEventManager &
  TWheelEventManager &
  TScreenEventManager &
  TKeyboardEventManager &
  {
    startup: () => void
    reset: () => void
  }
