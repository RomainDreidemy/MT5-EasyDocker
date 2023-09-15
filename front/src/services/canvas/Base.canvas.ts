import WindowApp from '../apps/window.app'
import { type ISize } from '../../interfaces/Window.interface'
import { Contexts } from '../../enums/contexts'
import { type TBaseCanvas } from '../../types/canvas/Base.canvas'
import { CursorTypes } from '../../enums/CursorTypes'
import { type IPosition } from '../../interfaces/Position.interface'

const BaseCanvas: TBaseCanvas = {
  scale: 1,
  position: { x: 0, y: 0 },

  create (canvas: HTMLCanvasElement): void {
    this.canvas = canvas
    this.context = canvas.getContext(Contexts.ID_2D) as CanvasRenderingContext2D

    this.sizeCanvas()
  },

  scaleCanvas (): void {

  },

  sizeCanvas (): void {
    const dimensions: ISize = { width: this.context!.canvas.offsetWidth, height: this.context!.canvas.offsetHeight }

    this.setCanvasDimensions(dimensions)
  },

  update (): void {
    this.updateContext()

    const dimensions = WindowApp.dimensions()
    this.setCanvasDimensions(dimensions)
  },

  clearArea (): void {
    this.context!.setTransform(1, 0, 0, 1, 0, 0)
    this.context!.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
    this.context!.scale(this.scale, this.scale)
    this.context!.translate(this.position.x, this.position.y)
  },

  updateContext (): void {
    this.context = this.canvas?.getContext(Contexts.ID_2D) as CanvasRenderingContext2D
  },

  setCanvasDimensions ({ width, height }: ISize): void {
    this.canvas!.width = width
    this.canvas!.height = height
  },

  gradCursor (activate: boolean = false): void {
    activate
      ? this.canvas!.classList.add(CursorTypes.GRAB)
      : this.canvas!.classList.remove(CursorTypes.GRAB)
  },

  boundingClientPosition (event: MouseEvent | WheelEvent): IPosition {
    const rect: DOMRect = this.context!.canvas.getBoundingClientRect()

    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }
}

export default BaseCanvas
