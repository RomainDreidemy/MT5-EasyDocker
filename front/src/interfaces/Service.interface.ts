import {type Placements} from '../enums/placements'

export interface IService {
  id: string

  name: string
  description: string
  dockerImage: string
  dockerTag: string
  entrypoint: string

  positionX: number
  positionY: number
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

  volumeId: string
  volumeArrowPosition: Placements
}
