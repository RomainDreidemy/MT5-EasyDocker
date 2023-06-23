import {type IPosition} from '../../interfaces/Position.interface'
import {type TStateCanvas} from './State.canvas'
import {TServiceDrawer} from "../board/drawer/Service.drawer";

export type TDrawerManager =
  TStateCanvas &
  {
    findDrawer: (position: IPosition) => TServiceDrawer | undefined
    selectDrawer: (drawer: TServiceDrawer) => void
    clearSelectedDrawer: () => void
    updateHoverDrawer: (position: IPosition) => void
  }
