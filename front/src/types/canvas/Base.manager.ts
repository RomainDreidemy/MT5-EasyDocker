import { type TDrawers } from '../Drawer'
import { type TStateCanvas } from './State.canvas'
import { type TBaseCanvas } from './Base.canvas'

export type TBaseManager =
  TBaseCanvas &
  TStateCanvas & {
    add: (...drawers: TDrawers) => void
    draw: () => void
    updateScreen: () => void
  }
