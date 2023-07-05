import { reqGetCartList } from "../../api";
// 数据存储
const state = {
  cartlist: []
};
// 修改state
const mutations = {
  GETCARTLIST(state, cartlist) {
    state.cartlist = cartlist
  }
};
// 处理异步
const actions = {
  async getCartList({ commit }) {
    const res = await reqGetCartList();
    if (res.code === 200) {
      commit('GETCARTLIST', res.data)
    }
  }
};
// 计算state
const getters = {
  cartInfoList(state) {
    return state.cartlist[0].cartInfoList || []
  }
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
  getters

})
