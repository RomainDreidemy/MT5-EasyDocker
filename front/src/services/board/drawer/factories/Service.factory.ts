import BaseFactory from './Base.factory'
import { type TServiceFactory } from '../../../../types/board/drawer/factories/Service.factory'
import { DrawerTypes } from '../../../../enums/DrawerTypes'

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    name: 'Service',
    type: DrawerTypes.SERVICE
  }
}

export default ServiceFactory
