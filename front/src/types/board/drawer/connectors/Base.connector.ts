import {TStateConnector} from "./State.connector";
import {IPosition} from "../../../../interfaces/Position.interface";

export type TBaseConnector =
  TStateConnector &
  {
    create: () => void,
    draw: () => void,
    isSelected: (Position: IPosition) => boolean
  }