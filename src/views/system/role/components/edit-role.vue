<template>
  <div>
    <a-card :title="form.roleId ? '编辑' : '新增'">
      <a-form ref="formRef" :model="form">
        <a-form-item v-show="false" field="roleId"></a-form-item>
        <a-form-item
          field="roleName"
          label="角色名"
          :rules="[{ required: true, message: '请输入角色名' }]"
          :validate-trigger="['change', 'input']"
        >
          <a-input v-model="form.roleName" />
        </a-form-item>
        <a-form-item field="remark" label="备注">
          <a-textarea v-model="form.remark" />
        </a-form-item>
        <a-form-item label="菜单联动">
          <a-checkbox v-model:model-value="checkStrictly"></a-checkbox>
        </a-form-item>
        <a-form-item label="菜单" field="menus">
          <a-tree
            ref="menuTree"
            v-model:checked-keys="form.menus"
            :check-strictly="!checkStrictly"
            :checkable="true"
            :selectable="true"
            :data="menuTreeData"
            :show-line="true"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            v-permission="['role:add', 'role:update']"
            type="primary"
            :loading="loading"
            @click="handleOk"
            >提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watchEffect } from 'vue'
  import { addRole, Role, updateRole } from '@/api/system/role'
  import { Message } from '@arco-design/web-vue'
  import useLoading from '@/hooks/loading'
  import { queryMenu } from '@/api/system/menu'
  import { buildMenuTree } from '@/utils/tree'

  const { toggle, loading } = useLoading()
  const formRef = ref<any>(null)
  const menuTree = ref<any>(null)
  const emits = defineEmits(['refresh'])
  const checkStrictly = ref(false)
  const form = ref<Role>({
    roleId: 0,
    roleName: '',
    roleCode: '',
    remark: '',
    menuIds: '',
    menus: [],
  })

  interface Props {
    role: {
      roleId: number
      roleName: string
      roleCode: string
      remark: string
      menuIds: string
    } | null
  }

  const props = defineProps<Props>()

  watchEffect(() => {
    if (props.role?.roleId) {
      form.value = {
        roleId: props.role?.roleId ?? 0,
        roleName: props.role?.roleName ?? '',
        roleCode: props.role?.roleCode ?? '',
        remark: props.role?.remark ?? '',
        menuIds: props.role?.menuIds ?? '',
        menus: [],
      }
      form.value.menus = form.value.menuIds
        ?.split(',')
        .map((item) => Number(item)) as number[]
      // nextTick(() => {
      //   menuTree.value?.expandAll(false)
      //   form.value.menus.forEach(key=> {
      //     menuTree.value?.expandNode(key,true)
      //   })
      // })
    } else {
      formRef.value?.resetFields()
    }
  })

  // todo 校验角色是否存在
  function handleOk() {
    formRef.value?.validate((errors: any) => {
      if (errors) {
        return
      }
      toggle()
      form.value.menuIds = form.value.menus.join(',')
      if (form.value.roleId) {
        updateRole(form.value)
          .then(() => {
            Message.success('修改成功')
            emits('refresh')
            formRef.value?.resetFields()
          })
          .finally(() => {
            toggle()
          })
      } else {
        addRole(form.value)
          .then(() => {
            Message.success('新增成功')
            emits('refresh')
            formRef.value?.resetFields()
          })
          .finally(() => {
            toggle()
          })
      }
    })
  }

  let menus: any[] = []
  const menuTreeData = ref<any[]>([])

  function loadMenuTree() {
    queryMenu().then((res) => {
      menus = res.data
      menuTreeData.value = buildMenuTree(menus)
    })
  }

  onMounted(() => {
    loadMenuTree()
  })
</script>

<style lang="less" scoped></style>
