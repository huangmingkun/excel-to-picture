<template>
  <div>
    <P>{{data}}</P>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  props: {
    data: ''
  }
}
</script>

<style scoped>
  div p{
    width: 100px;
    margin: 10px;
    padding: 0;
  }
</style>
