import {type TStateDrawer} from './State.drawer'
import {type TCommonBases} from './Common.bases'
import {Placements} from "../../../enums/placements";
import {TConnector, TConnectorOrNullify} from "../../Connector";
import {TLinkEntity} from "../../Linker";

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
    createLink: (from: TConnector, to: TConnector, entity?: TLinkEntity) => void
    findConnectorByPlacement: (placement: Placements) => TConnectorOrNullify
  }
