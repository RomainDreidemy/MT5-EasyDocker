import { type TFactory } from '../../Factory'
import { type TConnectors } from '../../Connector'
import { type TLinkerBuilder, type TLinkers } from '../../Linker'
import { type TEntityOrCreate } from '../../Entity'
import { type TConnectorBuilder } from './connectors/Connector.builder'
import { type DrawerTypes } from '../../../enums/DrawerTypes'

export interface TStateDrawer {
  context?: CanvasRenderingContext2D
  entity?: TEntityOrCreate
  factory?: TFactory
  Linker?: TLinkerBuilder
  Connector?: TConnectorBuilder

  canBeLinkedWith: DrawerTypes[]
  type?: DrawerTypes

  connectors: TConnectors
  linkers: TLinkers
}
