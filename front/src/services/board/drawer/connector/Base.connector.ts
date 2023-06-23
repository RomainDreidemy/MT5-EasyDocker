import {type IPosition} from '../../../../interfaces/Position.interface'
import {Errors} from '../../../../enums/errors'
import StateConnector from "./State.connector";
import {TBaseConnector} from "../../../../types/board/drawer/Connectors/Base.connector";


const BaseConnector: TBaseConnector = {
  ...StateConnector,

  create(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  draw(): void {
    throw new Error(Errors.NOT_IMPLEMENTED)
  },

  isSelected({x, y}: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },
}

export default BaseConnector
