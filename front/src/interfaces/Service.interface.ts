import { type Placements } from '../enums/placements'
import { type IServiceEnvVariable } from './ServiceVariable/EnvVariable.interface'
import { type IServicePortVariable } from './ServiceVariable/Port.interface'
import { type IServiceVolume } from './ServiceVariable/Volume.interface'

export interface IService {
  id: string

  name: string
  description: string
  containerName: string
  dockerImage: string
  dockerTag: string
  entrypoint: string

  isExternal: boolean

  context: string
  dockerFile: string

  positionX: number
  positionY: number
  test: number

  envVariables: IServiceEnvVariable[]
  ports: IServicePortVariable[]
  volumes: IServiceVolume[]
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
