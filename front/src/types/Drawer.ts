import { type TServiceDrawer } from './board/drawer/Service.drawer'
import { type TNetworkDrawer } from './board/drawer/Network.drawer'
import { type TVolumeDrawer } from './board/drawer/Volume.drawer'

export type TDrawer = TServiceDrawer | TNetworkDrawer | TVolumeDrawer
export type TDrawerOrNullify = TDrawer | undefined
export type TDrawers = TDrawer[]

export type DrawerCreator<T> = (item: T, context: CanvasRenderingContext2D) => TServiceDrawer;
