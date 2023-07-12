import { Placements } from '../../../../enums/placements'
import { type TConnectorBuilder } from '../../../../types/board/drawer/connectors/Connector.builder'
import { type TCallableConnectors, type TConnector } from '../../../../types/Connector'
import PlacementConnector from './Placement.connector'
import { type TDrawer } from '../../../../types/Drawer'

const ConnectorBuilder = (
  drawer: TDrawer,
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
      const position = PlacementConnector(drawer.factory!, placement, offset)

      const connector = callableConnector(drawer, position)
      connector.create()
      return connector
    }
  }
}

export default ConnectorBuilder
