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

const LinkerManager: TLinkerManager = {
  ...BaseManager,
  ...ConnectorManager,
  ...DrawerManager,

  drawConnectorLine (connector: TConnector, position: IPosition): void {
    this.updateScreen()
    this.context!.beginPath()
    this.context!.strokeStyle = CanvasColor.DEFAULT
    this.context!.moveTo(connector.positionX, connector.positionY)
    this.context!.lineTo(position.x, position.y)
    this.context!.stroke()

    const arrowSize = 10
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
    drawer.linkers.splice(index, 1)
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
  },

  createLinker (position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedDrawer != null) && (this.onHoverDrawer != null)) {
      this.selectedDrawer.createLink(connector, this.selectedConnector)

      eventEmitter.emit(EventEmitters.ON_CREATED_LINKER, this.selectedDrawer)

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
  }
}

export default LinkerManager
