import { type AxiosResponse } from 'axios'
import axios from '../utils/axios'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'

const ServiceEnvVariableEntity = {
  create: async (serviceId: string, service: IServiceEnvVariableCreate): Promise<AxiosResponse<IServiceEnvVariable>> =>
    await axios.post(`/services/${serviceId}/env_variables`, service),
  update: async (service: IServiceEnvVariable): Promise<AxiosResponse<IServiceEnvVariable>> => await axios.put(`/env_variables/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/env_variables/${id}`)
}

export default ServiceEnvVariableEntity
