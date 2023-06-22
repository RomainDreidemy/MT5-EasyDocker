import BaseConnector from './base.connector'
import { type IPosition } from '../../../../interfaces/Position.interface'
import type ServiceDrawer from '../service.drawer'

class ServiceConnector extends BaseConnector {
  constructor (
    readonly context: CanvasRenderingContext2D,
    readonly drawer: ServiceDrawer,
    readonly position: IPosition
  ) {
    super()
    this.setConnector(this)

    this.positionX = position.x
    this.positionY = position.y
  }

  public draw (): void {
    const circle = new Path2D()
    this.context.beginPath()
    circle.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle)
    this.context.fillStyle = this.color
    this.context.fill(circle)
    this.context.closePath()
    this.path = circle
  }
}

export default ServiceConnector
