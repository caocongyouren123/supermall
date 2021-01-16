<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div @click="service">
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div @click="shop">
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="collect">
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    data(){
      return {
        isShow:false
      }
    },
    methods:{
      addToCart() {
        this.$emit('addCart')
      },
      buy(){
        this.$toast.show('该功能还未开发!')
      },
      shop(){
        this.$toast.show('商家关门别处逛逛吧!')
      },
      service(){
        this.$toast.show('详情联系:4848888!')
      },
      collect(){
        this.$toast.show('收藏成功!')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 49px;
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 13px;
  }

  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 2px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    background-position:0 -52px;
  }

  .bar-left .shop {
    background-position:0 -98px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

</style>
