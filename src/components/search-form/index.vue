<template>
  <div>
    <a-row>
      <a-col :flex="1">
        <a-form
          ref="searchFormRef"
          layout="inline"
          :model="searchModel"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
        >
          <a-row :gutter="10">
            <slot :model="searchModel"></slot>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 84px" direction="vertical" />
      <a-col :flex="'86px'" style="text-align: right">
        <a-space direction="vertical" :size="18">
          <a-button type="primary" @click="handleSearch">
            <template #icon>
              <icon-search />
            </template>
            搜索
          </a-button>
          <a-button @click="handleReset">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, reactive, ref } from 'vue'

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  })
  const emit = defineEmits(['update:modelValue', 'handleSearch'])
  const searchFormRef = ref<any>(null)
  const searchModel = reactive<any>({
    ...props.modelValue,
  })

  function handleSearch() {
    emit('update:modelValue', searchModel)
    nextTick(() => {
      emit('handleSearch')
    })
  }

  function handleReset() {
    searchFormRef.value.resetFields()
    emit('update:modelValue', searchModel)
    nextTick(() => {
      emit('handleSearch')
    })
  }
</script>

<style scoped></style>
