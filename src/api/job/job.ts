import axios from 'axios'
import transformRequest from "@/hooks/transform-request"

export function getJobs(params: any) {
  return axios.get('/job', {params})
}

export function addJob(data: any) {
  return axios.post('/job', data,transformRequest)
}

export function updateJob(data: any) {
  return axios.put('/job', data,transformRequest)
}

export function deleteJob(id: any) {
  return axios.delete(`/job/${id}`)
}


export function runOnce(jobId:number) {
  return axios.get(`/job/run/${jobId}`)
}

export function pause(jobId:number) {
  return axios.get(`/job/pause/${jobId}`)
}

export function resume(jobId:number) {
  return axios.get(`/job/resume/${jobId}`)
}
