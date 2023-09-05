import axios from '../utils/axios'
import { type IBoard } from '../../interfaces/Board.interface'
import { type AxiosResponse } from 'axios'
import { type IStack } from '../../interfaces/Stack.interface'

const StackEntity = {
  stacks: async () => await axios.get('/stacks'),
  stack: async (id: string) => await axios.get(`/stacks/${id}`),
  create: async (name: string) => await axios.post<IStack>('/stacks', { name }),
  board: async (id: string): Promise<AxiosResponse<IBoard>> => await axios.get(`/stacks/${id}/board`)
}

export default StackEntity
