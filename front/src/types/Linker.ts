import {type TServiceLinker} from './board/drawer/linkers/Service.linker'
import CommonLinker from "../services/board/drawer/linkers/Common.linker";
import {TNetworkLinker} from "./board/drawer/linkers/Network.linker";
import {TVolumeLinker} from "./board/drawer/linkers/Volume.linker";

export type TLinker = TServiceLinker | TNetworkLinker | TVolumeLinker
export type TLinkerOrNullify = TLinker | undefined
export type TLinkers = TLinker[]
export type TLinkerBuilder = typeof CommonLinker
