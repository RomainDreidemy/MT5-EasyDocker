import type ServiceConnector from '../services/board/drawer/connector/service.connector'

export interface ILink {
  at: ServiceConnector
  to: ServiceConnector
}
