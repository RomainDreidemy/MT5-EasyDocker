import axios from "../utils/axios";

const StackEntity = {
  stacks: async () => await axios.get('/stacks')
}

export default StackEntity