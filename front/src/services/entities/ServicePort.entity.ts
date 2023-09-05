import { type AxiosResponse } from 'axios'
import axios from '../utils/axios'
import { type IServicePort, type IServicePortCreate } from '../../interfaces/ServicePort.interface'

const ServiceEnvVariableEntity = {
  create: async (serviceId: string, service: IServicePortCreate): Promise<AxiosResponse<IServicePort>> =>
    await axios.post(`/services/${serviceId}/ports`, service),
  update: async (service: IServicePort): Promise<AxiosResponse<IServicePort>> => await axios.put(`/ports/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/ports/${id}`)
}

export default ServiceEnvVariableEntity
