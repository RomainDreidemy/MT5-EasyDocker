import BaseFactory from './Base.factory'
import { type TVolumeFactory } from '../../../../types/board/drawer/factories/Volume.factory'

const VolumeFactory = (): TVolumeFactory => {
  return {
    ...BaseFactory,

    name: 'Volume'
  }
}

export default VolumeFactory
