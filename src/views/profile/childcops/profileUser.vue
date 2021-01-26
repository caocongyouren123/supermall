<template>
  <div id="user-info">
    <slot name="user-icon">
      <img class='img-user' src="~assets/img/profile/avatar.svg" alt="">
    </slot>
    <div class="login-info">
      <div class="user">
        <slot name="user-info"><div @click="loginClick">登录 / 注册</div></slot>
      </div>
      <div class="phone">
        <span>
          <img class="img-phone" src="~assets/img/profile/phone.svg" alt="">
        </span>
        <slot name="user-phone"><div @click="phone">暂无绑定的手机号</div></slot>
      </div>
    </div>
    <div>
      <img class="img-right" src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "profileUser",
    methods:{
      loginClick(){
        this.$bus.$emit('LoginRe')
      },
      phone(){
        this.$toast.show('请绑定手机号！')
      }
    }
  }
</script>

<style scoped>
  #user-info{
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    height: 100px;
  }
  .login-info{
    color:#fff;
    font-size: 18px;
    margin-top: 15px;
    margin-left: 75px;
  }
  .img-user{
    width:70px;
    height: 70px;
    float: left;
  }
  .img-phone{
    width: 20px;
    height: 22px;
    float: left;
  }
  .img-right{
    width:22px;
    height: 22px;
    position: absolute;
    right: 10px;
    top: 72px;

  }
</style>
