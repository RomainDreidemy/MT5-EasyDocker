import { type TBaseDrawer } from '../../../types/board/drawer/Base.drawer'
import StateDrawer from './State.drawer'
import { Errors } from '../../../enums/errors'
import CommonBases from './Common.bases'
import { type Placements } from '../../../enums/placements'
import { type TConnector, type TConnectorOrNullify } from '../../../types/Connector'
import { type ILink } from '../../../interfaces/Link.interface'
import { type TLinkEntity } from '../../../types/Linker'
import { type TBaseLinker } from '../../../types/board/drawer/linkers/Base.linker'
import { type IPosition } from '../../../interfaces/Position.interface'
import { type TEntityOrCreate } from '../../../types/Entity'
import { type TDrawer } from '../../../types/Drawer'

const BaseDrawer = (): TBaseDrawer => {
  return {
    ...CommonBases,
    ...StateDrawer(),

    create (): void {
      throw new Error(Errors.NOT_IMPLEMENTED)
    },

    update (entity: TEntityOrCreate) {
      this.entity = entity
      this.factory!.update(entity)
    },

    updateEntityPosition () {
      this.entity!.positionX = this.factory!.positionX
      this.entity!.positionY = this.factory!.positionY
    },

    draw (drawerToCompare?: TDrawer): void {
      this.preProcessActions()
      this.updateConnectorPositions()

      this.factory!.draw()

      if (this.shouldDrawConnectors(drawerToCompare)) {
        this.drawConnectors()
      }

      this.drawLinkers()
    },

    preProcessActions (): void {
    },

    shouldDrawConnectors (drawerToCompare?: TDrawer): boolean {
      if (this.isCreatingEntity()) return false
      if (drawerToCompare == null) return false
      if (this.hasAlreadyLinkWithSameDrawer(drawerToCompare)) return false
      if (this.factory!.onHover) return true

      const hasRulesAndSelected =
        (this.canBeLinkedWith.length > 0) && this.factory!.selected
      return (hasRulesAndSelected)
    },

    drawConnectors (): void {
      this.connectors.forEach(connector => {
        connector.draw()
      })
    },

    drawLinkers (): void {
      this.linkers.forEach(link => {
        link.draw()
      })
    },

    updateConnectorPositions (): void {
      this.connectors.forEach(connector => {
        connector.updatePosition(this.factory!.position())
      })
    },

    createConnectors (): void {
      this.connectors.push(...this.Connector!.create())
    },

    findConnectorByPlacement (placement: Placements): TConnectorOrNullify {
      return this.connectors.find(connector => connector.placement === placement)
    },

    createLink (from: TConnector, to: TConnector, entity?: TLinkEntity): TBaseLinker {
      const link: ILink = { from, to }

      const linker = this.Linker!(this, this.context!, link, entity)
      linker.create()
      this.linkers.push(linker)

      return linker
    },

    isCreatingEntity (): boolean {
      return !Object.prototype.hasOwnProperty.call(this.entity, 'id')
    },

    isOnPosition ({ x, y }: IPosition): boolean {
      return this.isOnX(x) && this.isOnY(y)
    },

    isOnX (x: number): boolean {
      return this.factory!.positionX <= x && x <= this.factory!.positionX + this.factory!.width
    },

    isOnY (y: number): boolean {
      return this.factory!.positionY <= y && y <= this.factory!.positionY + this.factory!.height
    },

    hasAlreadyLinkWithSameDrawer (drawerToCompare: TDrawer): boolean {
      return this.linkers.some(linker => linker.link!.to.drawer!.entity!.id === drawerToCompare.entity!.id)
    },

    hasMoved (initialPosition?: IPosition): boolean {
      if (initialPosition == null) return false

      const finalPosition = this.factory!.position()

      return initialPosition.x !== finalPosition.x && initialPosition.y !== finalPosition.y
    }
  }
}

export default BaseDrawer
