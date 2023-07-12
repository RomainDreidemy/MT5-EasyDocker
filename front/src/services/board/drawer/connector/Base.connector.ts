import { type IPosition } from '../../../../interfaces/Position.interface'
import StateConnector from './State.connector'
import { type TBaseConnector } from '../../../../types/board/drawer/connectors/Base.connector'
import CommonBases from '../Common.bases'
import { CanvasColor } from '../../../../enums/CanvasColor'
import PlacementConnector from './Placement.connector'

const BaseConnector: TBaseConnector = {
  ...CommonBases,
  ...StateConnector,

  isSelected ({ x, y }: IPosition): boolean {
    return this.drawer!.context!.isPointInPath(this.path, x, y)
  },

  draw (): void {
    const circle = new Path2D()

    this.drawer!.context!.beginPath()
    circle.arc(this.positionX, this.positionY, this.radius, this.startAngle, this.endAngle)
    this.drawer!.context!.fillStyle = CanvasColor.CONNECTOR

    this.drawer!.context!.fill(circle)
    this.drawer!.context!.closePath()

    this.path = circle
  },

  updatePosition (): void {
    const { x, y } = PlacementConnector(this.drawer!.factory!, this.placement!)

    this.positionX = x
    this.positionY = y
  }
}

export default BaseConnector
