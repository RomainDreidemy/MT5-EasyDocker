import { type TServiceFactory } from './board/drawer/factories/Service.factory'
import {TNetworkFactory} from "./board/drawer/factories/Network.factory";
import {TVolumeFactory} from "./board/drawer/factories/Volume.factory";

export type TFactory = TServiceFactory | TNetworkFactory | TVolumeFactory
