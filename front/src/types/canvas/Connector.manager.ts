import { type IPosition } from '../../interfaces/Position.interface'
import { type TStateCanvas } from './State.canvas'
import {TConnectorOrNullify} from "../Connector";

export type TConnectorManager =
  TStateCanvas &
  {
    findConnector: (position: IPosition) => TConnectorOrNullify
  }
