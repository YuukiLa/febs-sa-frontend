<template>
  <a-card
    class="general-card"
    :title="$t('workplace.quick.operation')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <a-link>{{ $t('workplace.quickOperation.setup') }} </a-link>
    </template>
    <a-row :gutter="8">

    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script lang="ts" setup>
  const links = [
    {
      text: 'workplace.contentManagement',
      icon: 'icon-file',
    },
    {
      text: 'workplace.contentStatistical',
      icon: 'icon-storage',
    },
    { text: 'workplace.advanced', icon: 'icon-settings' },
    {
      text: 'workplace.onlinePromotion',
      icon: 'icon-mobile',
    },
    { text: 'workplace.contentPutIn', icon: 'icon-fire' },
  ]
</script>

<style scoped lang="less"></style>
