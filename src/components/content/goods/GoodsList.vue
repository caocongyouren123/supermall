<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :goods-item="item"></good-list-item>
  </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
  export default {
    name: "GoodsList",
    components:{
      GoodListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display:flex;
    flex-wrap: wrap;  /*包裹会根据每一张图片的大小自动的分配每一行占据的图片个数*/
    overflow: hidden;
  }
</style>
