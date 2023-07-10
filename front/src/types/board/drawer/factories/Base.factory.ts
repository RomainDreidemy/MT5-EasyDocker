import { type TStateFactory } from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'
import { type TEntity } from '../../../Entity'

export type TBaseFactory =
  Omit<TCommonBases & TStateFactory, 'create'>
  &
  {
    create: (entity: TEntity, context: CanvasRenderingContext2D) => void
    isSelected: (position: IPosition) => boolean
    updatePosition: (position: IPosition) => void
  }
