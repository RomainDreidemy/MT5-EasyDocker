import BaseFactory from './Base.factory'
import { type TNetworkFactory } from '../../../../types/board/drawer/factories/Network.factory'
import { DrawerTypes } from '../../../../enums/DrawerTypes'

const NetworkFactory = (): TNetworkFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.NETWORK,
    backgroundColor: '#304570',
    titleColor: '#ffffff'
  }
}

export default NetworkFactory
