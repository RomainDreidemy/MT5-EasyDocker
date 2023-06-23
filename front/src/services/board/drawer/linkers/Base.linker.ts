import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TBaseLinker } from '../../../../types/board/drawer/linkers/Base.linker'
import StateLinker from './State.linker'
import CommonBases from '../Common.bases'

const BaseLinker: TBaseLinker = {
  ...CommonBases,
  ...StateLinker,

  isSelected ({ x, y }: IPosition): boolean {
    return this.context!.isPointInStroke(this.path, x, y)
  }
}

export default BaseLinker
