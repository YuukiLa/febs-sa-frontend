import axios from 'axios'
import transformRequest from '@/hooks/transform-request'

export interface Dept {
  deptId: number
  deptName: string
  parentId: number | null
}

export function queryDept() {
  return axios.get('/dept')
}

export function addDept(dept: Dept) {
  return axios.post('/dept', dept, transformRequest)
}

export function updateDept(dept: Dept) {
  return axios.put('/dept', dept, transformRequest)
}

export function deleteDept(id: number) {
  return axios.delete(`/dept/${id}`)
}
