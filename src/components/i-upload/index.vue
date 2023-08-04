<template>
  <div>
    <a-upload
      ref="uploadRef"
      :key="fileList"
      :default-file-list="fileList"
      :list-type="listType"
      :action="action"
      :headers="headers"
      :on-before-remove="onBeforeRemove"
      :limit="props.limit"
      response-url-key="code"
      @exceed-limit="handleExceedLimit"
      @success="handleSuccess"
      @change="handleChange"
      @error="handleError"
    />
  </div>
</template>

<script lang="ts" setup>
  import {
    computed,
    ref,
  } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { getToken } from '@/utils/auth'
  import { FileItem } from '@arco-design/web-vue/es/upload/interfaces'

  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    listType: {
      type:String,
      default: ()=> 'picture',
    },
    limit: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: '/file/upload',
    },
    name: {
      type: String,
      default: 'file',
    },
  })
  const uploadRef = ref<any>(null)
  const emits = defineEmits(['update:modelValue'])
  const fileList = computed({
    get() {
      if (!props.modelValue) {
        return []
      }
      const arr = props.modelValue.split(',').map((url: string) => {
        return {
          uid: url,
          name: url,
          status: 'done',
          url,
        }
      })
      return arr
    },
    set(val: any) {
      const urls = val.map((item: any) => item.url).join(',')
      emits('update:modelValue', urls)
    },
  })

  const action = computed(() => {
    return import.meta.env.VITE_API_BASE_URL + props.url
  })

  const headers = computed(() => {
    return {
      Authorization: getToken(),
    }
  })

  function handleExceedLimit() {
    Message.error(`最多只能上传${props.limit}个文件`)
  }

  function onBeforeRemove(fileItem: FileItem) {
    return new Promise<Awaited<boolean>>((resolve) => {
      const idx = fileList.value.findIndex(
        (item: any) => item.url === fileItem.url
      )
      fileList.value.splice(idx, 1)
      fileList.value = [...fileList.value]
      resolve(true)
    })
  }

  function handleSuccess(fileItem: FileItem) {
    fileItem.url = fileItem.response.data
    fileList.value = [
      ...fileList.value,
      { ...fileItem, url: fileItem.response.data },
    ]
    // console.log(fileList.value)
  }

  function handleChange(fileItem: FileItem) {
    console.log(fileItem)
  }

  function handleError(fileItem: FileItem) {
    console.log(fileItem)
  }
</script>

<style scoped></style>
