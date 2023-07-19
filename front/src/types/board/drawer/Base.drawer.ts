import {type TStateDrawer} from './State.drawer'
import {type TCommonBases} from './Common.bases'
import {type Placements} from '../../../enums/placements'
import {type TConnector, type TConnectorOrNullify} from '../../Connector'
import {type TLinkEntity} from '../../Linker'
import {type TBaseLinker} from './linkers/Base.linker'

export type TBaseDrawer =
  TCommonBases &
  TStateDrawer &
  {
    create: () => void
    preProcessActions: () => void
    draw: () => void
    shouldDrawConnectors: () => boolean
    drawConnectors: () => void
    drawLinkers: () => void
    createConnectors: () => void
    updateConnectorPositions: () => void
    isCreatingEntity: () => boolean
    createLink: (from: TConnector, to: TConnector, entity?: TLinkEntity) => TBaseLinker
    findConnectorByPlacement: (placement: Placements) => TConnectorOrNullify
    hasAlreadyLinkWithDrawer: () => boolean
  }
