import axios from '../utils/axios'
import { type AxiosResponse } from 'axios'
import { type IVolume, type IVolumeCreate } from '../../interfaces/Volume.interface'

const ManagedVolumeEntity = {
  create: async (stackId: string, volume: IVolumeCreate): Promise<AxiosResponse<IVolume>> =>
    await axios.post(`/stacks/${stackId}/managed_volumes`, volume),
  update: async (volume: IVolume): Promise<AxiosResponse<IVolume>> => await axios.put(`/managed_volumes/${volume.id}`, volume),
  delete: async (id: string): Promise<any> => await axios.delete(`/managed_volumes/${id}`)
}

export default ManagedVolumeEntity
