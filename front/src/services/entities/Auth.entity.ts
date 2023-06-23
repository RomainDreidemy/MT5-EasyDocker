import axios from '../utils/axios'

const AuthEntity = (): any => ({
  auth: async (data: any) => await axios.post('/auth/login', data).then((r) => r).catch((e) => e.response)
})

export default AuthEntity()
