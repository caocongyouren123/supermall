<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      imageLoad(){
        if (this.$route.path.indexOf('home')){
          this.$bus.$emit('homeItemImageLoad')  /*用事件总线发射一个名为itemImageLoad的事件*/
        } else if (this.$router.path.indexOf('detail')){
          this.$bus.$emit('detailItemImageLoad')
        }
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      },
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width:46%;
    margin:2px auto;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;

  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;        /*溢出部分隐藏超出的部分显示省略号*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color:var(--color-heigh-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content:'';
    position:absolute;
    width: 14px;
    height: 14px;
    left: -15px;
    top: -1px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
