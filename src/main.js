// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入第三方组件
import './mock/mockServer'
import * as API from './api/index'
import { MessageBox, Button } from 'element-ui';
import VueLazyload from 'vue-lazyload'
// 引入公共组件
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert;

// 注册组件，第一个参数组件名字，第二个组件想要注册的组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Button.name, Button)

import lazyimg from '../static/images/lazyload.png'
Vue.use(VueLazyload, {
  loading: lazyimg
})

// 引入表单验证插件

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
