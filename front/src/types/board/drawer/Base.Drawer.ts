import {TStateDrawer} from "./State.drawer";
import {TCommonBases} from "./Common.bases";

export type TBaseDrawer =
  TCommonBases &
  TStateDrawer &
  {
    create: () => void
    preProcessActions: () => void
    draw: () => void,
    shouldDrawConnectors: () => boolean,
    drawConnectors: () => void
    drawLinkers: () => void,
    createConnectors: () => void,
  }
