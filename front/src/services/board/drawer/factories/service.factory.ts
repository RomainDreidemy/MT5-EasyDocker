import {IService} from "../../../../interfaces/Service.interface";

class ServiceFactory {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  public position_x: number = 20
  public position_y: number = 20
  public width: number = 150
  public height: number = 100

  constructor(service: IService, context: CanvasRenderingContext2D) {
    this.service = service
    this.context = context

    this.position_x = this.service.position_x || this.position_x
    this.position_y = this.service.position_y || this.position_y
  }

  create() {
    this.context.beginPath();
    this.context.rect(this.position_x, this.position_y, this.width, this.height);
    this.context.stroke();
  }
}

export default ServiceFactory