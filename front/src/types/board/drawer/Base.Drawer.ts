import {TStateDrawer} from "./State.drawer";

export type TBaseDrawer =
  TStateDrawer &
  {
    preProcessActions: () => void
    draw: () => void,
    shouldDrawConnectors: () => boolean,
    drawConnectors: () => void
    drawLinkers: () => void,
    createConnectors: () => void,
  }
