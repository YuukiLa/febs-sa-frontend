<template>
  <div>
    <a-tag :color="props.status === 1 ? 'green' : 'gray'">
      {{ dict(`global.status.${props.status}`) }}
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
  import useDict from '@/hooks/dict'

  const dict = useDict()
  const props = defineProps({
    status: {
      type: Number,
      default: 0,
    },
  })
</script>

<style scoped></style>
