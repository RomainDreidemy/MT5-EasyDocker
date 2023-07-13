import { type TBaseManager } from '../../types/canvas/Base.manager'
import { type TDrawer, type TDrawers } from '../../types/Drawer'
import BaseCanvas from './Base.canvas'
import StateCanvas from './State.canvas'
import { DrawerManager } from './Drawer.manager'
import eventEmitter from '../apps/Event.emitter'
import { EventEmitters } from '../../enums/eventEmitters'

const BaseManager: TBaseManager = {
  ...BaseCanvas,
  ...StateCanvas,
  ...DrawerManager,

  add (...drawers: TDrawers): void {
    this.drawers.push(...drawers)
  },

  deleteDrawer (drawer: TDrawer): void {
    this.drawers = this.drawers.filter(d => d !== drawer)
    this.updateScreen()
  },

  addAndSelectNewDrawer (drawer: TDrawer): void {
    this.drawers.push(drawer)
    this.selectDrawer(drawer)
    this.updateScreen()

    eventEmitter.emit(EventEmitters.ON_SELECTED_DRAWER, drawer)
  },

  draw (): void {
    this.drawers.forEach(drawer => {
      drawer.draw()
    })
  },

  updateScreen (): void {
    this.clearArea()
    this.draw()
  }
}

export default BaseManager
