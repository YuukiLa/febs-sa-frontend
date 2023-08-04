import {RouteRecordRaw} from "vue-router"
import { DEFAULT_LAYOUT } from '../base'

const DASHBOARD: RouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  redirect: '/dashboard/workplace',
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    hideChildrenInMenu: true,
    order: 0,
  },
  children: [
    {
      path: 'workplace',
      name: 'Workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: 'menu.dashboard.workplace',
        requiresAuth: true,
        activeMenu: 'dashboard',
        roles: ['*'],
      },
    },{
      path: 'info',
      name: 'Info',
      component: () => import('@/views/user/info/index.vue'),
      meta: {
        name: '用户信息',
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

export default DASHBOARD
