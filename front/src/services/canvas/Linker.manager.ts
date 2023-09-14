import { type TLinkerManager } from '../../types/canvas/Linker.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import { ConnectorManager } from './Connector.manager'
import BaseManager from './Base.manager'
import { type TConnector } from '../../types/Connector'
import { type TDrawer } from '../../types/Drawer'
import { type TLinker, type TLinkerOrNullify } from '../../types/Linker'
import { DrawerManager } from './Drawer.manager'
import { type TBaseLinker } from '../../types/board/drawer/linkers/Base.linker'
import { CanvasColor } from '../../enums/CanvasColor'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'
import { type EventListenerCallback } from '../../interfaces/EventListener.interface'

const LinkerManager: TLinkerManager = {
  ...BaseManager,
  ...ConnectorManager,
  ...DrawerManager,

  lineWidth: 2,
  arrowSize: 10,

  drawConnectorLine (connector: TConnector, position: IPosition): void {
    this.updateScreen()
    this.context!.beginPath()
    this.context!.strokeStyle = CanvasColor.DEFAULT
    this.context!.moveTo(connector.positionX, connector.positionY)
    this.context!.lineTo(position.x, position.y)
    this.context!.lineWidth = this.lineWidth
    this.context!.stroke()

    const arrowSize = this.arrowSize
    const angle: number = Math.atan2(position.y - connector.positionY, position.x - connector.positionX)

    this.context!.beginPath()
    this.context!.fillStyle = CanvasColor.DEFAULT
    this.context!.moveTo(position.x, position.y)
    this.context!.lineTo(position.x - arrowSize * Math.cos(angle - Math.PI / 6), position.y - arrowSize * Math.sin(angle - Math.PI / 6))
    this.context!.lineTo(position.x - arrowSize * Math.cos(angle + Math.PI / 6), position.y - arrowSize * Math.sin(angle + Math.PI / 6))
    this.context!.closePath()
    this.context!.fill()
  },

  deleteLinker (drawer: TDrawer, linkerToRemove: TLinker): void {
    const index = drawer.linkers.findIndex((linker: TBaseLinker) => linkerToRemove === linker)
    eventEmitter.emit<EventListenerCallback<TDrawer>>(EventEmitters.ON_DELETED_LINKER, drawer.linkers[index])
    drawer.linkers.splice(index, 1)
    this.clearSelectedLinker()
  },

  findLinker (position: IPosition): TLinkerOrNullify {
    return this.drawers
      .flatMap(drawer => drawer.linkers)
      .find(linker => linker.isSelected(position))
  },

  selectLinker (linker: TLinker): void {
    this.clearSelectedLinker()
    this.selectedLinker = linker
    this.selectedLinker.selected = true
    eventEmitter.emit<EventListenerCallback<TLinker>>(EventEmitters.ON_SELECTED_LINKER, linker)
  },

  createLinker (position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedDrawer != null) && (this.onHoverDrawer != null)) {
      const link = connector.drawer!.createLink(connector, this.selectedConnector)

      eventEmitter.emit<EventListenerCallback<TLinker>>(EventEmitters.ON_CREATED_LINKER, link)

      this.clearOnHoverDrawer()
      this.onSelectDrawer(false)
    }
  },

  onSelectDrawer (selected: boolean): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory!.selected = selected
    }
  },

  clearSelectedLinker (): void {
    if (this.selectedLinker != null) {
      this.selectedLinker.selected = false
    }
    this.selectedLinker = undefined
    eventEmitter.emit<EventListenerCallback<null>>(EventEmitters.ON_UNSELECTED_LINKER)
  }
}

export default LinkerManager
