import { reqGetOrderInfo, reqGetUserAddress, reqSubmitOrder } from "../../api";
// 数据存储
const state = {
  address: [],
  tradeinfo: {},
};
// 修改state
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address
  },
  GETORDERINFO(state, tradeinfo) {
    state.tradeinfo = tradeinfo
  }
};
// 处理异步
const actions = {
  // 获取用户地址
  async getUserAddress({ commit }) {
    const res = await reqGetUserAddress()
    if (res.code == 200) {
      commit('GETUSERADDRESS', res.data)
    }
  },
  // 获取订单信息
  async getOrderInfo({ commit }) {
    const res = await reqGetOrderInfo()
    if (res.code == 200) {
      commit('GETORDERINFO', res.data)
    }
  },
  // 提交订单
  async submitOrder({ commit }, { tradeNo, data }) {
    const res = await reqSubmitOrder(tradeNo, data)
    if (res.code == 200) {
      return res.data
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
};
// 计算state
const getters = {
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
  getters

})
