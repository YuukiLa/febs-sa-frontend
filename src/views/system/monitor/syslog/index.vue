<template>
  <div class="container">
    <Breadcrumb :items="['menu.monitor', 'menu.monitor.syslog']" />
    <a-card>
      <a-table
        :data="data"
        :columns="column"
        :pagination="pageModel"
        @page-change="handlePageChange"
        @page-size-change="handlePageSizeChange"
      ></a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { TableColumnData } from '@arco-design/web-vue/es/table/interface'
  import { onMounted, ref } from 'vue'
  import { getSysLogList } from '@/api/system/syslog'
  import usePage from '@/hooks/pages'

  const { pageModel, handlePageChange, handlePageSizeChange } =
    usePage(loadLogs)
  const data = ref<any[]>([])
  const column: TableColumnData[] = [
    {
      title: '操作人',
      dataIndex: 'username',
    },
    {
      title: '操作内容',
      dataIndex: 'operation',
    },
    {
      title: '耗时',
      dataIndex: 'time',
    },
    {
      title: '操作方法',
      dataIndex: 'method',
    },
    {
      title: '方法参数',
      dataIndex: 'params',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作地点',
      dataIndex: 'location',
    },
  ]

  function loadLogs() {
    getSysLogList({
      pageNum: pageModel.current,
      pageSize: pageModel.pageSize,
    }).then((res: any) => {
      pageModel.total = res.total
      data.value = res.rows
    })
  }

  onMounted(() => {
    loadLogs()
  })
</script>

<style scoped></style>
