import { type Placements } from '../../../../enums/placements'
import { type TDrawer } from '../../../Drawer'

export interface TStateConnector {
  drawer?: TDrawer
  placement?: Placements

  path: Path2D

  color: string

  radius: number
  startAngle: number
  endAngle: number
  positionX: number
  positionY: number
}
