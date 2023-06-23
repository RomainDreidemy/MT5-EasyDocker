import {TStateConnector} from "./State.connector";
import {IPosition} from "../../../../interfaces/Position.interface";
import {TCommonBases} from "../Common.bases";

export type TBaseConnector =
  TCommonBases &
  TStateConnector &
  {
    isSelected: (Position: IPosition) => boolean
  }