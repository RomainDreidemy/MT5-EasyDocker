import axios from '../utils/axios'
import { type IAuth, type IAuthEntity } from '../../interfaces/Auth.interface'

const AuthEntity = (): IAuth => ({
  auth: async (data: IAuthEntity) => await axios.post('/auth/login', data),
  register: async (data: IAuthEntity) => await axios.post('/auth/register', data),
  me: async () => await axios.get('/users/me'),
  isLogged: async () => {
    try {
      await axios.get('/users/me')
      return true
    } catch (e) {
      return false
    }
  }
})

export default AuthEntity()
