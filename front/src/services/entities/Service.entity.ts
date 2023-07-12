import axios from "../utils/axios";
import {IService, IServiceCreate} from "../../interfaces/Service.interface";
import {AxiosResponse} from "axios";

const ServiceEntity = {
  create: async (service: IServiceCreate): Promise<AxiosResponse<IService>> => await axios.post(`/services/`, service),
  update: async (service: IService): Promise<AxiosResponse<IService>> => await axios.put(`/services/${service.id}`, service),
  delete: async (id: string): Promise<any> => await axios.delete(`/services/${id}`),
}

export default ServiceEntity
