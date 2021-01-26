<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <profile-user></profile-user>

    <div class="account">
      <div class="left content">
        <div><span>0.00元</span></div>
        <div>我的余额</div>
      </div>
      <div class="center content">
        <div><span>0个</span></div>
        <div>我的优惠</div>
      </div>
      <div class="right content">
        <div><span>0分</span></div>
        <div>我的积分</div>
      </div>
    </div>

    <div class="blank"></div>
    <profile-list></profile-list>
    <login-and-registration class="login-registration" :isShow="isShow"></login-and-registration>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import profileUser from "./childcops/profileUser";
  import profileList from "./childcops/profileList";
  import LoginAndRegistration from "./childcops/LoginAndRegistration";
  export default {
    name: "Profile",
    components:{
      NavBar,profileUser,profileList,LoginAndRegistration
    },
    data(){
      return {
        isShow:false
      }
    },
    mounted() {
      this.$bus.$on('LoginRe',()=>{
        this.isShow=!this.isShow
      })
    }
  }
</script>

<style scoped>
  #profile{
    position: relative;
  }
  .nav-bar{
    text-align: center;
    color: #fff;
    background-color: var(--color-tint);
    font-size: 18px;
  }
  .account{
    height: 70px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content{
    height: 100%;
    flex:1 ;
    text-align: center;
    border-right: 1px solid rgb(229, 229, 229);
  }
  .content div{
    margin-top:8px
  }
  .content span{
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .blank{
    height: 20px;
    background-color: #f1f1f1;
  }
  .login-registration{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
