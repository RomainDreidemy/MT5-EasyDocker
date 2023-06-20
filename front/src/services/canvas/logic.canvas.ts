import BaseCanvas from "./base.canvas";
import ServiceDrawer from "../board/drawer/service.drawer";
import MouseUtil from "../utils/mouse.util";
import {EventsEnum} from "../../enums/events.enum";

class LogicCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  add(element: ServiceDrawer) {
    this.elements.push(element)
  }

  draw(...elements: ServiceDrawer[]) {
    for (const element of elements) {
      element.draw()
    }
  }

  onClick() {
    this.canvas.addEventListener(EventsEnum.CLICK, (event) => {
      const position = MouseUtil.onCanvasPosition(this.canvas, event)

      console.log(position)

    })
  }
}

export default LogicCanvas