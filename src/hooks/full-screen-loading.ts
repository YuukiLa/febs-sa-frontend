import { useAppStore } from '@/store'
import { watch } from "vue"

/**
 * 全屏加载
 */
export default function useFullScreenLoading() {
  const appStore = useAppStore()
  // const fullLoading = computed(() => {
  //   return appStore.fullLoading
  // })
  // const fullLoadingTips = computed(() => {
  //   return appStore.fullLoadingTips
  // })
  watch(() => appStore.fullLoading, (val) => {
    // 监听全屏加载状态
    if (val) {
      // 禁止滚动
      document.body.style.overflow = 'hidden'
    }else {
      document.body.style.overflow = ''
    }
  })
  function setFullScreenLoading(loading: boolean, tips?: string) {
    appStore.updateSettings({
      fullLoading: loading,
      fullLoadingTips: tips ?? '加载中...',
    })
  }

  function toggleFullScreenLoading() {
    appStore.updateSettings({
      fullLoading: !appStore.fullLoading,
    })
  }

  return {
    // fullLoading,
    // fullLoadingTips,
    setFullScreenLoading,
    toggleFullScreenLoading,
  }
}
