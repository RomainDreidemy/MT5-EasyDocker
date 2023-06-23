import { type TStateLinker } from './State.linker'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'

export type TBaseLinker =
  TCommonBases &
  TStateLinker &
  {
    isSelected: (Position: IPosition) => boolean
  }
