import Vue from 'vue'
import VueRouter from "vue-router"

// 懒加载
const Home=()=>import('../views/home/Home')
const Category=()=>import('../views/category/Category')
const Cart=()=>import('../views/cart/Cart')
const Profile=()=>import('../views/profile/Profile')
const Detail=()=>import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由实例
const routes=[
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home,
    meta:{
      title:"首页"
    }
  },
  {
    path:'/category',
    component:Category,
    meta:{
      title:"分类"
    }
  },
  {
    path:'/cart',
    component:Cart,
    meta:{
      title:"购物车"
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: "我的"
    }
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]
const router=new VueRouter({
  routes,
  mode:'history'
})
/*router.beforeEach((to,from,next)=> {
  document.title=to.matched[0].meta.title
  next()
})*/
// 3.导出路由
export default router
