import {IPosition} from "../../../../interfaces/Position.interface";
import serviceFactory from "../factories/service.factory";
import ServiceConnector from "./service.connector";
import ServiceDrawer from "../service.drawer";
import {Positions} from "../../../../enums/positions";

class ConnectorBuilder {
  offset: number = 20

  positions: IPosition[] = [
    {
      position: Positions.TOP,
      x: this.factory.position_x + this.factory.width / 2,
      y: this.factory.position_y - this.offset,
    },
    {
      position: Positions.BOTTOM,
      x: this.factory.position_x + this.factory.width / 2,
      y: this.factory.position_y + this.factory.height + this.offset,
    },
    {
      position: Positions.LEFT,
      x: this.factory.position_x - this.offset,
      y: this.factory.position_y + this.factory.height / 2,
    },
    {
      position: Positions.RIGHT,
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