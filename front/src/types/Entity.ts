import { type IService } from '../interfaces/Service.interface'
import {INetwork} from "../interfaces/Network.interface";
import {IVolume} from "../interfaces/Volume.interface";

export type TEntity = IService | INetwork | IVolume
