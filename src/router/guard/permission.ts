import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router'
import { DefineComponent } from 'vue'
import NProgress from 'nprogress' // progress bar
import { useAppStore } from '@/store'
// import { WHITE_LIST } from '../constants'
import { isLogin } from '@/utils/auth'
import { DEFAULT_LAYOUT } from '../routes/base'

const views = import.meta.glob('../../views/**/index.vue')

export default function setupPermissionGuard(router: Router) {
  function view(path: string): DefineComponent {
    // @vite-ignore
    // @ts-ignore
    return views[`../../views/${path}.vue`]
  }

  function filterAsyncRouter(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    return routes
      .filter((route) => route.component)
      .map((route) => {
        const build = {
          path: '',
          name: '',
          component: DEFAULT_LAYOUT,
          children: [] as RouteRecordRaw[],
        }
        // @ts-ignore
        build.name = route.name
        build.path = route.path
        const { component } = route
        // @ts-ignore
        if (route.component === 'Layout') {
          build.component = DEFAULT_LAYOUT
        } else {
          // @ts-ignore
          build.component = view(component)
        }
        if (route.children && route.children.length) {
          build.children = filterAsyncRouter(route.children)
        }
        return build
      })
  }

  function go(
    to: RouteLocationNormalized,
    next: NavigationGuardNext,
    asyncRouter: RouteRecordNormalized[]
  ) {
    const filterRouter = filterAsyncRouter(asyncRouter)
    filterRouter.forEach((route) => router.addRoute(route))
    // router.addRoute(filterRouter)
    // next({ ...to, replace: true })
  }

  router.beforeEach(async (to, from, next) => {
    const appStore = useAppStore()
    if (isLogin()) {
      if (!appStore.hasRouter) {
        if (appStore.appAsyncMenus.length === 0) {
          await appStore.fetchServerMenuConfig()
        }
        go(to, next, appStore.appAsyncMenus)

        appStore.hasRouter = true
        next({ path: to.path, replace: true })
        return
      }
    }
    // const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]
    // appStore.appAsyncMenus.forEach((item) => {
    //   router.addRoute(item as unknown as RouteRecordNormalized)
    // })
    next()
    // router.addRoute()
    // let exist = false
    // while (serverMenuConfig.length && !exist) {
    //   const element = serverMenuConfig.shift()
    //   if (element?.name === to.name) exist = true
    //
    //   if (element?.children) {
    //     serverMenuConfig.push(
    //       ...(element.children as unknown as RouteRecordNormalized[])
    //     )
    //   }
    // }
    // if (exist && permissionsAllow) {
    //   next()
    // } else next(NOT_FOUND)

    NProgress.done()
  })
}
