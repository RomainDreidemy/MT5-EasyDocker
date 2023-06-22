import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import { Events } from '../../enums/events'
import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../board/drawer/connector/service.connector'

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  selectedElement?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverElement?: ServiceDrawer

  isMoving: boolean = false

  add (...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw (): void {
    this.elements.forEach(element => { element.draw() })
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
    const position: IPosition = { x: event.offsetX, y: event.offsetY }
    this.isMoving = true

    if (this.selectedElement != null) {
      this.handleMouseUpOnLinker(this.selectedElement, position)
    }

    const element = this.findElement(position)

    if (element != null) {
      this.selectElement(element)
    } else if (this.selectedConnector == null) {
      this.clearSelectedElement()
    }
  }

  private readonly findElement = (position: IPosition): ServiceDrawer | undefined => this.elements.find(service =>
    service.factory.isSelected(position)
  )

  private readonly handleMouseUpOnLinker = (element: ServiceDrawer, position: IPosition): void => {
    this.selectedConnector = element.connectors.find(linker => linker.isSelected(position))
  }

  private readonly handleMouseUp = (event: MouseEvent): void => {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if ((this.selectedConnector != null) && (this.onHoverElement != null)) {
      this.createLink(position)
    }

    this.isMoving = false
    this.selectedConnector = undefined
    this.updateScreen()
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if (this.isMoving && (this.selectedElement != null) && (this.selectedConnector == null)) {
      this.selectedElement.factory.updatePosition(position)
      this.updateScreen()
    } else if (this.selectedConnector != null) {
      this.drawConnectorLine(this.selectedConnector, position)
      this.updateHoverElement(position)
    }
  }

  private updateHoverElement (position: IPosition): void {
    const element = this.findElement(position)

    if (element != null) {
      this.onHoverElement = element
      this.onHoverElement.factory.onHover = true
    }
  }

  private onSelectElement (selected: boolean): void {
    if (this.selectedElement != null) {
      this.selectedElement.factory.selected = selected
    }
  }

  private createLink (position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedElement != null) && (this.onHoverElement != null)) {
      connector.drawer.links.push({ to: connector, at: this.selectedConnector })

      this.onHoverElement.factory.onHover = false
      this.onHoverElement = undefined
      this.onSelectElement(false)
    }
  }

  private findConnector (position: IPosition): ServiceConnector | undefined {
    return this.elements
      .flatMap(element => element.connectors)
      .find(linker => linker.isSelected(position))
  }

  private selectElement (element: ServiceDrawer): void {
    this.clearSelectedElement()
    this.selectedElement = element
    this.selectedElement.factory.selected = true
  }

  private clearSelectedElement (): void {
    if (this.selectedElement != null) {
      this.selectedElement.factory.selected = false
    }
    this.selectedElement = undefined
  }

  private drawConnectorLine (connector: ServiceConnector, position: IPosition): void {
    this.updateScreen()
    this.context.beginPath()
    this.context.moveTo(connector.positionX, connector.positionY)
    this.context.lineTo(position.x, position.y)
    this.context.stroke()
  }
}

export default EventsCanvas
