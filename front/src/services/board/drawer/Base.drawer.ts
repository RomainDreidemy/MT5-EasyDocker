import {type TBaseDrawer} from '../../../types/board/drawer/Base.drawer'
import StateDrawer from './State.drawer'
import {Errors} from '../../../enums/errors'
import CommonBases from './Common.bases'
import {type Placements} from '../../../enums/placements'
import {type TConnector, type TConnectorOrNullify} from '../../../types/Connector'
import {type ILink} from '../../../interfaces/Link.interface'
import {type TLinkEntity} from '../../../types/Linker'
import {type TBaseLinker} from '../../../types/board/drawer/linkers/Base.linker'

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
      if (this.isCreatingEntity() || this.hasAlreadyLinkWithDrawer()) return false
      if (this.factory!.onHover) return true

      const hasRulesAndSelected =
        (this.canBeLinkedWith.length > 0) && this.factory!.selected
      return (hasRulesAndSelected)
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
    },

    createLink(from: TConnector, to: TConnector, entity?: TLinkEntity): TBaseLinker {
      const link: ILink = {from, to}

      const linker = this.Linker!(this, this.context!, link, entity)
      linker.create()
      this.linkers.push(linker)

      return linker
    },

    isCreatingEntity(): boolean {
      return !Object.prototype.hasOwnProperty.call(this.entity, 'id')
    },

    hasAlreadyLinkWithDrawer(): boolean {
      return this.linkers.some(linker => linker.link!.to.drawer !== this)
    }
  }
}

export default BaseDrawer
