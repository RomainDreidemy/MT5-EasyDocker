import BaseLinker from "./base.linker";
import {IPosition} from "../../../../interfaces/Position.interface";

class ServiceLinker extends BaseLinker {
  constructor(
    readonly context: CanvasRenderingContext2D,
    readonly position: IPosition
  ) {
    super();
    this.setLinker(this);
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

export default ServiceLinker;
