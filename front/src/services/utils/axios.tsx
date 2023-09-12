import Axios from 'axios'
const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data'
  },
  withCredentials: true
})

export default axios
