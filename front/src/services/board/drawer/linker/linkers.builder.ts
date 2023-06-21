import {IPosition} from "../../../../interfaces/Position.interface";
import serviceFactory from "../factories/service.factory";
import ServiceLinker from "./service.linker";

class LinkersBuilder {
  offset: number = 20

  positions: IPosition[] = [
    // { // top
    //   x: this.factory.position_x + this.factory.width / 2,
    //   y: this.factory.position_y - this.offset,
    // },
    // { // bottom
    //   x: this.factory.position_x + this.factory.width / 2,
    //   y: this.factory.position_y + this.factory.height + this.offset,
    // },
    { // left
      x: this.factory.position_x - this.offset,
      y: this.factory.position_y + this.factory.height / 2,
    },
    // { // right
    //   x: this.factory.position_x + this.factory.width + this.offset,
    //   y: this.factory.position_y + this.factory.height / 2,
    // },
  ];

  constructor(readonly context: CanvasRenderingContext2D,
              readonly factory: serviceFactory) {
  }

  create(): ServiceLinker[] {
    return this.positions.map((position) =>
      new ServiceLinker(this.context, position)
    )
  }
}

export default LinkersBuilder