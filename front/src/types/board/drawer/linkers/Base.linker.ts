import {TStateLinker} from "./State.linker";
import {IPosition} from "../../../../interfaces/Position.interface";

export type TBaseLinker =
  TStateLinker
  & {
  create: () => void,
  draw: () => void,
  isSelected: (Position: IPosition) => boolean
}