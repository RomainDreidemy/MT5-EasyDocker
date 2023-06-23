import { type Placements } from '../../../../enums/placements'
import { type TFactory } from '../../../Factory'

export interface TStateConnector {
  context?: CanvasRenderingContext2D
  factory?: TFactory
  placement?: Placements

  path: Path2D

  color: string

  radius: number
  startAngle: number
  endAngle: number
  positionX: number
  positionY: number
}
