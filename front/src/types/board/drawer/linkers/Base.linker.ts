import { type TStateLinker } from './State.linker'
import { type IPosition } from '../../../../interfaces/Position.interface'
import { type TCommonBases } from '../Common.bases'
import { type TConnector } from '../../../Connector'
import { type TLinkEntity } from '../../../Linker'

export type TBaseLinker =
  TCommonBases &
  TStateLinker &
  {
    update: (entity: TLinkEntity) => void
    isSelected: (Position: IPosition) => boolean
    drawArrow: (from: IPosition, at: IPosition) => void
    definePosition: (connector: TConnector, line: (x: number, y: number) => void) => void
  }
