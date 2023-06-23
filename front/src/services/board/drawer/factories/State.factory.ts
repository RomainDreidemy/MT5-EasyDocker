import { type TStateFactory } from '../../../../types/board/drawer/factories/State.factory'

const StateFactory: TStateFactory = {
  path: new Path2D(),

  positionX: 20,
  positionY: 20,
  width: 150,
  height: 100,

  selected: false,
  onHover: false
}

export default StateFactory
