import {TStateFactory} from "./State.factory";
import {IPosition} from "../../../../interfaces/Position.interface";

export type TBaseFactory =
  TStateFactory &
  {
    draw: () => void,
    create: () => void,
    isSelected: (Position: IPosition) => boolean
    updatePosition: (Position: IPosition) => void
  }