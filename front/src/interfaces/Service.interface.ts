import { type Placements } from '../enums/placements'
import { type IServiceEnvVariable } from './ServiceEnvVariable.interface'

export interface IService {
  id: string

  name: string
  description: string
  dockerImage: string
  dockerTag: string
  entrypoint: string

  isExternal: boolean

  positionX: number
  positionY: number
  test: number

  envVariables: IServiceEnvVariable[]
}

export type IServiceCreate = Omit<IService, 'id'>

export interface IServiceNetworkLinks {
  id: string

  serviceId: string
  serviceArrowPosition: Placements

  networkId: string
  networkArrowPosition: Placements
}

export interface IServiceVolumeLinks {
  id: string

  serviceId: string
  serviceArrowPosition: Placements

  managedVolumeId: string
  managedVolumeArrowPosition: Placements
}
