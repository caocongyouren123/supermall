import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'

Vue.config.productionTip=false
Vue.prototype.$bus=new Vue()

// 安装我们封装的totast插件
Vue.use(toast)
new Vue({
  render: h => h(App),
  store,     //挂载vuex
  router     //挂载路由
}).$mount('#app')
