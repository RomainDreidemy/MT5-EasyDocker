import {type IService, IServiceCreate} from '../interfaces/Service.interface'
import {type INetwork, INetworkCreate} from '../interfaces/Network.interface'
import {type IVolume, IVolumeCreate} from '../interfaces/Volume.interface'

export type TEntity = IService | INetwork | IVolume
export type TEntityCreate = IServiceCreate | INetworkCreate | IVolumeCreate
export type TEntityOrCreate = TEntity & TEntityCreate

export type TEntityOrNullify = TEntity | undefined
