import {type IService} from '../../../interfaces/Service.interface'
import ServiceFactory from './factories/service.factory'
import {TServiceDrawer} from "../../../types/board/drawer/Service.drawer";
import BaseDrawer from "./Base.drawer";
import ConnectorBuilder from "./connector/connector.builder";
import ServiceLinker from "./linker/service.linker";

const ServiceDrawer = (service: IService, context: CanvasRenderingContext2D): TServiceDrawer => {
  return {
    ...BaseDrawer,

    create() {
      this.entity = service
      this.context = context
      this.Linker = ServiceLinker
      this.Connector = ConnectorBuilder
      this.factory = new ServiceFactory(service, context)
    },
  }
}

export default ServiceDrawer
