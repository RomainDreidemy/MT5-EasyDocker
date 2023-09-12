import { type TStateFactory } from '../../../../types/board/drawer/factories/State.factory'
import {CanvasColor} from "../../../../enums/CanvasColor";

const width = 350
const height = 150

const StateFactory: TStateFactory = {
  path: new Path2D(),

  positionX: 20,
  positionY: 20,

  initialWidth: width,
  width: width,

  initialHeight: height,
  height: height,

  marginText: 20,
  topMarginTitle: 40,
  topMarginText: 60,

  backgroundColor: CanvasColor.DEFAULT_BACKGROUND,

  selected: false,
  onHover: false
}

export default StateFactory
