import { type TFactory } from '../../Factory'
import { type TConnectors } from '../../Connector'
import { type TLinkerBuilder, type TLinkers } from '../../Linker'
import { type TEntity } from '../../Entity'
import { type TConnectorBuilder } from './connectors/Connector.builder'

export interface TStateDrawer {
  context?: CanvasRenderingContext2D
  entity?: TEntity
  factory?: TFactory
  Linker?: TLinkerBuilder
  Connector?: TConnectorBuilder

  connectors: TConnectors
  linkers: TLinkers
}
