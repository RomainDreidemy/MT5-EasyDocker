import { type ISize } from '../../interfaces/Window.interface'

export interface TBaseCanvas {
  canvas?: HTMLCanvasElement
  context?: CanvasRenderingContext2D
  create: (canvas: HTMLCanvasElement) => void
  update: () => void
  clearArea: () => void
  updateContext: () => void
  setCanvasDimensions: (size: ISize) => void
  sizeCanvas: () => void
}
