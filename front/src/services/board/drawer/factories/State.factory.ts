import { type TStateFactory } from '../../../../types/board/drawer/factories/State.factory'
import {CanvasColor} from "../../../../enums/CanvasColor";

const height = 150

const StateFactory: TStateFactory = {
  path: new Path2D(),

  positionX: 20,
  positionY: 20,

  width: 250,

  initialHeight: height,
  height: height,

  marginText: 20,
  topMarginTitle: 40,
  topMarginText: 60,

  backgroundColor: CanvasColor.DEFAULT_BACKGROUND,
  borderColor: CanvasColor.BORDER,
  titleColor: CanvasColor.TITLE,
  textColor: CanvasColor.TEXT,
  selectedColor: CanvasColor.SELECTED,
  onHoverColor: CanvasColor.ON_HOVER,

  selected: false,
  onHover: false
}

export default StateFactory
