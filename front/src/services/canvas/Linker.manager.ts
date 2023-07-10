import { type TLinkerManager } from '../../types/canvas/Linker.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import { type ILink } from '../../interfaces/Link.interface'
import { ConnectorManager } from './Connector.manager'
import BaseManager from './Base.manager'
import { type TConnector } from '../../types/Connector'
import { type TDrawer } from '../../types/Drawer'
import { type TLinker, type TLinkerOrNullify } from '../../types/Linker'
import { DrawerManager } from './Drawer.manager'
import { TBaseLinker } from '../../types/board/drawer/linkers/Base.linker'

const LinkerManager: TLinkerManager = {
  ...BaseManager,
  ...ConnectorManager,
  ...DrawerManager,

  drawConnectorLine(connector: TConnector, position: IPosition): void {
    this.updateScreen()
    this.context!.beginPath()
    this.context!.strokeStyle = 'black'
    this.context!.moveTo(connector.positionX, connector.positionY)
    this.context!.lineTo(position.x, position.y)
    this.context!.stroke()
  },

  deleteLinker(drawer: TDrawer, linkerToRemove: TLinker): void {
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
      const link: ILink = { to: this.selectedConnector, at: connector }

      const linker = this.selectedDrawer.Linker!(this.selectedDrawer, this.context!, link)
      linker.create()
      this.selectedDrawer.linkers.push(linker)

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
