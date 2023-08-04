<template>
  <div>
    <a-form :model="formModel" :rules="rules" @submit="handleSubmit">
      <a-form-item label="手机号" field="mobile">
        <a-input v-model="formModel.mobile" />
      </a-form-item>
      <a-form-item label="邮箱" field="email">
        <a-input v-model="formModel.email" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store'
  import { reactive } from 'vue'
  import { updateProfile } from '@/api/system/user'
  import { Message } from '@arco-design/web-vue'

  const userStore = useUserStore()
  const formModel = reactive({
    userId: userStore.userInfo.userId,
    mobile: userStore.userInfo.mobile,
    email: userStore.userInfo.email,
  })
  const rules = {
    mobile: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },
      {
        match: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: '请输入正确的邮箱',
        trigger: 'blur',
      },
    ],
  }

  function handleSubmit({ errors }: { errors: any }) {
    if (!errors) {
      updateProfile(formModel).then(() => {
        Message.success('保存成功')
        userStore.info()
      })
    }
  }
</script>

<style scoped></style>
