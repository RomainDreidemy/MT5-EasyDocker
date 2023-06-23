import {type IPosition} from '../../../../interfaces/Position.interface'
import {Errors} from '../../../../enums/errors'
import {TBaseLinker} from "../../../../types/board/drawer/linkers/Base.linker";
import StateLinker from "./State.linker";

const BaseLinker: TBaseLinker = {
  ...StateLinker,

  create(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  draw(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  isSelected({x, y}: IPosition): boolean {
    return this.context!.isPointInStroke(this.path, x, y)
  }
}

export default BaseLinker
