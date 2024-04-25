import Vue from 'vue'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import {rem} from '@/utils/rem'

import CommonTable from '@/components/CommonTable'
// 头部标签组件
import VueMeta from 'vue-meta'


// 全局组件挂载
Vue.component('CommonTable', CommonTable)

Vue.use(VueMeta)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size:'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),

  mounted(){
    rem()
    window.addEventListener('resize',(e)=>{
      rem()
    });
    let versionTime = new Date(+window.versionTime);
    let [yyyy,MM,dd,HH,mm,ss] = [
      versionTime.getFullYear(),
      versionTime.getMonth()+1,
      versionTime.getDate(),
      versionTime.getHours(),
      versionTime.getMinutes(),
      versionTime.getSeconds()
    ].map(item=>item.toString().padStart(2,'0'))
    console.log(
      `%c 前端包构建于 %c ${yyyy}年${MM}月${dd}日 ${HH}:${mm}:${ss} 请注意发包时间 %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'  
    );
  }
})
