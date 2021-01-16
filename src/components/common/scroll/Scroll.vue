<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{    // 控制是否监听
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted() {
      // 1.创建BScroll对象
       this.scroll = new BScroll(this.$refs.wrapper,{
         click:true,
         probeType:this.probeType,    //不能写死
         pullUpLoad: this.pullUpLoad
      });
       // 2.监听位置
      if(this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll',position=>{
          this.$emit('scroll',position)    /*scroll这个名字随便起，自定义事件 传到外面*/
          /*拿到实时的位置，便于设置底部小按钮*/
        })
      }

      if(this.pullUpLoad){
        /*3.监听上拉事件*/
        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })
      }

    },
    methods:{
      fscrollTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()   /* 完成上拉为传输数据做准备*/
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
