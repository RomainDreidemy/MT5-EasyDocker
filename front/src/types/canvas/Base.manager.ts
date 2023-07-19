import { type TDrawer, type TDrawers } from '../Drawer'
import { type TStateCanvas } from './State.canvas'
import { type TBaseCanvas } from './Base.canvas'
import { type TDrawerManager } from './Drawer.manager'
import { type IPosition } from '../../interfaces/Position.interface'

export type TBaseManager =
  TBaseCanvas &
  TStateCanvas &
  TDrawerManager & {
    add: (...drawers: TDrawers) => void
    addAndSelectNewDrawer: (drawer: TDrawer) => void
    draw: () => void
    updateScreen: () => void
    emptyPosition: () => IPosition
    deleteDrawer: (drawer: TDrawer) => void
    deleteLinkers: (drawer: TDrawer) => void
  }
