import {IPosition} from "../../../../interfaces/Position.interface";
import {Placements} from "../../../../enums/placements";
import {TFactory} from "../../../Factory";

export type TStateConnector = {
  context?: CanvasRenderingContext2D,
  factory?: TFactory,
  placement?: Placements

  path: Path2D

  color: string

  radius: number
  startAngle: number
  endAngle: number
  positionX: number
  positionY: number
}