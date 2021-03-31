<template>
  <div>
    <v-distpicker wrapper = "distpicker-address-wrapper"></v-distpicker>
    <!--<li>-->
      <!--<div class="left">-->
        <!--<span>所在地区</span>-->
      <!--</div>-->
      <!--<div class="right r">-->
        <!--<div class="city" @click="toAddress">{{city}}</div>-->
        <!--<i class="arrow-r"> </i>-->
      <!--</div>-->
    <!--</li>-->
    <!--<v-distpicker type="mobile" @selected='selected' v-show="addInp">-->
    <!--</v-distpicker>-->
    <!--<div class="mask" v-show="mask"></div>-->
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      // 定义data数据
      city: '请选择',
      addInp: false,
      mask: false
    }
  },
  methods: {
    // 在methods中定义方法
    // 点击弹出三级联动
    toAddress () {
      this.mask = true
      this.addInp = true
    },
    // 省市区三级联动
    selected (data) {
      this.mask = false
      this.addInp = false
      this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.wrapperClass {*/
    /*font-size: 80px;*/
  /*}*/
  .distpicker-address-wrapper select {
    padding: .5rem .75rem;
    height: 40px;
    font-size: 40px !important;
    line-height: 40px;
    color: #464a4c;
    background-color: #fff;
    background-image: none;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: .25rem;
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
