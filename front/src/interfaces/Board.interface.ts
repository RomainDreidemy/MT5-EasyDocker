import { type INetwork } from './Network.interface'
import { type IService } from './Service.interface'
import { type IVolume } from './Volume.interface'
import { type TLinkEntity } from '../types/Linker'

export interface IBoard {
  networks: INetwork[]
  services: IService[]
  volumes: IVolume[]
  serviceNetworkLinks: TLinkEntity[]
  serviceVolumeLinks: TLinkEntity[]
}
