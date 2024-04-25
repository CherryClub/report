<template>
  <div class="chart-option-stock-inout-bar" ref='chart'></div>
</template>

<script>
import {iouStockInOutBar} from './options/stockInOutbar';
import {iouStockInOutBarVacancy} from './options/stockInOutbar-vacancy';
import {iouStockInOutBarHolding} from './options/stockInOutbar-holding';
import {iouStockInOutBarPower} from './options/stockInOutbar-power';
export default {
  name:'chart-option-stock-inout-bar',
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
        case 'VacancyRate':{
          iouStockInOutBarVacancy(...args)
          break;
        };
        case 'HoldingTime':{
          iouStockInOutBarHolding(...args)
          break;
        };
        case 'Power':{
          iouStockInOutBarPower(...args)
          break;
        };
        default:{
          iouStockInOutBar(...args)
          break;
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>