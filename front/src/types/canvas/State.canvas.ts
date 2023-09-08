import { type TDrawer } from '../Drawer'
import { type TLinker } from '../Linker'
import { type TConnector } from '../Connector'
import { type IPosition } from '../../interfaces/Position.interface'

export interface TStateCanvas {
  drawers: TDrawer[]

  selectedLinker?: TLinker
  selectedDrawer?: TDrawer
  selectedConnector?: TConnector
  onHoverDrawer?: TDrawer

  mouseDebounce: number
  mouseClickPosition?: IPosition

  initialDrawerPosition?: IPosition
  isMoving: boolean
  onDrawerClickOffset?: IPosition
}
