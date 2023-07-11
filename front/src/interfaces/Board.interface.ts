import {INetwork} from "./Network.interface";
import {IService, IServiceNetworkLinks, IServiceVolumeLinks} from "./Service.interface";
import {IVolume} from "./Volume.interface";

export interface IBoard {
  networks: INetwork[],
  services: IService[],
  volumes: IVolume[],
  serviceNetworkLinks: IServiceNetworkLinks[]
  serviceVolumeLinks: IServiceVolumeLinks[]
}
