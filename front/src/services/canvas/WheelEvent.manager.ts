import { Events } from '../../enums/events'
import BaseManager from './Base.manager'
import LinkerManager from './Linker.manager'
import { DrawerManager } from './Drawer.manager'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'
import { type TWheelEventManager } from '../../types/canvas/WheelEvent.manager'
import { type TDrawer } from '../../types/Drawer'
import { type IPosition } from '../../interfaces/Position.interface'

const WheelEventManager: TWheelEventManager = {
  ...BaseManager,
  ...LinkerManager,
  ...DrawerManager,

  isInteracting: false,
  interactionDebounce: 500,

  wheelStartup (): void {
    this.canvas!.addEventListener(Events.WHEEL, (event: WheelEvent) => {
      if (!this.isInteracting) this.isInteracting = true

      this.onInteraction(event)
      this.handleInteraction()
    }, { passive: false })
  },

  handleInteraction (): void {
    if (this.interactionTimeout !== null) {
      clearTimeout(this.interactionTimeout)
    }

    this.interactionTimeout = setTimeout(this.finishedInteraction, this.interactionDebounce)
  },

  finishedInteraction (): void {
    this.isInteracting = false
    this.interactionTimeout = undefined

    eventEmitter.emit(EventEmitters.ON_MOVED_DRAWERS)
  },

  onInteraction (event: WheelEvent) {
    event.preventDefault()

    // if (Math.abs(event.deltaY) < 25) {
    // } else {
    // }
    this.onZoom(event)
    // this.onMove(event)

    this.updateScreen()
  },

  onMove (event: WheelEvent) {
    this.drawers.forEach((drawer: TDrawer) => {
      const drawerPosition: IPosition = {
        x: drawer.factory!.positionX + event.deltaX,
        y: drawer.factory!.positionY + event.deltaY
      }

      drawer.factory?.updatePosition(drawerPosition)
    })
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
