<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.role']" />
    <div>
      <a-row :gutter="20">
        <a-col :span="15">
          <a-card>
            <a-space style="margin-bottom: 10px">
              <a-button
                v-permission="['role:add']"
                type="primary"
                @click="handleAddRole"
                >新增角色
              </a-button>
            </a-space>
            <a-table
              :loading="loading"
              :columns="columns"
              :data="data"
              :pagination="pageModel"
              @page-size-change="handlePageSizeChange"
              @page-change="handlePageChange"
            >
              <template #edit="{ record }">
                <a-space>
                  <a-button
                    v-permission="['role:update']"
                    type="primary"
                    size="mini"
                    @click="edit(record)"
                    >编辑
                  </a-button>
                  <a-popconfirm
                    content="确定要删除吗?"
                    type="warning"
                    @ok="handleDelete(record.roleId)"
                  >
                    <a-button
                      v-permission="['role:delete']"
                      status="warning"
                      size="mini"
                      >删除
                    </a-button>
                  </a-popconfirm>
                </a-space>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col :span="9">
          <edit-role :role="currRole" @refresh="loadRoles" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, provide, onMounted } from 'vue'
  import { deleteRole, queryRole, Role } from '@/api/system/role'
  import { Message } from '@arco-design/web-vue'
  import usePage from '@/hooks/pages'
  import EditRole from './components/edit-role.vue'

  const { pageModel, handlePageChange, handlePageSizeChange } =
    usePage(loadRoles)
  const show = ref<boolean>(false)
  const loading = ref<boolean>(false)
  provide('show', show)
  const data = ref([])
  const currRole = ref<Role | null>(null)

  function edit(role: Role) {
    currRole.value = role
    show.value = true
  }

  function loadRoles() {
    loading.value = true
    currRole.value = null
    queryRole({
      pageNum: pageModel.current,
      pageSize: pageModel.pageSize,
    }).then((res: any) => {
      data.value = res.data.rows
      pageModel.total = res.data.total
      loading.value = false
    })
  }

  function handleAddRole() {
    currRole.value = null
  }

  function handleDelete(id: number) {
    deleteRole(id).then(() => {
      Message.success('删除成功')
      loadRoles()
    })
  }

  const columns = [
    {
      title: '角色名',
      dataIndex: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
    // {
    //   title: '创建时间',
    //   dataIndex: 'createTime',
    // },
    // {
    //   title: '修改时间',
    //   dataIndex: 'modifyTime',
    // },
    {
      title: '编辑',
      slotName: 'edit',
    },
  ]

  onMounted(() => {
    loadRoles()
  })
</script>

<style scoped lang="less"></style>
