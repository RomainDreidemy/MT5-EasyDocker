import {type IService} from '../../../interfaces/Service.interface'
import ServiceFactory from './factories/Service.factory'
import {TServiceDrawer} from "../../../types/board/drawer/Service.drawer";
import BaseDrawer from "./Base.drawer";
import ConnectorBuilder from "./connector/Connector.builder";
import ServiceLinker from "./linker/service.linker";
import ServiceConnector from "./connector/Service.connector";

const ServiceDrawer = (service: IService, context: CanvasRenderingContext2D): TServiceDrawer => {
  return {
    ...BaseDrawer,

    create() {
      this.entity = service
      this.context = context
      this.Linker = ServiceLinker

      this.factory = ServiceFactory(service, context)
      this.factory.create()

      this.Connector = ConnectorBuilder(this.factory, context, service, ServiceConnector)
      // this.Connector.create()
    },
  }
}

export default ServiceDrawer
