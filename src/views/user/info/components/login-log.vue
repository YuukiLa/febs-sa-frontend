<template>
  <div>
    <a-timeline :mode="left" labelPosition="relative">
      <a-timeline-item
        v-for="item in logs"
        :key="item.id"
        :label="item.loginTime"
      >
        <a-row :style="{ display: 'inline-flex', alignItems: 'center' }">
          <div :style="{ marginBottom: '12px' }">
            {{ item.location }}
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              {{ item.system }} {{ item.browser }}
            </div>
            <div :style="{ fontSize: '12px', color: '#4E5969' }">
              {{ item.ip }}
            </div>
          </div>
        </a-row>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { userLoginLog } from '@/api/system/user'

  const logs = ref<any[]>([])
  onMounted(() => {
    userLoginLog().then((res) => {
      logs.value = res.data
    })
  })
</script>

<style scoped></style>
