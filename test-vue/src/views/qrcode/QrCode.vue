<template>
  <div class="container">
    <div class="excel-datas">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-tooltip placement="right">
        <div slot="content">
          <p>
            （1）第一个选择的列表头，对应列的值会作为二维码图片的名称（对应列没值则为null）
          </p>
          <p>
            （2）选择列表头的顺序会决定二维码内容显示的顺序
          </p>
        </div>
        <el-button>使用说明</el-button>
      </el-tooltip>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedHeadArr" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="head in allHeadArr" :label="head" :key="head">{{head}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <!--生成二维码-->
    <button @click="qrcodeClick()">生成二维码</button>
    <!--生成二维码的位置11-->
    <div class="qrcode-position" id="qrcode"></div>
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
      qrcodeDatas: '',
      excelHeadArr: [],
      checkAll: false,
      checkedHeadArr: [],
      allHeadArr: [],
      isIndeterminate: true
    }
  },
  methods: {
    // 二维码生成并下载点击事件
    async qrcodeClick () {
      const that = this
      if (that.checkedHeadArr.length === 0) {
        this.$message.warning('请选择需要生成二维码的列数据')
        return
      }
      // 向node+express请求接口返回的数据
      let resDatas = this.qrcodeDatas
      for (let i in resDatas) {
        let qrcodeValue = ''
        let qrcodeName = ''
        // 数据处理
        qrcodeValue = that.getQrcodeValue(i, resDatas)
        console.log('qrcodeValue', qrcodeValue)
        // qrcodeValue = resDatas[i]['固定资产编'] + ',' + resDatas[i]['设备型号'] + ',' + resDatas[i]['设备序列号'] + ',' + resDatas[i]['维保期']
        // 生成二维码（canvas）
        let res = await this.qrcode(qrcodeValue)
        // 由canvas生成二维码图片
        let img = await this.convertCanvasToImage(res)
        // 二维码名称由选择第一个选择的列数据决定
        qrcodeName = resDatas[i][that.checkedHeadArr[0]] || null
        console.log('qrcodeName', qrcodeName)
        img.name = `${parseInt(i) + 1}-${qrcodeName}-测试图片`
        // console.log('二维码名称：', img.name)
        // 防止重复加载，加载前先清空装img 的容器
        $('#qrcode').empty()
        // qrcode表示你要插入的容器id
        $('#qrcode').append(img)
        // 生成后自动下载
        await this.downLoadCode()
      }
    },
    // 生成二维码事件
    qrcode (qrcodeValue) {
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
        resolve(mycanvas1)
      })
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
        resolve(image)
      })
    },
    // 下载二维码图片
    downLoadCode () {
      return new Promise((resolve, reject) => {
        let img = $('#qrcode').children('img').attr('src')
        let imgName = $('#qrcode').children('img').attr('name')
        let alink = document.createElement('a')
        alink.href = img
        alink.download = imgName + '.png'
        alink.click()
        // 因为浏览器线程有限，下载图片的并发量有限，因此下载图片的函数需要进行延迟操作（防止批量下载图片进程超出浏览器的线程上限）
        setTimeout(function () {
          resolve('successs')
        }, 1000)
      })
    },
    getQrcodeValue (i, resDatas) {
      const that = this
      let tempQecodeValue = ''
      console.log('checkedHeadArr', this.checkedHeadArr)
      that.checkedHeadArr.forEach(function (item, key) {
        console.log(key)
        if (key === 0) {
          tempQecodeValue = resDatas[i][item]
        } else {
          tempQecodeValue += '，' + resDatas[i][item]
        }
      })
      return tempQecodeValue
    },
    // 获取excel表格数据
    getExcelDatas () {
      // 调用express+node.js搭建的后台接口
      ApiService.getDatasFromNode({}).then(res => {
        console.log('调用express+node.js搭建的后台接口返回的数据', res)
        this.qrcodeDatas = res.user
        this.allHeadArr = this.excelHeadArr = Object.keys(res.user[0]) // 列的表头名称
      })
    },
    // 表头数据全选操作
    handleCheckAllChange (val) {
      console.log(8888, val)
      this.checkedHeadArr = val ? this.excelHeadArr : []
      this.isIndeterminate = false
    },
    // 表头数据单选操作
    handleCheckedCitiesChange (value) {
      console.log('选择后的回调', value)
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allHeadArr.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allHeadArr.length
    }
  },
  mounted () {
    let that = this
    // 进来页面从node.js+express接口获取数据
    that.getExcelDatas()
  }
}
</script>

<style scoped>
  .container {
    text-align: center;
    padding-top: 30px;
    padding-left: 30px;
  }
  .excel-datas {
    margin: 20px 0;
  }
  .qrcode-position {
    margin-top: 20px;
    text-align: center;
  }
</style>
