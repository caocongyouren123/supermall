<template>
  <div id="login-registration" v-show=isShow>
    <div class="user" >
      <span>用户名：</span>
      <input ref="user" type="text" v-model="message" placeholder="请输入用户名">
    </div>
    <div class="passward">
      <span>密码：</span>
      <input ref="passward" type="password"  placeholder="请输入用密码">
    </div>
    <div class="choice">
      <span @click="logClick">登录</span>
      <span @click="reClick">注册</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginAndRegistration",
    props:{
      isShow:{
        type:Boolean,
        default(){
          return false
        }
      }
    },
    data(){
      return {
        message:'',
      }
    },
    methods:{
      logClick(){
        if(this.$refs.user.value=="tianyanyan" && this.$refs.passward.value==1314520){
          this.$toast.show('登陆成功！')
        }else {
          this.$toast.show('用户名或密码错误!')
        }
      },
      reClick(){
        this.$toast.show('连不上服务器!')
      }
    }
  }
</script>

<style scoped>
  #login-registration{
    width:300px;
    height: 200px;
    background-color: rgba(175, 175, 175, 1);
  }
  .user{
    margin: 30px 15px;
  }
  .passward{
    margin: 0 25px;
  }
  .choice{
    margin: 50px 78px;
  }
  .choice span{
    margin: 0px 20px;
  }
  span{
    font-weight: bold;
  }

</style>
