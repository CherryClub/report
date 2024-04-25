import cmg from '@/utils/echart-utils'
let option = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name:'单位: s',
    axisLabel:{
      formatter: '{value}s',
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
      type: 'line',
      name:'line1',
    },
    {
      data: [],
      type: 'line',
      name:'line2',
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
      type:'line',
      name:m.name,
      color:m.color,
      label:{
        show:true,
        position:'top',
        formatter:'{c}s'
      }
    }
  })
  return result
}

export function iouAgvWorkLineCongestionTime(...args) {
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