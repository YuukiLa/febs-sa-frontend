import axios from 'axios'

export interface LoginParams {
  username: string
  password: string
  key: string
  code: string
}

export function login(params: LoginParams) {
  return axios.post('/login', params,{
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    transformRequest: [data => {
      const formData = new FormData()
      Object.keys(data).forEach(key=> {
        formData.append(key, data[key])
      })
      return formData
    }],
  })
}
export function userInfo() {
  return axios.get('/user/info')
}
export function userRouter() {
  return axios.get('/menu/router')
}

export function logout() {
  return axios.post('/logout')
}