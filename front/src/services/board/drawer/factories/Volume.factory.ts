import BaseFactory from './Base.factory'
import { type TVolumeFactory } from '../../../../types/board/drawer/factories/Volume.factory'
import {DrawerTypes} from "../../../../enums/DrawerTypes";

const VolumeFactory = (): TVolumeFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.VOLUME,
  }
}

export default VolumeFactory
