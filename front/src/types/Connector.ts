import type ServiceConnector from '../services/board/drawer/connector/Service.connector'
import {TServiceConnector} from "./board/drawer/Connectors/Service.connector";

export type TConnector = TServiceConnector
export type TConnectorOrNullify = TConnector | undefined
export type TConnectors = TConnector[]
export type TCallableConnectors = typeof ServiceConnector
