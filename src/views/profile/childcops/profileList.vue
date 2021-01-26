<template>
  <div id="profile-list">
    <div class="top">
      <div class="content">
        <img src="~assets/img/profile/message.svg" alt="">
        <span @click="message"><slot name="message">我的消息</slot></span>
      </div>
      <div class="content">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span><slot name="total">积分商城</slot></span>
      </div>
      <div class="content">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span @click="vip"><slot name="member">会员卡</slot></span>
      </div>
    </div>
    <div class="blank"></div>
    <div class="bottom">
      <div class="content">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span @click="cart"><slot name="cart">我的购物车</slot></span>
      </div>
      <div class="content">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span><slot name="download">下载购物APP</slot></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "profileList",
    methods:{
      message(){
        this.$toast.show('没有消息！')
      },
      vip(){
        this.$toast.show('您不是会员请登录！')
      },
      cart(){
        this.$toast.show('请前往购物车查看！')
      }
    }
  }
</script>

<style scoped>
  #profile-list img{
    width:25px
  }
  .blank {
    height: 20px;
    background-color: #f1f1f1;
  }
  .content{
    height: 50px;
    margin-left: 10px;
    border-bottom: 1px solid rgb(229, 229, 229);
    display: flex;
    align-items: center;
  }
  #profile-list .content:last-child{
    border-bottom:0
  }
</style>
