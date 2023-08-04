export interface AnyObject {
  [key: string]: unknown
}

export interface Options {
  value: unknown
  label: string
}

export interface NodeOptions extends Options {
  children?: NodeOptions[]
}

export interface GetParams {
  body: null
  type: string
  url: string
}

export interface PostData {
  body: string
  type: string
  url: string
}

export interface Pagination {
  current: number
  pageSize: number
  total?: number
}

export type TimeRanger = [string, string]

export interface GeneralChart {
  xAxis: string[]
  data: Array<{ name: string; value: number[] }>
}

/**
 * 搜索组件配置
 */
export interface SearchFormConfig {
  component: 'a-input' | 'a-select' | 'a-date-picker' | 'a-range-picker',
  key: string,
  label: string,
  props?: any
}
