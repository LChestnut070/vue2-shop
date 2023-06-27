import { getCategoryList } from "../../api";
// 数据存储
const state = {
  categorylist: []
};
// 修改state
const mutations = {
  // 分类列表赋值
  GETCATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist
    console.log(categorylist);
  }
};
// 处理异步
const actions = {
  // 获取分类列表数据
  async getCategoryList({ commit }) {
    const res = await getCategoryList()
    if (res.code === 200) {
      commit("GETCATEGORYLIST", res.data)
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
