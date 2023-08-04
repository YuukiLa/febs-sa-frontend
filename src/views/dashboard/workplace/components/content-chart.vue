<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :bordered="false"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      title="近七天销售数据"
    >
      <Chart height="289px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { graphic } from 'echarts'
  import useLoading from '@/hooks/loading'
  import useChartOption from '@/hooks/chart-option'
  import { ToolTipFormatterParams } from '@/types/echarts'

  const { loading } = useLoading(false)
  const xAxis = ref<string[]>([])
  const chartsData = ref<number[]>([])

  const { chartOption } = useChartOption(() => {
    return {
      grid: {
        right: '0',
        top: '10',
        bottom: '30',
      },
      xAxis: {
        type: 'category',
        offset: 2,
        data: xAxis.value,
        boundaryGap: false,
        axisLabel: {
          color: '#4E5969',
          formatter(value: number, idx: number) {
            if (idx === 0) return ''
            if (idx === xAxis.value.length - 1) return ''
            return `${value}`
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          interval: (idx: number) => {
            if (idx === 0) return false
            if (idx === xAxis.value.length - 1) return false
            return true
          },
          lineStyle: {
            color: '#E5E8EF',
          },
        },
        axisPointer: {
          show: true,
          lineStyle: {
            color: '#23ADFF',
            width: 2,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter(value: any, idx: number) {
            if (idx === 0) return value
            return `${value}`
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter(params) {
          const [firstElement] = params as ToolTipFormatterParams[]
          return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            <div class="content-panel"><span>销售额</span><span class="tooltip-value">${(
              Number(firstElement.value)
            ).toLocaleString()}</span></div>
          </div>`
        },
        className: 'echarts-tooltip-diy',
      },
      series: [
        {
          data: chartsData.value,
          type: 'line',
          smooth: true,
          // symbol: 'circle',
          symbolSize: 12,
          emphasis: {
            focus: 'series',
            itemStyle: {
              borderWidth: 2,
            },
          },
          lineStyle: {
            width: 3,
            color: new graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(30, 231, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(36, 154, 255, 1)',
              },
              {
                offset: 1,
                color: 'rgba(111, 66, 251, 1)',
              },
            ]),
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(17, 126, 255, 0.16)',
              },
              {
                offset: 1,
                color: 'rgba(17, 128, 255, 0)',
              },
            ]),
          },
        },
      ],
    }
  })
  onMounted(() => {
      xAxis.value = ['2023-08-01', '2023-08-02', '2023-08-03', '2023-08-04', '2023-08-05', '2023-08-06', '2023-08-07']
      chartsData.value = [100,200,150,500,432,134,999]
  })
</script>

<style scoped lang="less"></style>
