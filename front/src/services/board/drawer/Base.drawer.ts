import {TBaseDrawer} from "../../../types/board/drawer/Base.Drawer";
import StateDrawer from "./State.drawer";

const BaseDrawer: TBaseDrawer = {
  ...StateDrawer,

  draw(): void {
    this.preProcessActions()
    this.createConnectors()

    this.factory!.create()

    if (this.shouldDrawConnectors()) {
      this.drawConnectors()
    }

    this.drawLinkers()
  },

  preProcessActions(): void {
    this.connectors = []
  },

  shouldDrawConnectors(): boolean {
    return this.factory!.selected || this.factory!.onHover
  },

  drawConnectors(): void {
    this.connectors.forEach(connector => {
      connector.draw()
    })
  },

  drawLinkers(): void {
    this.linkers.forEach(link => {
      link.draw()
    })
  },

  createConnectors(): void {
    const connectorBuilder = new this.Connector!(this.context!, this.factory!, this)
    this.connectors.push(...connectorBuilder.create())
  },
}

export default BaseDrawer
