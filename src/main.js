// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
import store from '@/store/store.js'
//引入初始化css
import "./assets/common.css";

import Fragment from "vue-fragment"
Vue.use(Fragment.Plugin)

// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;

//引入elment-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

// 全局请求基础地址
axios.defaults.baseURL = 'http://localhost:8080';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
