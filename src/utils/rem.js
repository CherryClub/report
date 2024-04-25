
export function rem(){
  const designWidth = 1920;
  const iw = window.innerWidth;
  let docEl = document.documentElement;
  let scale =  iw / designWidth;
  if(location.hash.includes('config')){
    console.log('配置页')
    const designHeight = 1080
    const ih = window.innerHeight
    let scaleY = ih / designHeight;
    docEl.style.transform = `scale(${scale}, ${scaleY})`;
  }else{
    console.log('报告页')
    docEl.style.transform = `scale(${scale})`;
  }
  // docEl.style[`transform-origin`] = '0 0'
  // docEl.style['overflow-x'] = 'hidden'

  // return {
  //   scale,
  //   dpr: window.devicePixelRatio,
  //   dcw: docEl.clientWidth,
  //   dch: docEl.clientHeight,
  // }
}