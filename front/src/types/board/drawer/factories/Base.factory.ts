import {TStateFactory} from "./State.factory";
import {IPosition} from "../../../../interfaces/Position.interface";
import {TCommonBases} from "../Common.bases";

export type TBaseFactory =
  TCommonBases &
  TStateFactory &
  {
    isSelected: (Position: IPosition) => boolean
    updatePosition: (Position: IPosition) => void
  }