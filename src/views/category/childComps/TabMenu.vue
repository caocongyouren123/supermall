<template>
  <div id="tab-menu">
    <scroll class="content">
      <div class="menu-list">
        <div class="menu-list-item"
             v-for="(item,index) in categories"
             :class='{active:index===currentIndex}' :key="index"
             @click="itemClick(index)">{{item.title}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  export default {
    name: "TabMenu",
    components:{
      Scroll
    },
    props:{
      categories:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex:0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index
        this.$emit('selectItem',index)
      }
    }
  }
</script>

<style scoped>
  #tab-menu {
    background-color: #f6f6f6;
    height: 100vh;
    width: 100px;
    box-sizing: border-box;
    position: relative;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:0px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .menu-list-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active{
    font-weight: 700;
    color: var(--color-heigh-text);
    background-color: #fff;
    border-left: 3px solid var(--color-heigh-text);
  }
</style>
