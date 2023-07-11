import axios from "../utils/axios";
import {IBoard} from "../../interfaces/Board.interface";
import {AxiosResponse} from "axios";

const StackEntity = {
  stacks: async () => await axios.get('/stacks'),
  stack: async (id: string | undefined) => await axios.get(`/stacks/${id}`),
  board: async (id: string | undefined): Promise<AxiosResponse<IBoard>>  => await axios.get(`/stacks/${id}/board`)
}

export default StackEntity