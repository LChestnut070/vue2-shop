import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
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



let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home'),
      meta: { show: true }
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/Login/index.vue'),
      meta: { show: false }
    }, {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/Register/index.vue'),
      meta: { show: false }
    }, {
      //代表params参数可有可无，务必要加上?
      path: '/search/:keyword?',
      name: 'Search',
      component: () => import('../pages/Search'),
      meta: { show: true }
    }, {
      path: '/detail/:skuid?',
      name: 'Detail',
      component: () => import('../pages/Detail'),
      meta: { show: true }
    }, {
      path: '/addcartsuccess',
      name: 'Addcartsuccess',
      component: () => import('../pages/Addcartsuccess'),
      meta: { show: true }
    }, {
      path: '/shopcart',
      name: 'ShopCart',
      component: () => import('../pages/ShopCart'),
      meta: { show: true }
    }, {
      path: '/trade',
      name: 'Trade',
      component: () => import('../pages/Trade'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/shopcart') {
          next()
        } else {
          // 其他页面来的全部拦截
          next(false)
        }
      }
    }, {
      path: '/pay',
      name: 'Pay',
      component: () => import('../pages/Pay'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/trade') {
          next()
        } else {
          // 其他页面来的全部拦截
          next(false)
        }
      }
    }, {
      path: '/paysuccess',
      name: 'Paysuccess',
      component: () => import('../pages/PaySuccess'),
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == '/pay') {
          console.log(from);
          next()
        } else {
          // 其他页面来的全部拦截
          next(false)
        }
      }
    }, {
      path: '/center',
      name: 'Center',
      component: () => import('../pages/Center'),
      meta: { show: true },
      children: [
        {
          path: 'myorder',
          component: () => import('../pages/Center/myOrder/index.vue')
        }, {
          path: 'grouporder',
          component: () => import('../pages/Center/groupOrder/index.vue')
        }, {
          path: '/center',
          redirect: '/center/myorder'
        }
      ]
    }
  ],
  scrollBehavior() {
    return { y: 0 }
  }
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  // next() 全部放行,next('/home')放行到home
  let token = store.state.m_user.token
  let name = store.state.m_user.userinfo.name
  if (token) {
    if (to.path == '/login') {
      // 如果登录了还想登录是不行哒~
      alert('登录了还想再登录?不行哒~先退出再登录噢')
      next('/')
    } else {
      // 如果有token和用户信息
      if (name) {
        next()
      } else {
        try {
          // 没有就再次请求用户信息
          await store.dispatch('m_user/getUserInfo')
          next()
        } catch (error) {
          // 退出登录并重新进入登录界面
          await store.dispatch('m_user/userLogout')
          next('/login')
        }
      }
    }
  } else {
    let toPath = to.path
    if (toPath.indexOf('trade') != -1 || toPath.indexOf('pay') != -1 || toPath.indexOf('center') != -1) {
      // 重定向如果要跳转的地址被拦截则记录,登录后继续跳转
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
})

export default router
