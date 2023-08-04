import { defineStore } from 'pinia'

import {setToken, clearUser, getUserInfo, setUserInfo, clearUserInfo} from '@/utils/auth'
import { removeRouteListener } from '@/utils/route-listener'
import { login, userInfo, LoginParams } from '@/api/system/login'
import {refresh} from "@/api/system/user"
import { UserState } from './types'
import useAppStore from '../app'
import useTabBarStore from "../tab-bar"

const useUserStore = defineStore('user', {
  state: (): UserState =>
    <UserState>{
      ...getUserInfo(),
    },

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    refreshPerms(){
      refresh().then(()=>{
        clearUserInfo()
        window.location.reload()
      })
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
      // 不知道为什么刷新权限后$partial不生效
      if(!this.username) {
        Object.keys(partial).forEach(key=> {
          // @ts-ignore
          this[key] = partial[key]
        })
      }
    },

    // Reset user's information
    resetInfo() {
      this.$reset()
      if(this.username) {
        this.username=''
      }
    },

    // Get user's information
    async info() {
      const res: any = await userInfo()
      this.setInfo(res.data)
      setUserInfo(res.data)
    },

    // Login
    async login(loginForm: LoginParams) {
      try {
        const res: any = await login(loginForm)
        setToken(res.data.token)
      } catch (err) {
        clearUser()
        throw err
      }
    },
    logoutCallBack() {
      const appStore = useAppStore()
      const tabBarStore = useTabBarStore()
      this.resetInfo()
      clearUser()
      removeRouteListener()
      appStore.clearServerMenu()
      tabBarStore.resetTabList()
    },
    // Logout
    async logout() {
      try {
        // await userLogout()
      } finally {
        this.logoutCallBack()
      }
    },
  },
})

export default useUserStore
