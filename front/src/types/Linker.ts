import {type TServiceLinker} from './board/drawer/linkers/Service.linker'
import type CommonLinker from '../services/board/drawer/linkers/Common.linker'
import {type TNetworkLinker} from './board/drawer/linkers/Network.linker'
import {type TVolumeLinker} from './board/drawer/linkers/Volume.linker'
import {type IServiceNetworkLinks, type IServiceVolumeLinks} from '../interfaces/Service.interface'
import {type Placements} from '../enums/placements'
import {type TDrawer} from './Drawer'

export type TLinker = TServiceLinker | TNetworkLinker | TVolumeLinker
export type TLinkerOrNullify = TLinker | undefined
export type TLinkers = TLinker[]
export type TLinkerBuilder = typeof CommonLinker

export type TLinkEntity = IServiceNetworkLinks & IServiceVolumeLinks

export interface TLinkCreator {
  id: string,
  placement: Placements,
  drawers: TDrawer[]
}

export type TLinkBodyConstructor = Omit<TLinkCreator, 'drawers'>
export interface TLinkBody { from: TLinkBodyConstructor, to: TLinkBodyConstructor }

