import BaseFactory from './Base.factory'
import { type TNetworkFactory } from '../../../../types/board/drawer/factories/Network.factory'
import {DrawerTypes} from "../../../../enums/DrawerTypes";

const NetworkFactory = (): TNetworkFactory => {
  return {
    ...BaseFactory,

    name: 'Network',
    type: DrawerTypes.NETWORK
  }
}

export default NetworkFactory
