import axios from "axios"
import transfromRequest from "@/hooks/transform-request"

export interface Role {
  roleId: number
  roleName: string,
  roleCode: string,
  remark?: string,
  createTime?: string,
  updateTime?: string,
  menuIds?: string
  menus: any[]
}

export function queryRole(params:any) {
  return axios.get('/role',{params})
}
export function queryRoleAll() {
  return axios.get('/role/options')
}

export function addRole(role:Role) {
  return axios.post('/role',role,transfromRequest)
}
export function updateRole(role:Role) {
  return axios.put('/role',role,transfromRequest)
}
export function deleteRole(id:number) {
  return axios.delete(`/role/${id}`)
}
