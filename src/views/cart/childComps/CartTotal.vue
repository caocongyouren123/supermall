<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:￥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">结算</span>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  import {mapGetters} from 'vuex'   // 将cartList映射过来
  export default {
    name: "CartTotal",
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        console.log(this.cartList);
        let sum=0
        for(let i of this.cartList){
          if(i.checked){
            sum+=parseFloat(i.price)
          }
        }
        return sum.toFixed(2)
      },
      isSelectAll(){
        // return !(this.cartList.filter(item=>!item.checked).length)
        if(this.cartList.length===0){
          return false
        }else{
          return !(this.cartList.find(item => item.checked === false));
        }
      }
    },
    methods:{
      checkClick(){
        // 如果全选中，让里面所有的都变为不选中
        if(this.isSelectAll){
          this.cartList.forEach(item => item.checked=false)
        }else{    // 部分选中或者全部不选中
          this.cartList.forEach(item => item.checked=true)
        }
      },
      calcClick(){
        if(this.cartList.length===0){
          this.$toast.show('请添加商品!')
        }else {
          this.$toast.show('该功能还未开发!')
        }
      }
    }

  }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    z-index: 999;
    /*box-shadow: 0 0px 3px rgba(0, 0, 0, .2);*/
    font-size: 14px;
    color: #343434;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 110px;
    font-size: 15px;
    color: #212121;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
    font-size: 16px;
    border-radius: 15px;
  }
</style>
