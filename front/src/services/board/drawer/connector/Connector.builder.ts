import { Placements } from '../../../../enums/placements'
import { type TConnectorBuilder } from '../../../../types/board/drawer/connectors/Connector.builder'
import { type TFactory } from '../../../../types/Factory'
import { type TCallableConnectors, type TConnector } from '../../../../types/Connector'
import { type TEntity } from '../../../../types/Entity'
import PlacementConnector from './Placement.connector'

const ConnectorBuilder = (
  factory: TFactory,
  context: CanvasRenderingContext2D,
  entity: TEntity,
  callableConnector: TCallableConnectors,
  offset: number = 0
): TConnectorBuilder => {
  return {
    create (): TConnector[] {
      const placements: Placements[] = [
        Placements.TOP,
        Placements.BOTTOM,
        Placements.LEFT,
        Placements.RIGHT
      ]

      return placements.map(this.constructor)
    },

    constructor (placement: Placements): TConnector {
      const position = PlacementConnector(factory, placement, offset)

      const connector = callableConnector(context, factory, position)
      connector.create()
      return connector
    }
  }
}

export default ConnectorBuilder
