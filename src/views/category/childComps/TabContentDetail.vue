<template>
  <div id="tab-content-detail">
    <good-list-item v-for="(item, index) in categoryDetail" :key="index" :goods-item="item">
    </good-list-item>
  </div>
</template>

<script>
  import GoodListItem from 'components/content/goods/GoodListItem'
  export default {
    name: "TabContentDetail",
    components:{
      GoodListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
