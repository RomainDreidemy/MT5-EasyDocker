import {ILink} from "../../../../interfaces/Link.interface";
import {TDrawer} from "../../../Drawer";

export type TStateLinker = {
  context?: CanvasRenderingContext2D,
  link?: ILink
  drawer?: TDrawer

  path: Path2D

  selected: boolean

  width: number
}
