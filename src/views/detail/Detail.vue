<template>
  <div id="detail" class="detail">
    <detail-nav-bar class="detail-item" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
<!--    <toast></toast>-->
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "components/content/backTop/BackTop";

  import Scroll from "components/common/scroll/Scroll";

  import {getDetail,getRecommend,Goods,Shop,GoodsParams} from "network/detail";
  import {debounce} from "common/utils";
  import {backTopMixin} from "common/mixin"
  import {mapActions} from 'vuex'  // 将actions直接映射过来

  export default {
    name: "Detail",
    components:{
      DetailNavBar,DetailSwiper,DetailBaseInfo,DetailShopInfo,Scroll,DetailGoodsInfo,
      DetailParamInfo,DetailCommentInfo,GoodsList,DetailBottomBar,BackTop
    },
    mixins:[backTopMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0,
      }
    },
    created() {
      // 1.保存iid
      this.iid=this.$route.params.iid,

      // 2.根据保存的iid请求数据
      getDetail(this.iid).then(res=>{
        // （1）获取顶部的轮播图
        const data=res.result
        this.topImages=data.itemInfo.topImages
        // （2）获取商品信息 通过类封装的思想整合到一起
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // （3）获取店铺信息
        this.shop=new Shop(data.shopInfo)
        // （4）获取商品详细信息
        this.detailInfo=data.detailInfo
        // （5）获取参数信息
        this.paramInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)
        //（6）获取评论信息
        if(data.rate.cRate !==0){
          this.commentInfo=data.rate.list[0]
        }
      }),

      // 3.获取推荐数据
      getRecommend().then(res=>{
        console.log(res);
        this.recommends=res.data.list
      })
      // 4.给getThemeTopY赋值,在这里计算能够确保是图片加载完成之后，拿到正确的值
      this.getThemeTopY=debounce(()=>{
        this.themeTopYs=[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },200)
    },
    mounted() {
      this.$bus.$on('detailItemImageLoad',()=>{
        refresh()
      })
    },
    methods:{
      /*// ...mapActions(['addCart']),  映射mapActions*/
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.fscrollTo(0,-this.themeTopYs[index],1000)
      },
      contentScroll(position){
        const positionY=-position.y
        let length=this.themeTopYs.length
        for(let i =0;i<length;i++){
          if( this.currentIndex!==i && ((i<length-1 && positionY>=this.themeTopYs[i]) && positionY<this.themeTopYs[i+1]
            || (i===length-1 && positionY>=this.themeTopYs[i]))){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex
          }
        }
        this.isShowBackTop=(-position.y>1000)?true:false
      },
      addToCart(){
        // 1.获取购物车需要展示的信息
        const product={}
        product.image=this.topImages[0]
        product.title=this.goods.title
        product.desc=this.goods.desc
        product.price=this.goods.realPrice
        product.iid=this.iid

        // 2.将商品添加到购物车里面
        // this.$store.commit('addCart',product)
        /*this.addCart(product).then(res=>{
          console.log(res);
        })  */  /*映射写法*/

        /*通过dispatch写法*/
        this.$store.dispatch('addCart',product).then(res=>{
          this.$toast.show(res)
        })
      }
    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height:100vh;
  }
  .detail-item{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /*.content{
    height: calc(100% - 44px);   !*设置滚动范围*!
  }*/
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
