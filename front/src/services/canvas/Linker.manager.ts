import {TLinkerManager} from "../../types/canvas/Linker.manager";
import ServiceConnector from "../board/drawer/connector/service.connector";
import {IPosition} from "../../interfaces/Position.interface";
import ServiceDrawer from "../board/drawer/service.drawer";
import ServiceLinker from "../board/drawer/linker/service.linker";
import {ILink} from "../../interfaces/Link.interface";
import StateCanvas from "./State.canvas";
import {ConnectorManager} from "./Connector.manager";
import BaseManager from "./Base.manager";

const LinkerManager: TLinkerManager = {
  ...BaseManager,
  ...ConnectorManager,

  drawConnectorLine(connector: ServiceConnector, position: IPosition): void {
    this.updateScreen()
    this.context!.beginPath()
    this.context!.moveTo(connector.positionX, connector.positionY)
    this.context!.lineTo(position.x, position.y)
    this.context!.stroke()
  },

  deleteLinker(drawer: ServiceDrawer, linkerToRemove: ServiceLinker): void {
    const index = drawer.linkers.findIndex(linker => linkerToRemove === linker)
    drawer.linkers.splice(index, 1)
  },

  findLinker(position: IPosition): ServiceLinker | undefined {
    return this.drawers
      .flatMap(element => element.linkers)
      .find(linker => linker.isSelected(position))
  },

  selectLinker(linker: ServiceLinker): void {
    this.clearSelectedLinker()
    this.selectedLinker = linker
    this.selectedLinker.selected = true
  },

  createLink(position: IPosition): void {
    const connector = this.findConnector(position)

    if ((this.selectedConnector != null) && (connector != null) && (this.selectedDrawer != null) && (this.onHoverDrawer != null)) {
      const link: ILink = {to: this.selectedConnector, at: connector}

      const linker = new this.selectedDrawer.Linker(this.selectedDrawer, this.context!, link)
      this.selectedDrawer.linkers.push(linker)

      this.onHoverDrawer.factory.onHover = false
      this.onHoverDrawer = undefined
      this.onSelectDrawer(false)
    }
  },

  onSelectDrawer(selected: boolean): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = selected
    }
  },

  clearSelectedLinker(): void {
    if (this.selectedLinker != null) {
      this.selectedLinker.selected = false
    }
    this.selectedLinker = undefined
  }
}

export default LinkerManager