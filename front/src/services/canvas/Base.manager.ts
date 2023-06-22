import {TBaseManager} from "../../types/canvas/Base.manager";
import {Drawers} from "../../types/Drawer";
import BaseCanvas from "./Base.canvas";
import StateCanvas from "./State.canvas";

const BaseManager: TBaseManager = {
  ...BaseCanvas,
  ...StateCanvas,

  add (...drawers: Drawers): void {
    this.drawers.push(...drawers)
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