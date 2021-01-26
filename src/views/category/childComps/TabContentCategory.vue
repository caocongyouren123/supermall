<template>
  <div id="tab-content-detail">
    <div class="item" v-for="(item,index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="">
        <div class="item-text">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabContentCategory",
    props:{
      subcategories:{
        type:Object,
        dafault(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  #tab-content-detail{
    margin-left: 37.5px;
    margin-top: 5px;
  }
  .panel img {
    width: 100%;
  }
  .item {
    text-align: center;
    width:100px;
    font-size: 12px;
    display: inline-block;
  }

  .item-img {
    width: 100%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>
