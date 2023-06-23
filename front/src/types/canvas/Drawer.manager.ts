import {type IPosition} from '../../interfaces/Position.interface'
import {type TStateCanvas} from './State.canvas'
import {TServiceDrawer} from "../board/drawer/Service.drawer";
import {TDrawerOrNullify} from "../Drawer";

export type TDrawerManager =
  TStateCanvas &
  {
    findDrawer: (position: IPosition) => TDrawerOrNullify
    selectDrawer: (drawer: TServiceDrawer) => void
    clearSelectedDrawer: () => void
    updateHoverDrawer: (position: IPosition) => void
  }
