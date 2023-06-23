import {TDrawer} from "../Drawer";
import {TLinker} from "../Linker";
import {TConnector} from "../Connector";

export interface TStateCanvas {
  drawers: TDrawer[]

  selectedLinker?: TLinker
  selectedDrawer?: TDrawer
  selectedConnector?: TConnector
  onHoverDrawer?: TDrawer

  isMoving: boolean
}
