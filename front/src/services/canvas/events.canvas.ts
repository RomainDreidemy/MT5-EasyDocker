import BaseCanvas from './base.canvas'
import type ServiceDrawer from '../board/drawer/service.drawer'
import { Events } from '../../enums/events'
import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../board/drawer/connector/service.connector'
import { type ILink } from '../../interfaces/Link.interface'
import type ServiceLinker from '../board/drawer/linker/service.linker'
import { Keyboard } from '../../enums/keyboard'

class EventsCanvas extends BaseCanvas {
  drawers: ServiceDrawer[] = []

  selectedLinker?: ServiceLinker
  selectedDrawer?: ServiceDrawer
  selectedConnector?: ServiceConnector
  onHoverDrawer?: ServiceDrawer

  isMoving: boolean = false

  add (...drawers: ServiceDrawer[]): void {
    this.drawers.push(...drawers)
  }

  draw (): void {
    this.drawers.forEach(drawer => {
      drawer.draw()
    })
  }

  updateScreen (): void {
    this.clearArea()
    this.draw()
  }

  startup (): void {
    this.canvas.addEventListener(Events.ON_MOUSE_DOWN, this.handleMouseDown)
    this.canvas.addEventListener(Events.ON_MOUSE_UP, this.handleMouseUp)
    this.canvas.addEventListener(Events.ON_MOUSE_MOVE, this.handleMouseMove)

    document.addEventListener(Events.ON_KEY_DOWN, this.handleKeyDown)
  }

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.code === Keyboard.DELETE && (this.selectedLinker != null)) {
      this.deleteLinker(this.selectedLinker.drawer, this.selectedLinker)
      this.updateScreen()
    }
  }

  private deleteLinker (drawer: ServiceDrawer, linkerToRemove: ServiceLinker): void {
    const index = drawer.linkers.findIndex(linker => linkerToRemove === linker)
    drawer.linkers.splice(index, 1)
  }

  private readonly handleMouseDown = (event: MouseEvent): void => {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }
    this.isMoving = true

    if (this.selectedDrawer != null) {
      this.handleMouseUpOnLinker(this.selectedDrawer, position)
    }

    const drawer = this.findDrawer(position)

    if (drawer != null) {
      this.selectDrawer(drawer)
    } else if (this.selectedConnector == null) {
      this.clearSelectedDrawer()
    }

    const linker = this.findLinker(position)

    if (linker != null) {
      this.selectLinker(linker)
    } else {
      this.clearSelectedLinker()
    }
  }

  private readonly findDrawer = (position: IPosition): ServiceDrawer | undefined => this.drawers.find(service =>
    service.factory.isSelected(position)
  )

  private readonly handleMouseUpOnLinker = (drawer: ServiceDrawer, position: IPosition): void => {
    this.selectedConnector = drawer.connectors.find(linker => linker.isSelected(position))
  }

  private readonly handleMouseUp = (event: MouseEvent): void => {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if ((this.selectedConnector != null) && (this.onHoverDrawer != null)) {
      this.createLink(position)
    }

    this.isMoving = false
    this.selectedConnector = undefined
    this.updateScreen()
  }

  private readonly handleMouseMove = (event: MouseEvent): void => {
    const position: IPosition = { x: event.offsetX, y: event.offsetY }

    if (this.isMoving && (this.selectedDrawer != null) && (this.selectedConnector == null)) {
      this.selectedDrawer.factory.updatePosition(position)
      this.updateScreen()
    } else if (this.selectedConnector != null) {
      this.drawConnectorLine(this.selectedConnector, position)
      this.updateHoverDrawer(position)
    }
  }

  private updateHoverDrawer (position: IPosition): void {
    const drawer = this.findDrawer(position)

    if (drawer != null) {
      this.onHoverDrawer = drawer
      this.onHoverDrawer.factory.onHover = true
    }
  }

  private onSelectDrawer (selected: boolean): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = selected
    }
  }

  private createLink (position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedDrawer != null) && (this.onHoverDrawer != null)) {
      const link: ILink = { to: this.selectedConnector, at: connector }

      const linker = new this.selectedDrawer.Linker(this.selectedDrawer, this.context, link)
      this.selectedDrawer.linkers.push(linker)

      this.onHoverDrawer.factory.onHover = false
      this.onHoverDrawer = undefined
      this.onSelectDrawer(false)
    }
  }

  private findConnector (position: IPosition): ServiceConnector | undefined {
    return this.drawers
      .flatMap(drawer => drawer.connectors)
      .find(connector => connector.isSelected(position))
  }

  private findLinker (position: IPosition): ServiceLinker | undefined {
    return this.drawers
      .flatMap(drawer => drawer.linkers)
      .find(linker => linker.isSelected(position))
  }

  private selectDrawer (drawer: ServiceDrawer): void {
    this.clearSelectedDrawer()
    this.selectedDrawer = drawer
    this.selectedDrawer.factory.selected = true
  }

  private clearSelectedDrawer (): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = false
    }
    this.selectedDrawer = undefined
  }

  private selectLinker (linker: ServiceLinker): void {
    this.clearSelectedLinker()
    this.selectedLinker = linker
    this.selectedLinker.selected = true
  }

  private clearSelectedLinker (): void {
    if (this.selectedLinker != null) {
      this.selectedLinker.selected = false
    }
    this.selectedLinker = undefined
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
