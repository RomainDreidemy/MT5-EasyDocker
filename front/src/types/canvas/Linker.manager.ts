import { type TStateCanvas } from './State.Canvas'
import type ServiceDrawer from '../../services/board/drawer/service.drawer'
import type ServiceLinker from '../../services/board/drawer/linker/service.linker'
import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../../services/board/drawer/connector/service.connector'
import { type TConnectorManager } from './Connector.manager'
import { type TBaseManager } from './Base.manager'

export type TLinkerManager =
  TStateCanvas &
  TBaseManager &
  TConnectorManager &
  {
    drawConnectorLine: (connector: ServiceConnector, position: IPosition) => void
    deleteLinker: (drawer: ServiceDrawer, linkerToRemove: ServiceLinker) => void
    findLinker: (position: IPosition) => ServiceLinker | undefined
    selectLinker: (linker: ServiceLinker) => void
    createLink: (position: IPosition) => void
    onSelectDrawer: (selected: boolean) => void
    clearSelectedLinker: () => void
  }
