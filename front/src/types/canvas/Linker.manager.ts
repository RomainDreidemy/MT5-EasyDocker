import {TStateCanvas} from "./State.Canvas";
import ServiceDrawer from "../../services/board/drawer/service.drawer";
import ServiceLinker from "../../services/board/drawer/linker/service.linker";
import {IPosition} from "../../interfaces/Position.interface";
import ServiceConnector from "../../services/board/drawer/connector/service.connector";
import {TConnectorManager} from "./Connector.manager";
import {TBaseManager} from "./Base.manager";

export type TLinkerManager =
  TStateCanvas &
  TBaseManager &
  TConnectorManager &
  {
    drawConnectorLine: (connector: ServiceConnector, position: IPosition) => void
    deleteLinker: (drawer: ServiceDrawer, linkerToRemove: ServiceLinker) => void,
    findLinker: (position: IPosition) => ServiceLinker | undefined
    selectLinker: (linker: ServiceLinker) => void
    createLink: (position: IPosition) => void
    onSelectDrawer: (selected: boolean) => void
    clearSelectedLinker: () => void
  }
