import {IPosition} from "../../interfaces/Position.interface";
import ServiceDrawer from "../../services/board/drawer/service.drawer";
import {TStateCanvas} from "./State.Canvas";

export type TDrawerManager =
  TStateCanvas &
  {
    findDrawer: (position: IPosition) => ServiceDrawer | undefined,
    selectDrawer: (drawer: ServiceDrawer) => void,
    clearSelectedDrawer: () => void,
    updateHoverDrawer: (position: IPosition) => void,
  }