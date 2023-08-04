<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.menu']" />
    <div>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-spin :loading="loading">
            <a-card>
              <a-space>
                <a-dropdown-button v-permission="['menu:add']" type="primary">
                  新建菜单
                  <template #icon>
                    <icon-down />
                  </template>
                  <template #content>
                    <a-doption @click="createParentMenu">新建顶菜单</a-doption>
                    <a-doption @click="createChildMenu">新建子菜单</a-doption>
                  </template>
                </a-dropdown-button>
                <a-button v-permission="['menu:delete']" status="warning" @click="removeMenu">删除</a-button>
              </a-space>
              <a-tree
                ref="menuTree"
                :data="menuTreeData"
                :show-line="true"
                :default-expand-all="false"
                @select="handleSelect"
              />
            </a-card>
          </a-spin>
        </a-col>
        <a-col :span="18">
          <a-card>
            <a-form
              ref="formRef"
              :model="form"
              :rules="rules"
              @submit="handleSubmit"
            >
              <a-form-item v-show="false" field="menuId"></a-form-item>
              <a-form-item
                v-show="form.parentId && !form.menuId"
                label="父菜单"
                field="parentId"
              >
                <a-input :model-value="currMenu?.menuName ?? ''" disabled />
              </a-form-item>
              <a-form-item label="菜单名" field="menuName">
                <a-input v-model="form.menuName" placeholder="请输入菜单名" />
              </a-form-item>
              <a-form-item label="菜单类型" field="type">
                <a-radio-group v-model="form.type">
                  <a-radio value="0">菜单</a-radio>
                  <a-radio value="1">按钮</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item
                v-show="form.type === '0'"
                label="菜单图标"
                field="icon"
              >
                <a-input v-model="form.icon" placeholder="请输入菜单图标" />
              </a-form-item>
              <a-form-item
                v-show="form.type === '0'"
                label="菜单路径"
                field="path"
              >
                <a-input v-model="form.path" placeholder="请输入菜单路径" />
              </a-form-item>
              <a-form-item
                  v-show="form.type === '0'"
                  label="组件路径"
                  field="component"
              >
                <a-input v-model="form.component" placeholder="请输入组件路径" />
              </a-form-item>
              <a-form-item label="权限标识" field="perms">
                <a-input v-model="form.perms" placeholder="请输入权限标识" />
              </a-form-item>
              <a-form-item
                v-show="form.type === '0'"
                label="排序号"
                field="orderNum"
              >
                <a-input-number v-model="form.orderNum" />
              </a-form-item>
              <a-form-item>
                <a-button v-permission="['menu:update','menu:add']" type="primary" html-type="submit">保存</a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import { buildMenuTree, TreeNode } from '@/utils/tree'
  import {
    addMenu,
    deleteMenu,
    Menu,
    queryMenu,
    updateMenu,
  } from '@/api/system/menu'
  import { Message, Modal, TreeNodeData } from '@arco-design/web-vue'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
  import useLoading from '@/hooks/loading'

  const { loading, toggle } = useLoading()
  const formRef = ref<any>(null)
  const currMenu = ref<Menu | undefined>(undefined)
  const menuTree = ref<any>(null)
  const menuTreeData = ref<TreeNode[]>([])
  let menus: Menu[] = []
  const form = reactive<Menu>({
    menuId: 0,
    parentId: 0,
    menuName: '',
    orderNum: 0,
    path: '',
    perms: '',
    icon: null,
    type: '0',
    component: '',
  })
  const rules = {
    menuName: [
      { required: true, message: '请输入菜单名', trigger: 'blur' },
      { minLength: 2, maxLength: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    ],
    path: [
      {
        validator: (value: string, cb: any) => {
          if (form.type === '0' && !value) {
            cb(new Error('请输入菜单路径'))
          } else {
            cb()
          }
        },
      },
    ],
    component: [
      {
        validator: (value: string, cb: any) => {
          if (form.type === '0' && !value) {
            cb(new Error('请输入组件路径'))
          } else {
            cb()
          }
        },
      },
    ],
    orderNum: [
      { type: 'number', message: '排序号必须为数字值', trigger: 'blur' },
    ],
  }

  function loadMenuTree() {
    toggle()
    queryMenu().then((res) => {
      menus = res.data
      menuTreeData.value = buildMenuTree(menus)
    }).finally(() => {
      toggle()
    })
  }

  function handleSubmit({
    errors,
  }: {
    errors: Record<string, ValidatedError> | undefined
    values: Record<string, any>
  }) {
    if (errors) {
      return
    }
    if (form.menuId) {
      updateMenu(form).then(() => {
        Message.success('更新成功')
        loadMenuTree()
      })
    } else {
      addMenu(form).then(() => {
        Message.success('新增成功')
        formRef.value.resetFields()
        form.parentId = currMenu.value?.menuId ?? 0
        loadMenuTree()
      })
    }
  }

  function handleSelect(
    _: any,
    data: { selectedNodes: TreeNodeData[]; node?: TreeNodeData }
  ) {
    currMenu.value = menus.find((item) => item.menuId === data.node?.key ?? 0)
    if (currMenu.value) {
      form.menuId = currMenu.value.menuId
      form.parentId = currMenu.value.parentId
      form.menuName = currMenu.value.menuName
      form.orderNum = currMenu.value.orderNum
      form.path = currMenu.value.path
      form.perms = currMenu.value.perms
      form.icon = currMenu.value.icon
      form.type = currMenu.value.type
      form.component = currMenu.value.component
    }
  }

  function createParentMenu() {
    form.menuId = 0
    form.parentId = 0
    form.menuName = ''
    form.orderNum = 0
    form.path = ''
    form.perms = ''
    form.component = ''
    form.icon = null
    form.type = '0'
  }

  function createChildMenu() {
    if (!currMenu.value) {
      Message.warning('请先选择父级菜单！')
      return
    }
    if (currMenu.value.type === '1') {
      Message.warning('按钮类型不能作为父级菜单！')
      return
    }
    form.menuId = 0
    form.parentId = currMenu.value.menuId
    form.menuName = ''
    form.orderNum = 0
    form.path = ''
    form.perms = ''
    form.component = ''
    form.icon = null
    form.type = '0'
  }

  function removeMenu() {
    const data: TreeNodeData[] = menuTree.value?.getSelectedNodes()
    if (!data.length) {
      Message.warning('请先选择要删除的菜单！')
      return
    }
    Modal.warning({
      title: '确定要删除吗？',
      content: '如果有子菜单子菜单将一并删除！！！',
      hideCancel: false,
      onOk() {
        deleteMenu(+(data[0].key ?? 0)).then(() => {
          Message.success('删除成功')
          loadMenuTree()
          form.menuId = 0
          form.parentId = 0
          form.menuName = ''
          form.orderNum = 0
          form.path = ''
          form.perms = ''
          form.component = ''
          form.icon = null
          form.type = '0'
        })
      },
    })
  }

  onMounted(() => {
    loadMenuTree()
  })
</script>

<style scoped lang="less"></style>
