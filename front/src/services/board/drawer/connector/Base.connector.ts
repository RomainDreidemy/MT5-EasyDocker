import {type IPosition} from '../../../../interfaces/Position.interface'
import StateConnector from "./State.connector";
import {TBaseConnector} from "../../../../types/board/drawer/connectors/Base.connector";
import CommonBases from "../Common.bases";


const BaseConnector: TBaseConnector = {
  ...CommonBases,
  ...StateConnector,

  isSelected({x, y}: IPosition): boolean {
    return this.context!.isPointInPath(this.path, x, y)
  },
}

export default BaseConnector
