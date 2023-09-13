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
    })
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
    const delta = event.deltaY > 0 ? 0.9 : 1.1

    if (delta === 0.9) {
      if (this.scale > 0.5) {
        this.scale *= delta
      }
    } else {
      if (this.scale < 1) {
        this.scale *= delta
      }
    }

    // this.drawers.forEach((drawer: TDrawer) => {
    //   const drawerPosition: IPosition = {
    //     x: drawer.factory!.positionX + event.deltaX,
    //     y: drawer.factory!.positionY + event.deltaY
    //   }
    //
    //   drawer.factory?.updatePosition(drawerPosition)
    // })
    this.updateScreen()
  }
}

export default WheelEventManager
