import { type TConnectorManager } from '../../types/canvas/Connector.manager'
import { type IPosition } from '../../interfaces/Position.interface'
import StateCanvas from './State.canvas'
import { type TConnectorOrNullify } from '../../types/Connector'

export const ConnectorManager: TConnectorManager = {
  ...StateCanvas,

  findConnector (position: IPosition): TConnectorOrNullify {
    return this.drawers
      .flatMap(drawers => drawers.connectors)
      .find(connector => connector.isSelected(position))
  }
}
