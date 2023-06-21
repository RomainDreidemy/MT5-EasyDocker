import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import {Events} from '../../enums/events'
import {IPosition} from "../../interfaces/Position.interface";
import ServiceLinker from "../board/drawer/linker/service.linker";

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []
  isMoving: boolean = false
  selectedElement: ServiceDrawer | undefined
  selectedLinker: ServiceLinker | undefined

  add(...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw(): void {
    this.elements.forEach((element) => {
      element.draw()
    })
  }

  updateScreen(): void {
    this.clearArea()
    this.draw()

    // this.context.beginPath()
    // this.context.moveTo(this.elements[1].factory.position_x, this.elements[1].factory.position_y)
    // this.context.lineTo(this.elements[0].factory.position_x + this.elements[0].factory.width, this.elements[0].factory.position_y + this.elements[0].factory.height)
    // this.context.stroke()
  }

  startup(): void {
    this.canvas.addEventListener(Events.ON_MOUSE_DOWN, this.handleMouseDown)
    this.canvas.addEventListener(Events.ON_MOUSE_UP, this.handleMouseUp)
    this.canvas.addEventListener(Events.ON_MOUSE_MOVE, this.handleMouseMove)
  }

  private readonly handleMouseDown = (event: MouseEvent): void => {
    this.isMoving = true

    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    if (this.selectedElement) {
      this.handleMouseUpOnLinker(this.selectedElement, position)
    }

    const element = this.elements.find(({factory}) =>
      factory.isSelected(position)
    )

    if (element) {
      this.selectElement(false)
      this.selectedElement = element
      this.selectElement(true)

    } else if (!this.selectedLinker) {
      this.selectElement(false)
      this.selectedElement = undefined
    }
  }

  private handleMouseUpOnLinker = (element: ServiceDrawer, position: IPosition): void => {
    this.selectedLinker = element.linkers.find((linker) => linker.isSelected(position))
    console.log(this.selectedLinker)
  }

  private readonly handleMouseUp = (): void => {
    this.isMoving = false
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    if (this.isMoving && (this.selectedElement != null) && !this.selectedLinker) {
      this.selectedElement.factory.updatePosition({x: event.offsetX, y: event.offsetY})
      this.updateScreen()
    }
  }

  private selectElement(selected: boolean): void {
    if (this.selectedElement != null) {
      this.selectedElement.factory.selected = selected
      this.updateScreen()
    }
  }
}

export default EventsCanvas
