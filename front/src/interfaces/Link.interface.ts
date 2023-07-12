import { type TServiceConnector } from '../types/board/drawer/connectors/Service.connector'

export interface ILink {
  from: TServiceConnector
  to: TServiceConnector
}
