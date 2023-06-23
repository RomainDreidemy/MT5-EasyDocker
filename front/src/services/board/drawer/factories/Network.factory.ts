import BaseFactory from './Base.factory'
import {INetwork} from "../../../../interfaces/Network.interface";
import {TNetworkFactory} from "../../../../types/board/drawer/factories/Network.factory";

const NetworkFactory = (network: INetwork, context: CanvasRenderingContext2D): TNetworkFactory => {
  return {
    ...BaseFactory,

    create(): void {
      this.context = context
      this.positionX = isNaN(network.positionX) ? this.positionX : network.positionX
      this.positionY = isNaN(network.positionY) ? this.positionY : network.positionY
    },
  }
}

export default NetworkFactory
