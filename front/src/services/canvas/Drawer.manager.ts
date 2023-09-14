import { type TDrawerManager } from '../../types/canvas/Drawer.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import StateCanvas from './State.canvas'
import { type TDrawer, type TDrawerOrNullify } from '../../types/Drawer'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'
import { type EventListenerCallback } from '../../interfaces/EventListener.interface'

export const DrawerManager: TDrawerManager = {
  ...StateCanvas,

  findDrawer (position: IPosition): TDrawerOrNullify {
    return this.drawers.find(drawer =>
      drawer.factory!.isSelected(position))
  },

  clearSelectedDrawer (): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory!.selected = false
    }
    this.selectedDrawer = undefined

    eventEmitter.emit<EventListenerCallback<any>>(EventEmitters.ON_UNSELECTED_DRAWER)
  },

  clearOnHoverDrawer (): void {
    if (this.onHoverDrawer != null) {
      this.onHoverDrawer.factory!.onHover = false
    }
    this.onHoverDrawer = undefined
  },

  selectDrawer (drawer: TDrawer): void {
    this.clearSelectedDrawer()
    this.selectedDrawer = drawer
    this.selectedDrawer.factory!.selected = true
  },

  updateHoverDrawer (position: IPosition): void {
    const drawer = this.findDrawer(position)

    if (drawer != null) {
      const canBeLinked = this.selectedDrawer!.canBeLinkedWith.includes(drawer.type!)

      if (canBeLinked) {
        this.onHoverDrawer = drawer
        this.onHoverDrawer.factory!.onHover = true
      }
    } else {
      this.clearOnHoverDrawer()
    }
  },

  moveDrawersByPosition (deltaPosition: IPosition): void {
    this.drawers.forEach((drawer: TDrawer) => {
      const drawerPosition: IPosition = {
        x: drawer.factory!.positionX + deltaPosition.x,
        y: drawer.factory!.positionY + deltaPosition.y
      }

      drawer.factory?.updatePosition(drawerPosition)
    })
  }
}
