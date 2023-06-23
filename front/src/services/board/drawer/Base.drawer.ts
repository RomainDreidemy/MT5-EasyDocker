import {TBaseDrawer} from "../../../types/board/drawer/Base.Drawer";
import StateDrawer from "./State.drawer";
import {Errors} from "../../../enums/errors";
import CommonBases from "./Common.bases";

const BaseDrawer: TBaseDrawer = {
  ...CommonBases,
  ...StateDrawer,

  create(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  draw(): void {
    this.preProcessActions()
    this.createConnectors()

    this.factory!.draw()

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
    this.connectors.push(...this.Connector!.create())
  }
}

export default BaseDrawer
