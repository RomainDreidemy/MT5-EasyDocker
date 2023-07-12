import axios from "../utils/axios";
import {AxiosResponse} from "axios";
import {IVolume, IVolumeCreate} from "../../interfaces/Volume.interface";

const NetworkEntity = {
  create: async (volume: IVolumeCreate): Promise<AxiosResponse<IVolume>> => await axios.post(`/volumes/`, volume),
  update: async (volume: IVolume): Promise<AxiosResponse<IVolume>> => await axios.put(`/volumes/${volume.id}`, volume),
  delete: async (id: string): Promise<any> => await axios.delete(`/volumes/${id}`),
}

export default NetworkEntity
