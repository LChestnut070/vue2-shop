import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

let requests = axios.create({
  baseURL: "/mock",
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
