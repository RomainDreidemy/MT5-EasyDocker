import { type TServiceFactory } from './board/drawer/factories/Service.factory'
import {TNetworkFactory} from "./board/drawer/factories/Network.factory";

export type TFactory = TServiceFactory | TNetworkFactory
