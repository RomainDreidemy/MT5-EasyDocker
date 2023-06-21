import BaseConnector from "./base.connector";
import {IPosition} from "../../../../interfaces/Position.interface";
import ServiceDrawer from "../service.drawer";

class ServiceConnector extends BaseConnector {
  constructor(
    readonly context: CanvasRenderingContext2D,
    readonly drawer: ServiceDrawer,
    readonly position: IPosition
  ) {
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

  public drawLinks() {
    this.links.forEach((link) => this.drawLink(link))
  }

  private drawLink(linker: ServiceConnector) {
    console.log('DRAW')
    this.context.beginPath()
    this.context.moveTo(this.position_x, this.position_y)
    this.context.lineTo(linker.position_x, linker.position_y)
    this.context.stroke()
  }
}

export default ServiceConnector;
