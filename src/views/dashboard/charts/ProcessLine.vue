<template>
  <div class="chart-option-agv-work-line" ref='chart'></div>
</template>

<script>
import {iouProcessLine} from './options/processLine';
import {iouProcessLineUtilization} from './options/processLine-utilization';
import {iouProcessLinePower} from './options/processLine-power';
export default {
  name:'chart-option-process-line',
  inject:['getTheme'],
  props:{
    data:{
      type:Object,
      default:()=>({xData:[],seriesData:[]}),
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      let el = this.$refs.chart;
      let args = [el,this.data]
      let isDark = this.getTheme() === 'dark'
      if(isDark){
        args.push((options)=>{
          options.backgroundColor = '#333745'
          // options.backgroundColor = ''
          options.darkMode = true
        })
      }
      switch(this.data.type){
        case 'Utilization':{
          iouProcessLineUtilization(...args)
          break;
        }
        case 'Power':{
          iouProcessLinePower(...args)
          break;
        }
        default:{
          iouProcessLine(...args)
          break;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>