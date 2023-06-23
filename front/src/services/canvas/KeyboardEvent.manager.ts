import { Events } from '../../enums/events'
import { Keyboard } from '../../enums/keyboard'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { type TKeyboardEventManager } from '../../types/canvas/KeyboardEvent.manager'

const MouseEventManager: TKeyboardEventManager = {
  ...BaseManager,
  ...LinkerManager,

  keyboardStartup (): void {
    document.addEventListener(Events.ON_KEY_DOWN, (event: KeyboardEvent) => { this.handleKeyDown(event) })
  },

  handleKeyDown (event: KeyboardEvent): void {
    if (event.code === Keyboard.DELETE && (this.selectedLinker != null)) {
      this.deleteLinker(this.selectedLinker.drawer!, this.selectedLinker)
      this.updateScreen()
    }
  }
}

export default MouseEventManager
