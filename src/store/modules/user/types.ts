
export interface UserState {
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
  permissions?: string
}
