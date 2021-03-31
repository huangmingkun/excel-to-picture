<template>
  <div class="container">
    <!--li按钮导航栏-->
    <div class="li-buttons">
      <ul>
        <li>过去</li>
        <li>现在</li>
        <li>未来</li>
        <li>展望</li>
      </ul>
    </div>
    <!--无border表格-->
    <div class="noborder-table">
      <div class="table-header"></div>
      <div class="table-content">
        <div class="table-left">但是这样会为每个待办项渲染同样的文本，这看起来并不炫酷。我们应该能从父作用域将数据传到子组件才对。让我们来修改一下组件的定义，使之能够接受一个 prop：</div>
        <div class="table-right">我们已经成功创建了第一个 Vue 应用！看起来这跟渲染一个字符串模板非常类似，但是 Vue 在背后做了大量工作。现在数据和 DOM 已经被建立了关联，所有东西都是响应式的。我们要怎么确认呢？打开你的浏览器的 JavaScript 控制台 (就在这个页面打开)，并修改 app.message 的值，你将看到上例相应地更新。</div>
      </div>
      <div class="table-footer"></div>
    </div>
    <!--内容垂直水平居中-->
    <div style="position: relative;margin-left: 100px">
      <!--静态内容垂直水平居中-->
      <div class="static-outside-div">
        <div class="static-inside-div">
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </div>
      </div>
      <!--动态内容垂直水平居中-->
      <div class="dynamic-outside-div">
        <div class="dynamic-inside-div">
          <p>123</p>
          <p>123</p>
          <p>123</p>
          <p>123</p>
          <p>123</p>
          <p>123</p>
        </div>
      </div>
    </div>
    <button :class="{'button-class': isShow}" @click="buttonClick()">显示/隐藏</button>
    <p v-show="isShow">sdfsdfsdfasdf</p>
    <div>
      <div class="left-menu">
        <ul>
          <li @mouseover="hover('hover1')" @mouseleave="leave('leave1')">芒果</li>
          <li @mouseover="hover('hover2')" @mouseleave="leave('leave2')">雪梨</li>
          <li @mouseover="hover('hover3')" @mouseleave="leave('leave3')">草莓</li>
          <li @mouseover="hover('hover4')" @mouseleave="leave('leave4')">山竹</li>
          <li @mouseover="hover('hover5')" @mouseleave="leave('leave5')">西瓜</li>
        </ul>
        <div class="right-content1" id="content1">
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
        </div>
        <div class="right-content2" id="content2">
          <div>222</div>
          <div>222</div>
          <div>222</div>
          <div>222</div>
          <div>222</div>
          <div>222</div>
        </div>
        <div class="right-content3" id="content3">
          <div>333</div>
          <div>333</div>
          <div>333</div>
          <div>333</div>
          <div>333</div>
          <div>333</div>
        </div>
        <div class="right-content4" id="content4">
          <div>444</div>
          <div>444</div>
          <div>444</div>
          <div>444</div>
          <div>444</div>
          <div>444</div>
        </div>
        <div class="right-content5" id="content5">
          <div>555</div>
          <div>555</div>
          <div>555</div>
          <div>555</div>
          <div>555</div>
          <div>555</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CssTest',
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    buttonClick () {
      this.isShow = !this.isShow
    },
    hover (hoverValue) {
      switch (hoverValue) {
        case 'hover1':
          document.getElementById('content1').style.display = 'flex'
          break
        case 'hover2':
          document.getElementById('content2').style.display = 'flex'
          break
        case 'hover3':
          document.getElementById('content3').style.display = 'flex'
          break
        case 'hover4':
          document.getElementById('content4').style.display = 'flex'
          break
        case 'hover5':
          document.getElementById('content5').style.display = 'flex'
          break
      }
    },
    leave (leaveValue) {
      switch (leaveValue) {
        case 'leave1':
          document.getElementById('content1').style.display = 'none'
          break
        case 'leave2':
          document.getElementById('content2').style.display = 'none'
          break
        case 'leave3':
          document.getElementById('content3').style.display = 'none'
          break
        case 'leave4':
          document.getElementById('content4').style.display = 'none'
          break
        case 'leave5':
          document.getElementById('content5').style.display = 'none'
          break
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  /*li按钮导航栏*/
  .li-buttons {
    width: 100%;
  }
  /*ul {*/
    /*display: flex; // 方法一：通过弹性布局来保证内容在一行显示*/
    /*width: 100%;*/
    /*padding: 0;*/
    /*margin: 0;*/
  /*}*/
  /*li {*/
    /*!*float: left; // 方法二：怪异盒模型，保证内容在一行显示*!*/
    /*!*width: (25% - 2px); // 方法三：calc计算宽度*!*/
    /*width: 25%;*/
    /*height: 40px;*/
    /*line-height: 40px;*/
    /*color: white;*/
    /*cursor: pointer;*/
    /*text-align: center;*/
    /*!*box-sizing: border-box; // 方法二：怪异盒模型，保证内容在一行显示*!*/
    /*border-left: 2px solid white;*/
    /*list-style: none;*/
    /*background-color: #549fb3;*/
  /*}*/
  /*li:nth-child(1) {*/
    /*border-left: none;*/
  /*}*/
  /*li:hover {*/
    /*background-color: #b3af87;*/
  /*}*/
  /*无border表格*/
  .noborder-table {
    margin: 30px;
    border-left: 1px solid grey;
    border-right: 1px solid grey;
  }
  .table-header,
  .table-footer {
    height: 40px;
    line-height: 40px;
    text-align: center;
    clear: left;
    background-color: #3a87ad;
  }
  .table-content {
    display: flex;
    width: 100%;
  }
  .table-left {
    width: 40%;
    height: 40vh;
    padding: 10px;
    text-indent: 30px;
  }
  .table-right {
    width: 60%;
    height: 40vh;
    padding: 10px;
    border-left: 2px dashed #c2dcdc;
    text-indent: 30px;
  }
  .button-class {
    color: #3a87ad;
  }
  /*内容垂直水平居中*/
  .static-outside-div {
    position: relative;
    width: 80px;
    height: 250px;
    border: 1px solid transparent;
    background-color: #bce8f1
  }
  .static-inside-div {
    position: absolute;
    top: 50%;left: 50%;
    margin-left: -17px;
    margin-top: -34px
  }
  .dynamic-outside-div {
    position: relative;
    margin-top: 10px;
    width: 80px;
    height: 250px;
    border: 1px solid transparent;
    background-color: #bce8f1
  }
  .dynamic-inside-div {
    position: absolute;
    top: 0;right: 0;
    left: 0; bottom: 0;
    margin: auto;
    width: 60px;
    height: max-content;
    max-height: 100%;
    text-align: center
  }
  /*hover菜单*/
  ul {
    margin: 0;
    padding: 0;
    width: 200px;
    text-align: center;
  }
  li {
    height: 40px;
    line-height: 40px;
    border: 1px solid lightyellow;
    list-style: none;
    background-color: #bce8f1;
    cursor: pointer;
    transition: .4s;
  }
  li:hover {
    background-color: #c5f1af;
  }
  .right-content1, .right-content2, .right-content3, .right-content4, .right-content5 {
    display: none;
    min-width: 100px;
    height: auto;
    background-color: #bce8f1;
    transition: 2s 2s;
  }
  .left-menu {
    display: flex;
  }
</style>
