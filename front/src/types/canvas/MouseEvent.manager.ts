import { type IPosition } from '../../interfaces/Position.interface'
import { type TDrawerManager } from './Drawer.manager'
import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'
import { type TDrawer } from '../Drawer'
import { type TConnectorOrNullify } from '../Connector'

export type TMouseEventManager =
  TBaseManager &
  TDrawerManager &
  TLinkerManager &
  {
    mouseStartup: () => void
    handleMouseDown: (event: MouseEvent) => void
    handleMouseUp: (event: MouseEvent) => void
    handleMouseMove: (event: MouseEvent) => void
    handleMouseUpOnLinker: (drawer: TDrawer, position: IPosition) => TConnectorOrNullify
    boundingClientPosition: (event: MouseEvent) => IPosition
  }
