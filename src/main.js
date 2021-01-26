import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'   // 解决移动端300毫秒延迟问题
import VueLazyload from "vue-lazyload";    // 做图片懒加载

Vue.config.productionTip=false
Vue.prototype.$bus=new Vue()     // 控制中央事件总线
FastClick.attach(document.body)

// 安装我们封装的totast插件
Vue.use(toast)
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')  // 利用require在js中将图片导入
})
new Vue({
  render: h => h(App),
  store,     //挂载vuex
  router     //挂载路由
}).$mount('#app')
