import { type DrawerTypes } from '../../../../enums/DrawerTypes'

export interface TStateFactory {
  context?: CanvasRenderingContext2D

  path: Path2D

  positionX: number
  positionY: number
  width: number
  height: number

  marginText: number,
  topMarginTitle: number,
  topMarginText: number,

  name: string

  selected: boolean
  onHover: boolean
  type?: DrawerTypes
}
