import axios from 'axios';
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const requests = axios.create({
  // 基础路径
  baseURL: "/api",
  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use(config => {
  nprogress.start();
  // 配置对象，对象里有header请求头
  return config
})

// 相应拦截器
requests.interceptors.response.use((res) => {
  nprogress.done();
  return res.data
}, (error) => {
  console.log("响应失败" + error);
})

// 对外暴露
export default requests;