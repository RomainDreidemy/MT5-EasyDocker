import { type ILink } from '../../../../interfaces/Link.interface'
import { type TDrawer } from '../../../Drawer'
import { type TLinkEntity } from '../../../Linker'

export interface TStateLinker {
  context?: CanvasRenderingContext2D
  link?: ILink
  entity?: TLinkEntity
  drawer?: TDrawer

  path: Path2D

  selected: boolean

  offset: number
  width: number
  arrowSize: number
}
