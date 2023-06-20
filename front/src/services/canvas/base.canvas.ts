import WindowApp from '../apps/window.app'
import { type IWidth } from '../../interfaces/Window.interface'

class BaseCanvas {
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D

  private readonly CONTEXT_ID = '2d'

  constructor (canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D
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

  refreshCanvas (): void {
    this.context.save()
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.restore()
  }

  updateContext (): void {
    this.context = this.canvas.getContext(this.CONTEXT_ID) as CanvasRenderingContext2D
  }

  setCanvasDimensions ({ width, height }: IWidth): void {
    this.canvas.width = width
    this.canvas.height = height
  }
}

export default BaseCanvas
