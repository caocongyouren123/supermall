<!--选项卡-->
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
          :class="{active:index===currentIndex}"
          @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props:{   //通过props将父组件的信息传过来
      titles:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index;
        this.$emit("tabClick",index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    width: 100%;
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    background-color: #fff;
  }
  .tab-control-item{
    flex:1
  }
  .active{
    color: var(--color-heigh-text);
  }
  .active span{
    padding: 3px 6px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
