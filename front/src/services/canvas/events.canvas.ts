import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import {Events} from '../../enums/events'
import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../board/drawer/connector/service.connector";

class EventsCanvas extends BaseCanvas {
  elements: ServiceDrawer[] = []

  selectedElement?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverElement?: ServiceDrawer

  isMoving: boolean = false

  add(...elements: ServiceDrawer[]): void {
    this.elements.push(...elements)
  }

  draw(): void {
    this.elements.forEach(element => element.draw())
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
    const position: IPosition = {x: event.offsetX, y: event.offsetY}
    this.isMoving = true

    if (this.selectedElement) {
      this.handleMouseUpOnLinker(this.selectedElement, position)
    }

    const element = this.findElement(position)

    if (element) {
      this.selectElement(element)

    } else if (!this.selectedConnector) {
      this.clearSelectedElement()
    }
  }

  private findElement = (position: IPosition): ServiceDrawer | undefined => this.elements.find(service =>
    service.factory.isSelected(position)
  )

  private handleMouseUpOnLinker = (element: ServiceDrawer, position: IPosition): void => {
    this.selectedConnector = element.connectors.find(linker => linker.isSelected(position))
  }

  private readonly handleMouseUp = (event: MouseEvent): void => {
    const position: IPosition = {x: event.offsetX, y: event.offsetY}

    if (this.selectedConnector && this.onHoverElement) {
      this.createLink(position)
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
      this.drawConnectorLine(this.selectedConnector, position);
      this.updateHoverElement(position)
    }
  }

  private updateHoverElement(position: IPosition): void {
    const element = this.findElement(position)

    if (element) {
      this.onHoverElement = element
      this.onHoverElement.factory.onHover = true
    }
  }

  private onSelectElement(selected: boolean): void {
    if (this.selectedElement != null) {
      this.selectedElement.factory.selected = selected
    }
  }

  private createLink(position: IPosition): void {
    const connector = this.elements
      .flatMap(element => element.connectors)
      .find(linker => linker.isSelected(position))

    const hasConnectorsAndElements = connector && this.selectedElement && this.onHoverElement && this.selectedConnector

    if (hasConnectorsAndElements) {
      connector.drawer.links.push({to: connector, at: this.selectedConnector!})

      this.onHoverElement!.factory.onHover = false
      this.onHoverElement = undefined
      this.onSelectElement(false)
    }
  }

  private selectElement(element: ServiceDrawer): void {
    this.clearSelectedElement();
    this.selectedElement = element;
    this.selectedElement.factory.selected = true;
  }

  private clearSelectedElement(): void {
    if (this.selectedElement) {
      this.selectedElement.factory.selected = false;
    }
    this.selectedElement = undefined;
  }

  private drawConnectorLine(connector: ServiceConnector, position: IPosition): void {
    this.updateScreen();
    this.context.beginPath();
    this.context.moveTo(connector.positionX, connector.positionY);
    this.context.lineTo(position.x, position.y);
    this.context.stroke();
  }
}

export default EventsCanvas
