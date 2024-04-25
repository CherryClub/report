<style lang="scss">
@import "~@/assets/styles/dashboard.global.scss";
@import "~@/assets/styles/dashboard.global.dark.scss";
</style>
<style scoped lang="scss"></style>

<template>
  <div
    :class="{
      'app-container dashboard-container': 1,
      dark: visibleConfig.theme === 'dark',
    }"
  >
    <div class="inner-wrapper">
      <div class="common-width">
        <!-- 顶部 -->
        <header class="top-section">
          <div class="top-common-width">
            <div style="display: flex; justify-content: end">
              <div class="year"></div>
            </div>
            <div style="display: flex; justify-content: center">
              <div class="title"></div>
            </div>
            <div class="report-info">
              <div class="bg-box"></div>
              <div class="info-inner-wrapper">
                <div class="info-common-wdith">
                  <div class="info-row">
                    <div class="info-col info-col-2">
                      <div class="info-title">工程名称：</div>
                      <div class="info-value">
                        {{ BasicReport.ProjectName }}
                      </div>
                    </div>
                    <div class="info-col info-col-2">
                      <div class="info-title">报告制作人：</div>
                      <div class="info-value">{{ BasicReport.Author }}</div>
                    </div>
                    <div class="info-col">
                      <div class="info-title">仿真时长：</div>
                      <div class="info-value">{{ BasicReport.Duration }}</div>
                    </div>
                  </div>
                  <div class="info-row">
                    <div class="info-col info-col-2">
                      <div class="info-title">起始时间：</div>
                      <div class="info-value">{{ BasicReport.StartTime }}</div>
                    </div>
                    <div class="info-col info-col-2">
                      <div class="info-title">结束时间：</div>
                      <div class="info-value">{{ BasicReport.EndTime }}</div>
                    </div>
                    <div class="info-col">
                      <div class="info-title">软件版本：</div>
                      <div class="info-value">{{ BasicReport.Version }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <!-- 仿真设备和参数 -->
        <content-card
          v-if="EquipmentParamSectionVisible"
          title="仿真设备和参数"
          class="content-section"
        >
          <el-tabs
            class="tab-cards"
            v-model="activeEqpType"
            @tab-click="handleEqpTypeClick"
          >
            <el-tab-pane
              v-for="(tabSet, index) in EquipmentParamConfigList"
              :key="index"
              :class="`tab-card-cell ${tabSet.className}`"
              :label="tabSet.label"
              :name="tabSet.name"
            >
              <template v-if="tabSet.type === 'table'">
                <common-table
                  :thBgColor="tableColorConfig.thBgColor.EquipmentParam"
                  :tripeColor="tableColorConfig.tripeColor.EquipmentParam"
                  :list="EquipmentParam[tabSet.dataKey]"
                  :columnConfigList="tabSet.columnConfigList"
                  :invokeComponent="this"
                />
              </template>
              <template v-else
                ><img
                  v-if="activeEqpType === tabSet.name"
                  class="eqp-param-config-img"
                  :src="BasicReport[tabSet.urlKey]"
              /></template>
            </el-tab-pane>
          </el-tabs>
        </content-card>
        <!-- 仓储统计 -->
        <content-card
          v-if="WarehouseStatisticsSectionVisible"
          title="仓储统计"
          class="content-section"
        >
          <div class="WarehouseStatisticsPart">
            <div class="table-part" v-if="WarehouseStatisticsTableVisible">
              <common-table
                :thBgColor="tableColorConfig.thBgColor.WarehouseStatistics"
                :tripeColor="tableColorConfig.tripeColor.WarehouseStatistics"
                :tripeAlpha="tableColorConfig.tripeAlpha.WarehouseStatistics"
                :list="WarehouseStatistics"
                :columnConfigList="WarehouseStatisticsColumnConfigList"
                :invokeComponent="this"
              />
            </div>
            <el-divider v-if="WarehouseStatisticsTableVisible"></el-divider>
            <div class="chart-part">
              <el-tabs class="tab-cards" v-model="activeWarehouseTab">
                <el-tab-pane
                  v-for="(tabSet, index) in WarehouseStatisticsTabConfigList"
                  :key="index"
                  :class="`tab-card-cell ${tabSet.className}`"
                  :label="tabSet.label"
                  :name="tabSet.name"
                >
                  <stock-in-out-bar
                    v-if="chartStatus && activeWarehouseTab === tabSet.name"
                    :key="index + '_' + index"
                    class="stock-in-out-bar-component"
                    :data="tabSet.dealChartOptions(WarehouseStatistics)"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </content-card>
        <!-- AGV设备稼动率 -->
        <content-card
          v-if="AgvStatisticsSectionVisible"
          title="AGV设备稼动率"
          class="content-section"
        >
          <div class="AgvStatisticsPart">
            <div class="table-part" v-if="AgvStatisticsTableVisible">
              <common-table
                :thBgColor="tableColorConfig.thBgColor.AgvStatistics"
                :tripeColor="tableColorConfig.tripeColor.AgvStatistics"
                :list="AgvStatistics"
                :columnConfigList="AgvStatisticsColumnConfigList"
                :invokeComponent="this"
              />
            </div>
            <el-divider v-if="AgvStatisticsTableVisible"></el-divider>
            <div class="chart-part">
              <el-tabs class="tab-cards" v-model="activeAgvStatistics">
                <el-tab-pane
                  v-for="(tabSet, index) in AgvStatisticsTabConfigList"
                  :key="index"
                  :class="`tab-card-cell ${tabSet.className}`"
                  :label="tabSet.label"
                  :name="tabSet.name"
                >
                  <agv-work-line
                    v-if="chartStatus && activeAgvStatistics === tabSet.name"
                    :key="index + '_' + index"
                    class="agv-work-line-component"
                    :data="tabSet.dealChartOptions(AgvStatistics)"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </content-card>
        <!-- 生产设备等待时间 -->
        <content-card
          v-if="ProductionStatisticsSectionVisible"
          title="生产设备等待时间"
          class="content-section"
        >
          <div class="ProductionStatisticsPart">
            <div class="table-part" v-if="ProductionStatisticsTableVisible">
              <common-table
                :thBgColor="tableColorConfig.thBgColor.ProductionStatistics"
                :tripeColor="tableColorConfig.tripeColor.ProductionStatistics"
                :tripeAlpha="tableColorConfig.tripeAlpha.ProductionStatistics"
                :list="ProductionStatistics"
                :columnConfigList="ProductionStatisticsColumnConfigList"
                :invokeComponent="this"
              />
            </div>
            <el-divider v-if="ProductionStatisticsTableVisible"></el-divider>
            <div class="chart-part">
              <el-tabs class="tab-cards" v-model="activeProductionStatistics">
                <el-tab-pane
                  v-for="(tabSet, index) in ProductionStatisticsTabConfigList"
                  :key="index"
                  :class="`tab-card-cell ${tabSet.className}`"
                  :label="tabSet.label"
                  :name="tabSet.name"
                >
                  <eqp-wait-bar
                    v-if="
                      chartStatus && activeProductionStatistics === tabSet.name
                    "
                    :key="index + '_' + index"
                    class="eqp-wait-bar-component"
                    :data="tabSet.dealChartOptions(ProductionStatistics)"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </content-card>
        <!-- 制程统计 -->
        <content-card
          v-if="ProcessStatisticsSectionVisible"
          title="制程统计"
          class="content-section"
        >
          <div class="ProcessStatisticsPart">
            <div class="table-part" v-if="ProcessStatisticsTableVisible">
              <common-table
                :thBgColor="tableColorConfig.thBgColor.ProcessStatistics"
                :tripeColor="tableColorConfig.tripeColor.ProcessStatistics"
                :list="ProcessStatistics"
                :columnConfigList="ProcessStatisticsColumnConfigList"
                :invokeComponent="this"
              />
            </div>
            <el-divider v-if="ProcessStatisticsTableVisible"></el-divider>
            <div class="chart-part">
              <el-tabs class="tab-cards" v-model="acitveProcessStatistics">
                <el-tab-pane
                  v-for="(tabSet, index) in ProcessStatisticsTabConfigList"
                  :key="index"
                  :class="`tab-card-cell ${tabSet.className}`"
                  :label="tabSet.label"
                  :name="tabSet.name"
                >
                  <process-line
                    v-if="
                      chartStatus && acitveProcessStatistics === tabSet.name
                    "
                    :key="index + '_' + index"
                    class="process-line-component"
                    :data="tabSet.dealChartOptions(ProcessStatistics)"
                  />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </content-card>
        <!-- 产能与经济效益 -->
        <content-card
          v-if="EconomicBenefitSectionVisible"
          title="产能与经济效益"
          class="content-section"
        >
          <div class="EconomicBenefitPart">
            <div
              class="eco-row"
              v-for="(innerList, listIndex) in EconomicBenefitTipConfigList"
              :key="listIndex"
            >
              <eco-tip
                class="eco-tip-conponent"
                v-for="(tipSet, tipIndex) in innerList"
                :key="tipIndex"
                :label="tipSet.label"
                :value="EconomicBenefit[tipSet.prop]"
                :icon="'.' + dealEcoTipIcon(tipSet.icon)"
              />
            </div>
          </div>
        </content-card>
        <!-- 最底部 -->
        <footer class="bottom-section">
          <div class="bottom-common-width">
            <div class="flex-layout">
              <div class="factory-name">{{ BasicReport.ProjectName }}</div>
              <div class="generator-time">
                <span>报告生成时间：</span
                ><span>{{ BasicReport.CreateTime }}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocalReportConfig } from "@/utils/configUtils";
import { getAllData } from "@/api/dashboard.js";

import ContentCard from "@/components/ContentCard";
import EcoTip from "@/components/EcoTip";

import StockInOutBar from "./charts/StockInOutBar";
import AgvWorkLine from "./charts/AgvWorkLine";
import EqpWaitBar from "./charts/EqpWaitBar";
import ProcessLine from "./charts/ProcessLine";
import { rem } from "@/utils/rem";

import {
  // 仿真设备和参数
  EquipmentParamConfigList,

  // 仓储统计
  WarehouseStatisticsColumnConfigList,
  WarehouseStatisticsTabConfigList,

  // AGV设备稼动率
  AgvStatisticsColumnConfigList,
  AgvStatisticsTabConfigList,

  // 生产设备等待时间
  ProductionStatisticsColumnConfigList,
  ProductionStatisticsTabConfigList,

  // 制程统计
  ProcessStatisticsColumnConfigList,
  ProcessStatisticsTabConfigList,

  // 产能与经济效益 tip配置
  EconomicBenefitTipConfigList,

  // 表格颜色配置
  tableColorConfig,
} from "./config";

export default {
  name: "Dashboard",
  components: {
    ContentCard,
    EcoTip,
    // 仓储统计 柱状图 组件
    StockInOutBar,
    AgvWorkLine,
    EqpWaitBar,
    ProcessLine,
  },
  created() {
    rem();
    // 根据本地配置覆写显影配置
    try {
      this.initVisible();
    } catch (e) {
      console.log("initVisible e", e);
    }
    getAllData().then((res) => {
      let data = JSON.parse(JSON.stringify(res.data || {}));
      this.BasicReport = data.BasicReport;
      this.EquipmentParam = data.EquipmentParam;
      this.WarehouseStatistics = data.WarehouseStatistics;
      this.AgvStatistics = data.AgvStatistics;
      this.ProductionStatistics = data.ProductionStatistics;
      this.ProcessStatistics = data.ProcessStatistics;
      this.EconomicBenefit = data.EconomicBenefit;

      this.reloadCharts();
    });
  },
  data() {
    return {
      // -------------------- 显示隐藏配置 --------------------
      visibleConfig: getLocalReportConfig(),
      // -------------------- 报告头尾与部分全局信息 --------------------
      BasicReport: {},
      // -------------------- 仿真设备和参数 --------------------
      EquipmentParam: {},
      EquipmentParamConfigList,
      EquipmentParamSectionVisible: true,
      // 选项卡
      activeEqpType: "Warehouse",

      // -------------------- 仓储统计 --------------------
      WarehouseStatistics: [],
      WarehouseStatisticsColumnConfigList,
      WarehouseStatisticsTabConfigList,
      WarehouseStatisticsSectionVisible: true,
      WarehouseStatisticsTableVisible: true,
      // 选项卡
      activeWarehouseTab: "Quantity",
      // charts 配置

      // -------------------- AGV设备稼动率 --------------------
      AgvStatistics: [],
      AgvStatisticsColumnConfigList,
      AgvStatisticsTabConfigList,
      AgvStatisticsSectionVisible: true,
      AgvStatisticsTableVisible: true,
      // 选项卡
      activeAgvStatistics: "Utilization",

      // -------------------- 生产设备等待时间 --------------------
      ProductionStatistics: [],
      ProductionStatisticsColumnConfigList,
      ProductionStatisticsTabConfigList,
      ProductionStatisticsSectionVisible: true,
      ProductionStatisticsTableVisible: true,
      // 选项卡
      activeProductionStatistics: "AwaitTime",

      // -------------------- 制程统计 --------------------
      ProcessStatistics: [],
      ProcessStatisticsColumnConfigList,
      ProcessStatisticsTabConfigList,
      ProcessStatisticsSectionVisible: true,
      ProcessStatisticsTableVisible: true,
      // 选项卡
      acitveProcessStatistics: "EquipmentCount",

      // -------------------- 产能与经济效益 --------------------
      EconomicBenefit: {},
      EconomicBenefitTipConfigList,
      EconomicBenefitSectionVisible: true,

      // 表格颜色配置
      tableColorConfig,
      // 全部图表状态
      chartStatus: true,
    };
  },
  provide() {
    return {
      getTheme: () => this.visibleConfig.theme || "light",
    };
  },
  methods: {
    initVisible() {
      if (this.visibleConfig) {
        let sections = JSON.parse(JSON.stringify(this.visibleConfig.sections));
        sectionsLoop: for (let sctn of sections) {
          nameSwitch: switch (sctn.name) {
            case "EquipmentParam": {
              if (!sctn.visible) {
                this.EquipmentParamSectionVisible = false;
                break nameSwitch;
              } else {
                !this.EquipmentParamSectionVisible &&
                  (this.EquipmentParamSectionVisible = true);
              }
              this.EquipmentParamConfigList =
                this.EquipmentParamConfigList.filter((tabSet) => {
                  let theVsSet = sctn.tabTableConfigList.find(
                    (cell) => cell.name === tabSet.name && cell.visible
                  );
                  if (!theVsSet) {
                    return false;
                  }
                  tabSet.columnConfigList = tabSet.columnConfigList.filter(
                    (colSet) => {
                      return theVsSet.colVisible.includes(colSet.prop);
                    }
                  );
                  return true;
                });
              if (this.EquipmentParamConfigList.length) {
                this.activeEqpType = this.EquipmentParamConfigList[0].name;
              }
              break nameSwitch;
            }
            case "WarehouseStatistics": {
              if (!sctn.visible) {
                this.WarehouseStatisticsSectionVisible = false;
                break nameSwitch;
              } else {
                !this.WarehouseStatisticsSectionVisible &&
                  (this.WarehouseStatisticsSectionVisible = true);
              }
              if (!sctn.tablePartVisible) {
                this.WarehouseStatisticsTableVisible = false;
              } else {
                !this.WarehouseStatisticsTableVisible &&
                  (this.WarehouseStatisticsTableVisible = true);
                this.WarehouseStatisticsColumnConfigList =
                  this.WarehouseStatisticsColumnConfigList.filter((colSet) => {
                    return sctn.colVisible.includes(colSet.prop);
                  });
              }
              this.WarehouseStatisticsTabConfigList =
                this.WarehouseStatisticsTabConfigList.filter((tabSet) => {
                  return sctn.tabChartsConfigList.some((cell) => {
                    return cell.name === tabSet.name && cell.visible;
                  });
                });
              if (this.WarehouseStatisticsTabConfigList) {
                this.activeWarehouseTab =
                  this.WarehouseStatisticsTabConfigList[0].name;
              }
              break nameSwitch;
            }
            case "AgvStatistics": {
              if (!sctn.visible) {
                this.AgvStatisticsSectionVisible = false;
                break nameSwitch;
              } else {
                !this.AgvStatisticsSectionVisible &&
                  (this.AgvStatisticsSectionVisible = true);
              }
              if (!sctn.tablePartVisible) {
                this.AgvStatisticsTableVisible = false;
              } else {
                !this.AgvStatisticsTableVisible &&
                  (this.AgvStatisticsTableVisible = true);
                this.AgvStatisticsColumnConfigList =
                  this.AgvStatisticsColumnConfigList.filter((colSet) => {
                    return sctn.colVisible.includes(colSet.prop);
                  });
              }
              this.AgvStatisticsTabConfigList =
                this.AgvStatisticsTabConfigList.filter((tabSet) => {
                  return sctn.tabChartsConfigList.some((cell) => {
                    return cell.name === tabSet.name && cell.visible;
                  });
                });
              if (this.AgvStatisticsTabConfigList.length) {
                this.activeAgvStatistics =
                  this.AgvStatisticsTabConfigList[0].name;
              }

              break nameSwitch;
            }
            case "ProductionStatistics": {
              if (!sctn.visible) {
                this.ProductionStatisticsSectionVisible = false;
                break nameSwitch;
              } else {
                !this.ProductionStatisticsSectionVisible &&
                  (this.ProductionStatisticsSectionVisible = true);
              }
              if (!sctn.tablePartVisible) {
                this.ProductionStatisticsTableVisible = false;
              } else {
                !this.ProductionStatisticsTableVisible &&
                  (this.ProductionStatisticsTableVisible = true);
                this.ProductionStatisticsColumnConfigList =
                  this.ProductionStatisticsColumnConfigList.filter((colSet) => {
                    return sctn.colVisible.includes(colSet.prop);
                  });
              }
              this.ProductionStatisticsTabConfigList =
                this.ProductionStatisticsTabConfigList.filter((tabSet) => {
                  return sctn.tabChartsConfigList.some((cell) => {
                    return cell.name === tabSet.name && cell.visible;
                  });
                });
              if (this.ProductionStatisticsTabConfigList.length) {
                this.activeProductionStatistics =
                  this.ProductionStatisticsTabConfigList[0].name;
              }
              break nameSwitch;
            }
            case "ProcessStatistics": {
              if (!sctn.visible) {
                this.ProcessStatisticsSectionVisible = false;
                break nameSwitch;
              } else {
                !this.ProcessStatisticsSectionVisible &&
                  (this.ProcessStatisticsSectionVisible = true);
              }
              if (!sctn.tablePartVisible) {
                this.ProcessStatisticsTableVisible = false;
              } else {
                !this.ProcessStatisticsTableVisible &&
                  (this.ProcessStatisticsTableVisible = true);
                this.ProcessStatisticsColumnConfigList =
                  this.ProcessStatisticsColumnConfigList.filter((colSet) => {
                    return sctn.colVisible.includes(colSet.prop);
                  });
              }
              this.ProcessStatisticsTabConfigList =
                this.ProcessStatisticsTabConfigList.filter((tabSet) => {
                  return sctn.tabChartsConfigList.some((cell) => {
                    return cell.name === tabSet.name && cell.visible;
                  });
                });
              if (this.ProcessStatisticsTabConfigList.length) {
                this.acitveProcessStatistics =
                  this.ProcessStatisticsTabConfigList[0].name;
              }
              break nameSwitch;
            }
            case "EconomicBenefit": {
              if (!sctn.visible) {
                this.EconomicBenefitSectionVisible = false;
                break nameSwitch;
              } else {
                !this.EconomicBenefitSectionVisible &&
                  (this.EconomicBenefitSectionVisible = true);
              }

              break nameSwitch;
            }
            default: {
              break nameSwitch;
            }
          }
        }
      }
    },
    handleEqpTypeClick(tab) {},
    reloadCharts() {
      this.chartStatus = false;
      this.$nextTick(() => {
        this.chartStatus = true;
      });
    },
    dealEcoTipIcon(icon = "") {
      let result = `/static/icon/${icon}-1.png`;
      // console.log('dealEcoTipIcon',icon,result)
      return result;
    },
  },
};
</script>
