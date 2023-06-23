import { type TDrawers } from '../TDrawer'
import { type TStateCanvas } from './State.Canvas'
import { type TBaseCanvas } from './Base.canvas'

export type TBaseManager =
  TBaseCanvas &
  TStateCanvas & {
    add: (...drawers: TDrawers) => void
    draw: () => void
    updateScreen: () => void
  }
