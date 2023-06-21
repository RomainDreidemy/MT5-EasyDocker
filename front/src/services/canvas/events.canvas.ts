import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import {Events} from '../../enums/events'
import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../board/drawer/connector/service.connector";

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []
  isMoving: boolean = false
  selectedElement: ServiceDrawer | undefined
  selectedConnector: ServiceConnector | undefined
  onHoverElement: ServiceDrawer | undefined

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

    } else if (!this.selectedConnector) {
      this.selectElement(false)
      this.selectedElement = undefined
    }
  }

  private handleMouseUpOnLinker = (element: ServiceDrawer, position: IPosition): void => {
    this.selectedConnector = element.connectors.find((linker) => linker.isSelected(position))
  }

  private readonly handleMouseUp = (event: MouseEvent): void => {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    if (this.selectedConnector && this.onHoverElement) {
      const connector = this.elements.flatMap((element) => element.connectors)
        .find((linker) => linker.isSelected(position))

      if (connector && this.selectedElement) {
        console.log(connector)

        console.log(connector.drawer)

        connector.drawer.links.push({connector: connector, drawer: this.selectedElement})
        // this.selectedConnector.links.push(connector)
        // connector.links.push(this.selectedConnector)
        // console.log('LINKED')
        // console.log(this.selectedConnector)
        // console.log(this.elements)

      }
    }

    this.isMoving = false
    this.selectedConnector = undefined
    this.updateScreen()
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    if (this.isMoving && (this.selectedElement != null) && !this.selectedConnector) {
      this.selectedElement.factory.updatePosition(position)
      this.updateScreen()
    } else if (this.selectedConnector) {
      this.updateScreen()
      this.context.beginPath()
      this.context.moveTo(this.selectedConnector.position_x, this.selectedConnector.position_y)
      this.context.lineTo(position.x, position.y)
      this.context.stroke()

      const element = this.elements.find(({factory}) =>
        factory.isSelected(position)
      )

      if (element) {
        this.onHoverElement = element
        this.onHoverElement.factory.onHover = true
      }


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
