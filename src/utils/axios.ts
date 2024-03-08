import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // 服务接口请求
  baseURL: '/'
  // 超时设置
  // timeout: 15000,
  // headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token 放在请求头
    // 让每个请求携带自定义token 请根据实际情况自行修改
    // config.headers['Authorization'] = 'Bearer ' + getToken();
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    // 未设置状态码则默认成功状态
    const code = res.data['code'] || 200
    if (code === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res.data)
    }
  },
  (error) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    return Promise.reject(error)
  }
)

export default service
