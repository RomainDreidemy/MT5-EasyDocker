import {IService} from "../../../../interfaces/Service.interface";

class ServiceFactory {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  constructor(service: IService, context: CanvasRenderingContext2D) {
    this.service = service
    this.context = context
  }

  create() {
    this.context.beginPath();
    this.context.rect(20, 20, 150, 100);
    this.context.stroke();
  }
}

export default ServiceFactory