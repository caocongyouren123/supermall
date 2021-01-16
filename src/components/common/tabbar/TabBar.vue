<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #e8e8e8;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 -3px 1px rgba(194, 194, 194, 0.5);
    font-size: 15px;
    font-weight: 500;
  }
</style>