import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../../services/board/drawer/connector/service.connector'
import { type TStateCanvas } from './State.Canvas'

export type TConnectorManager =
  TStateCanvas &
  {
    findConnector: (position: IPosition) => ServiceConnector | undefined
  }