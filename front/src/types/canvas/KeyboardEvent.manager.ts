import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'

export type TKeyboardEventManager =
  TBaseManager &
  TLinkerManager &
  {
    keyboardStartup: () => void
    handleKeyDown: (event: KeyboardEvent) => void
  }
