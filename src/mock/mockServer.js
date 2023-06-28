import Mock from 'mockjs'
import swiper from './swiper.json'
import floor from './floor.json'

// 第一个参数请求地址，第二个参数响应数据
Mock.mock("/mock/swiper", { code: 200, data: swiper })
Mock.mock("/mock/floor", { code: 200, data: floor })
