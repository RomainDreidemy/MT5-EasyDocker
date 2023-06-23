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
  }
}

export default ServiceFactory
