import ServiceDrawer from "../board/drawer/service.drawer";
import {TDrawerManager} from "../../types/canvas/Drawer.manager";
import {IPosition} from "../../interfaces/Position.interface";
import StateCanvas from "./State.canvas";

export const DrawerManager: TDrawerManager = {
  ...StateCanvas,

  findDrawer(position: IPosition): ServiceDrawer | undefined {
    return this.drawers.find(service =>
      service.factory.isSelected(position))
  },

  clearSelectedDrawer(): void {
    if (this.selectedDrawer != null) {
      this.selectedDrawer.factory.selected = false
    }
    this.selectedDrawer = undefined
  },

  selectDrawer(drawer: ServiceDrawer): void {
    this.clearSelectedDrawer()
    this.selectedDrawer = drawer
    this.selectedDrawer.factory.selected = true
  },

  updateHoverDrawer(position: IPosition): void {
    const drawer = this.findDrawer(position)

    if (drawer != null) {
      this.onHoverDrawer = drawer
      this.onHoverDrawer.factory.onHover = true
    }
  }
}
