import { type TStateLinker } from '../../../../types/board/drawer/linkers/State.linker'

const StateLinker: TStateLinker = {
  path: new Path2D(),

  selected: false,

  width: 2,
  offset: 5,
}

export default StateLinker
