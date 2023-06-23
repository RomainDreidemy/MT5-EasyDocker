import {TDrawers} from "../TDrawer";
import {TStateCanvas} from "./State.Canvas";
import {TBaseCanvas} from "./Base.canvas";

export type TBaseManager =
  TBaseCanvas &
  TStateCanvas & {
  add: (...drawers: TDrawers) => void,
  draw: () => void,
  updateScreen: () => void
}