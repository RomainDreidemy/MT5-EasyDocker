import BaseFactory from './Base.factory'
import {TNetworkFactory} from "../../../../types/board/drawer/factories/Network.factory";

const NetworkFactory = (): TNetworkFactory => {
  return {
    ...BaseFactory,

    name: 'Network',
  }
}

export default NetworkFactory
