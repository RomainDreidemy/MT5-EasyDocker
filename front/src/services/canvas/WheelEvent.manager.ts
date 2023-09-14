import { Events } from '../../enums/events'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { DrawerManager } from './Drawer.manager'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'
import { InteractionType, type TWheelEventManager } from '../../types/canvas/WheelEvent.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import { type EventListenerCallback } from '../../interfaces/EventListener.interface'
import { type TDrawer } from '../../types/Drawer'

const WheelEventManager: TWheelEventManager = {
  ...BaseManager,
  ...LinkerManager,
  ...DrawerManager,

  isInteracting: false,
  interactionDebounce: 250,
  moveThreshold: 5,
  interactionType: InteractionType.MOVE,

  wheelStartup (): void {
    this.canvas!.addEventListener(Events.WHEEL, (event: WheelEvent): void => {
      this.onWheel(event)
    }, { passive: false })
  },

  onWheel (event: WheelEvent) {
    if (!this.isInteracting) this.isInteracting = true

    this.onInteraction(event)
    this.handleInteraction()

    event.preventDefault()
  },

  handleInteraction (): void {
    if (this.interactionTimeout !== null) {
      clearTimeout(this.interactionTimeout)
    }

    this.interactionTimeout = setTimeout(() => {
      this.finishedInteraction()
    }, this.interactionDebounce)
  },

  finishedInteraction (): void {
    this.isInteracting = false
    this.interactionTimeout = undefined
    this.gradCursor(false)

    eventEmitter.emit<EventListenerCallback<TDrawer[]>>(EventEmitters.ON_MOVED_DRAWERS)
  },

  onInteraction (event: WheelEvent) {
    if (!this.interactionType) return

    switch (this.interactionType) {
      case InteractionType.MOVE:
        this.onMove(event)
        break
      case InteractionType.ZOOM:
        this.onZoom(event)
        break
    }

    this.updateScreen()
  },

  onMove (event: WheelEvent) {
    this.gradCursor(true)
    const delta: IPosition = { x: event.deltaX, y: event.deltaY }

    this.moveDrawersByPosition(delta)
  },

  onZoom (event: WheelEvent) {
    if (event.deltaY < 0) {
      const newScale = Math.min(5, this.scale * 1.1) // ZOOM IN

      if (newScale < 1) {
        this.scale = newScale
      }
    } else {
      const newScale = Math.max(0.1, this.scale * (1 / 1.1)) // ZOOM OUT

      if (newScale > 0.3) {
        this.scale = newScale
      }
    }
  }
}

export default WheelEventManager
