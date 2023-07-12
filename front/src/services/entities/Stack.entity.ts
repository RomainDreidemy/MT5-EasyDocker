import axios from '../utils/axios'
import { type IBoard } from '../../interfaces/Board.interface'
import { type AxiosResponse } from 'axios'

const StackEntity = {
  stacks: async () => await axios.get('/stacks'),
  stack: async (id: string) => await axios.get(`/stacks/${id}`),
  board: async (id: string): Promise<AxiosResponse<IBoard>> => await axios.get(`/stacks/${id}/board`)
}

export default StackEntity
