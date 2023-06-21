import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import { Events } from '../../enums/events'

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []
  isMoving: boolean = false
  selectedElement: ServiceDrawer | undefined

  add (...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw (): void {
    this.elements.forEach((element) => { element.draw() })
  }

  updateScreen (): void {
    this.clearArea()
    this.draw()
  }

  startup (): void {
    this.canvas.addEventListener(Events.ON_MOUSE_DOWN, this.handleMouseDown)
    this.canvas.addEventListener(Events.ON_MOUSE_UP, this.handleMouseUp)
    this.canvas.addEventListener(Events.ON_MOUSE_MOVE, this.handleMouseMove)
  }

  private readonly handleMouseDown = (event: MouseEvent): void => {
    this.isMoving = true
    this.selectedElement = this.elements.find(({ factory }) =>
      factory.isSelected({ x: event.offsetX, y: event.offsetY })
    )
  }

  private readonly handleMouseUp = (): void => {
    this.isMoving = false
    this.selectedElement = undefined
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    if (this.isMoving && (this.selectedElement != null)) {
      this.selectedElement.factory.updatePosition({ x: event.offsetX, y: event.offsetY })
      this.updateScreen()
    }
  }
}

export default EventsCanvas
