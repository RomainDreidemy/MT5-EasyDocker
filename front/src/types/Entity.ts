import { type IService, type IServiceCreate } from '../interfaces/Service.interface'
import { type INetwork, type INetworkCreate } from '../interfaces/Network.interface'
import { type IVolume, type IVolumeCreate } from '../interfaces/Volume.interface'

export type TEntity = IService | INetwork | IVolume
export type TEntityCreate = IServiceCreate | INetworkCreate | IVolumeCreate
export type TEntityOrCreate = TEntity & TEntityCreate

export type TEntityOrNullify = TEntity | undefined
