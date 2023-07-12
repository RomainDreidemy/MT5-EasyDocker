import { type TServiceConnector } from './Service.connector'
import { type TConnector } from '../../../Connector'
import { type Placements } from '../../../../enums/placements'

export interface TConnectorBuilder {
  create: () => TServiceConnector[]
  constructor: (placement: Placements) => TConnector
}
