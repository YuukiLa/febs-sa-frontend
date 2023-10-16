<template>
  <div class="container">
    <Breadcrumb :items="['menu.job','menu.job.job']"></Breadcrumb>
    <a-card>
      <a-space style="margin-bottom: 10px">
        <a-button type="primary" @click=";(currJob={})&&(nextTick(()=> show=true))" v-permission="['job:add']">新增</a-button>
      </a-space>
      <a-table
          :data="data"
          :columns="column"
          :pagination="pageModel"
          :loading="loading"
          :scroll="{x:1000}"
          scrollbar
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
      >
        <template #status="{record}">
          <a-tag v-if="record.status==='0'" color="green">运行</a-tag>
          <a-tag v-else>暂停</a-tag>
        </template>
        <template #opt="{record}">
          <a-space>
            <a-button type="primary" size="mini" @click="showEdit(record)" v-permission="['job:update']">编辑</a-button>
            <a-button status="danger" size="mini" @click="handleDelete(record.jobId)" v-permission="['job:delete']">删除</a-button>
            <a-dropdown>
              <a-button size="mini">更多
                <icon-down/>
              </a-button>
              <template #content>
                <a-doption @click="handleRunOnce(record.jobId)" v-permission="['job:run']">运行一次</a-doption>
                <a-doption v-if="record.status==='0'" @click="handlePause(record.jobId)" v-permission="['job:pause']">暂停</a-doption>
                <a-doption v-else @click="handleResume(record.jobId)" v-permission="['job:resume']">恢复</a-doption>
              </template>
            </a-dropdown>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <edit-job :job="currJob" @refresh="handleSearch"></edit-job>
  </div>
</template>

<script lang="ts" setup>

import {TableColumnData} from "@arco-design/web-vue/es/table/interface.d"
import usePage from "@/hooks/pages"
import {deleteJob, getJobs, pause, resume, runOnce} from "@/api/job/job"
import {nextTick, onMounted, provide, ref} from "vue"
import useLoading from "@/hooks/loading"
import EditJob from "@/views/job/job/component/edit-job.vue"
import {Message, Modal} from "@arco-design/web-vue"

const {pageModel, handlePageChange, handlePageSizeChange, handleSearch} = usePage(loadJobData)
const data = ref<any[]>([])
const {loading, toggle} = useLoading()
const show = ref(false)
const currJob = ref({})
provide('show', show)
const column: TableColumnData[] = [
  {
    dataIndex: 'jobId',
    title: '任务id'
  }, {
    dataIndex: 'beanName',
    title: 'bean名称'
  }, {
    dataIndex: 'methodName',
    title: '方法名称'
  }, {
    dataIndex: 'params',
    title: '参数',
    tooltip: true
  }, {
    dataIndex: 'cronExpression',
    title: 'cron表达式',
    width: 180
  }, {
    dataIndex: 'remark',
    title: '备注'
  }, {
    dataIndex: 'status',
    title: '状态',
    slotName: 'status'
  }, {
    dataIndex: 'createTime',
    title: '创建时间'
  }, {
    slotName: 'opt',
    title: '操作',
    fixed: 'right',
    width: 200
  }
]

function showEdit(row: any) {
  currJob.value = row
  nextTick(() => {
    show.value = true
  })
}

function handleRunOnce(jobId: number) {
  runOnce(jobId).then(() => {
    Message.success('执行成功')
  })
}
function handlePause(jobId:number) {
  pause(jobId).then(()=> {
    Message.success('暂停成功')
    loadJobData()
  })
}

function handleResume(jobId:number) {
  resume(jobId).then(()=> {
    Message.success('恢复成功')
    loadJobData()
  })
}

function handleDelete(jobId:number) {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除该任务吗？',
    hideCancel: false,
    onOk: () => {
      deleteJob(jobId).then(()=> {
        Message.success('删除成功')
        loadJobData()
      })
    }
  })

}

function loadJobData() {
  toggle()
  getJobs({
    pageNum: pageModel.current,
    pageSize: pageModel.pageSize
  }).then((res: any) => {
    data.value = res.data.rows
    pageModel.total = res.data.total
    currJob.value = {}
  }).finally(toggle)
}

onMounted(() => {
  loadJobData()
})
</script>

<style scoped>

</style>
