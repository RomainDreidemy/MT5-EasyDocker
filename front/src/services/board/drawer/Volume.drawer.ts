import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import CommonConnector from './connector/Common.connector'
import CommonLinker from './linkers/Common.linker'
import { type IVolume } from '../../../interfaces/Volume.interface'
import { type TVolumeDrawer } from '../../../types/board/drawer/Volume.drawer'
import VolumeFactory from './factories/Volume.factory'
import { DrawerTypes } from '../../../enums/DrawerTypes'

const VolumeDrawer = (volume: IVolume, context: CanvasRenderingContext2D): TVolumeDrawer => {
  return {
    ...BaseDrawer(),

    canBeLinkedWith: [DrawerTypes.SERVICE],
    type: DrawerTypes.VOLUME,

    create () {
      this.entity = volume
      this.context = context
      this.Linker = CommonLinker

      this.factory = VolumeFactory()
      this.factory.create(volume, context)

      this.Connector = ConnectorBuilder(this.factory, context, volume, CommonConnector)
      this.createConnectors()
    }
  }
}

export default VolumeDrawer
