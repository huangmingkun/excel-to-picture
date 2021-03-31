<template>
  <div id="app" style="height: 100%">
    <el-scrollbar class="page-component__scroll">
      <router-view/>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.page-component__scroll {
  height: calc(100% - 56px);
}
</style>
