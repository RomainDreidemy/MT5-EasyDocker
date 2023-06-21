import BaseLinker from "./base.linker";
import {IPosition} from "../../../../interfaces/Position.interface";

class ServiceLinker extends BaseLinker {
  constructor(
    readonly context: CanvasRenderingContext2D,
    readonly position: IPosition
  ) {
    super();
    this.setLinker(this);

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

  private drawLink(linker: ServiceLinker) {
    console.log('DRAW')
    this.context.beginPath()
    this.context.moveTo(this.position_x, this.position_y)
    this.context.lineTo(linker.position_x, linker.position_y)
    this.context.stroke()
  }
}

export default ServiceLinker;
