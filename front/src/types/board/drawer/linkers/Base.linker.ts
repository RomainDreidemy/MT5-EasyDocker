import { type TStateLinker } from './State.linker'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'
import { type TConnector } from '../../../Connector'

export type TBaseLinker =
  TCommonBases &
  TStateLinker &
  {
    isSelected: (Position: IPosition) => boolean
    definePosition: (connector: TConnector, line: (x: number, y: number) => void) => void
  }
