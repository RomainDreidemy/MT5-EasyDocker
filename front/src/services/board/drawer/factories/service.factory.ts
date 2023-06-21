import { type IService } from '../../../../interfaces/Service.interface'
import BaseFactory from './base.factory'
import {IPosition} from "../../../../interfaces/Position.interface";

class ServiceFactory extends BaseFactory {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  constructor (service: IService, context: CanvasRenderingContext2D) {
    super()
    this.setFactory(this)

    this.service = service
    this.context = context

    this.position_x = isNaN(this.service.position_x) ? this.position_x : this.service.position_x
    this.position_y = isNaN(this.service.position_y) ? this.position_y : this.service.position_y
  }

  create (): void {
    const rectangle = new Path2D()

    this.context.beginPath()
    rectangle.rect(this.position_x, this.position_y, this.width, this.height)
    this.context.stroke()
    this.context.fill(rectangle)
    this.path = rectangle
  }

  updatePosition(position: IPosition): void {
    this.position_x = position.x
    this.position_y = position.y
  }
}

export default ServiceFactory
