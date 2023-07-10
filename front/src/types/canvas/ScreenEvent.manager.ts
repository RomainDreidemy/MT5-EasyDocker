import { type IPosition } from '../../interfaces/Position.interface'
import { type TDrawerManager } from './Drawer.manager'
import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'
import { type TDrawer } from '../Drawer'
import { type TConnectorOrNullify } from '../Connector'

export type TScreenEventManager =
  TBaseManager &
  {
      screenStartup: () => void
  }
