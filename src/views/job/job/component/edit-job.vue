<template>
  <div>
    <a-modal
        v-model:visible="show"
        title="配置任务"
    >
      <div>
        <a-form ref="formRef" :model="formModel" :rules="rules">
          <a-form-item label="bean名称" field="beanName">
            <a-input v-model="formModel.beanName"/>
          </a-form-item>
          <a-form-item label="方法名" field="methodName">
            <a-input v-model="formModel.methodName"/>
          </a-form-item>
          <a-form-item label="参数" field="params">
            <a-input v-model="formModel.params"/>
          </a-form-item>
          <a-form-item label="cron表达式" field="cronExpression">
            <a-input v-model="formModel.cronExpression"/>
          </a-form-item>
          <a-form-item v-if="formModel.jobId" label="状态" field="status">
            <a-select v-model="formModel.status">
              <a-option value="0">运行</a-option>
              <a-option value="1">暂停</a-option>
            </a-select>
          </a-form-item>
          <a-form-item label="备注" field="remark">
            <a-textarea v-model="formModel.remark"/>
          </a-form-item>
        </a-form>
      </div>
      <template #footer>
        <a-button @click="show = false">取消</a-button>
        <a-button type="primary" @click="handleSubmit">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import {inject, reactive, Ref, ref, watch} from "vue"
import {addJob, updateJob} from "@/api/job/job"
import {Message} from "@arco-design/web-vue"

const props = defineProps({
  job: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['refresh'])

const formRef = ref<any>(null)
const show:Ref<boolean> = inject<Ref<boolean>>("show", ref(false))
const formModel = reactive({
  jobId: '',
  beanName: '',
  methodName: '',
  params: '',
  cronExpression: '',
  status: '1',
  remark: ''
})

const rules = {
  beanName: [
    {required: true, message: '请输入bean名称', trigger: 'blur'}
  ],
  methodName: [
    {required: true, message: '请输入方法名称', trigger: 'blur'}
  ],
  cronExpression: [
    {required: true, message: '请输入cron表达式', trigger: 'blur'}
  ]
}
watch(() => show.value, () =>{
  if(show.value) {
    if(props.job.jobId) {
      formModel.jobId = props.job.jobId
      formModel.beanName = props.job.beanName
      formModel.methodName = props.job.methodName
      formModel.params = props.job.params
      formModel.cronExpression = props.job.cronExpression
      formModel.status = props.job.status
      formModel.remark = props.job.remark
    }else {
      formModel.jobId = ''
      formModel.beanName = ''
      formModel.methodName = ''
      formModel.params = ''
      formModel.cronExpression = ''
      formModel.status = '1'
      formModel.remark = ''
    }
  }else {
    formRef.value?.resetFields()
  }
})

function handleSubmit() {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      if(formModel.jobId) {
        // 修改
        updateJob(formModel).then(()=> {
          Message.success('操作成功')
          show.value =false
          emit('refresh')
        })
      }else {
        // 新增
        addJob(formModel).then(()=> {
          Message.success('操作成功')
          show.value =false
          emit('refresh')
        })
      }
    }
  })
}
</script>

<style scoped>

</style>


