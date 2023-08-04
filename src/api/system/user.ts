import axios from 'axios'
import transfromRequest from '@/hooks/transform-request'

export interface User {
  userId: number|null
  realName: string
  username: string
  password: string
  sex: string
  mobile: string
  email: string
  status: string
  deptId: number|null
  roleIds: any[]
  roleId?: string
  roleCodeStr?: string
  roleName?: string
  deptName?: string
}

export function queryUser(params: any) {
  return axios.get('/user', { params })
}

export function addUser(user: User) {
  return axios.post('/user', user,transfromRequest)
}

export function updateUser(user: User) {
  return axios.put('/user', user,transfromRequest)
}

export function deleteUser(id: number|null) {
  return axios.delete(`/user/${id}`)
}

export function checkUsername(username: string) {
  return axios.get(`/user/check/${username}`)
}

export function updatePwd(data: any) {
  return axios.put('/user/password', data,transfromRequest)
}

export function resetPwd(data: {usernames:string}) {
  return axios.put('/user/password/reset', data,transfromRequest)
}

export function refresh() {
  return axios.get('/user/refresh')
}

export function updateProfile(data:any) {
  return axios.put('/user/profile', data,transfromRequest)
}

export function userLoginLog() {
  return axios.get('/loginLog/currentUser')
}
