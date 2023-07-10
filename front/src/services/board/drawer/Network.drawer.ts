import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import { type INetwork } from '../../../interfaces/Network.interface'
import NetworkFactory from './factories/Network.factory'
import { type TNetworkDrawer } from '../../../types/board/drawer/Network.drawer'
import CommonConnector from './connector/Common.connector'
import CommonLinker from './linkers/Common.linker'
import { DrawerTypes } from '../../../enums/DrawerTypes'

const NetworkDrawer = (network: INetwork, context: CanvasRenderingContext2D): TNetworkDrawer => {
  return {
    ...BaseDrawer,

    canBeLinkedWith: [DrawerTypes.VOLUME],
    type: DrawerTypes.NETWORK,

    create () {
      this.entity = network
      this.context = context
      this.Linker = CommonLinker

      this.factory = NetworkFactory()
      this.factory.create(network, context)

      this.Connector = ConnectorBuilder(this.factory, context, network, CommonConnector)
    }
  }
}

export default NetworkDrawer
