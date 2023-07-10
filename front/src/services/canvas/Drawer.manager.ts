import { type TDrawerManager } from '../../types/canvas/Drawer.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import StateCanvas from './State.canvas'
import { type TDrawer, type TDrawerOrNullify } from '../../types/Drawer'

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
  },

  clearOnHoverDrawer (): void {
    if (this.onHoverDrawer != null) {
      this.onHoverDrawer!.factory!.onHover = false
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
      const canBeLinked = this.selectedDrawer!.canBeLinkedWith.includes(drawer.factory!.type!)

      if (canBeLinked) {
        this.onHoverDrawer = drawer
        this.onHoverDrawer.factory!.onHover = true
      }
    } else {
      this.clearOnHoverDrawer()
    }
  }
}
