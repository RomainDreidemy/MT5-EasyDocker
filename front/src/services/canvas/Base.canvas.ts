import WindowApp from '../apps/window.app'
import { type ISize } from '../../interfaces/Window.interface'
import { Contexts } from '../../enums/contexts'
import { type TBaseCanvas } from '../../types/canvas/Base.canvas'
import { CursorTypes } from '../../enums/CursorTypes'

const BaseCanvas: TBaseCanvas = {
  create (canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.context = canvas.getContext(Contexts.ID_2D) as CanvasRenderingContext2D

    this.sizeCanvas()
  },

  sizeCanvas () {
    const dimensions: ISize = { width: this.context!.canvas.offsetWidth, height: this.context!.canvas.offsetHeight }

    this.setCanvasDimensions(dimensions)
  },

  update (): void {
    this.updateContext()

    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  },

  clearArea (): void {
    this.context?.setTransform(1, 0, 0, 1, 0, 0)
    this.context?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
  },

  updateContext (): void {
    this.context = this.canvas?.getContext(Contexts.ID_2D) as CanvasRenderingContext2D
  },

  setCanvasDimensions ({ width, height }: ISize): void {
    this.canvas!.width = width
    this.canvas!.height = height
  },

  gradCursor (add: boolean = false): void {
    add
      ? this.canvas!.classList.add(CursorTypes.GRAB)
      : this.canvas!.classList.remove(CursorTypes.GRAB)
  }
}

export default BaseCanvas
