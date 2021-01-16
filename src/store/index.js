import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import getters from "./getters"
import actions from "./actions"

// 1.安装插件
Vue.use(Vuex);

// 2.创建store对象
const store=new Vuex.Store({
  state: {
    cartList: []
  },
  mutations,
  getters,
  actions,
})
// 3.为了挂载到vue上，导出
export default store
