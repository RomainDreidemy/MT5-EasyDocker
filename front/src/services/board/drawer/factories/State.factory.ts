import { type TStateFactory } from '../../../../types/board/drawer/factories/State.factory'

const StateFactory: TStateFactory = {
  path: new Path2D(),

  positionX: 20,
  positionY: 20,
  width: 200,
  height: 120,

  marginText: 20,
  topMarginTitle: 40,
  topMarginText: 70,

  name: '',

  selected: false,
  onHover: false
}

export default StateFactory
