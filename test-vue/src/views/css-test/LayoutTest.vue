<template>
<div class="container">
  <div class="left"></div>
  <div class="right">
    <div class="right-top"></div>
    <div class="right-bottom"></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'LayoutTest'
}
</script>

<style scoped>
  .container {
    display: flex;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-color: white;
  }
  .left {
    width: 50%;
    height: 100vh;
    margin-right: 10px;
    background-color: #00f000;
  }
  .right {
    position: relative;
    width: 50%;
    height: 100vh;
    background-color: white;
  }
  .right-top {
    position: absolute;
    width: 100%;
    height: 50vh;
    background-color: #9a9afb;
  }
  .right-bottom {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 50vh;
    margin-top: 10px;
    background-color: #440044;
  }
</style>
