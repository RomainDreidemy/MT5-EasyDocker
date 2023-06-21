import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import MouseUtil from '../utils/mouse.util'
import {Events} from '../../enums/events'
import {IPosition} from "../../interfaces/Position.interface";

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  add(...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw(): void {
    for (const element of this.elements) {
      element.draw()
    }
  }

  onClickListener(): void {
    this.canvas.addEventListener(Events.ON_CLICK, this.onClick)
  }

  private onClick(event: MouseEvent): void {
    console.log(this.canvas)
    const position: IPosition = MouseUtil.onCanvasPosition(this.canvas, event)

    const element = this.elements.find(({factory}) => factory.isSelected(position))

    if (element != null) {
      // alert(`Hey boy, you are selecting the element: ${element.service.id}`)
      // this.onMouseListener()

      // const test: IPosition = {x: 1000, y: 1000}
      // element.factory.updatePosition(test)
    }
  }

}

export default EventsCanvas
