import localeMessageBox from '@/components/message-box/locale/en-US'
import localeLogin from '@/views/login/locale/en-US'

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US'

import localeMonitor from '@/views/dashboard/monitor/locale/en-US'


import locale403 from '@/views/exception/403/locale/en-US'
import locale404 from '@/views/exception/404/locale/en-US'
import locale500 from '@/views/exception/500/locale/en-US'

import localeUserInfo from '@/views/user/info/locale/en-US'

import localUser from '@/views/system/user/locale/en-US'
import localDept from '@/views/system/dept/locale/en-US'
import localRole from '@/views/system/role/locale/en-US'
import localMenu from '@/views/system/menu/locale/en-US'

import localeSettings from './en-US/settings'
import localGlobalMenu from './en-US/menu'

export default {
  'menu.dashboard': 'Dashboard',
  'menu.system': 'system management',
  'menu.monitor': 'system monitor',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.server.monitor': 'Monitor-Server',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'menu.arcoWebsite': 'Arco Design',
  'menu.faq': 'FAQ',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
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
