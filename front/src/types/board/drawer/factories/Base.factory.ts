import {type TStateFactory} from './State.factory'
import {type IPosition} from '../../../../interfaces/Position.interface'
import {type TCommonBases} from '../Common.bases'
import {TEntityOrCreate} from '../../../Entity'

export type TBaseFactory =
  Omit<TCommonBases & TStateFactory, 'create'>
  &
  {
    create: (entity: TEntityOrCreate, context: CanvasRenderingContext2D) => void
    position: (withOffset?: number) => IPosition
    isSelected: (position: IPosition) => boolean
    updatePosition: (position: IPosition) => void
  }
