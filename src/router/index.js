import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//1、先把VueRouter原型对象的push，保存一份
let originPush = Router.prototype.push;
let originReplace = Router.prototype.replace;
//2、重写push|replace
//第一个参数：告诉原来的push，跳转的目标位置和传递了哪些参数
Router.prototype.push = function (location) {
  return originPush.call(this, location).catch(err => err)
}
Router.prototype.replace = function (location) {
  return originReplace.call(this, location).catch(err => err)
}


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home'),
      meta: { show: true }
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login'),
      meta: { show: false }
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register'),
      meta: { show: false }
    }, {
      path: '/search',
      name: 'Search',
      component: () => import('../pages/Search'),
      meta: { show: true }
    }
  ]
})
