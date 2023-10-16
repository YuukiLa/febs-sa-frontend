import axios from 'axios'

export function getJobLogs(params:any){
  return axios.get(`/job/log`, {params})
}

export default null
