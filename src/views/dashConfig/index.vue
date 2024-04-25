<style lang="scss">
@import '~@/assets/styles/config.global.scss';
</style>

<style scoped lang="scss">
@import '~@/assets/styles/config.scoped.scss';
</style>
<template>
  <div class="dash-config-container">
    <div class="inner-layout-wrapper">
      <div class="common-width">
        <div class="vertical-flex">
          <div class="top">
            <div class="top-span">
              <div class="label"><label for="theme-check-group">仿真报告视觉风格</label></div>
              <div class="theme-check-group">
                <el-radio-group
                  id="theme-check-group"
                  v-model="defaultConfig.theme"
                >
                  <el-radio :label="'light'" >浅色</el-radio>
                  <el-radio :label="'dark'" >深色</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="main">
            <el-tabs class="tab-cards" v-model="activeTab" type='card' >
              <el-tab-pane 
                v-for="(tabSet,index) in defaultConfig.sections"
                :key="index"
                :class="`tab-card-cell ${tabSet.className||''}`"
                :label="tabSet.title" 
                :name="tabSet.name"
              >
              <template>
                <!-- tab view 顶部 图表区块显示隐藏配置 -->
                <div class="section-visible-switch-part cw">
                  <el-switch
                    @change="(v)=>handleSectionVisibleChange(v,tabSet)"
                    v-model="tabSet.visible"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                  ></el-switch>
                  <span class="section-title">{{tabSet.title}}</span>
                  <span class="section-remark">({{tabSet.remark}})</span>
                </div>
                <el-divider class="section-visible-switch-bottom-switch" v-if="tabSet.visible&&tabSet.configLayout.some(cf=>cf!=='section-visible')"></el-divider>
                <!-- tabs>table 类型的区块内容配置 -->
                <template v-if="tabSet.visible&&tabSet.configLayout.includes('tab-table')">
                  <div class="tables-columns-visible-check-group-list-wrapper">
                    <div
                      v-for="(tabCell,tabCellIndex) in tabSet.tabTableConfigList"
                      :key="tabCellIndex"
                      class="tables-columns-visible-check-group-list-item"
                    >
                      <div class="cw">
                        <div class="part-visible-switch">
                          <el-checkbox
                            @change="v=>handleTablePartVisibleChange('tab-table',v,tabCell)"
                            v-model="tabCell.visible"
                          >{{tabCell.label}}</el-checkbox>
                          <notice-tip class="check-notice-tip" :content="tabCell.remark" ><div class="remark-icon">?</div></notice-tip>
                        </div>
                        <template v-if="tabCell.visible&&tabCell.type==='table'">
                          <div  class="part-table-column-visible-check-group">
                            <el-checkbox-group class="col-visible-checkbox-group" v-model="tabCell.colVisible"
                              @change="(v)=>handleTableColVisibleChange('tab-table',v,tabCell)"
                            >
                              <el-checkbox border
                                class="col-visible-checkbox-button"
                                v-for="(column,columnIndex) in tabCell.columnConfigList"
                                :key="columnIndex"
                                :label="column.prop"
                              >{{column.langLabel}}</el-checkbox>
                            </el-checkbox-group>
                          </div>
                        </template>
                      </div>
                      <el-divider v-if="tabCellIndex+1<tabSet.tabTableConfigList.length"></el-divider>
                    </div>
                  </div>
                </template>
                <!-- table 类型的区块内容配置 -->
                <template v-if="tabSet.visible&&tabSet.configLayout.includes('table')">
                  <div class="table-columns-visible-check-group cw">
                    <div class="part-visible-switch">
                      <el-checkbox
                        @change="v=>handleTablePartVisibleChange('table',v,tabSet)"
                        v-model="tabSet.tablePartVisible"
                      >列表设置</el-checkbox>
                      <notice-tip class="check-notice-tip" :content="tabSet.tableRemark" ><div class="remark-icon">?</div></notice-tip>
                    </div>
                    <div v-if="tabSet.tablePartVisible" class="part-table-column-visible-check-group">
                      <el-checkbox-group class="col-visible-checkbox-group" v-model="tabSet.colVisible"
                        @change="(v)=>handleTableColVisibleChange('table',v,tabSet)"
                      >
                        <el-checkbox border
                          class="col-visible-checkbox-button"
                          v-for="(column,columnIndex) in tabSet.tableConfigList"
                          :key="columnIndex"
                          :label="column.prop"
                        >{{column.langLabel}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </template>
                <el-divider v-if="tabSet.visible&&tabSet.configLayout.includes('tab-charts')"></el-divider>
                <!-- tabs>charts 类型的区块内容配置 -->
                <template v-if="tabSet.visible&&tabSet.configLayout.includes('tab-charts')">
                  <div class="tab-views-visible-list">
                    <div class="part-visible-switch"
                      v-for="(tabCell,tabCellIndex) in tabSet.tabChartsConfigList"
                      :key="tabCellIndex"
                    >
                      <div class="cw">
                        <el-checkbox
                          v-model="tabCell.visible"
                        >{{tabCell.label}}</el-checkbox>
                        <notice-tip class="check-notice-tip" :content="tabCell.remark" ><div class="remark-icon">?</div></notice-tip>
                      </div>
                      <el-divider v-if="tabCellIndex+1<tabSet.tabChartsConfigList.length"></el-divider>
                    </div>
                  </div>
                </template>
              </template>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="bottom">
            <el-button class="btn-generate-report" type="primary" @click="generateReport">导出报告</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {setLocalReportConfig} from '@/utils/configUtils'
import {
  defaultConfig,
} from './config'
import NoticeTip from '@/components/NoticeTip'
import {rem} from '@/utils/rem'
window.VKM.add("dash-config:2024-4-18 15:00:00")
export default {
  name: 'DashConfig',
  components:{
    NoticeTip
  },
  data() {
    return {
      defaultConfig,
      // 当前选中的tab
      activeTab: 'EquipmentParam',

    }
  },
  created(){
    rem()
  },
  methods: {
    generateReport(){
      let currentResult = JSON.parse(JSON.stringify(this.defaultConfig))
      currentResult.sections.forEach(sctn => {
        if(sctn.configLayout.includes('tab-table')){
          sctn.tabTableConfigList.forEach(cell => {
            if(cell.type==='table'){
              cell.columnConfigList.forEach(m=>{
                if(cell.colVisible.includes(m.prop)){
                  m.visible = true;
                }else{
                  m.visible = false;
                }
              })
            }
          })
        }else if(sctn.configLayout.includes('table')){
          sctn.tableConfigList.forEach(cell=>{
            if(sctn.colVisible.includes(cell.prop)){
              cell.visible = true;
            }else{
              cell.visible = false;
            }
          })
        }
      });
      setLocalReportConfig(currentResult)
      this.$router.replace('/')
    },
    handleSectionVisibleChange(v,options={}){
      if(v){
        if(options.configLayout.includes('tab-table')){
          options.tabTableConfigList.forEach(tabCell=>{
            if(!tabCell.visible){
              tabCell.visible = true;
            }
            if(tabCell.type==='table'){
              if(tabCell.colVisible.length != tabCell.columnConfigList.length){
                tabCell.colVisible = tabCell.columnConfigList.map(m=>m.prop)
              }
            }
          })
        }
        if(options.configLayout.includes('table')){
          if(!options.tablePartVisible){
            options.tablePartVisible = true;
          }
          if(options.colVisible.length != options.tableConfigList.length){
            options.colVisible = options.tableConfigList.map(m=>m.prop)
          }
        }
        if(options.configLayout.includes('tab-charts')){
          options.tabChartsConfigList.forEach(tabCell=>{
            if(!tabCell.visible){
              tabCell.visible = true;
            }
          })
        }
      }
    },
    handleTablePartVisibleChange(type='',v,options={}){
      if(v){
        switch(type){
          case 'tab-table':{
            options.colVisible = options.columnConfigList.map(m=>m.prop)
            break;
          };
          case "table":{
            options.colVisible = options.tableConfigList.map(m=>m.prop)
            break;
          };
        }
      }
    },
    handleTableColVisibleChange(type='',v,options={}){
      if(!v.length){
        switch(type){
          case 'tab-table':{
            options.visible = false
            break;
          };
          case "table":{
            options.tablePartVisible = false
            break;
          };
        }
      }
    },
  }
}
</script>
