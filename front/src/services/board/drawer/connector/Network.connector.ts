import BaseConnector from './Base.connector'
import {type IPosition} from '../../../../interfaces/Position.interface'
import {TNetworkFactory} from "../../../../types/board/drawer/factories/Network.factory";
import {TNetworkConnector} from "../../../../types/board/drawer/connectors/Network.connector";

const NetworkConnector = (context: CanvasRenderingContext2D, factory: TNetworkFactory, position: IPosition): TNetworkConnector => {
  return {
    ...BaseConnector,

    create(): void {
      this.context = context
      this.factory = factory
      this.positionX = position.x
      this.positionY = position.y
      this.placement = position.placement!
    },
  }
}

export default NetworkConnector
