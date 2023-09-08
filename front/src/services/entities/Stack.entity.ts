import axios from '../utils/axios'
import { type IBoard } from '../../interfaces/Board.interface'
import { type AxiosResponse } from 'axios'
import { type IStack, type IStackCreate } from '../../interfaces/Stack.interface'

const StackEntity = {
  stacks: async () => await axios.get('/stacks'),
  stack: async (id: string) => await axios.get(`/stacks/${id}`),
  board: async (id: string): Promise<AxiosResponse<IBoard>> => await axios.get(`/stacks/${id}/board`),
  create: async (stack: IStackCreate): Promise<AxiosResponse<IStack>> => await axios.post('/stacks', stack),
  update: async (stack: IStack): Promise<AxiosResponse<IStack>> => await axios.put(`/stacks/${stack.id}`, stack),
  delete: async (id: string): Promise<AxiosResponse> => await axios.delete(`/stacks/${id}`),
  duplicate: async (id: string): Promise<AxiosResponse<IStack>> => await axios.post(`/stacks/${id}/duplicate`)
}

export default StackEntity
