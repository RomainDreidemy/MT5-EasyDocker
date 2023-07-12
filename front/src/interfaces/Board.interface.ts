import {INetwork} from "./Network.interface";
import {IService, IServiceNetworkLinks, IServiceVolumeLinks} from "./Service.interface";
import {IVolume} from "./Volume.interface";
import {TLinkEntity} from "../types/Linker";

export interface IBoard {
  networks: INetwork[],
  services: IService[],
  volumes: IVolume[],
  serviceNetworkLinks: TLinkEntity[]
  serviceVolumeLinks: TLinkEntity[]
}
