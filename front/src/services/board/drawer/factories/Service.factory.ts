import BaseFactory from './Base.factory'
import {type TServiceFactory} from '../../../../types/board/drawer/factories/Service.factory'

const ServiceFactory = (): TServiceFactory => {
  return {
    ...BaseFactory,

    name: 'Service',
  }
}

export default ServiceFactory
