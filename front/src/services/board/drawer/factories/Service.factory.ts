import { type IService } from '../../../../interfaces/Service.interface'
import BaseFactory from './Base.factory'
import { type TServiceFactory } from '../../../../types/board/drawer/factories/Service.factory'

const ServiceFactory = (service: IService, context: CanvasRenderingContext2D): TServiceFactory => {
  return {
    ...BaseFactory,

    create (): void {
      this.context = context
      this.positionX = isNaN(service.positionX) ? this.positionX : service.positionX
      this.positionY = isNaN(service.positionY) ? this.positionY : service.positionY
    },

    draw (): void {
      const rectangle = new Path2D()

      this.context!.beginPath()
      rectangle.roundRect(this.positionX, this.positionY, this.width, this.height, [10])

      this.context!.font = '25px Georgia'
      this.context!.lineWidth = 3

      if (this.selected) {
        this.context!.strokeStyle = 'green'
      } else if (this.onHover) {
        this.context!.strokeStyle = 'orange'
      } else {
        this.context!.strokeStyle = 'black'
      }

      this.context!.stroke(rectangle)
      this.context!.fillText('Service', this.positionX + 10, this.positionY + 30)
      this.context!.closePath()

      this.path = rectangle
    }
  }
}

export default ServiceFactory
