import BaseConnector from "./base.connector";
import {IPosition} from "../../../../interfaces/Position.interface";
import ServiceDrawer from "../service.drawer";

class ServiceConnector extends BaseConnector {
  constructor(readonly context: CanvasRenderingContext2D,
              readonly drawer: ServiceDrawer,
              readonly position: IPosition,
              readonly offset: number) {
    super();
    this.setConnector(this);

    this.position_x = position.x
    this.position_y = position.y
  }

  public draw() {
    const circle = new Path2D()
    this.context.beginPath();
    circle.arc(this.position.x, this.position.y, this.radius, this.start_angle, this.end_angle);
    this.context.fillStyle = this.color;
    this.context.fill(circle);
    this.context.closePath();
    this.path = circle
  }
}

export default ServiceConnector;
