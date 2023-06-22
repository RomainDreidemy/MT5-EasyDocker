import {type IService} from '../../../../interfaces/Service.interface'
import BaseFactory from './base.factory'
import {type IPosition} from '../../../../interfaces/Position.interface'

class ServiceFactory extends BaseFactory {
  path: Path2D = new Path2D()

  constructor(readonly service: IService,
              readonly context: CanvasRenderingContext2D) {
    super()
    this.setFactory(this)

    this.service = service
    this.context = context

    this.positionX = isNaN(this.service.positionX) ? this.positionX : this.service.positionX
    this.positionY = isNaN(this.service.positionY) ? this.positionY : this.service.positionY
  }

  create(): void {
    const rectangle = new Path2D()

    this.context.beginPath()
    rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

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
    this.context.fillText('Service', this.positionX + 10, this.positionY + 30)
    this.context.closePath()

    this.path = rectangle
  }

  updatePosition(position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  }
}

export default ServiceFactory
