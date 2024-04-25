<template>
  <div class="chart-option-default-view" ref='chart'></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name:'chart-option-default-view',
  inject:['getTheme'],
  props:{
    data:{
      type:Object,
      default:()=>({}),
    }
  },
}
</script>

<style lang="scss" scoped>

</style>