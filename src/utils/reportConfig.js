import { columnCellFactory } from "./ColumnCell";
// EquipmentParam Warehouse 表格列配置
const WarehouseColumnConfigList = [
  columnCellFactory({langLabel:"名称",prop:"Name",}),
  columnCellFactory({langLabel:"设备规格",prop:"Size",}),
  columnCellFactory({langLabel:"RGV行走速度",prop:'MoveSpeed'}),
  columnCellFactory({langLabel:"RGV抬升速度",prop:'LiftSpeed'}),
  columnCellFactory({langLabel:"物料静置时间",prop:'HoldingTime'}),
  columnCellFactory({langLabel:"加速度",prop:'Acceleration'}),
  columnCellFactory({langLabel:"报警阈值",prop:'UnitAlarmThreshold'}),
].filter(Boolean)

// EquipmentParam Transport 表格列配置
const TransportColumnConfigList = [
  columnCellFactory({langLabel:"名称",prop:"Name",}),
  columnCellFactory({langLabel:"设备规格",prop:"Size",}),
  columnCellFactory({langLabel:"速度",prop:'Speed'}),
  columnCellFactory({langLabel:"功率",prop:'Power'}),
].filter(Boolean)

// EquipmentParam Production 表格列配置
const ProductionColumnConfigList = [
  columnCellFactory({langLabel:"名称",prop:"Name",}),
  columnCellFactory({langLabel:"设备规格",prop:"Size",}),
  columnCellFactory({langLabel:"物料静置时间",prop:'HoldingTime'}),
  columnCellFactory({langLabel:"功率",prop:'Power'}),
].filter(Boolean)

// EquipmentParam Agv 表格列配置
const AgvColumnConfigList = [
  columnCellFactory({langLabel:"名称",prop:"Name",}),
  columnCellFactory({langLabel:"设备规格",prop:"Size",}),
  columnCellFactory({langLabel:"速度",prop:'Speed'}),
  columnCellFactory({langLabel:"功率",prop:'Power'}),
  columnCellFactory({langLabel:"电量",prop:'BatteryLevel'}),
].filter(Boolean)


// EquipmentParam 选项卡
export const EquipmentParamConfigList = [
  {
    label:"仓储设备",
    name:"Warehouse",
    className:'eqpTypeWarehouse',
    type:'table',
    columnConfigList:WarehouseColumnConfigList,
    colVisible:WarehouseColumnConfigList.map(m=>m.prop),
    dataKey:'Warehouse',
    visible:true,
    remark:'仓储设备',
  },
  {
    label:"运输设备",
    name:"Transport",
    className:"eqpTypeTransport",
    type:'table',
    columnConfigList:TransportColumnConfigList,
    colVisible:TransportColumnConfigList.map(m=>m.prop),
    dataKey:'Transport',
    visible:true,
    remark:'运输设备',
  },
  {
    label:"生产设备",
    name:"Production",
    className:"eqpTypeProduction",
    type:'table',
    columnConfigList:ProductionColumnConfigList,
    colVisible:ProductionColumnConfigList.map(m=>m.prop),
    dataKey:'Production',
    visible:true,
    remark:'生产设备',

  },
  {
    label:"AGV设备",
    name:"Agv",
    className:"eqpTypeAgv",
    type:'table',
    columnConfigList:AgvColumnConfigList,
    colVisible:AgvColumnConfigList.map(m=>m.prop),
    dataKey:'Agv',
    visible:true,
    remark:'AGV设备',
  },
  {
    label:"仿真概览图",
    name:"mockColor",
    className:"",
    type:'img',  // ??? shotcut???
    urlKey:'TopImage',
    columnConfigList:[],
    dataKey:'',
    visible:true,
    remark:'仿真概览图',
  },
  {
    label:"链接和层级",
    name:"mockLink",
    className:"",
    type:'img',
    urlKey:'LinkImage',
    columnConfigList:[],
    dataKey:'',
    visible:true,
    remark:'链接和层级',
  },
].filter(Boolean)


// WarehouseStatistics 表格列配置
export const WarehouseStatisticsColumnConfigList = [
  columnCellFactory({langLabel:"仓库名称",prop:"Name",}),
  columnCellFactory({langLabel:"出库次数",prop:"OutboundQuantity",}),
  columnCellFactory({langLabel:"入库次数",prop:'InboundQuantity'}),
  columnCellFactory({langLabel:"仓库容积",prop:'Volume'}),
  columnCellFactory({langLabel:"平均空置率",prop:'VacancyRate'}),
  columnCellFactory({langLabel:"平均静置时间",prop:'HoldingTime'}),
  columnCellFactory({langLabel:"能耗统计",prop:'Power'}),
].filter(Boolean)
// WarehouseStatistics 选项卡
export const WarehouseStatisticsTabConfigList = [
  {
    label:"出入库统计",
    name:"Quantity",
    remark:'出入库统计',
    className:'WarehouseStatisticsQuantity',
    dataKey:'Quantity',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Quantity',
        seriesData:[
          {
            name:'入库次数（次）',
            color:'#006FE7',
            data:list.map(m=>m.InboundQuantity),
          },
          {
            name:'出库次数（次）',
            color:'#22A039',
            data:list.map(m=>m.OutboundQuantity),
          }
        ]
      }
    }
  },
  {
    label:"平均空置率",
    name:"VacancyRate",
    remark:'平均空置率',
    className:'WarehouseStatisticsVacancyRate',
    dataKey:'VacancyRate',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'VacancyRate',
        seriesData:[
          {
            data:list.map(m=>m.VacancyRate),
            color:'#EE8438',
            backgroundColor:'rgba(238,132,56,0.2)'
          }
        ]
      }
    }
  },
  {
    label:"平均静置时间",
    name:"HoldingTime",
    remark:'平均静置时间',
    className:'WarehouseStatisticsHoldingTime',
    dataKey:'HoldingTime',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'HoldingTime',
        seriesData:[
          {
            data:list.map(m=>m.HoldingTime),
            color:'#0A75FF',
          }
        ]
      }
    }

  },
  {
    label:"能耗统计",
    name:"Power",
    remark:'能耗统计',
    className:'WarehouseStatisticsPower',
    dataKey:'Power',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Power',
        seriesData:[
          {
            data:list.map(m=>m.Power),
            color:'#006FE7',
          }
        ]
      }
    }
  },
].filter(Boolean)


// AgvStatistics 表格列配置
export const AgvStatisticsColumnConfigList = [
  columnCellFactory({langLabel:"设备名称", prop:'Name'}),
  columnCellFactory({langLabel:"平均稼动率", prop:'Utilization'}),
  columnCellFactory({langLabel:"总工作时间", prop:'WorkTime'}),
  columnCellFactory({langLabel:"有效工作时间", prop:'ValidTime'}),
  columnCellFactory({langLabel:"空闲时间", prop:'FreeTime'}),
  columnCellFactory({langLabel:"拥堵时间", prop:'CongestionTime'}),
  columnCellFactory({langLabel:"拥堵率", prop:'CongestionRate'}),
].filter(Boolean)
// AgvStatistics 选项卡
export const AgvStatisticsTabConfigList = [
  
  {
    label:"平均稼动率",
    name:"Utilization",
    remark:'平均稼动率',
    className:'AgvStatisticsUtilization',
    dataKey:'Utilization',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Utilization',
        seriesData:[
          {
            data:list.map(m=>m.Utilization),
            color:'#006FE7',
          }
        ]
      }
    }
  },
  {
    label:"工作时间统计",
    name:"WorkTime",
    remark:'工作时间统计',
    className:'AgvStatisticsWorkTime',
    dataKey:'WorkTime',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'WorkTime',
        seriesData:[
          {
            data:list.map(m=>m.WorkTime),
            color:'#22A039',
          }
        ]
      }
    }
  },
  {
    label:"拥堵时间",
    name:"CongestionTime",
    remark:'拥堵时间',
    className:'AgvStatisticsCongestionTime',
    dataKey:'CongestionTime',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'CongestionTime',
        seriesData:[
          {
            data:list.map(m=>m.CongestionTime),
            color:'#EE8438',
          }
        ]
      }
    }
  },
].filter(Boolean)

// ProductionStatistics 表格列配置
export const ProductionStatisticsColumnConfigList = [
  columnCellFactory({langLabel:"设备名称", prop:'Name'}),
  columnCellFactory({langLabel:"平均等待时间", prop:'AwaitTime'}),
  columnCellFactory({langLabel:"最大等待时间", prop:'MaxAwaitTime'}),
  columnCellFactory({langLabel:"加工次数", prop:'Quantity'}),
  columnCellFactory({langLabel:"总工作时间", prop:'WorkTime'}),
  columnCellFactory({langLabel:"空闲时间", prop:'FreeTime'}),
  columnCellFactory({langLabel:"利用率", prop:'Utilization'}),
].filter(Boolean)
// ProductionStatistics 选项卡
export const ProductionStatisticsTabConfigList = [
  {
    label:"平均等待时间",
    name:"AwaitTime",
    remark:'平均等待时间',
    className:'ProductionStatisticsAwaitTime',
    dataKey:'AwaitTime',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'AwaitTime',
        seriesData:[
          {
            data:list.map(m=>m.AwaitTime),
            color:'#EE8438',
          }
        ]
      }
    }
  },
  {
    label:"工作时间统计",
    name:"WorkTime",
    remark:'工作时间统计',
    className:'ProductionStatisticsWorkTime',
    dataKey:'WorkTime',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'WorkTime',
        seriesData:[
          {
            data:list.map(m=>m.WorkTime),
            color:'#006FE7',
          }
        ]
      }
    }
  },
  {
    label:"设备利用率",
    name:"Utilization",
    remark:'设备利用率',
    className:'ProductionStatisticsUtilization',
    dataKey:'Utilization',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Utilization',
        seriesData:[
          {
            data:list.map(m=>m.Utilization),
            color:'#22A039',
            backgroundColor:'rgba(34,160,57,0.2)'
          }
        ]
      }
    }
  },
  
].filter(Boolean)


// ProcessStatistics 表格列配置
export const ProcessStatisticsColumnConfigList = [
  columnCellFactory({langLabel:"制程名称", prop:'Name'}),
  columnCellFactory({langLabel:"加工设备总数", prop:'EquipmentCount'}),
  columnCellFactory({langLabel:"总工作时间", prop:'WorkTime'}),
  columnCellFactory({langLabel:"待机时间", prop:'AwaitTime'}),
  columnCellFactory({langLabel:"产线稼动率", prop:'Utilization'}),
  columnCellFactory({langLabel:"能耗统计", prop:'Power'}),
].filter(Boolean)
// ProcessStatistics 选项卡
export const ProcessStatisticsTabConfigList = [
  {
    label:"加工设备数",
    name:"EquipmentCount",
    remark:'加工设备数',
    className:'ProcessStatisticsEquipmentCount',
    dataKey:'EquipmentCount',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'EquipmentCount',
        seriesData:[
          {
            data:list.map(m=>m.EquipmentCount),
            color:'#EE8438',
          }
        ]
      }
    }
  },
  {
    label:"产线稼动率",
    name:"Utilization",
    remark:'产线稼动率',
    className:'ProcessStatisticsUtilization',
    dataKey:'Utilization',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Utilization',
        seriesData:[
          {
            data:list.map(m=>m.Utilization),
            color:'#006FE7',
            backgroundColor:'rgba(0,111,231,0.19)'
          }
        ]
      }
    }
  },
  {
    label:"能耗统计",
    name:"Power",
    remark:'能耗统计',
    className:'ProcessStatisticsPower',
    dataKey:'Power',
    visible:true,
    dealChartOptions(list=[]){
      return {
        xData:list.map(m=>m.Name),
        type:'Power',
        seriesData:[
          {
            data:list.map(m=>m.Power),
            color:'#006FE7',
          }
        ]
      }
    }
  },
  
].filter(Boolean)

// 产能与经济效益 EconomicBenefit tip配置
export const EconomicBenefitTipConfigList = [
  [
    {
      label:"总产能",
      name:"TotalCapacity",
      prop:"TotalCapacity",
      icon:'icon-eco-capacity-pie'
    },
    {
      label:"总工作时间",
      name:"TotalTime",
      prop:"TotalTime",
      icon:'icon-eco-time-clock'
    },
    {
      label:"总能耗",
      name:"TotalPower",
      prop:"TotalPower",
      icon:'icon-eco-power-drop'
    }
  ],
  [
    {
      label:"能源消耗（¥）",
      name:"Expense",
      prop:"Expense",
      icon:'icon-eco-expense-light'
    },
    {
      label:"经济效益（¥）",
      name:"Revenue",
      prop:"Revenue",
      icon:'icon-eco-revenue-money'
    },
    {
      label:"投入产出比",
      name:"InputOutputRatio",
      prop:"InputOutputRatio",
      icon:'icon-eco-ratio-stock'
    }
  ],
].filter(Boolean)


export default function(){
  return {
    theme:'light',
    sections:[
      {
        name:'EquipmentParam',
        title:'仿真设备和参数',
        visible:true,
        tabTableConfigList:EquipmentParamConfigList,
        configLayout:['section-visible','tab-table'],
        reportLayout:['tab-table'],
        remark:'仿真设备和参数',
      },
      {
        name:'WarehouseStatistics',
        title:'仓储统计',
        visible:true,
        tableConfigList:WarehouseStatisticsColumnConfigList,
        colVisible:WarehouseStatisticsColumnConfigList.map(m=>m.prop),
        tablePartVisible:true,
        tabChartsConfigList:WarehouseStatisticsTabConfigList,
        configLayout:['section-visible','table','tab-charts'],
        reportLayout:['table','tab-charts'],
        remark:'仓储统计',
        tableRemark:'列表设置',
      },
      {
        name:'AgvStatistics',
        title:'AGV设备稼动率',
        visible:true,
        tableConfigList:AgvStatisticsColumnConfigList,
        colVisible:AgvStatisticsColumnConfigList.map(m=>m.prop),
        tablePartVisible:true,
        tabChartsConfigList:AgvStatisticsTabConfigList,
        configLayout:['section-visible','table','tab-charts'],
        reportLayout:['table','tab-charts'],
        remark:'AGV设备稼动率',
        tableRemark:'列表设置',
      },
      {
        name:'ProductionStatistics',
        title:'生产设备等待时间',
        visible:true,
        tableConfigList:ProductionStatisticsColumnConfigList,
        colVisible:ProductionStatisticsColumnConfigList.map(m=>m.prop),
        tablePartVisible:true,
        tabChartsConfigList:ProductionStatisticsTabConfigList,
        configLayout:['section-visible','table','tab-charts'],
        reportLayout:['table','tab-charts'],
        remark:'生产设备等待时间',
        tableRemark:'列表设置',
      },
      {
        name:'ProcessStatistics',
        title:'制程统计',
        visible:true,
        tableConfigList:ProcessStatisticsColumnConfigList,
        colVisible:ProcessStatisticsColumnConfigList.map(m=>m.prop),
        tablePartVisible:true,
        tabChartsConfigList:ProcessStatisticsTabConfigList,
        configLayout:['section-visible','table','tab-charts'],
        reportLayout:['table','tab-charts'],
        remark:'制程统计',
        tableRemark:'列表设置',
      },
      {
        name:'EconomicBenefit',
        title:'产能与经济效益',
        visible:true,
        tipsConfigList:EconomicBenefitTipConfigList,
        configLayout:['section-visible'],
        reportLayout:['tips'],
        remark:'产能与经济效益',
      },
    ]
  }
}


const blue_1 = '#006FE7'
const blue_light_1 = '#CEE5FF'
const blue_dark_1 ='#347CCD'
const green_1 = '#22A039'
const green_light_1 = ['#3FBE56','19%']
const green_dark_1 = '#57A064'

export const tableColorConfig = {
  thBgColor:{
    EquipmentParam: blue_1,
    WarehouseStatistics:green_1,
    AgvStatistics:blue_1,
    ProductionStatistics:green_1,
    ProcessStatistics:blue_1,
  },
  thBgAlpha:{},
  tripeColor:{
    EquipmentParam: blue_light_1,
    WarehouseStatistics:green_light_1[0],
    AgvStatistics:blue_light_1,
    ProductionStatistics:green_light_1[0],
    ProcessStatistics:blue_light_1,
  },
  tripeAlpha:{
    WarehouseStatistics:green_light_1[1],
    ProductionStatistics:green_light_1[1],
  },
}

