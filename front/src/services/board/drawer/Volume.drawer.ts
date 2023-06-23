import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import CommonConnector from "./connector/Common.connector";
import CommonLinker from "./linkers/Common.linker";
import {IVolume} from "../../../interfaces/Volume.interface";
import {TVolumeDrawer} from "../../../types/board/drawer/Volume.drawer";
import VolumeFactory from "./factories/Volume.factory";

const VolumeDrawer = (volume: IVolume, context: CanvasRenderingContext2D): TVolumeDrawer => {
  return {
    ...BaseDrawer,

    create() {
      this.entity = volume
      this.context = context
      this.Linker = CommonLinker

      this.factory = VolumeFactory()
      this.factory.create(volume, context)

      this.Connector = ConnectorBuilder(this.factory, context, volume, CommonConnector)
    }
  }
}

export default VolumeDrawer
