import { DirectiveBinding } from 'vue'
import { useUserStore } from '@/store'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { permissions } = userStore
  const perms = permissions?.split(',') ?? []
  if (Array.isArray(value)) {
    if (value.length > 0) {
      let hasPermission = false
      for (let i=0;i<value.length;i+=1) {
        if (perms.includes(value[i])) {
          hasPermission = true
          break
        }
      }
      if (!hasPermission) {
        if (!el.parentNode) {
          el.style.display = 'none'
        } else {
          el.parentNode.removeChild(el)
        }
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','user']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
