import type ServiceDrawer from '../../services/board/drawer/Service.drawer'
import { type IPosition } from '../../interfaces/Position.interface'
import type ServiceConnector from '../../services/board/drawer/connector/Service.connector'
import { type TDrawerManager } from './Drawer.manager'
import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'

export type TMouseEventManager =
  TBaseManager &
  TDrawerManager &
  TLinkerManager &
  {
    mouseStartup: () => void
    handleMouseDown: (event: MouseEvent) => void
    handleMouseUp: (event: MouseEvent) => void
    handleMouseMove: (event: MouseEvent) => void
    handleMouseUpOnLinker: (drawer: ServiceDrawer, position: IPosition) => ServiceConnector | undefined
  }
