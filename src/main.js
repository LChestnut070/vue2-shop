// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入第三方组件
import './mock/mockServer'

// 引入三级联动组件
import TypeNav from './pages/Home/TypeNav'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 注册组件，第一个参数组件名字，第二个组件想要注册的组件
Vue.component(TypeNav.name, TypeNav)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
