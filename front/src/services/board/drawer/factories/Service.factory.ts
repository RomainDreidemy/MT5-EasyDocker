import BaseFactory from './Base.factory'
import { type TServiceFactory } from '../../../../types/board/drawer/factories/Service.factory'
import { DrawerTypes } from '../../../../enums/DrawerTypes'

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    type: DrawerTypes.SERVICE,
    backgroundColor: '#1f2937'
  }
}

export default ServiceFactory
