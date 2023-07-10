import {TScreenEventManager} from "../../types/canvas/ScreenEvent.manager";
import BaseManager from "./Base.manager";
import {Events} from "../../enums/events";

const ScreenEventManager: TScreenEventManager = {
  ...BaseManager,

  screenStartup (): void {
    window.addEventListener(Events.RESIZE, () => {
      this.sizeCanvas()
      this.draw()
    });
  }
}

export default ScreenEventManager