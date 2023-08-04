import axios from 'axios'

export const getOrderCount = () => {
  return axios.get('/order/count')
}

export const getOrderCharts7Day = () => {
  return axios.get('/order/countCharts7day')
}
export default null
