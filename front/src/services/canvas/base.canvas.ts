import WindowApp from "../apps/window.app";
import {IWidth} from "../../interfaces/Window.interface";

class BaseCanvas {
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D

  private contextId = '2d'

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
  }

  create() {
    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  }

  update() {
    this.updateContext()

    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  }

  refreshCanvas() {
    this.context.save();
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.restore();
  }

  updateContext() {
    this.context = this.canvas.getContext(this.contextId) as CanvasRenderingContext2D
  }

  setCanvasDimensions({width, height}: IWidth) {
    this.canvas.width = width
    this.canvas.height = height
  }

}

export default BaseCanvas
