import { type IService } from '../../../interfaces/Service.interface'
import BaseDrawer from './base.drawer'
import ServiceFactory from './factories/service.factory'
import ItemBasics from '../item.basics'
import type BaseCanvas from '../../canvas/base.canvas'

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory

  constructor (service: IService, baseCanvas: BaseCanvas) {
    super(service)

    this.factory = new ServiceFactory(service, baseCanvas.context)
  }

  draw (): void {
    new BaseDrawer(this.factory).draw()
  }
}

export default ServiceDrawer
