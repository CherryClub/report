<template>
  <div class="chart-option-agv-work-line" ref='chart'></div>
</template>

<script>
import {iouAgvWorkLine} from './options/agvWorkLine';
import {iouAgvWorkLineWorkTime} from './options/agvWorkLine-worktime';
import {iouAgvWorkLineCongestionTime} from './options/agvWorkLine-congestion';
export default {
  name:'chart-option-agv-work-line',
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
        case 'WorkTime':{
          iouAgvWorkLineWorkTime(...args)
          break;
        };
        case 'CongestionTime':{
          iouAgvWorkLineCongestionTime(...args)
          break;
        };
        default:{
          iouAgvWorkLine(...args)
          break;
        };
      }
      
    }
  },
}
</script>

<style lang="scss" scoped>

</style>