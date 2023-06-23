import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import {INetwork} from "../../../interfaces/Network.interface";
import NetworkLinker from "./linkers/Network.linker";
import NetworkFactory from "./factories/Network.factory";
import NetworkConnector from "./connector/Network.connector";
import {TNetworkDrawer} from "../../../types/board/drawer/Network.drawer";

const NetworkDrawer = (network: INetwork, context: CanvasRenderingContext2D): TNetworkDrawer => {
  return {
    ...BaseDrawer,

    create() {
      this.entity = network
      this.context = context
      this.Linker = NetworkLinker

      this.factory = NetworkFactory()
      this.factory.create(network, context)

      this.Connector = ConnectorBuilder(this.factory, context, network, NetworkConnector)
    }
  }
}

export default NetworkDrawer
