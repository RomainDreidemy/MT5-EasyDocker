import WindowApp from '../apps/window.app'
import { type IWidth } from '../../interfaces/Window.interface'
import {Contexts} from "../../enums/contexts";

class BaseCanvas {
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext(Contexts.ID_2D) as CanvasRenderingContext2D
  }

  create (): void {
    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  }

  update (): void {
    this.updateContext()

    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  }

  clearArea (): void {
    this.context.setTransform(1, 0, 0, 1, 0, 0)
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.width)
  }

  updateContext (): void {
    this.context = this.canvas.getContext(Contexts.ID_2D) as CanvasRenderingContext2D
  }

  setCanvasDimensions ({ width, height }: IWidth): void {
    this.canvas.width = width
    this.canvas.height = height
  }
}

export default BaseCanvas
