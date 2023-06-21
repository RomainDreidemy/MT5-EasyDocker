import {type IService} from '../../../../interfaces/Service.interface'
import BaseFactory from './base.factory'
import {type IPosition} from '../../../../interfaces/Position.interface'

class ServiceFactory extends BaseFactory {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  path: Path2D = new Path2D()

  constructor(service: IService, context: CanvasRenderingContext2D) {
    super()
    this.setFactory(this)

    this.service = service
    this.context = context

    this.position_x = isNaN(this.service.position_x) ? this.position_x : this.service.position_x
    this.position_y = isNaN(this.service.position_y) ? this.position_y : this.service.position_y
  }

  create(): void {
    const rectangle = new Path2D()

    this.context.beginPath()
    rectangle.roundRect(this.position_x, this.position_y, this.width, this.height, [10])

    this.context.font = '25px Georgia'
    this.context.lineWidth = 3

    if (this.selected) {
      this.context.strokeStyle = 'green'

    } else if (this.onHover) {
      this.context.strokeStyle = 'orange'

    } else {
      this.context.strokeStyle = 'black'
    }

    this.context.stroke(rectangle)
    this.context.fillText('Service', this.position_x + 10, this.position_y + 30)
    this.context.closePath()

    this.path = rectangle
  }

  updatePosition(position: IPosition): void {
    this.position_x = position.x
    this.position_y = position.y
  }
}

export default ServiceFactory
