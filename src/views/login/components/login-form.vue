<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">
      FEBS
    </div>
    <div class="login-form-sub-title">
      登录
    </div>
    <div class="login-form-error-msg">{{ errorMessage }} </div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :rules="[{ required: true, message: $t('login.form.code.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.code"
          :placeholder="$t('login.form.code.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-codepen />
          </template>
        </a-input>
        <img
          :src="imageCode"
          style="height: 31px; width: 120px"
          alt="code"
          @click="getCodeImage"
        />
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <!--        <div class="login-form-password-actions">-->
        <!--          -->
        <!--          <a-link>{{ $t('login.form.forgetPassword') }} </a-link>-->
        <!--        </div>-->
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
        <!--        <a-button type="text" long class="login-form-register-btn">-->
        <!--          {{ $t('login.form.register') }}-->
        <!--        </a-button>-->
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { Message } from '@arco-design/web-vue'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/store'
  import useLoading from '@/hooks/loading'
  import { LoginParams } from '@/api/system/login'
  import { randomString } from '@/utils'
  import axios from 'axios'

  const router = useRouter()
  const { t } = useI18n()
  const errorMessage = ref('')
  const { loading, setLoading } = useLoading()
  const userStore = useUserStore()
  const imageCode = ref('')
  const userInfo = reactive({
    username: '',
    password: '',
    code: '',
    key: randomString(),
  })

  function getCodeImage() {
    axios({
      method: 'GET',
      url: `/captcha?key=${userInfo.key}`,
      responseType: 'arraybuffer',
    })
      .then((res:any) => {
        const base64 = btoa(
          new Uint8Array(res).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        )
        imageCode.value =  `data:image/png;base64,${base64}`
      })
      .catch(() => {
        Message.error('获取验证码失败')
      })
  }

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined
    values: Record<string, any>
  }) => {
    if (loading.value) return
    if (!errors) {
      setLoading(true)
      try {
        await userStore.login(values as LoginParams)
        const { redirect, ...othersQuery } = router.currentRoute.value.query
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        })
        Message.success(t('login.form.login.success'))
      } catch (err) {
        console.log(err)
        errorMessage.value = (err as Error).message
        getCodeImage()
      } finally {
        setLoading(false)
      }
    }
  }
  onMounted(() => {
    getCodeImage()
  })
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
