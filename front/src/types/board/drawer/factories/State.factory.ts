import { type DrawerTypes } from '../../../../enums/DrawerTypes'
import { type CanvasColor } from '../../../../enums/CanvasColor'
import { type TDrawer } from '../../../Drawer'

export interface TStateFactory {
  drawer?: TDrawer

  path: Path2D

  positionX: number
  positionY: number
  width: number
  initialHeight: number
  height: number

  marginText: number
  topMarginTitle: number
  topMarginText: number

  backgroundColor: CanvasColor | string
  borderColor: CanvasColor | string
  selectedColor: CanvasColor | string
  titleColor: CanvasColor | string
  textColor: CanvasColor | string
  onHoverColor: CanvasColor | string

  selected: boolean
  onHover: boolean
  type?: DrawerTypes
}
