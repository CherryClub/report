import cmg from '@/utils/echart-utils'
let option = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name:'单位: %',
    max:100,
    min:0,
    axisLabel:{
      formatter: '{value}%',
    },
  },
  backgroundColor:'#F3F3F3',
  legend:{
    top:10,
    right:60,
  },
  series: [
    {
      data: [],
      type: 'bar',
      name:'bar1',
    },
    {
      data: [],
      type: 'bar',
      name:'bar2',
    }
  ]
};

/**
 * 
 * @returns {echartsOptions}
 */
export function updateOption( {
  xData=[],
  seriesData,
} ){
  let result = JSON.parse(JSON.stringify(option));
  result.xAxis.data = xData
  result.series = seriesData.map(m=>{
    return {
      data:m.data,
      type:'bar',
      name:m.name,
      color:m.color,
      showBackground:true,
      backgroundStyle:{
        color:m.backgroundColor
      },
      label:{
        show:true,
        position:'top',
        formatter:`{c}%`
      }
    }
  })
  return result
}

export function iouStockInOutBarVacancy(...args) {
  if (args.length === 0) {return};
  if(args.length===1){
    let data = args[0];
    let options = updateOption(data)
    return cmg.update(options)
  }else if(args.length===2){
    let el = args[0];
    let data = args[1];
    let options = updateOption(data)
    return cmg.init(el, options)
  }else if(args.length===3){
    let el = args[0];
    let data = args[1];
    let callback = typeof (args[2]) === 'function'?args[2]:(m)=>m;
    let options = updateOption(data)
    let calledOptions = callback(options)
    return cmg.init(el, calledOptions||options)
  }
}

export default function(){}