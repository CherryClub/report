<template>
  <div class="chart-option-stock-inout-bar" ref='chart'></div>
</template>

<script>
import {iouEqpWaitBar} from './options/eqpWaitBar';
import {iouEqpWaitBarWorkTime} from './options/eqpWaitBar-worktime';
import {iouEqpWaitBarUtilization} from './options/eqpWaitBar-utilization';
export default {
  name:'chart-option-eqp-wait-bar',
  inject:['getTheme'],
  props:{
    data:{
      type:Object,
      default:()=>({xData:[],type:'',seriesData:[]}),
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
          iouEqpWaitBarWorkTime(...args)
          break;
        };
        case 'Utilization':{
          iouEqpWaitBarUtilization(...args)
          break;
        };
        default:{
          iouEqpWaitBar(...args)
          break;
        }
      }
      
    }
  },
}
</script>

<style lang="scss" scoped>

</style>