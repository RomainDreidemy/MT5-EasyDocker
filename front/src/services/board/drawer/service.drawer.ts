import {type IService} from '../../../interfaces/Service.interface'
import BaseDrawer from './base.drawer'
import ServiceFactory from './factories/service.factory'
import ItemBasics from '../item.basics'
import type BaseCanvas from '../../canvas/base.canvas'
import ServiceLinker from "./linker/service.linker";

class ServiceDrawer extends ItemBasics {
  readonly factory: ServiceFactory
  readonly linker: ServiceLinker

  constructor(readonly service: IService,
              readonly baseCanvas: BaseCanvas) {
    super(service)

    this.factory = new ServiceFactory(service, baseCanvas.context)
    this.linker = new ServiceLinker(service, baseCanvas.context, this.factory)
  }

  draw(): void {
    new BaseDrawer(
      this.factory,
      this.linker
    ).draw()
  }
}

export default ServiceDrawer
