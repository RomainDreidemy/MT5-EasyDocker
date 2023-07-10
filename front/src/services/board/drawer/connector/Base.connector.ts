import { type IPosition } from '../../../../interfaces/Position.interface'
import StateConnector from './State.connector'
import { type TBaseConnector } from '../../../../types/board/drawer/connectors/Base.connector'
import CommonBases from '../Common.bases'

const BaseConnector: TBaseConnector = {
  ...CommonBases,
  ...StateConnector,

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },

  draw (): void {
    const circle = new Path2D()

    this.context!.beginPath()
    circle.arc(this.positionX, this.positionY, this.radius, this.startAngle, this.endAngle)
    this.context!.fillStyle = this.color
    this.context!.fill(circle)
    this.context!.closePath()
    this.path = circle
  }
}

export default BaseConnector
