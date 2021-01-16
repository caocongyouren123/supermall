<template>
  <div class="cart">
    <!--1.导航部分-->
    <nav-bar class="nav-cart">
      <div slot="center">购物车
        <span>(共{{cartLength}}件宝贝)</span>
      </div>
    </nav-bar>

    <!--2.商品展示部分-->
    <scroll class="content" ref="scroll">
      <cart-list @imageLoad="imageLoad"></cart-list>
    </scroll>
   <!--3.底部汇总部分-->
    <cart-total></cart-total>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import Scroll from "components/common/scroll/Scroll";
  import CartTotal from "./childComps/CartTotal";

  export default {
    name: "Cart",
    components:{
      NavBar,CartList,Scroll,CartTotal
    },
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      }
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  .nav-cart{
    color: #fff;
    font-size: 18px;
    background-color: var(--color-tint);
  }
  .cart{
    height: 100vh;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top:44px;
    bottom: 93px;
    left: 0;
    right: 0;
  }
  .nav-cart span{
    font-size: 8px;
  }
</style>
