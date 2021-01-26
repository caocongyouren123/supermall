<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem">
      </tab-menu>
      <tab-control :titles="['综合','新品','销量']" @itemClick="tabClick"
                 class="tab-control"></tab-control>
      <scroll id="tab-content" :data="[categoryData]" ref="scroll" :probe-type="3" @scroll="contentScroll">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
        <tab-content-detail :category-detail="showCategoryDetail"></tab-content-detail>
      </scroll>
      <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import TabControl from "components/content/tabControl/TabControl";
  import NavBar from "components/common/navbar/NavBar";
  import TabMenu from "./childComps/TabMenu";
  import TabContentCategory from "./childComps/TabContentCategory";
  import TabContentDetail from "./childComps/TabContentDetail";
  import BackTop from "components/content/backTop/BackTop";

  import {getCategory,getSubcategory,getCategoryDetail} from 'network/category'
  import {POP,SELL,NEW} from "@/common/const"
  import {tabControlMixin} from "@/common/mixin"
  import {backTopMixin} from "common/mixin"

  export default {
    name: "Category",
    components:{
      NavBar,TabMenu,Scroll,TabContentDetail,TabControl,TabContentCategory,BackTop
    },
    mixins:[tabControlMixin,backTopMixin],
    data(){
      return {
        categories:[],
        categoryData:{},
        currentIndex:-1,
        subcategories:null
      }
    },
    created() {
      // 请求分类数据
      this._getCategory()
    },
    computed:{
      showSubcategory(){
        if(this.currentIndex===-1) return{}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    /*mounted() {
      // 默认情况下BScroll是不可以实时监听的
      // probeType  侦测 默认是0,0和1都是不侦测实时的位置
      // 2:在手指滚动的过程中侦测，由于惯性的滚动不侦测
      // 3：只要是滚动都侦测
      this.scroll=new BScroll('.wrapper',{
        probeType:3,
        pullUpLoad:true
      });
      this.scroll.on('scroll',position=>{
        console.log(position);    /!*拿到实时的位置，便于设置底部小按钮*!/
      });
      this.scroll.on('pullingUp',()=>{
        console.log("上拉加载更多");
      })
    },*/
    methods:{
      _getCategory(){
        getCategory().then(res=>{
          // 1.获取分类数据
          console.log(res);
          this.categories=res.data.category.list
          // 2.初始化每一个类别的子数据
          for(let i=0;i<this.categories.length;i++){
            this.categoryData[i]={
              subcategories:{},
              categoryDetail:{
                'pop':[],
                'sell':[],
                'new':[]
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategory(0)
        })
      },
      _getSubcategory(index){
        this.currentIndex=index;
        const maitKey=this.categories[index].maitKey;
        getSubcategory(maitKey).then(res=>{
          console.log(res);
          this.categoryData[index].subcategories=res.data
          this.categoryData={...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type){
        // 1.获取请求的miniWallkey
        const miniWallkey=this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求，传入miniWallkey和type
        getCategoryDetail(miniWallkey,type).then(res=>{
          console.log(res);
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type]=res
          this.categoryData={...this.categoryData}
        })
      },

      // 事件响应的方法
      selectItem(index){
        this._getSubcategory(index)
      },
      contentScroll(position){
        const positionY=-position.y
        this.isShowBackTop=(-position.y>200)?true:false
      }
    }
  }
</script>

<style scoped>
  #category{
    height: 100vh;
    width: 100vw;
    position: relative;
  }
  .nav-bar{
    text-align: center;
    color: #fff;
    background-color: var(--color-tint);
    font-size: 18px;
  }
  .content {
    position: absolute;
    left: 0px;
    right: 0;
    top: 44px;
    bottom: 49px;

  }
  #tab-content{
    flxe:1;
    height: 100%;
    position:absolute;
    left:100px;
    top:45px;
    bottom: 49px;
    overflow: hidden;
  }
  .tab-control{
    position: absolute;
    top:0px;
    z-index:1000;
    width: 275px;
    margin-left: 100px;
  }
</style>
