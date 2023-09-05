import { type AxiosResponse } from 'axios'
import axios from '../utils/axios'
import { type IServiceEnvVariable, type IServiceEnvVariableCreate } from '../../interfaces/ServiceEnvVariable.interface'

export interface IVariableRequester<C, E> {
  create: (serviceId: string, entity: C) => Promise<AxiosResponse<E>>
  update: (entity: E) => Promise<AxiosResponse<E>>
  delete: (id: string) => Promise<any>
}

const ServiceEnvVariableEntity: IVariableRequester<IServiceEnvVariableCreate, IServiceEnvVariable> = {
  create: async (serviceId: string, service: IServiceEnvVariableCreate): Promise<AxiosResponse<IServiceEnvVariable>> =>
    await axios.post(`/services/${serviceId}/env_variables`, service),
  update: async (service: IServiceEnvVariable): Promise<AxiosResponse<IServiceEnvVariable>> =>
    await axios.put(`/env_variables/${service.id}`, service),
  delete: async (id: string): Promise<any> =>
    await axios.delete(`/env_variables/${id}`)
}

export default ServiceEnvVariableEntity
