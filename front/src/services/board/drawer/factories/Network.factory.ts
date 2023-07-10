import BaseFactory from './Base.factory'
import { type TNetworkFactory } from '../../../../types/board/drawer/factories/Network.factory'

const NetworkFactory = (): TNetworkFactory => {
  return {
    ...BaseFactory,

    name: 'Network'
  }
}

export default NetworkFactory
