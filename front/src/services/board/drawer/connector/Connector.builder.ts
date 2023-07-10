import { type IPosition } from '../../../../interfaces/Position.interface'
import { Placements } from '../../../../enums/placements'
import { type TConnectorBuilder } from '../../../../types/board/drawer/connectors/Connector.builder'
import { type TFactory } from '../../../../types/Factory'
import { type TCallableConnectors, type TConnector } from '../../../../types/Connector'
import { type TEntity } from '../../../../types/Entity'

const ConnectorBuilder = (
  factory: TFactory,
  context: CanvasRenderingContext2D,
  entity: TEntity,
  callableConnector: TCallableConnectors,
  offset: number = 0
): TConnectorBuilder => {
  return {
    create (): TConnector[] {
      const positions: IPosition[] = [
        {
          placement: Placements.TOP,
          x: factory.positionX + factory.width / 2,
          y: factory.positionY - offset
        },
        {
          placement: Placements.BOTTOM,
          x: factory.positionX + factory.width / 2,
          y: factory.positionY + factory.height + offset
        },
        {
          placement: Placements.LEFT,
          x: factory.positionX - offset,
          y: factory.positionY + factory.height / 2
        },
        {
          placement: Placements.RIGHT,
          x: factory.positionX + factory.width + offset,
          y: factory.positionY + factory.height / 2
        }
      ]

      return positions.map(this.constructor)
    },

    constructor (position: IPosition): TConnector {
      const connector = callableConnector(context, factory, position)
      connector.create()
      return connector
    }
  }
}

export default ConnectorBuilder
