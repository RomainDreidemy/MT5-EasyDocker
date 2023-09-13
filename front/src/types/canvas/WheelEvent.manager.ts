import { type TDrawerManager } from './Drawer.manager'
import { type TBaseManager } from './Base.manager'
import { type TLinkerManager } from './Linker.manager'

export enum InteractionType {
  MOVE = 'move',
  ZOOM = 'zoom'
}

export type TWheelEventManager =
  TBaseManager &
  TDrawerManager &
  TLinkerManager &
  {
    interactionType?: InteractionType
    interactionDebounce: number
    moveThreshold: number
    isInteracting: boolean
    interactionTimeout?: ReturnType<typeof setTimeout>
    finishedInteraction: () => void
    wheelStartup: () => void
    onWheel: (event: WheelEvent) => void
    onInteraction: (event: WheelEvent) => void
    onZoom: (event: WheelEvent) => void
    onMove: (event: WheelEvent) => void
    handleInteraction: () => void
  }
