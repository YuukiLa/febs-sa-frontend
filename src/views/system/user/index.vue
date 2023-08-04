<template>
  <div class="container">
    <Breadcrumb :items="['menu.system', 'menu.system.user']" />
    <a-card hoverable class="general-card">
      <template #title>
        <span></span>
      </template>

      <a-row>
        <a-col :flex="1">
          <a-form
            ref="searchFormRef"
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="username" label="用户名">
                  <a-input
                    v-model="formModel.username"
                    placeholder="请输入用户名"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button
              v-permission="['user:add']"
              type="primary"
              @click=";(currUser = {}) && (visible = true)"
            >
              <template #icon>
                <icon-plus />
              </template>
              新建用户
            </a-button>
          </a-space>
        </a-col>
        <!--        <a-col-->
        <!--          :span="12"-->
        <!--          style="display: flex; align-items: center; justify-content: end"-->
        <!--        >-->
        <!--          <a-button>-->
        <!--            <template #icon>-->
        <!--              <icon-download />-->
        <!--            </template>-->
        <!--            {{ $t('searchTable.operation.download') }}-->
        <!--          </a-button>-->
        <!--        </a-col>-->
      </a-row>
      <a-table
        :columns="columns"
        :data="tableData"
        :pagination="pageModel"
        :loading="loading"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      >
        <template #sex="{ record }">
          {{ dict(`system.user.sex.${record.sex}`) }}
        </template>
        <template #status="{ record }">
          <a-tag :color="dict(`system.user.status.${record.status}`).color">
            {{ dict(`system.user.status.${record.status}`).text }}
          </a-tag>
        </template>
        <template #operation="{ record }">
          <a-space>
            <a-button
              v-permission="['user:update']"
              type="primary"
              size="mini"
              @click="handleEdit(record)"
              >编辑
            </a-button>
            <a-dropdown>
              <a-button size="mini">更多</a-button>
              <template #content>
                <a-doption
                  v-permission="['user:delete']"
                  @click="handleDelete(record)"
                  >删除
                </a-doption>
                <a-doption @click="handleResetPwd(record)">重置密码</a-doption>
                <!--                <a-doption v-show="record.status === '1'">锁定</a-doption>-->
                <!--                <a-doption v-show="record.status === '0'">解锁</a-doption>-->
              </template>
            </a-dropdown>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <user-modal :user="currUser" @refresh="loadUsers"></user-modal>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, provide, reactive, ref } from 'vue'
  import { TableColumnData } from '@arco-design/web-vue/es/table/interface'
  import { Modal, Message } from '@arco-design/web-vue'
  import { deleteUser, queryUser, resetPwd, User } from '@/api/system/user'
  import useDict from '@/hooks/dict'
  import UserModal from '@/views/system/user/component/user-modal.vue'
  import useLoading from '@/hooks/loading'
  import usePage from '@/hooks/pages'

  const searchFormRef = ref<any>(null)
  const dict = useDict()
  const { loading, toggle } = useLoading()
  const visible = ref<boolean>(false)
  const currUser = ref({})
  provide('visible', visible)
  const { pageModel, handlePageChange, handlePageSizeChange } =
    usePage(loadUsers)
  const tableData = ref([])
  const formModel = reactive({
    username: '',
  })
  const columns: TableColumnData[] = [
    {
      title: '姓名',
      dataIndex: 'realName',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      slotName: 'sex',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '手机',
      dataIndex: 'mobile',
    },
    {
      title: '状态',
      dataIndex: 'status',
      slotName: 'status',
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      slotName: 'operation',
    },
  ]

  function loadUsers() {
    toggle()
    queryUser({
      pageNum: pageModel.current,
      pageSize: pageModel.pageSize,
      ...formModel,
    })
      .then((res: any) => {
        pageModel.total = res.data.total
        tableData.value = res.data.rows
      })
      .finally(() => {
        toggle()
      })
  }

  function handleEdit(record: any) {
    currUser.value = record
    nextTick(() => {
      visible.value = true
    })
  }

  function handleDelete(data: User) {
    Modal.warning({
      title: '提示',
      content: '是否要删除该用户？',
      hideCancel: false,
      onOk() {
        deleteUser(data.userId).then(() => {
          Message.success('删除用户成功')
          loadUsers()
        })
      },
    })
  }

  function handleResetPwd(data: User) {
    resetPwd({ usernames: data.username }).then(() => {
      Message.success('重置密码成功')
    })
  }

  function search() {
    loadUsers()
  }

  function reset() {
    searchFormRef.value?.resetFields()
    loadUsers()
  }

  onMounted(() => {
    loadUsers()
  })
</script>

<style scoped lang="less"></style>
