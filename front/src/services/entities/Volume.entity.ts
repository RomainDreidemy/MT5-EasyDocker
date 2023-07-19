import axios from '../utils/axios'
import { type AxiosResponse } from 'axios'
import { type IVolume, type IVolumeCreate } from '../../interfaces/Volume.interface'

const NetworkEntity = {
  create: async (stackId: string, volume: IVolumeCreate): Promise<AxiosResponse<IVolume>> =>
    await axios.post(`/stacks/${stackId}/volumes`, volume),
  update: async (volume: IVolume): Promise<AxiosResponse<IVolume>> => await axios.put(`/volumes/${volume.id}`, volume),
  delete: async (id: string): Promise<any> => await axios.delete(`/volumes/${id}`)
}

export default NetworkEntity
