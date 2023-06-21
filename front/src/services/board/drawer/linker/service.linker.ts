import {IService} from "../../../../interfaces/Service.interface";
import ServiceFactory from "../factories/service.factory";
import BaseLinker from "./base.linker";

class ServiceLinker extends BaseLinker {
  private linkers: { x: number; y: number }[] = [];

  constructor(
    readonly service: IService,
    readonly context: CanvasRenderingContext2D,
    readonly factory: ServiceFactory
  ) {
    super();
    this.setLinker(this);
  }

  private initializeLinkers() {
    this.paths = []
    this.linkers = [
      { // top
        x: this.factory.position_x + this.factory.width / 2,
        y: this.factory.position_y - this.offset,
      },
      { // bottom
        x: this.factory.position_x + this.factory.width / 2,
        y: this.factory.position_y + this.factory.height + this.offset,
      },
      { // left
        x: this.factory.position_x - this.offset,
        y: this.factory.position_y + this.factory.height / 2,
      },
      { // right
        x: this.factory.position_x + this.factory.width + this.offset,
        y: this.factory.position_y + this.factory.height / 2,
      },
    ];
  }

  create() {
    this.initializeLinkers();
    for (const linker of this.linkers) {
      this.drawLinker(linker.x, linker.y);
    }
  }

  private drawLinker(x: number, y: number) {
    const circle = new Path2D()
    this.context.beginPath();
    this.context.arc(x, y, this.radius, this.start_angle, this.end_angle);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
    this.paths.push(circle)
  }
}

export default ServiceLinker;
