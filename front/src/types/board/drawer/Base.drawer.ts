import { type TStateDrawer } from './State.drawer'
import { type TCommonBases } from './Common.bases'
import { type Placements } from '../../../enums/placements'
import { type TConnector, type TConnectorOrNullify } from '../../Connector'
import { type TLinkEntity } from '../../Linker'
import { type TBaseLinker } from './linkers/Base.linker'
import { type IPosition } from '../../../interfaces/Position.interface'
import { type TEntityOrCreate } from '../../Entity'

export type TBaseDrawer =
  TCommonBases &
  TStateDrawer &
  {
    create: () => void
    update: (entity: TEntityOrCreate) => void
    preProcessActions: () => void
    draw: () => void
    shouldDrawConnectors: () => boolean
    drawConnectors: () => void
    drawLinkers: () => void
    createConnectors: () => void
    updateConnectorPositions: () => void
    isCreatingEntity: () => boolean
    isOnX: (x: number) => boolean
    isOnY: (y: number) => boolean
    isOnPosition: (position: IPosition) => boolean
    createLink: (from: TConnector, to: TConnector, entity?: TLinkEntity) => TBaseLinker
    findConnectorByPlacement: (placement: Placements) => TConnectorOrNullify
    hasAlreadyLinkWithDrawer: () => boolean
  }
