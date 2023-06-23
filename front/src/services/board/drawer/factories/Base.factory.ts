import {Errors} from '../../../../enums/errors'
import {TBaseFactory} from "../../../../types/board/drawer/factories/Base.factory";
import StateFactory from "./State.factory";
import {IPosition} from "../../../../interfaces/Position.interface";

const BaseFactory: TBaseFactory = {
  ...StateFactory,

  create(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  draw(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },

  updatePosition (position: IPosition): void {
    this.positionX = position.x
    this.positionY = position.y
  }
}

export default BaseFactory
