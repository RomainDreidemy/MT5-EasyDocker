import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import {Events} from '../../enums/events'

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  isMoving: Boolean = false
  selectedElement: ServiceDrawer | undefined = undefined

  add(...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw(): void {
    for (const element of this.elements) {
      element.draw()
    }
  }

  startup(): void {
    this.canvas.addEventListener(Events.ON_MOUSE_DOWN, (event) => {
      this.isMoving = true;
      this.selectedElement = this.elements.find(({factory}) =>
        factory.isSelected({x: event.offsetX, y: event.offsetY}))
    });

    this.canvas.addEventListener(Events.ON_MOUSE_UP, () => {
      this.isMoving = false;
      this.selectedElement = undefined
    });

    this.canvas.addEventListener(Events.ON_MOUSE_MOVE, (event) => {
      if (this.isMoving && this.selectedElement) {
        this.selectedElement.factory.updatePosition({x: event.offsetX, y: event.offsetY})

        this.refreshCanvas()
        this.draw()
      }
    });
  }
}

export default EventsCanvas
