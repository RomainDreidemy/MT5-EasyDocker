import { type ISize } from '../../interfaces/Window.interface'
import { type IPosition } from '../../interfaces/Position.interface'

export interface TBaseCanvas {
  scale: number
  position: IPosition
  canvas?: HTMLCanvasElement
  context?: CanvasRenderingContext2D
  create: (canvas: HTMLCanvasElement) => void
  update: () => void
  clearArea: () => void
  updateContext: () => void
  setCanvasDimensions: (size: ISize) => void
  sizeCanvas: () => void
  gradCursor: (add?: boolean) => void
  boundingClientPosition: (event: MouseEvent | WheelEvent) => IPosition
}
