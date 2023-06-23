import type ServiceConnector from '../services/board/drawer/connector/Service.connector'
import { type TServiceConnector } from './board/drawer/connectors/Service.connector'

export type TConnector = TServiceConnector
export type TConnectorOrNullify = TConnector | undefined
export type TConnectors = TConnector[]
export type TCallableConnectors = typeof ServiceConnector
