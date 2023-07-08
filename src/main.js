// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入第三方组件
import './mock/mockServer'
import * as API from './api/index'
// 引入公共组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 注册组件，第一个参数组件名字，第二个组件想要注册的组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
