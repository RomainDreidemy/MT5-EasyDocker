import {TStateDrawer} from "./State.drawer";

export type TBaseDrawer =
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
