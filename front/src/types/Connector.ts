import type ServiceConnector from '../services/board/drawer/connector/Service.connector'
import { type TServiceConnector } from './board/drawer/connectors/Service.connector'
import NetworkConnector from "../services/board/drawer/connector/Network.connector";
import {TNetworkConnector} from "./board/drawer/connectors/Network.connector";

export type TConnector = TServiceConnector | TNetworkConnector
export type TConnectorOrNullify = TConnector | undefined
export type TConnectors = TConnector[]
export type TCallableConnectors = typeof ServiceConnector | typeof NetworkConnector
