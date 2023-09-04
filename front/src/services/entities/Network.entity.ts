import axios from '../utils/axios'
import { type AxiosResponse } from 'axios'
import { type INetwork, type INetworkCreate } from '../../interfaces/Network.interface'

const NetworkEntity = {
  get: async (network: INetwork): Promise<AxiosResponse<INetwork>> => await axios.get(`/networks/${network.id}`),
  create: async (stackId: string, network: INetworkCreate): Promise<AxiosResponse<INetwork>> =>
    await axios.post(`/stacks/${stackId}/networks`, network),
  update: async (network: INetwork): Promise<AxiosResponse<INetwork>> => await axios.put(`/networks/${network.id}`, network),
  delete: async (id: string): Promise<any> => await axios.delete(`/networks/${id}`)
}

export default NetworkEntity
