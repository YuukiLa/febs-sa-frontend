import {RouteRecordRaw} from "vue-router"
import { DEFAULT_LAYOUT } from '../base'

const USERINFO: RouteRecordRaw = {
  path: '/userinfo',
  name: 'userinfo',
  component: DEFAULT_LAYOUT,
  redirect: '/userinfo/info',
  meta: {
    requiresAuth: true,
    icon: 'icon-dashboard',
    hideChildrenInMenu: true,
    order: 0,
  },
  children: [
    {
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        locale:'menu.user.info',
        requiresAuth: true,
        roles: ['*'],
      },
    }

    // {
    //   path: 'monitor',
    //   name: 'Monitor',
    //   component: () => import('@/views/dashboard/monitor/index.vue'),
    //   meta: {
    //     locale: 'menu.dashboard.monitor',
    //     requiresAuth: true,
    //     roles: ['admin'],
    //   },
    // },
  ],
}

export default USERINFO
