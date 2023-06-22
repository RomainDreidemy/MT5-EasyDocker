import ServiceDrawer from "../../services/board/drawer/service.drawer";
import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../../services/board/drawer/connector/service.connector";
import {TDrawerManager} from "./Drawer.manager";
import {TBaseManager} from "./Base.manager";
import {TLinkerManager} from "./Linker.manager";

export type TMouseEventManager =
  TBaseManager &
  TDrawerManager &
  TLinkerManager &
  {
    mouseStartup: () => void,
    handleMouseUp: (event: MouseEvent) => void,
    handleMouseMove: (event: MouseEvent) => void,
    handleMouseDown: (event: MouseEvent) => void,
    handleKeyDown: (event: KeyboardEvent) => void,
    handleMouseUpOnLinker: (drawer: ServiceDrawer, position: IPosition) => ServiceConnector | undefined
  }