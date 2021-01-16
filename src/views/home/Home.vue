<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1"
                 class="tab-control" v-show="isShowTabControl"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"
                   ></tab-control>
      <goods-list :goods='showGoods'></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>  <!--组件是不可以直接监听的必须加上.native才可以-->
  </div>
</template>

<script>

  // 公共组件
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {debounce} from 'common/utils'

  // 子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommend from "./childComps/HomeRecommend";
  import HomeFeature from "./childComps/HomeFeature";

  // 网络请求组件
  import {getHomeMultidata,getHomeGoods} from "network/home";


  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isShowTabControl:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.fscrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY=this.$refs.scroll.getScrollY()
    },
    created(){
      // 组件创建完成就发送网络请求，使用生命周期函数
      // 1.请求多个数据
      this.getHomeMultidata();

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 注意：不可以在created里面拿document元素

    },
    mounted() {
      // 设置函数防抖
      const refresh=debounce(this.$refs.scroll.refresh,200)

      /*解决图片轮动问题，每次只要加载一张图片出来就让他更新ScrollHeight高度*/
      this.$bus.$on('homeItemImageLoad',()=>{
        refresh()
      })
    },
    methods:{
      // 事件监听相关的方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop'
            break
          case 1:
            this.currentType='new'
            break
          case 2:
            this.currentType='sell'
            break
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
        this.$refs.scroll.fscrollTo(0,-this.tabOffsetTop,500)
      },
      backClick(){
        this.$refs.scroll.fscrollTo(0,0)
      },
      contentScroll(position){
        // 1.上拉判断BackTop是否显示
        this.isShowBackTop=(-position.y>1000)?true:false
        // 2.上拉决定tabControl是否吸顶（position:fixed）
        this.isShowTabControl=(-position.y>this.tabOffsetTop)?true:false
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        // 设置吸顶拿到tabOffsetTop
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },

      // 网络请求相关的方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type, page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page+=1
          this.$refs.scroll.finishPullUp()  /*因为pullingUp只会执行一次，所以加上finishPullUp*/
        })
      }
    }
  }
</script>

<style scoped>   /*scopde作用域*/
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
 .home-nav{
   background-color: var(--color-tint);
   color:white;
   font-size: 18px;
 /*  position: fixed;
   left: 0;
   right: 0;
   top:0;
   z-index: 10;*/
 }

  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
.tab-control{
  position: relative;
  z-index: 10;
}
</style>
