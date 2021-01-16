<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    components:{
    },
    props:{   //通过props将父组件的信息传过来
      recommends:{
        type:Array,
        default(){
          return []
        }
      }
    },
  }
</script>

<style scoped>
  .recommend{
    width: 100%;
    display: flex;
    margin: 8px auto;
    text-align: center;
    font-size: 15px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 68px;
    height: 68px;
    margin-bottom: 4px;
  }
</style>
