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
