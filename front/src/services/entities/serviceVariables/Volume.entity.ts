import { type IVariableRequest } from '../../../interfaces/VariableConfig.interface'
import { type AxiosResponse } from 'axios'
import axios from '../../utils/axios'
import { type IServiceVolume, type IServiceVolumeCreate } from '../../../interfaces/ServiceVariable/Volume.interface'

const VolumeEntity: IVariableRequest<IServiceVolumeCreate, IServiceVolume> = {
  create: async (serviceId: string, service: IServiceVolumeCreate): Promise<AxiosResponse<IServiceVolume>> =>
    await axios.post(`/services/${serviceId}/volumes`, service),
  update: async (service: IServiceVolume): Promise<AxiosResponse<IServiceVolume>> => await axios.put(`/volumes/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/volumes/${id}`)
}

export default VolumeEntity
