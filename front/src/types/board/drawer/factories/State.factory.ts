import { type DrawerTypes } from '../../../../enums/DrawerTypes'
import {CanvasColor} from "../../../../enums/CanvasColor";
import {TEntity} from "../../../Entity";
import {TDrawer} from "../../../Drawer";

export interface TStateFactory {
  drawer?: TDrawer

  path: Path2D

  positionX: number
  positionY: number
  initialWidth: number
  width: number
  initialHeight: number
  height: number

  marginText: number
  topMarginTitle: number
  topMarginText: number

  backgroundColor: CanvasColor | string

  selected: boolean
  onHover: boolean
  type?: DrawerTypes
}
