import { type TDrawerManager } from './Drawer.manager'
import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'

export type TWheelEventManager =
  TBaseManager &
  TDrawerManager &
  TLinkerManager &
  {
    interactionDebounce: number
    isInteracting: boolean
    interactionTimeout?: ReturnType<typeof setTimeout>
    finishedInteraction: () => void
    wheelStartup: () => void
    onInteraction: (event: WheelEvent) => void
    onZoom: (event: WheelEvent) => void
    onMove: (event: WheelEvent) => void
    handleInteraction: () => void
  }
