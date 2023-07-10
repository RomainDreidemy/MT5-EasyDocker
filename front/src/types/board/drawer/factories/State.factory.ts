export interface TStateFactory {
  context?: CanvasRenderingContext2D

  path: Path2D

  positionX: number
  positionY: number
  width: number
  height: number

  name: string

  selected: boolean
  onHover: boolean
}
