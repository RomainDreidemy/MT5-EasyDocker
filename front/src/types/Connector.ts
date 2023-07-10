import { type TServiceConnector } from './board/drawer/connectors/Service.connector'
import { type TNetworkConnector } from './board/drawer/connectors/Network.connector'
import type CommonConnector from '../services/board/drawer/connector/Common.connector'
import { type TVolumeConnector } from './board/drawer/connectors/Volume.connector'

export type TConnector = TServiceConnector | TNetworkConnector | TVolumeConnector
export type TConnectorOrNullify = TConnector | undefined
export type TConnectors = TConnector[]
export type TCallableConnectors = typeof CommonConnector
