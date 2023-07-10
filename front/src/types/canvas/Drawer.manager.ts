import { type IPosition } from '../../interfaces/Position.interface'
import { type TStateCanvas } from './State.canvas'
import { type TServiceDrawer } from '../board/drawer/Service.drawer'
import { type TDrawerOrNullify } from '../Drawer'

export type TDrawerManager =
  TStateCanvas &
  {
    findDrawer: (position: IPosition) => TDrawerOrNullify
    selectDrawer: (drawer: TServiceDrawer) => void
    clearSelectedDrawer: () => void
    clearOnHoverDrawer: () => void
    updateHoverDrawer: (position: IPosition) => void
  }
