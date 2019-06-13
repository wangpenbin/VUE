// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' //vuex库
import './config/rem'
import FastClick from 'fastclick'
import axios from 'axios'
Vue.prototype.http=axios;
//  import CSS -->
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
FastClick.attach(document.body); // 取消点击时300毫秒的事件
Vue.config.productionTip = false
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
