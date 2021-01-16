
// 封装axios
import axios from "axios"
export function request(config) {
  // 1.创建axios的实例
  const instance=axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout:5000
  })

  // 2.请求拦截
  //   使用条件
  /*1.某些config中的一些信息不符合服务器的要求，可以拦截之后做一些修改
  2.比如每次发送网络请求时，都希望在界面中显示一个请求图标
  3.某些网络请求（比如登录（token））,必须携带一些特殊的信息*/
  instance.interceptors.request.use(config=>{
     return config;
  }, error => {
    console.log(error);
  })

  // 3.响应拦截
  instance.interceptors.response.use(res=>{
    return res.data
  })
  // 4.发送真正的网络请求
  return instance(config)
}
