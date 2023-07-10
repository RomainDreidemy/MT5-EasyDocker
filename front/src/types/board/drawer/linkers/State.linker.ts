import { type ILink } from '../../../../interfaces/Link.interface'
import { type TDrawer } from '../../../Drawer'

export interface TStateLinker {
  context?: CanvasRenderingContext2D
  link?: ILink
  drawer?: TDrawer

  path: Path2D

  selected: boolean

  offset: number
  width: number
}
