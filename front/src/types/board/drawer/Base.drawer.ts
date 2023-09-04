import { type TStateDrawer } from './State.drawer'
import { type TCommonBases } from './Common.bases'
import { type Placements } from '../../../enums/placements'
import { type TConnector, type TConnectorOrNullify } from '../../Connector'
import { type TLinkEntity } from '../../Linker'
import { type TBaseLinker } from './linkers/Base.linker'
import { type IPosition } from '../../../interfaces/Position.interface'
import { type TEntityOrCreate } from '../../Entity'
import { type TDrawer } from '../../Drawer'

export type TBaseDrawer =
  Omit<TCommonBases & TStateDrawer, 'draw'> & {
    create: () => void
    update: (entity: TEntityOrCreate) => void
    preProcessActions: () => void
    draw: (drawerToCompare?: TDrawer) => void
    shouldDrawConnectors: (drawerToCompare?: TDrawer) => boolean
    drawConnectors: () => void
    drawLinkers: () => void
    createConnectors: () => void
    updateEntityPosition: () => void
    updateConnectorPositions: () => void
    isCreatingEntity: () => boolean
    isOnX: (x: number) => boolean
    isOnY: (y: number) => boolean
    isOnPosition: (position: IPosition) => boolean
    createLink: (from: TConnector, to: TConnector, entity?: TLinkEntity) => TBaseLinker
    findConnectorByPlacement: (placement: Placements) => TConnectorOrNullify
    hasAlreadyLinkWithSameDrawer: (drawerToCompare: TDrawer) => boolean
    hasMoved: (initialPosition?: IPosition) => boolean
  }
