<template>
  <div class="local-manager-view-container">
    <div class="btn-bar">
      <el-button type='primary' class="for-page-resettle">校验本地并更更新记录模型</el-button>
      <el-button type='danger' class="clear">清空本地记录</el-button>
      <el-button type='primary' class="open-local-json-in-tarea">在下方编辑本地记录JSON</el-button>
    </div>
    <div class="json-section"></div>
    <div class="foot-bar">
      <el-button type='primary' class="confirm-local-edit">确认JSON更改</el-button>
      <el-button class="cancel-local-edit">取消编辑</el-button>
    </div>
  </div>
</template>

<script>
import defaultReportConfigGetter from '@/utils/reportConfig'
import {
  setLocalReportConfig,
  configHandler
} from '@/utils/configUtils'
export default {
  name:'LocalManager',
  created(){
    let localConfig = configHandler.get()
    if(!localConfig){
      // 本地尚未有配置记录 以默认记录作为本地值
      return
    }
    let defaultConfig = defaultReportConfigGetter()
  },
  data(){return {

  }},
}
</script>

<style>

</style>