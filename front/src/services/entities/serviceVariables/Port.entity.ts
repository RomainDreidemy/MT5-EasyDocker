import { type AxiosResponse } from 'axios'
import axios from '../../utils/axios'
import { type IServicePortVariable, type IServicePortVariableCreate } from '../../../interfaces/ServicePort.interface'
import { type IVariableRequest } from '../../../interfaces/VariableConfig.interface'

const PortEntity: IVariableRequest<IServicePortVariableCreate, IServicePortVariable> = {
  create: async (serviceId: string, service: IServicePortVariableCreate): Promise<AxiosResponse<IServicePortVariable>> =>
    await axios.post(`/services/${serviceId}/ports`, service),
  update: async (service: IServicePortVariable): Promise<AxiosResponse<IServicePortVariable>> => await axios.put(`/ports/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/ports/${id}`)
}

export default PortEntity
