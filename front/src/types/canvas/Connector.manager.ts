import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../../services/board/drawer/connector/Service.connector'
import { type TStateCanvas } from './State.canvas'

export type TConnectorManager =
  TStateCanvas &
  {
    findConnector: (position: IPosition) => ServiceConnector | undefined
  }
