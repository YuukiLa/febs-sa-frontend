<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.dept']" />
    <div>
      <a-row :gutter="20">
        <a-col :span="6">
          <a-spin :loading="loading">
            <a-card>
              <a-space>
                <a-dropdown-button v-permission="['dept:add']" type="primary">
                  新建部门
                  <template #icon>
                    <icon-down />
                  </template>
                  <template #content>
                    <a-doption @click="createParentDept">新建顶部门</a-doption>
                    <a-doption @click="createChildDept">新建子部门</a-doption>
                  </template>
                </a-dropdown-button>
                <a-button v-permission="['dept:delete']" status="warning" @click="removeDept">删除</a-button>
              </a-space>
              <a-tree
                ref="deptTree"
                :data="deptTreeData"
                :show-line="true"
                :default-expand-all="false"
                @select="handleSelect"
              />
            </a-card>
          </a-spin>
        </a-col>
        <a-col :span="18">
          <a-card>
            <a-form ref="formRef" :model="form" @submit="handleSubmit">
              <a-form-item
                v-show="form.parentId && !form.deptId"
                label="父部门"
              >
                <a-input :model-value="currDept?.deptName ?? ''" disabled />
              </a-form-item>
              <a-form-item
                field="deptName"
                label="部门名"
                :rules="[{ required: true, message: '请输入部门名' },{ maxLength: 20, message: '部门名不能超过20个字符' }]"
                :validate-trigger="['change', 'input']"
              >
                <a-input v-model="form.deptName" placeholder="请输入部门名" />
              </a-form-item>
              <a-form-item>
                <a-button v-permission="['dept:add','dept:update']" type="primary" html-type="submit"
                  >提交
                </a-button>
              </a-form-item>
            </a-form>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { TreeNodeData, Message, Modal } from '@arco-design/web-vue'
  import { reactive, ref, onMounted } from 'vue'
  import {
    Dept,
    queryDept,
    addDept,
    updateDept,
    deleteDept,
  } from '@/api/system/dept'
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
  import { buildDeptTree, TreeNode } from '@/utils/tree'
  import useLoading from '@/hooks/loading'

  const { loading, toggle } = useLoading()
  const formRef = ref<any>(null)
  const currDept = ref<Dept | null>(null)
  const deptTree = ref<any>(null)
  const deptTreeData = ref<TreeNode[]>([])
  let depts: Dept[] = []
  const form = reactive<Dept>({
    deptName: '',
    parentId: 0,
    deptId: 0,
  })

  function loadDeptTree() {
    toggle()
    queryDept()
      .then((res: any) => {
        depts = res.data
        deptTreeData.value = buildDeptTree(depts)
      })
      .finally(() => {
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
    if (form.deptId) {
      updateDept(form).then(() => {
        Message.success('更新成功')
        loadDeptTree()
      })
    } else {
      addDept(form).then(() => {
        Message.success('新增成功')
        formRef.value.resetFields()
        form.parentId = currDept.value?.deptId ?? 0
        loadDeptTree()
      })
    }
  }

  function handleSelect(
    _: any,
    data: { selectedNodes: TreeNodeData[]; node?: TreeNodeData }
  ) {
    const dept = depts.find((item) => item.deptId === +(data.node?.key ?? 0))
    if (dept) {
      currDept.value = dept
      form.deptId = dept.deptId
      form.deptName = dept.deptName
      form.parentId = dept.parentId
    }
  }

  function removeDept() {
    const data: TreeNodeData[] = deptTree.value?.getSelectedNodes()
    if (!data.length) {
      Message.warning('请先选择要删除的部门！')
      return
    }
    Modal.warning({
      title: '确定要删除吗？',
      content: '如果有子部门子部门将一并删除！！！',
      hideCancel: false,
      onOk() {
        deleteDept(+(data[0].key ?? 0)).then(() => {
          Message.success('删除成功')
          loadDeptTree()
        })
      },
    })
  }

  function createParentDept() {
    form.deptId = 0
    form.parentId = 0
    form.deptName = ''
  }

  function createChildDept() {
    if (!currDept.value) {
      Message.warning('请先选择父部门！')
      return
    }
    form.deptId = 0
    form.parentId = currDept.value.deptId
    form.deptName = ''
  }

  onMounted(async () => {
    loadDeptTree()
  })
</script>

<style lang="less" scoped>
  .container {
    padding: 0 20px 20px 20px;
  }
</style>
