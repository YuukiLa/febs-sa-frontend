import qs from 'query-string'

export default {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    (data: any) => {
      // const formData = new FormData()
      // Object.keys(data).forEach(key=> {
      //   formData.append(key, data[key])
      // })
      return qs.stringify(data)
    },
  ],
}
