<template>
  <div class="container">
    <!--生成二维码-->
    <button @click="qrcodeClick()">生成二维码</button>
    <!--<input v-model="qrcodeValue">-->
    <!--生成二维码的位置-->
    <div class="qrcode-position" id="qrcode"></div>
    <!--<span @click="downLoadCode()">下载二维码</span>-->
  </div>
</template>

<script>
import {ApiService} from '../../js/api/https'
import $ from 'jquery'
import QRCode from 'qrcodejs2'
export default {
  name: 'QrCode',
  data () {
    return {
      // qrcodeValue: '是否',
      qrcodeDatas: ''
    }
  },
  methods: {
    // 二维码生成并下载点击事件
    async qrcodeClick () {
      let qrcodeValue = ''
      // 向node+express请求接口
      let resDatas = this.qrcodeDatas
      // qrcodeValue = '维保期' + '' + '到期时间'
      // this.qrcode(qrcodeValue)

      let count = 0;
      // 数据处理
      qrcodeValue = resDatas[0].固定资产编 + ',' + resDatas[0].设备型号 + ',' + resDatas[0].设备序列号 + ',' + resDatas[0].维保期
      // 生成二维码并且下载
      this.qrcode1(qrcodeValue)
      let timer = setInterval(function () {
        if (count < resDatas.length - 1) {
          count++
          // 数据处理
          qrcodeValue = resDatas[count].固定资产编 + ',' + resDatas[count].设备型号 + ',' + resDatas[count].设备序列号 + ',' + resDatas[count].维保期
          // 生成二维码并且下载
          this.qrcode1(qrcodeValue)
        } else {
          clearInterval(timer)
        }
      }, 2000)
      /* let arr1 = []
      let arr2 = []
      let arr3 = []
      for (let i in resDatas) {
        // 数据处理
        qrcodeValue = resDatas[i].固定资产编 + ',' + resDatas[i].设备型号 + ',' + resDatas[i].设备序列号 + ',' + resDatas[i].维保期
        // 生成二维码并且下载
        let res = await this.qrcode(qrcodeValue)
        arr1.push(res)
        let img = await this.convertCanvasToImage(res)
        arr2.push(img)
        // 防止重复加载，加载前先清空装img 的容器
        $('#qrcode').empty()
        // qrcode表示你要插入的容器id
        $('#qrcode').append(img)
        // 生成后自动下载
        let data = await this.downLoadCode()
        arr3.push(data)
      }
      console.log(arr1, arr2, arr3) */
    },
    qrcode1 (qrcodeValue) {
      // 二维码参数初始化
      let qrcode = new QRCode('qrcode', {
        width: 100,
        height: 100, // 高度
        text: qrcodeValue, // 二维码内容
        image: '',
        render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      })
      // 获取页面的cavase对象插入DOM中
      let mycanvas1 = document.getElementsByTagName('canvas')[0]
      // 新Image对象，可以理解为DOM
      let image = new Image()
      // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
      // 指定格式PNG
      image.src = mycanvas1.toDataURL('image/png')
      // 防止重复加载，加载前先清空装img 的容器
      $('#qrcode').empty()
      // qrcode表示你要插入的容器id
      $('#qrcode').append(image)
      let img = $('#qrcode').children('img').attr('src')
      let alink = document.createElement('a')
      alink.href = img
      alink.download = '测试.png'
      alink.click()
    },
    // 生成二维码事件
    async qrcode (qrcodeValue) {
      return new Promise((resolve, reject) => {
        // 二维码参数初始化
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: qrcodeValue, // 二维码内容
          image: '',
          render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        // 获取页面的cavase对象插入DOM中
        let mycanvas1 = document.getElementsByTagName('canvas')[0]
        return resolve(mycanvas1)
      })
      // 将转换后的img标签插入到html中
      // let img = await this.convertCanvasToImage(mycanvas1)
      /*  // 防止重复加载，加载前先清空装img 的容器
      $('#qrcode').empty()
      // qrcode表示你要插入的容器id
      $('#qrcode').append(img)
      // 生成后自动下载
      await this.downLoadCode() */
    },
    // canvas转换图片时需要的方法
    // 从canvas中提取图片image
    convertCanvasToImage (canvas) {
      return new Promise((resolve, reject) => {
        // 新Image对象，可以理解为DOM
        let image = new Image()
        // canvas.toDataURL 返回的是一串Base64编码的URL，当然,浏览器自己肯定支持
        // 指定格式PNG
        image.src = canvas.toDataURL('image/png')
        return resolve(image)
      })
    },
    // 下载二维码图片
    downLoadCode () {
      return new Promise((resolve, reject) => {
        let img = $('#qrcode').children('img').attr('src')
        let alink = document.createElement('a')
        alink.href = img
        alink.download = '测试.png'
        alink.click()
        resolve('111')
      })
    },
    // 获取excel表格数据
    getExcelDatas () {
      // 调用express+node.js搭建的后台接口
      ApiService.getDatasFromNode({}).then(res => {
        console.log(res)
        this.qrcodeDatas = res.user
      })
    }
  },
  mounted () {
    // 进来页面从node.js+express接口获取数据
    this.getExcelDatas()
  }
}
</script>

<style scoped>
  .container {
    text-align: center;
    padding-top: 30px;
    padding-left: 30px;
  }
  .qrcode-position {
    margin-top: 20px;
    text-align: center;
  }
</style>
