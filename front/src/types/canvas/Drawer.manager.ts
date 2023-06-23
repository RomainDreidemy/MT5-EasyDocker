import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceDrawer from '../../services/board/drawer/Service.drawer'
import { type TStateCanvas } from './State.canvas'

export type TDrawerManager =
  TStateCanvas &
  {
    findDrawer: (position: IPosition) => ServiceDrawer | undefined
    selectDrawer: (drawer: ServiceDrawer) => void
    clearSelectedDrawer: () => void
    updateHoverDrawer: (position: IPosition) => void
  }
