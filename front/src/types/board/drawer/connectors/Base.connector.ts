import { type TStateConnector } from './State.connector'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'

export type TBaseConnector =
  TCommonBases &
  TStateConnector &
  {
    isSelected: (Position: IPosition) => boolean
  }
