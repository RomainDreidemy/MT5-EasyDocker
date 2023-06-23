import { type TDrawerManager } from '../../types/canvas/Drawer.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import StateCanvas from './State.canvas'
import { type TDrawer, type TDrawerOrNullify } from '../../types/Drawer'

export const DrawerManager: TDrawerManager = {
  ...StateCanvas,

  findDrawer (position: IPosition): TDrawerOrNullify {
    return this.drawers.find(service =>
      service.factory.isSelected(position))
  },

  clearSelectedDrawer (): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = false
    }
    this.selectedDrawer = undefined
  },

  selectDrawer (drawer: TDrawer): void {
    this.clearSelectedDrawer()
    this.selectedDrawer = drawer
    this.selectedDrawer.factory.selected = true
  },

  updateHoverDrawer (position: IPosition): void {
    const drawer = this.findDrawer(position)

    if (drawer != null) {
      this.onHoverDrawer = drawer
      this.onHoverDrawer.factory.onHover = true
    }
  }
}
