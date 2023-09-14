import { type TStateLinker } from '../../../../types/board/drawer/linkers/State.linker'

const StateLinker: TStateLinker = {
  path: new Path2D(),

  selected: false,

  lineWidth: 2,
  offset: 5,
  arrowSize: 10
}

export default StateLinker
