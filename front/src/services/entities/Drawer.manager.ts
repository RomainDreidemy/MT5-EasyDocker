import { type TEntity, type TEntityCreate } from '../../types/Entity'
import { DrawerTypes } from '../../enums/DrawerTypes'
import { type AxiosResponse } from 'axios'
import ServiceEntity from './Service.entity'
import { type IService, type IServiceCreate } from '../../interfaces/Service.interface'
import NetworkEntity from './Network.entity'
import { type INetwork, type INetworkCreate } from '../../interfaces/Network.interface'
import ManagedVolumeEntity from './Volume.entity'
import { type IVolume, type IVolumeCreate } from '../../interfaces/Volume.interface'
import { Errors } from '../../enums/errors'

const DrawerManager = {
  create: async (stackId: string, entity: TEntityCreate, type: DrawerTypes): Promise<AxiosResponse<TEntity>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.create(stackId, entity as IServiceCreate)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.create(stackId, entity as INetworkCreate)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.create(stackId, entity as IVolumeCreate)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  },

  update: async (entity: TEntity, type: DrawerTypes): Promise<AxiosResponse<TEntity>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.update(entity as IService)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.update(entity as INetwork)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.update(entity as IVolume)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  },

  delete: async (entity: TEntity, type: DrawerTypes): Promise<AxiosResponse<any>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.delete(entity.id)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.delete(entity.id)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.delete(entity.id)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  },

  get: async (entity: TEntity, type: DrawerTypes): Promise<AxiosResponse<TEntity>> => {
    switch (type) {
      case DrawerTypes.SERVICE:
        return await ServiceEntity.get(entity as IService)

      case DrawerTypes.NETWORK:
        return await NetworkEntity.get(entity as INetwork)

      case DrawerTypes.VOLUME:
        return await ManagedVolumeEntity.get(entity as IVolume)

      default:
        throw new Error(Errors.NOT_IMPLEMENTED)
    }
  }

}

export default DrawerManager
