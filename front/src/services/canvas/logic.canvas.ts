import BaseCanvas from "./base.canvas";
import ServiceDrawer from "../board/drawer/service.drawer";
import MouseUtil from "../utils/mouse.util";
import {EventsEnum} from "../../enums/events.enum";
import {IPosition} from "../../interfaces/Position.interface";

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
    this.canvas.addEventListener(EventsEnum.CLICK, (event) => {
      const position = MouseUtil.onCanvasPosition(this.canvas, event)

      const element = this.elements.find(({factory}) => factory.isSelected(position))

      if (element) {
        alert(`Hey boy, you currently selecting the element: ${element.service.id}`)
      }
    })
  }

  private isSelected(path: Path2D, {x, y}: IPosition): Boolean {
    return this.context.isPointInPath(path, x, y)
  }
}

export default LogicCanvas