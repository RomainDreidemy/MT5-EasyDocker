import axios from "../utils/axios";
import {AxiosResponse} from "axios";
import {INetwork, INetworkCreate} from "../../interfaces/Network.interface";

const NetworkEntity = {
  create: async (network: INetworkCreate): Promise<AxiosResponse<INetwork>> => await axios.post(`/networks/`, network),
  update: async (network: INetwork): Promise<AxiosResponse<INetwork>> => await axios.put(`/networks/${network.id}`, network),
  delete: async (id: string): Promise<any> => await axios.delete(`/networks/${id}`),
}

export default NetworkEntity
