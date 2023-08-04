<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    @cancel="handleCancel"
  >
    <template #title> 修改密码</template>

    <a-form ref="resetPwdRef" :model="resetPwdForm">
      <input v-show="false" type="text" autocomplete="username">
      <a-form-item
        v-if="type === 'origin'"
        field="originPwd"
        label="原密码"
        validate-trigger="blur"
        :rules="[{ required: true, message: '请输入原密码' }]"
      >
        <a-input-password
          v-model="resetPwdForm.originPwd"
          :input-attrs="{ autocomplete: 'current-password' }"
          placeholder="请输入原密码"
        />
      </a-form-item>
      <a-form-item
        field="newPwd"
        label="新密码"
        :input-attrs="{ autocomplete: 'new-password' }"
        validate-trigger="blur"
        :rules="[
          { required: true, message: '请输入新密码' },
          { minLength: 6, message: '密码最短6位' },
          { maxLength: 16, message: '密码最长16位' },
        ]"
      >
        <a-input-password
          v-model="resetPwdForm.newPwd"
          :input-attrs="{ autocomplete: 'new-password' }"
          placeholder="请输入新密码"
        />
      </a-form-item>
      <a-form-item
        field="checkPwd"
        label="确认密码"
        auto-complete="off"
        required
        validate-trigger="blur"
        :input-attrs="{ autocomplete: 'new-password' }"
        :rules="[
          {
            validator: (value, call) => {
              call(value === resetPwdForm.newPwd ? undefined : '两次密码不一致')
            },
          },
        ]"
      >
        <a-input-password
          v-model="resetPwdForm.checkPwd"
          :input-attrs="{ autocomplete: 'new-password' }"
          placeholder="请再次输入密码"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button
        type="primary"
        :loading="loadingOk.loading.value"
        @click="handleOk"
        >确定
      </a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">

  import { ref, reactive, inject } from 'vue'
  import { Message } from '@arco-design/web-vue'
  import { updatePwd } from '@/api/system/user'
  import useUser from '@/hooks/user'
  import useLoading from '@/hooks/loading'

  const visible = ref<boolean>(inject('changePwdVisible', false))
  const type = ref<string>('origin')
  const resetPwdRef = ref<any>(null)
  // const loading = useLoading(false)
  const loadingOk = useLoading(false)

  const { logout } = useUser()
  const resetPwdForm = reactive({
    originPwd: '',
    newPwd: '',
    checkPwd: '',
  })

  function handleOk() {
    resetPwdRef.value.validate((errors: any) => {
      if (!errors) {
        loadingOk.toggle()

        updatePwd(resetPwdForm)
          .then(() => {
            Message.success('修改成功,请重新登录')
            visible.value = false
            loadingOk.toggle()
            logout()
          })
          .catch(() => {
            loadingOk.toggle()
          })
      }
    })
  }

  function handleCancel() {
    resetPwdRef.value.resetFields()
  }
</script>
