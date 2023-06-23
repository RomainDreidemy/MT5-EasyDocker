import {type TServiceConnector} from './board/drawer/connectors/Service.connector'
import {TNetworkConnector} from "./board/drawer/connectors/Network.connector";
import CommonConnector from "../services/board/drawer/connector/Common.connector";

export type TConnector = TServiceConnector | TNetworkConnector
export type TConnectorOrNullify = TConnector | undefined
export type TConnectors = TConnector[]
export type TCallableConnectors = typeof CommonConnector
