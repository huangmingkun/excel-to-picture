<template>
  <div class="table">
    <editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
            :afterChange="afterChange()"
            pluginsPath="../../../static/kindeditor/plugins/"
            :loadStyleMode="false"
            @on-content-change="onContentChange"></editor>
    <div> editorTextCopy: {{ editorTextCopy }} </div>
  </div>
</template>

<script>
export default {
  name: 'table',
  data () {
    return {
      editorText: '直接初始化值', // 双向同步的变量
      editorTextCopy: '' // content-change 事件回掉改变的对象
    }
  },
  methods: {
    onContentChange (val) {
      this.editorTextCopy = val
      console.log(this.editorTextCopy)
    },
    afterChange () {
    }
  }
}
</script>

<style>

</style>
