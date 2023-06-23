import {TBaseFactory} from "../../../../types/board/drawer/factories/Base.factory";
import StateFactory from "./State.factory";
import {IPosition} from "../../../../interfaces/Position.interface";
import CommonBases from "../Common.bases";

const BaseFactory: TBaseFactory = {
  ...CommonBases,
  ...StateFactory,

  isSelected({x, y}: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },

  updatePosition(position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  }
}

export default BaseFactory
