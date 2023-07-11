import {type TBaseDrawer} from '../../../types/board/drawer/Base.drawer'
import StateDrawer from './State.drawer'
import {Errors} from '../../../enums/errors'
import CommonBases from './Common.bases'
import {Placements} from "../../../enums/placements";
import {TConnectorOrNullify} from "../../../types/Connector";

const BaseDrawer = (): TBaseDrawer => {
  return {
    ...CommonBases,
    ...StateDrawer(),

    create(): void {
      throw new Error(Errors.NOT_IMPLEMENTED)
    },

    draw(): void {
      this.preProcessActions()
      this.updateConnectorPositions()

      this.factory!.draw()

      if (this.shouldDrawConnectors()) {
        this.drawConnectors()
      }

      this.drawLinkers()
    },

    preProcessActions(): void {
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

    updateConnectorPositions(): void {
      this.connectors.forEach(connector => {
        connector.updatePosition(this.factory!.position())
      })
    },

    createConnectors(): void {
      this.connectors.push(...this.Connector!.create())
    },

    findConnectorByPlacement(placement: Placements): TConnectorOrNullify {
      return this.connectors.find(connector => connector.placement === placement)
    }
  }
}

export default BaseDrawer
