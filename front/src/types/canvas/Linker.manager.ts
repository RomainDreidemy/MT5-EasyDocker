import {type TStateCanvas} from './State.canvas'
import {type IPosition} from '../../interfaces/Position.interface'
import {type TConnectorManager} from './Connector.manager'
import {type TBaseManager} from './Base.manager'
import {TConnector} from "../Connector";
import {TDrawer} from "../Drawer";
import {TLinker} from "../Linker";

export type TLinkerManager =
  TStateCanvas &
  TBaseManager &
  TConnectorManager &
  {
    drawConnectorLine: (connector: TConnector, position: IPosition) => void
    deleteLinker: (drawer: TDrawer, linkerToRemove: TLinker) => void
    findLinker: (position: IPosition) => TLinker | undefined
    selectLinker: (linker: TLinker) => void
    createLink: (position: IPosition) => void
    onSelectDrawer: (selected: boolean) => void
    clearSelectedLinker: () => void
  }
