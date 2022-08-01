// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as echarts from 'echarts'

// 禁止回退
import {
  banBackSpace
} from '@/utils/banBackSpace'
document.onkeydown = banBackSpace

// 禁用浏览器前进后退
window.history.pushState(null, null, window.location.href)
window.addEventListener('popstate', function () {
  window.history.forward(-1)
  window.history.pushState(null, null, window.location.href)
})

Vue.use(ElementUI)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// Vue.prototype.request = request

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
