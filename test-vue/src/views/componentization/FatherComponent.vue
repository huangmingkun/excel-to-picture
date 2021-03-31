<template>
  <div>
    <child-component :data="data1"></child-component>
    <button @click="data1 = 'data1'">改变值</button>
    <child-component :data="data2"></child-component>
    <button @click="data2 = 'data2'">改变值</button>
    <child-component :data="data3"></child-component>
    <button @click="data3 = 'data3'">改变值</button>
  </div>
</template>

<script>
// 局部注册组件
// import childComponent from './ChildComponent'
export default {
  // 局部注册组件
  // components: {childComponent},
  name: 'Componentization',
  data () {
    return {
      data1: 123,
      data2: 456,
      data3: 789
    }
  }
}
</script>

<style scoped>
</style>
