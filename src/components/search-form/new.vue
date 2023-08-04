<template>
  <div class="search-wrap">
    <div id="formWrap" :class="expand ? 'form-wrap-expand' : 'form-wrap'">
      <a-form ref="searchFormRef" :model="searchModel" layout="inline">
        <a-form-item
          v-for="item in props.config"
          :key="item.key"
          :label="item.label"
          :field="item.key"
        >
          <component
            :is="item.component"
            v-model="searchModel[item.key]"
            v-bind="{}"
          />
        </a-form-item>
        <div class="btn-wrap">
          <a-space>
            <slot name="button-slot"></slot>
            <a-button type="primary" html-type="submit" @click="handleSearch"
              >搜索</a-button
            >
            <a-button status="warning" @click="handleReset">重置</a-button>
            <div :class="expand ? 'icon-wrap-rotate' : 'icon-wrap'">
              <icon-double-up size="20px" @click="expand = !expand" />
            </div>
          </a-space>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, PropType, reactive, ref } from 'vue'
  import { SearchFormConfig } from '@/types/global'

  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    config: {
      type: Array as PropType<SearchFormConfig[]>,
      default: () => [] as SearchFormConfig[],
      required: true,
    },
  })
  const expand = ref<boolean>(false)
  const searchModel = reactive<any>({
    ...props.modelValue,
  })
  const emit = defineEmits(['update:modelValue', 'handleSearch'])
  const searchFormRef = ref<any>(null)


  function handleSearch() {
    emit('update:modelValue', searchModel)
    console.log(searchModel)
    nextTick(() => {
      emit('handleSearch')
    })
  }

  function handleReset() {
    searchFormRef.value.resetFields()
    emit('update:modelValue', searchModel)
    nextTick(() => {
      emit('handleSearch')
    })
  }

  function getFromHeight() {
    return document.querySelector('#formWrap')?.scrollHeight ?? 0
  }
</script>

<style scoped lang="less">
  .search-wrap {
    position: relative;
    margin-bottom: 40px;

    .form-wrap {
      width: 100%;
      max-height: 40px;
      overflow: hidden;
      transition: all 0.5s ease;

      &-expand {
        max-height: calc(v-bind(getFromHeight()) * 1px);
        height: auto;
        transition: all 0.5s ease;
      }
    }

    .btn-wrap {
      position: absolute;
      width: 100%;
      background-color: #fff;
      bottom: -40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .icon-wrap {
        transform: rotate(0deg);
        transition: all 0.5s;
        font-weight: bold;

        &-rotate {
          transform: rotate(180deg);
          transition: all 0.5s;
        }
      }
    }
  }
</style>
