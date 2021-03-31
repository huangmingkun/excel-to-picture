<template>
    <div class="main">
      <ul>
        <li>
          <div class="content">
            <h2>栅格化</h2>
            <p>1692年，新登基的法国国王路易十四感到法国的印刷水平差强人意，因此命令成立一个管理印刷的皇家特别委员会。他们的首要任务是设计出科学的、合理的， 重视功能性的新字体。委员会由数学家尼古拉斯加宗（Nicolas Jaugeon）担任领导，他们以罗马体为基础，采用方格为设计依据</p>
          </div>
        </li>
        <li>
          <div class="content">
            <h2>栅格化</h2>
            <p>1692年，新登基的法国国王路易十四感到法国的印刷水平差强人意，因此命令成立一个管理印刷的皇家特别委员会。他们的首要任务是设计出科学的、合理的， 重视功能性的新字体。委员会由数学家尼古拉斯加宗（Nicolas Jaugeon）担任领导，他们以罗马体为基础，采用方格为设计依据</p>
          </div>
        </li>
        <li>
          <div class="content">
            <h2>栅格化</h2>
            <p>1692年，新登基的法国国王路易十四感到法国的印刷水平差强人意，因此命令成立一个管理印刷的皇家特别委员会。他们的首要任务是设计出科学的、合理的， 重视功能性的新字体。委员会由数学家尼古拉斯加宗（Nicolas Jaugeon）担任领导，他们以罗马体为基础，采用方格为设计依据</p>
          </div>
        </li>
        <li>
          <div class="content">
            <h2>栅格化</h2>
            <p>1692年，新登基的法国国王路易十四感到法国的印刷水平差强人意，因此命令成立一个管理印刷的皇家特别委员会。他们的首要任务是设计出科学的、合理的， 重视功能性的新字体。委员会由数学家尼古拉斯加宗（Nicolas Jaugeon）担任领导，他们以罗马体为基础，采用方格为设计依据</p>
          </div>
        </li>
        <li>
          <div class="content">
            <h2>栅格化</h2>
            <p>1692年，新登基的法国国王路易十四感到法国的印刷水平差强人意，因此命令成立一个管理印刷的皇家特别委员会。他们的首要任务是设计出科学的、合理的， 重视功能性的新字体。委员会由数学家尼古拉斯加宗（Nicolas Jaugeon）担任领导，他们以罗马体为基础，采用方格为设计依据</p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'LiHoverPicture',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
  .main {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
  h2, p, ul {
    padding: 0;
    margin: 0;
  }
  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  p {
    text-indent: 30px;
  }
  ul {
    display: flex; // 方法三：弹性布局
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
  li {
    position: relative;
    /*方法一：由于li的边框线将内容挤掉下一行，通过计算宽度来保持内容在一行*/
    /*width: calc(20% - 2*2px);*/
    width: 20%;
    height: 100vh;
    /*方法二：通过box-sizing 怪异盒模型来使得内容保持在同一行*/
    /*box-sizing: border-box;*/
    /*float:left;*/
    background-size: cover;
    background-position: left;
    border: 2px solid #daff90;
    list-style: none;
  }
  li:nth-child(1) {
    background-image: url("../../assets/1.jpg");
  }
  li:nth-child(2) {
    background-image: url("../../assets/1.jpg");
  }
  li:nth-child(3) {
    background-image: url("../../assets/2.jpg");
  }
  li:nth-child(4) {
    background-image: url("../../assets/1.jpg");
  }
  li:nth-child(5) {
    background-image: url("../../assets/1.jpg");
  }
  li:hover {
    width: 60%;
    height: 80vh;
  }
  li:hover .content {
    transition: 1.5s .5s;
    bottom: -20vh;
  }
  .content {
    position: absolute;
    height: 20vh;
    bottom: -100%;
    padding: 3px;
    color: #e4cf53;
  }
</style>
