import { type TStateFactory } from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'

export type TBaseFactory =
  TCommonBases &
  TStateFactory &
  {
    isSelected: (Position: IPosition) => boolean
    updatePosition: (Position: IPosition) => void
  }
