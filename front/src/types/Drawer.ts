import { type TServiceDrawer } from './board/drawer/Service.drawer'
import {TNetworkDrawer} from "./board/drawer/Network.drawer";
import {TVolumeDrawer} from "./board/drawer/Volume.drawer";

export type TDrawer = TServiceDrawer | TNetworkDrawer | TVolumeDrawer
export type TDrawerOrNullify = TDrawer | undefined
export type TDrawers = TDrawer[]
