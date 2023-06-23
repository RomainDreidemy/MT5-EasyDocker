import {TStateLinker} from "./State.linker";
import {IPosition} from "../../../../interfaces/Position.interface";
import {TCommonBases} from "../Common.bases";

export type TBaseLinker =
  TCommonBases &
  TStateLinker &
  {
    isSelected: (Position: IPosition) => boolean
  }