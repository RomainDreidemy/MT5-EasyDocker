import {IPosition} from "../../../../interfaces/Position.interface";
import BaseConnector from "./Base.connector";
import {TConnector} from "../../../../types/Connector";
import {TFactory} from "../../../../types/Factory";

const CommonConnector = (context: CanvasRenderingContext2D, factory: TFactory, position: IPosition): TConnector => {
  return {
    ...BaseConnector,

    create(): void {
      this.context = context
      this.factory = factory
      this.positionX = position.x
      this.positionY = position.y
      this.placement = position.placement!
    },
  }
}

export default CommonConnector