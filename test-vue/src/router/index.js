import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AttendanceCharts from '@/views/echart-test/AttendanceCharts'// vue+echart考勤统计表
import Animation from '@/views/excessive-animation/Animation' // 过度动画练习
import WatchTest from '@/views/computed-watch/WatchTest' // 过度动画练习
import LiHoverPicture from '@/views/css-test/LiHoverPicture' // 过度动画练习
import LayoutTest from '@/views/css-test/LayoutTest' // 布局练习
import CssTest from '@/views/css-test/CssTest' // css练习
import KindEditor1 from '@/views/editor/KindEditor1' // kindeditor练习
import FatherComponent from '@/views/componentization/FatherComponent' // 组件化练习
import QrCode from '@/views/qrcode/QrCode' // 组件化练习

Vue.use(Router)

export default new Router({
  routes: [
    // vue+echart考勤统计表
    // {
    //   path: '/',
    //   name: 'AttendanceCharts',
    //   component: AttendanceCharts
    // }
    // 过度动画练习
    // {
    //   path: '/',
    //   name: 'Animation',
    //   component: Animation
    // },
    // computed和watch练习
    // {
    //   path: '/',
    //   name: 'WatchTest',
    //   component: WatchTest
    // },
    // 拉帘式查看图片
    // {
    //   path: '/',
    //   name: 'LiHoverPicture',
    //   component: LiHoverPicture
    // }
    // kindeditor练习
    // {
    //   path: '/',
    //   name: 'KindEditor1',
    //   component: KindEditor1
    // }
    // LayoutTest练习
    // {
    //   path: '/',
    //   name: 'LayoutTest',
    //   component: LayoutTest
    // }
    // css练习
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // 组件化练习
    // {
    //   path: '/',
    //   name: 'FatherComponent',
    //   component: FatherComponent
    // }
    // 二维码生成
    {
      path: '/',
      name: 'QrCode',
      component: QrCode
    }
  ]
})
