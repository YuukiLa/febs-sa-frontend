<template>
  <a-card class="general-card">
    <template #title></template>
    <a-tabs default-active-key="1" type="rounded">
      <a-tab-pane key="1" title="我的信息">
        <info-edit />
      </a-tab-pane>
      <a-tab-pane key="2" title="登录日志">
        <login-log />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script lang="ts" setup>
  import InfoEdit from '@/views/user/info/components/info-edit.vue'
  import LoginLog from '@/views/user/info/components/login-log.vue'
</script>

<style scoped lang="less">
  .general-card {
    //height: 356px;
  }
</style>
