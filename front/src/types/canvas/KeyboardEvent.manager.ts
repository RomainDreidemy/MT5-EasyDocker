import {TBaseManager} from "./Base.manager";
import {TLinkerManager} from "./Linker.manager";

export type TKeyboardEventManager =
  TBaseManager &
  TLinkerManager &
  {
    keyboardStartup: () => void,
    handleKeyDown: (event: KeyboardEvent) => void,
  }