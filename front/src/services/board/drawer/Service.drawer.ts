import ServiceFactory from './factories/Service.factory'
import { type TServiceDrawer } from '../../../types/board/drawer/Service.drawer'
import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import {type IService, IServiceCreate} from '../../../interfaces/Service.interface'
import CommonConnector from './connector/Common.connector'
import CommonLinker from './linkers/Common.linker'
import { DrawerTypes } from '../../../enums/DrawerTypes'

const ServiceDrawer = (service: IService | IServiceCreate, context: CanvasRenderingContext2D): TServiceDrawer => {
  return {
    ...BaseDrawer(),

    canBeLinkedWith: [],
    type: DrawerTypes.SERVICE,

    create () {
      this.entity = service
      this.context = context
      this.Linker = CommonLinker

      this.factory = ServiceFactory()
      this.factory.create(service, context)

      this.Connector = ConnectorBuilder(this, CommonConnector)
      this.createConnectors()
    }
  }
}

export default ServiceDrawer
