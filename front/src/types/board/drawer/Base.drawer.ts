import {type TStateDrawer} from './State.drawer'
import {type TCommonBases} from './Common.bases'
import {Placements} from "../../../enums/placements";
import {TConnectorOrNullify} from "../../Connector";

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
    findConnectorByPlacement: (placement: Placements) => TConnectorOrNullify
  }
