import BaseCanvas from "./base.canvas";
import ServiceDrawer from "../board/drawer/service.drawer";
import MouseUtil from "../utils/mouse.util";
import {Events} from "../../enums/events";

class LogicCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
  }

  add(...elements: ServiceDrawer[]) {
    this.elements.push(...elements)
  }

  draw() {
    for (const element of this.elements) {
      element.draw()
    }
  }

  onClickListener() {
    this.canvas.addEventListener(Events.ON_CLICK, (event) => {
      const position = MouseUtil.onCanvasPosition(this.canvas, event)

      const element = this.elements.find(({factory}) => factory.isSelected(position))

      if (element) {
        alert(`Hey boy, you are selecting the element: ${element.service.id}`)
      }
    })
  }
}

export default LogicCanvas