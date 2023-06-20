import {IService} from "../../../../interfaces/Service.interface";
import BaseFactory from "./base.factory";

class ServiceFactory extends BaseFactory {
  readonly service: IService
  readonly context: CanvasRenderingContext2D

  public path: Path2D = new Path2D()
  public position_x: number = 20
  public position_y: number = 20
  public width: number = 150
  public height: number = 100

  constructor(service: IService, context: CanvasRenderingContext2D) {
    super();
    this.setFactory(this)

    this.service = service
    this.context = context

    this.position_x = this.service.position_x || this.position_x
    this.position_y = this.service.position_y || this.position_y
  }

  create() {
    const rectangle = new Path2D();

    this.context.beginPath();
    rectangle.rect(this.position_x, this.position_y, this.width, this.height);
    this.context.stroke();
    this.context.fill(rectangle);
    this.path = rectangle
  }
}

export default ServiceFactory