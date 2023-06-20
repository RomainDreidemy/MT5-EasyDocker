import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import MouseUtil from '../utils/mouse.util'
import { Events } from '../../enums/events'

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  add (...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw (): void {
    for (const element of this.elements) {
      element.draw()
    }
  }

  onClickListener (): void {
    this.canvas.addEventListener(Events.ON_CLICK, (event) => {
      const position = MouseUtil.onCanvasPosition(this.canvas, event)

      const element = this.elements.find(({ factory }) => factory.isSelected(position))

      if (element != null) {
        alert(`Hey boy, you are selecting the element: ${element.service.id}`)
      }
    })
  }
}

export default EventsCanvas
