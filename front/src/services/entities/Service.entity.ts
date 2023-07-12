import axios from '../utils/axios'
import { type IService, type IServiceCreate } from '../../interfaces/Service.interface'
import { type AxiosResponse } from 'axios'

const ServiceEntity = {
  create: async (service: IServiceCreate): Promise<AxiosResponse<IService>> => await axios.post('/services/', service),
  update: async (service: IService): Promise<AxiosResponse<IService>> => await axios.put(`/services/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/services/${id}`)
}

export default ServiceEntity
