import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'

export interface HttpResponse<T = unknown> {
  status: number
  message: string
  code: number
  data: T
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `${token}`
    }
    config.validateStatus = () => true
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  }
)
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (response.status !== 200) {
      
      if (response.status===401) {
        Modal.error({
          title: '登录失效',
          content: '您太久没使用账号已退出，你可以选择留在此页面或重新登陆',
          okText: '重新登陆',
          cancelText: '留在此页',
          hideCancel: false,
          async onOk() {
            const userStore = useUserStore()
            await userStore.logout()
            window.location.reload()
          },
        })
      }else if(response.status===403){
        Message.error({
          content: '您没有权限',
          duration: 5 * 1000,
        })
      }else {
        Message.error({
          content: res.message || 'Error',
          duration: 5 * 1000,
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    console.log(error)
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  }
)
