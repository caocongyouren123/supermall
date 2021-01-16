<template>
  <div class="tab-bar-item" @click="btn">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!--<img src="../../assets/img/tabbar/首页1.png" />
    <div>首页</div>-->
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'#ff5777'
      }
    },
    data(){
      return {
      }
    },
    methods:{
      btn(){
        console.log('btn');
        this.$router.replace(this.path)
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 26px;
    height: 26px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top: 1px;
  }
  /*.active{
    color: #ff3506;
  }*/
</style>
