import {IService} from "../../../interfaces/Service.interface";
import BaseDrawer from "./base.drawer";
import ServiceFactory from "./factories/service.factory";

class ServiceDrawer {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  constructor(service: IService, context: CanvasRenderingContext2D) {
    this.service = service
    this.context = context
  }

  draw() {
    const factory = new ServiceFactory(this.service, this.context)

    new BaseDrawer(factory).draw()
  }
}

export default ServiceDrawer