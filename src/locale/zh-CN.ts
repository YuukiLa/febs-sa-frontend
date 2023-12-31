import localeMessageBox from '@/components/message-box/locale/zh-CN'
import localeLogin from '@/views/login/locale/zh-CN'

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN'

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN'



import locale403 from '@/views/exception/403/locale/zh-CN'
import locale404 from '@/views/exception/404/locale/zh-CN'
import locale500 from '@/views/exception/500/locale/zh-CN'

import localeUserInfo from '@/views/user/info/locale/zh-CN'

import localUser from '@/views/system/user/locale/zh-CN'
import localDept from '@/views/system/dept/locale/zh-CN'
import localRole from '@/views/system/role/locale/zh-CN'
import localMenu from '@/views/system/menu/locale/zh-CN'

import localeSettings from './zh-CN/settings'
import localGlobalMenu from './zh-CN/menu'



export default {
  'menu.dashboard': '仪表盘',
  'menu.system': '系统管理',
  'menu.monitor': '系统监控',
  'menu.server.dashboard': '仪表盘',
  'menu.server.workplace': '工作台',
  'menu.server.monitor': '实时监控-服务端',
  'menu.list': '列表页',
  'menu.result': '结果页',
  'menu.exception': '异常页',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': '常见问题',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localUser,
  ...localDept,
  ...localRole,
  ...localMenu,
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeUserInfo,
  ...localGlobalMenu
}
