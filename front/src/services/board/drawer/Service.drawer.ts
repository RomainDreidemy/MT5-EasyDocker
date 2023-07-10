import ServiceFactory from './factories/Service.factory'
import { type TServiceDrawer } from '../../../types/board/drawer/Service.drawer'
import BaseDrawer from './Base.drawer'
import ConnectorBuilder from './connector/Connector.builder'
import { type IService } from '../../../interfaces/Service.interface'
import CommonConnector from './connector/Common.connector'
import CommonLinker from './linkers/Common.linker'
import { DrawerTypes } from '../../../enums/DrawerTypes'

const ServiceDrawer = (service: IService, context: CanvasRenderingContext2D): TServiceDrawer => {
  return {
    ...BaseDrawer,

    canBeLinkedWith: [DrawerTypes.NETWORK],
    type: DrawerTypes.SERVICE,

    create () {
      this.entity = service
      this.context = context
      this.Linker = CommonLinker

      this.factory = ServiceFactory()
      this.factory.create(service, context)

      this.Connector = ConnectorBuilder(this.factory, context, service, CommonConnector)
    }
  }
}

export default ServiceDrawer
