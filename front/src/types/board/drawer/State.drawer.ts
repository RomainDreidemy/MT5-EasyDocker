import { type TFactory } from '../../Factory'
import { type TConnectors } from '../../Connector'
import { type TLinkerBuilder, type TLinkers } from '../../Linker'
import { type TEntity } from '../../Entity'
import { type TConnectorBuilder } from './connectors/Connector.builder'
import { type DrawerTypes } from '../../../enums/DrawerTypes'

export interface TStateDrawer {
  context?: CanvasRenderingContext2D
  entity?: TEntity
  factory?: TFactory
  Linker?: TLinkerBuilder
  Connector?: TConnectorBuilder

  canBeLinkedWith: DrawerTypes[]

  connectors: TConnectors
  linkers: TLinkers
}
