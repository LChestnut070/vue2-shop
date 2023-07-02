import { reqGetSearchInfo } from "../../api";
// 数据存储
const state = {
  searchinfo: {}
};
// 修改state
const mutations = {
  GETSEARCHINFO(state, searchinfo) {
    state.searchinfo = searchinfo
  }
};
// 处理异步
const actions = {
  async getSearchInfo({ commit }, params) {
    const res = await reqGetSearchInfo(params);
    if (res.code === 200) {
      commit('GETSEARCHINFO', res.data)
    }
  }
};
// 计算state
const getters = {
  // 处理商品列表
  goodslist(state) {
    return state.searchinfo.goodsList || []
  },
  //
  attrslist(state) {
    return state.searchinfo.attrsList || []
  },
  //
  trademarklist(state) {
    return state.searchinfo.trademarkList || []
  }
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
  getters

})
