import { type TServiceDrawer } from './board/drawer/Service.drawer'
import {TNetworkDrawer} from "./board/drawer/Network.drawer";

export type TDrawer = TServiceDrawer | TNetworkDrawer
export type TDrawerOrNullify = TDrawer | undefined
export type TDrawers = TDrawer[]
