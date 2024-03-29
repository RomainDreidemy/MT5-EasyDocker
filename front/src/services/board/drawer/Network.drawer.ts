import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import NetworkFactory from './factories/Network.factory'
import { type TNetworkDrawer } from '../../../types/board/drawer/Network.drawer'
import CommonConnector from './connector/Common.connector'
import CommonLinker from './linkers/Common.linker'
import { DrawerTypes } from '../../../enums/DrawerTypes'
import { type TEntityOrCreate } from '../../../types/Entity'

const NetworkDrawer = (network: TEntityOrCreate, context: CanvasRenderingContext2D): TNetworkDrawer => {
  return {
    ...BaseDrawer(),

    canBeLinkedWith: [DrawerTypes.SERVICE],
    type: DrawerTypes.NETWORK,

    create () {
      this.entity = network
      this.context = context
      this.Linker = CommonLinker

      this.factory = NetworkFactory()
      this.factory.create(this)

      this.Connector = ConnectorBuilder(this, CommonConnector)
      this.createConnectors()
    }
  }
}

export default NetworkDrawer
