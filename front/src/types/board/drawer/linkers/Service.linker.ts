import { type TBaseLinker } from './Base.linker'
import { type TConnector } from '../../../Connector'

export type TServiceLinker =
  TBaseLinker & {
    definePosition: (connector: TConnector, line: (x: number, y: number) => void) => void
  }
