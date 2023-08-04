<template>
  <div>
    <a-config-provider :locale="locale">
      <a-spin :loading="appStore.fullLoading" :tip="appStore.fullLoadingTips">
        <router-view />
      </a-spin>
      <global-setting />
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us'
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'
  import GlobalSetting from '@/components/global-setting/index.vue'
  import useLocale from '@/hooks/locale'
  import { useAppStore } from '@/store'

  const appStore = useAppStore()
  const { currentLocale } = useLocale()
  const locale = computed(() => {
    switch (currentLocale.value) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return enUS
    }
  })
</script>

<style scoped lang="less">
  :deep(.arco-spin-mask) {
    z-index: 1000;
  }
  :deep(.arco-spin-loading) {
    position: inherit;
    user-select: none;
    overflow: hidden;
  }
  :deep(.arco-spin) {
    display: block;
  }
</style>
