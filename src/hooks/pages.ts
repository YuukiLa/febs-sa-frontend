import {reactive} from 'vue'
import { PaginationProps } from '@arco-design/web-vue'

export default function usePage(loadFn:any,config?:any) {
  const pageModel = reactive<PaginationProps>({
    current: 1,
    pageSize: 10,
    showPageSize: true,
    total: 0,
    showTotal: true,
    ...config
  })
  function handlePageChange(page: number) {
    pageModel.current = page
    if(loadFn) {
      loadFn()
      scrollToTop()
    }
  }
  function handlePageSizeChange(pageSize: number) {
    pageModel.pageSize = pageSize
    if(loadFn) {
      loadFn()
      scrollToTop()
    }
  }
  function handleSearch() {
    pageModel.current = 1
    if(loadFn) {
      loadFn()
      scrollToTop()
    }
  }
  
  function scrollToTop() {
    window.scrollTo({behavior:'smooth', top: 0})
  }
  
  return {
    pageModel,
    handlePageChange,
    handlePageSizeChange,
    handleSearch
  }
}
