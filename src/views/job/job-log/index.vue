<template>
  <div class="container">
    <Breadcrumb :items="['menu.job','menu.job.joblog']"></Breadcrumb>
    <a-card>
      <a-table
          :data="data"
          :columns="column"
          :pagination="pageModel"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
      >
        <template #status="{record}">
          <a-tag v-if="record.status==='0'" color="green">成功</a-tag>
          <a-tag v-else color="red">失败</a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>

import {TableColumnData} from "@arco-design/web-vue/es/table/interface.d"
import {onMounted, ref} from "vue"
import usePage from "@/hooks/pages"
import {getJobLogs} from "@/api/job/jobLog"

const {pageModel, handlePageChange, handlePageSizeChange} = usePage(() => {
})
const data = ref<any[]>([])
const column: TableColumnData[] = [
  {
    title: 'beanName',
    dataIndex: 'beanName',
  },{
    title: '方法名称',
    dataIndex: 'methodName',
  },{
    title: '参数',
    dataIndex: 'params',
    tooltip: true,
  },{
    title: '耗时(ms)',
    dataIndex: 'times',
  },{
    title: '执行结果',
    dataIndex: 'status',
    slotName: 'status'
  },{
    title: '异常信息',
    dataIndex: 'error',
    tooltip: true,
  },{
    title: '执行时间',
    dataIndex: 'createTime',
  }
]

function loadJobLogData() {
    getJobLogs({
      pageNum: pageModel.current,
      pageSize: pageModel.pageSize
    }).then(res=> {
      data.value = res.data.rows
      pageModel.total = res.data.total
    })
}
onMounted(()=> {
  loadJobLogData()
})
</script>

<style scoped>

</style>
