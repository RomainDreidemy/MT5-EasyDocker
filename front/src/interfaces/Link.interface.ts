import type ServiceConnector from '../services/board/drawer/connector/Service.connector'

export interface ILink {
  at: ServiceConnector
  to: ServiceConnector
}
