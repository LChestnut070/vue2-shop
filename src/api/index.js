import requests from "./request";
import mockRequests from "./mockRequest"

// 获取分类列表
export const reqGetCategoryList = () => {
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

// 获取轮播图
export const reqGetSwiperList = () => {
  // return mockRequests({
  //   url: '/mock/swiper',
  //   method: 'get'
  // })
  return mockRequests.get('/swiper')
}

// 获取楼层列表
export const reqGetFloorList = () => {
  return mockRequests.get('/floor')
}

// 获取商品搜索列表信息
export const reqGetSearchInfo = (data) => {
  return requests({
    url: '/list',
    method: 'post',
    data
  })
}

// 获取商品详细信息
export const reqGetGoodsInfo = (skuid) => {
  return requests({
    url: `/item/${skuid}`,
    method: 'get'
  })
}

// 将产品添加到购物车
export const reqUpdateCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 获取购物车商品列表
export const reqGetCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get'
  })
}

// 删除购物车商品
export const reqDeleteCartById = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}

// 修改商品状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

// 获取验证码
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

// 注册
export const reqUserRegister = (data) => {
  return requests({
    url: '/user/passport/register',
    method: 'post',
    data
  })
}

// 登录
export const reqUserLogin = (data) => {
  return requests({
    url: '/user/passport/login',
    method: 'post',
    data
  })
}

// 获取用户信息(需要请求头)
export const reqGetUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}

// 退出登录
export const reqUserLogout = () => {
  return requests({
    url: '/user/passport/logout',
    method: 'get'
  })
}

// 获取用户地址
export const reqGetUserAddress = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
}

// 获取用户地址
export const reqGetOrderInfo = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get'
  })
}
// 提交订单信息
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data
  })
}
// 提交订单信息
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}

// 查询订单支付状态
export const reqPayState = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}
// 查询个人中心订单
export const reqGetMyorder = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
}
