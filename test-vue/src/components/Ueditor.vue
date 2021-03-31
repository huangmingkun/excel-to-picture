<template>
  <div>
    <!--<Ueditor :value="ueditor.value" :config="ueditor.config" ref="ue"></Ueditor>-->
    <!--<input type="button" value="显示编辑器内容（从控制台查看）" @click="returnContent">-->
    <div>
      <div id="editor" type="text/plain" style="width: 1024px;height: 500px"></div>
    </div>
  </div>

</template>

<script>
// import Ueditor from '../base/ueditor/ueditor';
import '../../static/ue/ueditor.all.min';
import '../../static/ue/ueditor.parse.min';
import '../../static/ue/ueditor.config';
export default {
  data () {
    return {
      // dat: {
      //   content: "",
      // },
      // ueditor: {
      //   value: "编辑默认文字",
      //   config: {}
      // }
    };
  },
  methods: {
    // returnContent() {
    //   this.dat.content = this.$refs.ue.getUEContent();
    //   console.log(this.dat.content);
    // },
    // showContent() {
    //   this.show = !this.show;
    // }
  },
  mounted () {
    this.ue = UE.getEditor('editor')
  }
  // components: {
  //   Ueditor
  // }
};
</script>
