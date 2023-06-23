import axios from '../utils/axios'
import { type IAuth, type IAuthEntity } from '../../interfaces/Auth.interface'

const AuthEntity = (): IAuth => ({
  auth: async (data: IAuthEntity) => await axios.post('/auth/login', data)
})

export default AuthEntity()
