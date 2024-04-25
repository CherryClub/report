import * as echarts from 'echarts'

/**生成一个三位或六位的十六进制颜色码字串 
 * 
 * @param {boolean} isShort 是否是3位十六进制数
 * @returns {string} 十六进制颜色字符串
 */
function randHexColor(isShort=false){
  let hexLength = isShort?3:6;
  let topBorder = 1 * Math.pow(16,hexLength)
  let hexStr = ( Math.floor( Math.random() * topBorder ) ).toString(16)
  if(hexStr.length<hexLength){
    hexStr = hexStr.padStart(hexLength,'0')
  }
  return '#'+hexStr
}
/**echarts 默认取色配置 */
export const defaultColorScope = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
/**生成一列指定长度的互不相同十六进制颜色码列表 
 * 如果提供了一列颜色 将根据给出的长度补充直到达到长度 
 * 用于处理echarts默认颜色不够用的情况
 * 
 * @param {number} length 
 * @param {color[]} colorDefault 
 * @returns {color[]}
 */
export function getSeriesColors(length=0,colorDefault=[]){
	let colorList = [].concat(colorDefault)
  let isShort = false;
	while(colorList.length<length){
		let randColor = randHexColor(isShort)
		if(!colorList.includes(randColor)){
			console.log('%c'+randColor,'color:'+randColor)
			colorList.push(randColor)
		}
	}
  // console.log('取色范围colorList',colorList)
	return colorList
}



export default (function(){
  return {
    echartWraper: null, // echart容器
    instance: null, // echart实例
    default: echarts,
    init(el, options={}){
      if(!el) return;
      this.echartWraper = el;
      this.instance = this.default.init(el);
      this.instance.setOption(options);
      return this.instance;
    },
    update(options={}){
      if(!this.echartWraper) return;
      if(!this.instance){
        this.init(this.echartWraper, options);
        return;
      };
      this.instance.setOption(options);
      return this.instance;
    },
    // dispose(){
    //   if(this.instance){
    //     this.instance.dispose()
    //   }
    // }
  }
})();