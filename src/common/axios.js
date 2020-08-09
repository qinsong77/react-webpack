import axios from 'axios'
import localConfig from '@/config'

const instance = axios.create({
  timeout: 1000 * 15,

  baseURL: `${localConfig.baseUrl}`,

  validateStatus: () => {
    return true
  }
})
const localLogout = (res) => {

  alert('登录过期，请重新登录！')
  return Promise.reject(res)
}

instance.interceptors.request.use(config => {
  config.headers[localConfig.tokeKey] = 'Bearer ' + localStorage.getItem(localConfig.tokeKey) || ''
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(
  res => {
    if (res.status === 403) {
      return localLogout.call(res)
    }
    if (res.status === 204) return res // 获取验证码无返回
    const { code, msg } = res.data
    if (code !== 200 && code !== 0) {
      return Promise.reject(msg)
    } else return res.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
