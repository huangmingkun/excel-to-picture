<template>
  <div class="box1">
    <div class="left">
      <!-- <el-tabs v-model="activeName" class="activeName"> -->
      <div class="frist">
            <div class="frist-one">
                  <label class="f1">
                    <span class="demonstration"></span>
                    <el-date-picker
                      v-model="value1"
                      type="datetimerange"
                      :picker-options="pickerOptions"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      align="right"
                    ></el-date-picker>
                  </label>
                  <label>
                    <el-cascader :options="options2" class="fl" filterabl placeholder="区域"></el-cascader>
                  </label>
                  <label>
                    <el-select v-model="value5" filterabl placeholder="部门" class="fl">
                      <el-option
                        v-for="item in options5"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </label>
                  <label>
                    <el-select v-model="value4" filterabl placeholder="录制人" class="fl">
                      <el-option
                        v-for="item in options4"
                        v-model="keywords2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </label>
            </div>
      <div class="frist-one">
        <span>
          <el-button class="f1">筛选</el-button>
        </span>
        <el-input class="f2" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keywords"></el-input>

         <el-button
              class="left-first-btn"
              style="padding:12px;height:40px;border:0;background-color:#fff;margin:0 10px;"
              >人脸识别
        </el-button>
        <el-upload>
                  <el-button style="height:40px;"
                  class="upload-demo"
                  type="file"
                  name="pic"
                  id="pic"
                  accept="image/gif, image/jpeg">点击上传</el-button>
                      <div style="border:1px green solid;width:30px;">
                          <img src="" alt="" id="look">
                      </div>
        </el-upload>
        <!-- <video class="f2" placeholder="请输入关键字" prefix-icon="el-icon-search" v-model="keywords3"></video> -->
      </div>

      </div>

      <div class="second">
        <div class="container_table">
          <!-- :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" -->
          <el-table
            stripe
            style="width: 100%;"
            :default-sort="{prop: 'index', order: 'descending'}"
          >
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column prop="index" label="序号" sortable width="80"></el-table-column>

            <el-table-column prop="name" label="录制主题" width="180"></el-table-column>

            <el-table-column prop="address" sortable label="录制位置"></el-table-column>

            <el-table-column prop="time" sortable label="录制时间"></el-table-column>

            <el-table-column prop="people" label="录制人" width="120"></el-table-column>

            <el-table-column prop="video" sortable label="视频">
              <!-- element-ui table 如果想自己设置dom 则使用template标签就行 -->
              <!-- slot-scope="scope" template 可以看成是一个插槽 即 vue 的 slot -->
              <!-- 当前行属性名 自己设置 现在是scope -->
              <template slot-scope="scope">
                <div class="video-wp">
                  <!-- 这里是播放按钮设置 -->
                  <div class="circular" @click="showVideo(scope)">
                    <!-- <div class="triangle"  style="border:1px green solid;"> -->
                      <i class="el-icon-caret-right"></i>
                      <!-- showVideo 点击后执行方法 参数是当前行数据 -->
                    <!-- </div> -->
                  </div>
                  <img
                    class="video-img"
                    :src="scope.row.solvetu"
                    alt="缩略图"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="video_time" sortable label="录制日期"></el-table-column>

            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button @click="bind(scope)" type="text" size="small" >查看</el-button>
                <el-button @click="edit(scope)" type="text" size="small">编辑</el-button>
                <el-button type="text" size="small" @click="open(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页-->
          <div class="buttom">
            <el-pagination
              class="fy"
              layout="prev, pager, next"
              @current-change="current_change"
              :total="tableData.length"
              background
            ></el-pagination>
          </div>
        </div>
      </div>
      <!-- </el-tabs> -->
    </div>
    <div class="right">
      <el-button icon="el-icon-plus" class="btn" @click="dialogFormVisible = true">新建</el-button>

      <!-- 视频弹窗 -->
      <!-- :modal="false" 这是一个模态，视频显示时候，背景为黑色 -->
      <el-dialog
        id="el_dialog"
        :fullscreen="true"
        :modal="false"
        :visible.sync="openModelDialog"
        class="formTwo"
      >
        <!-- openModelDialog 变量控制视频弹窗是否出现 -->
        <div slot="title"></div>
        <div class="formTwoContent">
            <div class="back-icon el-icon-close"  @click="closeVideo"></div>
            <video :poster="currentsolvetu" autoplay  controls="controls" :src="currentModelDialogVideoSrc" style="height:100%;display:block"></video>
          <!-- 这是原生的video标签 -->
          <!-- poster 属性 即是 视频还在下载时给用户展现的图片地址 -->
          <!-- autoplay 视频加载完成自动播放 -->
          <!-- controls 是否需要控制器 也就是 下方的进度条啊 暂停啊 声音啊 全屏 -->
          <!-- src 真实视频或流的地址 -->
          <!-- <video class="formTwoContentClass" :src="currentModelDialogVideoSrc"></video> -->
        </div>
      </el-dialog>

      <!-- 弹窗 新建 -->
      <el-dialog title="录制信息" :visible.sync="dialogFormVisible" class="form">
        <el-form :model="form" class="inform">
          <div class="tab-head">
            <div class="tab1">
              <el-form-item label="录制主题:" :label-width="formLabelWidth" style="width:300px;">
                <el-input v-model="form.name" :readonly="viewReadOnly"></el-input>
              </el-form-item>
              <el-form-item
                label="录制位置:"
                :label-width="formLabelWidth"
                style="width:300px;height:40px;"
              >
                <el-cascader
                  :disabled="viewReadOnly"
                  v-model="form.addressValue"
                  @change="handleChange"
                  :options="options2"
                  class="f3"
                  style="width:200px;"
                ></el-cascader>
              </el-form-item>
              <el-form-item label="录制时间:" :label-width="formLabelWidth" style="width:300px;">
                <el-input :readonly="viewReadOnly" v-model="form.time"></el-input>
              </el-form-item>
            </div>
            <div class="tab1">
              <el-form-item label="录制人员:" :label-width="formLabelWidth" style="width:300px;">
                <el-select v-model="value6" filterabl placeholder="录制人" class="fl" style="margin:0px;">
                      <el-option
                        :readonly="viewReadOnly"
                        v-for="item in options4"
                        v-model="form.peopleLabel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        class="f3"
                        style="width:200px;"
                      ></el-option>
                </el-select>
                <!-- <el-input  ></el-input> -->
              </el-form-item>
              <el-form-item label="录制日期:" :label-width="formLabelWidth" style="width:300px;">
                <div class="block">
                  <span class="demonstration"></span>
                  <el-date-picker
                    :readonly="viewReadOnly"
                    v-model="form.video_time"
                    type="date"
                    placeholder="选择日期"
                    style="width:200px;"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="tab-body">
            <el-form-item label="视频信息:" :label-width="formLabelWidth" style="width:300px;">
              <video controls="controls" style="height:340px;width:740px;"  :src="form.videoUrl"></video>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" v-if="footerShow">
          <el-button>开始录制</el-button>
          <el-button>暂停</el-button>
          <el-button>结束录制</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="add('add')">保存</el-button>
        </div>
      </el-dialog>
      <el-button icon="el-icon-edit-outline" class="btn">开始录制</el-button>
      <el-button icon="el-icon-edit" class="btn">结束录制</el-button>
      <el-button icon="el-icon-printer" class="btn">保存</el-button>
      <el-button icon="el-icon-download" class="btn">分享</el-button>
      <el-button icon="el-icon-upload2" class="btn">下载</el-button>
    </div>
  </div>
</template>

<script>
import { open } from 'fs';
export default {
  name: "count1",
  data() {
    return {
      viewReadOnly: false,
      footerShow: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        address: [], // 级联选择框 绑定的是数组
        time: "",
        people: "",
        video: "",
        video_time: ""
      },
      keywords2:"",
      keywords3:"",
      formLabelWidth: "100px",
      activeName: "",
      pagesize: 8, //每页的数据页数------是分页的一共页数值
      currentPage: 1, //默认开始页面
      input: "",
      keywords: "",
      pickerOptions: {
        "range-separator": "-"
      },

      options2: [
        {
          value: "zhinan",
          label: "区域位置",
          disabled: true
        },
        {
          //一级目录 第一个
          value: "zujian",
          label: "世贸A楼",
              children: [
                {
                  //一级目录中的  第一个二级目录
                  value: "木渎",
                  label: "1楼",
                      children: [
                        {
                          //一级目录中的  第一个二级目录    第一个三级目录
                          value: "radio",
                          label: "1号"
                        },
                        {
                          value: "checkbox",
                          label: "2号"
                        },
                        {
                          value: "input",
                          label: "3号"
                        },
                        {
                          value: "input-number",
                          label: "4号"
                        },
                        {
                          value: "select",
                          label: "5号"
                        }
                      ]
                },
                {
                  //一级目录中的  第二个二级目录
                  value: "世贸",
                  label: "2楼",
                      children: [
                        {
                          //一级目录中的  第二个二级目录    第一个三级目录
                          value: "alert",
                          label: "1号"
                        },
                        {
                          value: "loading",
                          label: "2号"
                        },
                        {
                          value: "message",
                          label: "3号"
                        },
                        {
                          value: "message-box",
                          label: "4号"
                        },
                        {
                          value: "notification",
                          label: "5号"
                        }
                      ]
                },
                {
                  //一级目录中的  第三个二级目录
                  value: "盘蠡路",
                  label: "3楼",
                      children: [
                        //一级目录中的  第三个二级目录    第一个三级目录
                        {
                          value: "menu",
                          label: "1号"
                        },
                        {
                          value: "tabs",
                          label: "2号"
                        },
                        {
                          value: "breadcrumb",
                          label: "3号"
                        },
                        {
                          value: "dropdown",
                          label: "4号"
                        },
                        {
                          value: "steps",
                          label: "5号"
                        }
                      ]
                },
                {
                  //一级目录中的  第四个二级目录    第一个三级目录
                  value: "石路",
                  label: "4楼",
                        children: [
                          {
                            value: "dialog",
                            label: "1号"
                          },
                          {
                            value: "tooltip",
                            label: "2号"
                          },
                          {
                            value: "popover",
                            label: "3号"
                          },
                          {
                            value: "card",
                            label: "4号"
                          },
                          {
                            value: "carousel",
                            label: "5号"
                          },
                          {
                            value: "collapse",
                            label: "6号"
                          }
                        ]
                }
              ]
        },
        {
          //第二个一级目录
          value: "园区",
          label: "世贸B楼",
          children: [
            {
              //第二个一级目录中的  第一个二级目录
              value: "axure",
              label: "1楼"
            },
            {
              //第二个一级目录中的  第二个二级目录
              value: "sketch",
              label: "2楼"
            },
            {
              //第二个一级目录中的  第三个二级目录
              value: "jiaohu",
              label: "3楼"
            }
          ]
        }
      ],

      options4: [
        //这里是筛选和标记的选项
        {
          value: "选项1",
          label: "1号人员"
        },
        {
          value: "选项2",
          label: "2号人员"
        },
        {
          value: "选项3",
          label: "3号人员"
        },
        {
          value: "选项4",
          label: "4号人员"
        },
        {
          value: "选项5",
          label: "5号人员"
        },
        {
          value: "选项6",
          label: "6号人员"
        }
      ],

      options5: [
        //这里是筛选和标记的选项
        {
          value: "选项1",
          label: "销售部"
        },
        {
          value: "选项2",
          label: "财务部"
        },
        {
          value: "选项3",
          label: "后勤部"
        }
      ],
      value1: "",
      value2: "",
      value4: "",
      value5: "",
      value6:"",

      // 当前视频加载时的缩略图

      tableData: [
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "1",
          name: "app研究",
          address: "世贸A楼 / 1楼 / 1号",
          time: "2个小时",
          people: "6号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          // peopleLabel:"",
          addressValue: ["zujian", "木渎", "radio"],
          index: "2",
          name: "app研究",
          address: "世贸A楼 / 1楼 / 3号",
          time: "2个小时",
          people: "1号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "3",
          name: "app研究",
          address: "世贸A楼 / 3楼 / 12号",
          time: "2个小时",
          people: "2号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"

        },
        {
          peopleLabel:"",
          addressValue: ["zujian", "木渎", "radio"],
          index: "4",
          name: "app研究",
          address: "世贸A楼 / 1楼 / 5号",
          time: "2个小时",
          people: "3号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"

        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "5",
          name: "app研究23",
          address: "世贸A楼 / 1楼 / 8号",
          time: "2个小时",
          people: "6号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"

        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "6",
          name: "app研究42",
          address: "世贸A楼 / 1楼 / 6号",
          time: "2个小时",
          people: "4号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"

        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "7",
          name: "app研究13",
          address: "世贸A楼 / 1楼 / 3号",
          time: "2个小时",
          people: "5号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "8",
          name: "app研究21",
          address: "世贸A楼 / 2楼 / 1号",
          time: "2个小时",
          people: "3号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "9",
          name: "app研究22",
          address: "世贸A楼 / 2楼 / 4号",
          time: "2个小时",
          people: "5号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "10",
          name: "app研究32",
          address: "世贸A楼 / 2楼 / 12号",
          time: "2个小时",
          people: "2号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "11",
          name: "app研究25",
          address: "世贸A楼 / 2楼 / 8号",
          time: "2个小时",
          people: "4号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "12",
          name: "app研究27",
          address: "世贸A楼 / 2楼 / 3号",
          time: "2个小时",
          people: "1号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "13",
          name: "app研究32",
          address: "世贸A楼 / 2楼 / 7号",
          time: "2个小时",
          people: "6号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "14",
          name: "app研究17",
          address: "世贸A楼 / 2楼 / 7号",
          time: "2个小时",
          people: "5号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "15",
          name: "app研究18",
          address: "世贸A楼 / 3楼 / 1号",
          time: "2个小时",
          people: "5号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "16",
          name: "app研究19",
          address: "世贸A楼 / 3楼 / 6号",
          time: "2个小时",
          people: "6号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        },
        {
          addressValue: ["zujian", "木渎", "radio"],
          index: "17",
          name: "app研究",
          address: "世贸A楼 / 3楼 / 8号",
          time: "2个小时",
          people: "4号人员",
          video: "",
          video_time: "2019-05-16",
          videoUrl:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          solvetu:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561908670697&di=a1829c77b816f1b9245b06f28535db5c&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F9cdaae0bb7cd56a328753a0997bf99d08479fa13.jpg"
        }
      ],
      tableDataCopy: [],
      findResult: [],
      action: "view",//行为ction 可以是view只读模式
      editIndex: null, //编辑索引赋值为空
      openModelDialog: false,
      currentsolvetu:"",
      currentModelDialogVideoSrc: ""
    };
  },
  watch: {
    currentStatus(value) {
      this.renderEcharts(value);
    },

    keywords(newvalue, oldvalue) {
      this.tableData = [...this.tableDataCopy];
      if (!newvalue) {
        this.tableData = this.tableDataCopy;
      }
      return (this.tableData = this.tableDataCopy.filter(item => {
        if (item.time || item.name.indexOf(newvalue) >= 0) {
          return item;
        }
      }));
    },
    keywords2(newvalue, oldvalue){
        this.tableData = [...this.tableDataCopy];
            if (!newvalue) {
            this.tableData = this.tableDataCopy;
          }
         return (this.tableData = this.tableDataCopy.filter(item => {
            if (item.people.label== newvalue) {
              return item;
            }
      }));
    }
  },

  methods: {
    closeVideo(){
      this.openModelDialog = false;   // 关闭的时候 关闭弹窗
      this.currentsolvetu = "" // 清空当前展示的静态图地址
      this.currentModelDialogVideoSrc = "" // 清空当前行视频的视频地址
    },
    // 打开视频弹窗方法
    showVideo(scope) {
      var src = scope.row.videoUrl  // 拿到当前行视频的视频地址
      var solvetu = scope.row.solvetu // 拿到当前行视频所需要展示的静态图
      // 此src为当前视频的播放url或者流

      this.openModelDialog = true; // 打开视频弹窗
      this.currentModelDialogVideoSrc = src;  // 拿到当前行视频的视频地址
      this.currentsolvetu = solvetu // 拿到当前行视频所需要展示的静态图
      // 自动播放操作
    },
    handleChange(value) {
      console.log(value);
    },

    edit(scope) {
      this.action = "edit"; //执行编辑时候
      this.form = scope.row; //这个表格form就是弹窗scope的内容
      this.editIndex = scope.row.$index; //这个编辑的索引值=scope这个行的当前的索引；$index当前索引值
      //this.form.address = this.form.addressValue;
      this.footerShow = true;
      this.viewReadOnly = false;
      this.dialogFormVisible = true;
    },
    bind(scope) {
      this.form = scope.row;
      console.log(scope.row);
      //this.form.address = this.form.addressValue;
      this.footerShow = false;
      this.viewReadOnly = true;
      this.dialogFormVisible = true;
    },
    handleClick(row) {
      console.log(row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    changeOption(value) {
      this.currentStatus = value;
    },
    current_change: function(currentPage) {
      this.currentPage = currentPage;
    },
    renderEcharts(value) {
      let _this = this;
      _this.$initEcharts("myChart", _this.optionData[value]);
    },
    findInArr(arr, options) {
      let r = [];

      let deep = function(arr, options) {
        while (r.length < arr.length) {
          loop: for (var j = 0; j < options.length; j++) {
            if (options[j].value == arr[r.length]) {
              r.push(options[j].label);
              options = options[j].children;
              break loop;
            }
          } // 关键字 js递归
        }
        return r;
      };
      return (r = deep(arr, options));
    },
    add(actionName) {
      if (
        this.form.name &&
        this.form.address &&
        this.form.time &&
        this.form.people &&
        this.form.video_time
      ) {
        // console.log(this.action);
        switch (
          actionName //观察这个动作
        ) {
          case "view": //如果是只读模式，停止
          this.form = {} ;
            break;
          case "edit": //如果是编辑模式，则把editIndex赋值给index，再把这个tableData[index]赋值给this.form
            var index = this.editIndex;

            this.tableData[index] = this.form; //form是指弹窗的窗口
            // this.tableData[index].addressValue = this.form.address; // addressValue = 要保存编码(或者是值)
            this.tableData[index].address = this.findInArr(
              // address = 要保存的中文值
              this.form.addressValue,
              this.options2
            ).join(" / ");

            console.log(this.tableData[index])
            // js 数组的join函数 ["1","2","3"].join("/") => 字符串 1/2/3
            // this.form.address = 你绑定表单的级联区域 选择的是 key :["zujian","木渎","木渎区域1"]
            // 经过递归函数后 this.form.address 变成了 ["组件","木渎","木渎区域1"].join("/")
            // this.tableData[index].addressValue 经过赋值后 ：["zujian","木渎","木渎区域1"]

            // Vue中 改变数据后 ， 则界面会自动改变 关键字 : 虚拟dom
            // 关键字 js递归
            // Vue中 v-model="值"  双向绑定
            // 时刻记住 : 每个表单 无论是input select checkbox raido date
            // 都有一个 name=”编码(实际保存的值 - 会放入数据库的值)“
            // 和一个 value="中文值(用来给用户显示的值 - 没啥用的值)"
            // v-model 永远绑定的是 编码 而不是中文值

            console.log(this.tableData[index].address);
            this.form = {} ;
            break;
          case "add": //如果是增加，则把这个tableData push给form
            this.form = {}
            this.tableData.push(this.form);
            this.tableData[index].addressValue = this.form.address;
            //this.tableData[index].peopleLabel = this.form.people;

            this.tableData[index].address = this.findInArr(
              this.form.address,
              this.options2
            ).join(" / ");
            break;
        }
        this.dialogFormVisible = false;
        this.footerShow = true;
      } else {
        this.$message("请输入完整");
        // ;
      }
    },
    open(scope) {
        this.$confirm('是否删除该文件', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.remove(scope)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    remove(scope) {
      var $index = scope.$index; //这里是获取每一行中的index中的索引
      this.tableData.splice($index, 1); //这里的 从tableData中 删除删除上一行中的选中索引值一行的数据;如果写成0,那就是不删除,如果是空删除，删除所有跟index同一组的元素
    }

  },
  created() {
    this.tableDataCopy = [...this.tableData];
  }
};
</script>


<style>
.el-upload {
  /* border: 1px black solid; */
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
}
/* .el-upload-list el-upload-list--text{
  border:1px yellow solid;
} */
.upload-demo{
  /* border:1px red solid; */
  flex: 1;
  display: flex;
  justify-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
  /* width: 30%; */
}
#view2_wrapper .el-dialog .el-cascader.is-disabled input {
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  cursor: auto !important;
}
</style>

<style>
#el_dialog .el-dialog__header {
  display: none;
}
#el_dialog .el-dialog__body {
  padding: 0 !important;
  overflow: hidden;
}
#el_dialog .el-dialog__body,
#el_dialog .el-dialog__body > div,
#el_dialog .el-dialog__body > div > video {
  width: 100%;
  height: 100%;
  /* border:1px green solid; */
}
.second .container_table .el-table {
  overflow: auto !important;
}
</style>

<style scoped>
/* 视频弹窗 */
.formTwoContent {
  position: relative;
}
.formTwo,
.formTwo > div {
  width: 100%;
  height: 100%;
  background: #000;
}
.formTwo .back-icon {
  z-index: 9999999999999999;
  position: absolute;
  right: 10px;
  top: 10px;
  color:rgba(0,0,0,.4);
  font-size: 30px;
  cursor: pointer;

}
/* 视频弹窗 */
.box1 {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  height: 100%;
}
.left {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-content: space-between;
  /* border: 1px red solid; */
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
.frist {
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  flex-direction: column;
  /* border: 1px red solid; */
  height: 120px;
  padding: 8px 10px;
  box-sizing: border-box;
}
.frist-one{
  /* border:1px yellow solid; */
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}
.fl {
  /* border: 1px red solid; */
  margin: 10px;
}
.f2 {
  padding: 0 10px;
  width: 220px;
  text-indent: 10px;
  box-sizing: border-box;
}

.right {
  display: flex;
  height: 100%;
  width: 150px;
  background-color: rgb(226, 235, 253);
  /* box-sizing: border-box; */
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}

.second {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.right .btn {
  display: flex;
  justify-content: center;
  margin: 4%;
  width: 100px;
  color: #000;
}

.first-one {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 5px 0;
  /* border:1px green  solid; */
}
.container_table {
  /* border:1px red solid; */
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  padding-bottom:70px;
}

.buttom {
  width: 100%;
  /* height: 60px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px red solid; */
}
.video-wp {
  display: block;
  max-width: 140px;
  height: 56px;
  /* 光标当上去显示是一只手 */
  cursor: pointer;
  position: relative;
}
.video-wp .circular {
  /* 绝对定位居中大法 */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  height: 30px;
  width: 30px;
  border-radius: 40px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  color: #fff;
}
.video-wp .video-img {
  display: block;
  width: 100%;
  height: 56px;
}
.fy {
  position: fixed;
  bottom: 20px;
}

.form {
  width: 100%;
}
.inform {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 500px;
}
.tab-head {
  height: 120px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.tab-body {
  flex: 1;
}
.tab1 {
  display: flex;
  justify-content: space-around;
}
.dialog-footer {
  height: 40px;
}
</style>

