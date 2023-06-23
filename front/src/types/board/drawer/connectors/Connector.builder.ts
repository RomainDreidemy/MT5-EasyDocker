import { type TServiceConnector } from './Service.connector'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TConnector } from '../../../Connector'

export interface TConnectorBuilder {
  create: () => TServiceConnector[]
  constructor: (position: IPosition) => TConnector
}
