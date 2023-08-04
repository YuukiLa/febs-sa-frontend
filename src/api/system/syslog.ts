import axios from 'axios'

export const getSysLogList = (params: any) => {
  return axios.get('/log/page', { params })
}

export default null
