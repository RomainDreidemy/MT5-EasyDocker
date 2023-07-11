import axios from "../utils/axios";

const StackEntity = {
  stacks: async () => await axios.get('/stacks'),
  stack: async (id: string | undefined) => await axios.get(`/stacks/${id}`),
  board: async (id: string | undefined) => await axios.get(`/stacks/${id}/board`)
}

export default StackEntity