import axios from 'axios'
import transformRequest from '@/hooks/transform-request'

export interface Menu {
  menuId: number
  parentId: number | null
  menuName: string
  path: string
  perms: string | null
  component: string | null
  icon: string | null
  type: '1' | '0'
  orderNum: number
}

export function queryMenu() {
  return axios.get('/menu')
}

export function addMenu(menu: Menu) {
  return axios.post('/menu', menu, transformRequest)
}

export function updateMenu(menu: Menu) {
  return axios.put('/menu', menu, transformRequest)
}

export function deleteMenu(id: number) {
  return axios.delete(`/menu/${id}`)
}
