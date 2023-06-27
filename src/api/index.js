import requests from "./request";

export const getCategoryList = ()=>{
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}
