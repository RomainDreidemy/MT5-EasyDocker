import { type IService } from '../../../interfaces/Service.interface'
import BaseDrawer from './base.drawer'
import ServiceFactory from './factories/service.factory'
import ItemBasics from '../item.basics'

class ServiceDrawer extends ItemBasics {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  constructor (service: IService, context: CanvasRenderingContext2D) {
    super()

    this.service = service
    this.context = context
  }

  draw (): void {
    const factory = new ServiceFactory(this.service, this.context)

    new BaseDrawer(factory).draw()
  }
}

export default ServiceDrawer
