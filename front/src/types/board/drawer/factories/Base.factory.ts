import { type TStateFactory } from './State.factory'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'
import { type TDrawer } from '../../../Drawer'

export type TBaseFactory =
  Omit<TCommonBases & TStateFactory, 'create'>
  &
  {
    create: (drawer: TDrawer) => void
    position: (withOffset?: number) => IPosition
    isSelected: (position: IPosition) => boolean
    updatePosition: (position: IPosition) => void
    beforeDraw?: () => void
    afterDraw?: () => void
  }
