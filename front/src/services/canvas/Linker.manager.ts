import { type TLinkerManager } from '../../types/canvas/Linker.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import { type ILink } from '../../interfaces/Link.interface'
import { ConnectorManager } from './Connector.manager'
import BaseManager from './Base.manager'
import { type TConnector } from '../../types/TConnector'
import { type TDrawer } from '../../types/TDrawer'
import { type TLinker, type TLinkerOrNullify } from '../../types/TLinker'

const LinkerManager: TLinkerManager = {
  ...BaseManager,
  ...ConnectorManager,

  drawConnectorLine (connector: TConnector, position: IPosition): void {
    this.updateScreen()
    this.context!.beginPath()
    this.context!.moveTo(connector.positionX, connector.positionY)
    this.context!.lineTo(position.x, position.y)
    this.context!.stroke()
  },

  deleteLinker (drawer: TDrawer, linkerToRemove: TLinker): void {
    const index = drawer.linkers.findIndex(linker => linkerToRemove === linker)
    drawer.linkers.splice(index, 1)
  },

  findLinker (position: IPosition): TLinkerOrNullify {
    return this.drawers
      .flatMap(element => element.linkers)
      .find(linker => linker.isSelected(position))
  },

  selectLinker (linker: TLinker): void {
    this.clearSelectedLinker()
    this.selectedLinker = linker
    this.selectedLinker.selected = true
  },

  createLink (position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedDrawer != null) && (this.onHoverDrawer != null)) {
      const link: ILink = { to: this.selectedConnector, at: connector }

      const linker = new this.selectedDrawer.Linker(this.selectedDrawer, this.context!, link)
      this.selectedDrawer.linkers.push(linker)

      this.onHoverDrawer.factory.onHover = false
      this.onHoverDrawer = undefined
      this.onSelectDrawer(false)
    }
  },

  onSelectDrawer (selected: boolean): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = selected
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
