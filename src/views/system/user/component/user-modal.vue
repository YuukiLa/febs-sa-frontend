<template>
  <div>
    <a-modal v-model:visible="visible" width="60%">
      <template #title></template>
      <div>
        <a-form ref="formRef" :model="form" :rules="formRule">
          <a-form-item v-show="false" field="userId"></a-form-item>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                field="realName"
                label="姓名"
                validate-trigger="input"
              >
                <a-input v-model="form.realName" placeholder="请输入姓名" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="username" label="用户名" :disabled="!!form.userId">
                <a-input v-model="form.username" placeholder="请输入用户名" />
                <template #extra>
                  <div>用于用户登录</div>
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item
                field="password"
                label="密码"
                validate-trigger="input"
                :disabled="!!form.userId"
              >
                <a-input
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                />
                <template #extra>
                  <div>默认999888</div>
                </template>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="sex" label="性别">
                <a-select v-model="form.sex">
                  <a-option
                    v-for="(v, k) in dict('system.user.sex')"
                    :key="v"
                    :value="k"
                    >{{ v }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="mobile" label="手机">
                <a-input v-model="form.mobile" placeholder="请输入手机" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="email" label="邮箱">
                <a-input v-model="form.email" placeholder="请输入邮箱" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="deptId" label="部门" :rules="formRule.deptId">
                <a-tree-select
                  v-model="form.deptId"
                  :data="deptTreeData"
                  placeholder="请选择部门"
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="roleIds" label="角色">
                <a-select
                  v-model="form.roleIds"
                  placeholder="请选择角色"
                  multiple
                  :max-tag-count="2"
                  allow-clear
                  :scrollbar="true"
                >
                  <a-option
                    v-for="item in roles"
                    :key="item.roleName"
                    :value="item.roleId"
                    :label="item.roleName"
                  ></a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="status" label="状态">
                <a-select v-model="form.status">
                  <a-option
                    v-for="(v, k) in dict('system.user.status')"
                    :key="v.text"
                    :value="k"
                    >{{ v.text }}
                  </a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <template #footer>
        <a-space>
          <a-button @click="visible = false">取消</a-button>
          <a-button :loading="loading" type="primary" @click="handleOk"
            >提交
          </a-button>
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue'
  import { ref, inject, reactive, onMounted, watchEffect } from 'vue'
  import { queryRoleAll, Role } from '@/api/system/role'
  import { buildDeptTree, TreeNode } from '@/utils/tree'
  import { addUser, checkUsername, updateUser, User } from '@/api/system/user'
  import { queryDept } from '@/api/system/dept'
  import useDict from '@/hooks/dict'
  import useLoading from '@/hooks/loading'

  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
  })

  const dict = useDict()
  const { loading, toggle } = useLoading()
  const formRef = ref<any>(null)
  const deptTreeData = ref<TreeNode[]>([])
  const roles = ref<Role[]>([])
  const visible = ref<boolean>(inject<boolean>('visible', false))
  const emits = defineEmits(['refresh'])
  const form = reactive<User>({
    userId: null,
    realName: '',
    username: '',
    password: '999888',
    sex: '0',
    mobile: '',
    email: '',
    status: '1',
    deptId: null,
    roleIds: [],
    roleId: '',
    roleCodeStr: '',
  })
  watchEffect(() => {
    if (visible.value) {
      if (props.user.userId) {
        // Object.assign(form, props.user)
        Object.keys(form).forEach((key: string) => {
          // @ts-ignore
          form[key] = props.user[key]
        })
        form.roleIds = props.user.roleId.split(',').map((item: string) => +item)
      } else {
        formRef.value?.resetFields()
      }
    } else {
      formRef.value?.resetFields()
    }
  })

  const formRule = {
    realName: [{ required: true, message: '请输入姓名' },{maxLength: 10, message: '姓名长度不能超过10个字符'}],

    username: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        validator: async (value: string, call: any) => {
          if (form.userId && value === props.user.username) {
            call()
          } else {
            if (value.length === 0) {
              call('请输入用户名')
              return
            }
            if(value.length > 10 || value.length<2) {
              call('用户名长度2-10个字符')
              return
            }
            const res = await checkUsername(value)
            if (!res) {
              call('用户名已存在')
              return
            }
            call()
          }
        },
      },
    ],
    password: [
      {
        validator: (value: string, call: any) => {
          if (form.userId) {
            call()
          } else {
            if(!value) {
              call('请输入密码')
              return
            }
            if (value.length < 6 || value.length > 12) {
              call('密码长度为6-12位')
              return
            }
            call()
          }
        },
      },
    ],
    mobile: [{ required: true, message: '请输入手机号' },{ match: /^1[3456789]\d{9}$/, message: '手机号格式不正确' }],
    sex: [{ required: true, message: '请选择性别' }],
    deptId: [{ required: true, message: '请选择部门' }],
    roleIds: [{ required: true, message: '请选择角色' }],
  }

  function handleOk() {
    formRef.value?.validate((errors: any) => {
      if (errors) {
        return
      }
      form.roleId = form.roleIds.join(',')
      toggle()
      if (form.userId) {
        updateUser(form)
          .then(() => {
            Message.success('修改成功')
            emits('refresh')
            visible.value = false
          })
          .finally(() => {
            toggle()
          })
      } else {
        addUser(form)
          .then(() => {
            Message.success('新增成功')
            emits('refresh')
            visible.value = false
          })
          .finally(() => {
            toggle()
          })
      }
    })
  }

  onMounted(() => {
    queryDept().then((res: any) => {
      deptTreeData.value = buildDeptTree(res.data)
    })
    queryRoleAll().then((res: any) => {
      roles.value = res.data
    })
  })
</script>

<style lang=""></style>
