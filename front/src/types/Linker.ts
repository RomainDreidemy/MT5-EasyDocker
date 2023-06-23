import { type TServiceLinker } from './board/drawer/linkers/Service.linker'
import type ServiceLinker from '../services/board/drawer/linkers/Service.linker'

export type TLinker = TServiceLinker
export type TLinkerOrNullify = TLinker | undefined
export type TLinkers = TLinker[]
export type TLinkerBuilder = typeof ServiceLinker
