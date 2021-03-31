import Vue from 'vue'
import App from './App'
import router from './router'
// 引入echarts
import echarts from 'echarts'
// kindeditor引入
import VueKindEditor from './plugin/kindeditor.js'
import '../static/kindeditor/themes/default/default.css'
import '../static/kindeditor/kindeditor-all-min.js'
import '../static/kindeditor/lang/zh-CN.js'
// 引入公共样式
import './assets/css/common.css'
// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
// vue-gemini-scrollbar引入
import GeminiScrollbar from 'vue-gemini-scrollbar'
// 全局引入组件
import ChildComponent from './views/componentization/ChildComponent'
import VDistpicker from 'v-distpicker' // 引入安装好的包
// 全局注册组件
Vue.component('ChildComponent', ChildComponent)
Vue.component('VDistpicker', VDistpicker)
Vue.use(GeminiScrollbar)
Vue.use(ElementUI)
Vue.use(VueKindEditor)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
