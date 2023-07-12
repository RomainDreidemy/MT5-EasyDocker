import { type TServiceLinker } from './board/drawer/linkers/Service.linker'
import type CommonLinker from '../services/board/drawer/linkers/Common.linker'
import { type TNetworkLinker } from './board/drawer/linkers/Network.linker'
import { type TVolumeLinker } from './board/drawer/linkers/Volume.linker'
import {
  IServiceNetworkLinks,
  IServiceVolumeLinks,
} from "../interfaces/Service.interface";
import {Placements} from "../enums/placements";
import {TDrawer} from "./Drawer";

export type TLinker = TServiceLinker | TNetworkLinker | TVolumeLinker
export type TLinkerOrNullify = TLinker | undefined
export type TLinkers = TLinker[]
export type TLinkerBuilder = typeof CommonLinker

export type TLinkEntity = IServiceNetworkLinks & IServiceVolumeLinks

export type TLinkCreator = { id: string, placement: Placements, drawers: TDrawer[] }
