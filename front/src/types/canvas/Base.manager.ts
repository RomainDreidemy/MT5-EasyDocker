import {Drawers} from "../Drawer";
import {TStateCanvas} from "./State.Canvas";
import {TBaseCanvas} from "./Base.canvas";

export type TBaseManager =
  TBaseCanvas &
  TStateCanvas & {
  add: (...drawers: Drawers) => void,
  draw: () => void,
  updateScreen: () => void
}