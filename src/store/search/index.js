import { getCategoryList } from "../../api";
// 数据存储
const state = {
  categorylist: JSON.parse(window.sessionStorage.getItem("categorylist"))
};
// 修改state
const mutations = {
  // saveToStorage(data) {
  //   window.sessionStorage.setItem(`${data}`, JSON.stringify('`${state.data}`'))
  //   console.log(2);
  //   console.log(JSON.parse(window.sessionStorage.getItem("categorylist")));
  // },
  // 分类列表赋值
  GETCATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist
    // 将分类列表数据以字符串形式缓存到本地(需要先获取数据再缓存)
    window.sessionStorage.setItem('categorylist', JSON.stringify(categorylist))
    // this.commit('m_search/saveToStorage', categorylist)
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
