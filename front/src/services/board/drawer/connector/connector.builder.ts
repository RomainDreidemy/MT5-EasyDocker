import {IPosition} from "../../../../interfaces/Position.interface";
import serviceFactory from "../factories/service.factory";
import ServiceConnector from "./service.connector";
import ServiceDrawer from "../service.drawer";
import {Placements} from "../../../../enums/placements";

class ConnectorBuilder {
  offset: number = 20

  positions: IPosition[] = [
    {
      placement: Placements.TOP,
      x: this.factory.position_x + this.factory.width / 2,
      y: this.factory.position_y - this.offset,
    },
    {
      placement: Placements.BOTTOM,
      x: this.factory.position_x + this.factory.width / 2,
      y: this.factory.position_y + this.factory.height + this.offset,
    },
    {
      placement: Placements.LEFT,
      x: this.factory.position_x - this.offset,
      y: this.factory.position_y + this.factory.height / 2,
    },
    {
      placement: Placements.RIGHT,
      x: this.factory.position_x + this.factory.width + this.offset,
      y: this.factory.position_y + this.factory.height / 2,
    },
  ];

  constructor(readonly context: CanvasRenderingContext2D,
              readonly factory: serviceFactory,
              readonly drawer: ServiceDrawer) {
  }

  create(): ServiceConnector[] {
    return this.positions.map((position) =>
      new ServiceConnector(
        this.context,
        this.drawer,
        position,
        this.offset,
      )
    )
  }
}

export default ConnectorBuilder