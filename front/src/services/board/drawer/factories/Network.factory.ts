import BaseFactory from './Base.factory'
import {type TNetworkFactory} from '../../../../types/board/drawer/factories/Network.factory'
import {DrawerTypes} from '../../../../enums/DrawerTypes'
import {CanvasColor} from "../../../../enums/CanvasColor";

const NetworkFactory = (): TNetworkFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.NETWORK,
    backgroundColor: '#e7f5f1'
  }
}

export default NetworkFactory
