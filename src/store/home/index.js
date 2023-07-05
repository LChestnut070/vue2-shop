import { reqGetCategoryList, reqGetSwiperList, reqGetFloorList } from "../../api";
// 数据存储
const state = {
  // 分类列表
  categorylist: JSON.parse(window.sessionStorage.getItem("categorylist")),
  // 轮播图列表
  swiperlist: [],
  // 楼层列表
  floorlist: []
};
// 修改state
const mutations = {
  // 分类列表赋值
  GETCATEGORYLIST(state, categorylist) {
    state.categorylist = categorylist
    // 将分类列表数据以字符串形式缓存到本地
    window.sessionStorage.setItem('categorylist', JSON.stringify(categorylist))
  },
  GETSWIPERLIST(state, swiperlist) {
    // 轮播图不需要缓存
    state.swiperlist = swiperlist
  },
  GETFLOORLIST(state, floorlist) {
    state.floorlist = floorlist
  }
};
// 处理异步
const actions = {
  // 获取分类列表数据
  async getCategoryList({ commit }) {
    const res = await reqGetCategoryList()
    if (res.code === 200) {
      commit("GETCATEGORYLIST", res.data)
    }
  },
  // 获取轮播图列表数据
  async getSwiperList({ commit }) {
    const res = await reqGetSwiperList();
    if (res.code === 200) {
      commit("GETSWIPERLIST", res.data)
    }
  },
  async getFloorList({ commit }) {
    const res = await reqGetFloorList();
    if (res.code === 200) {
      commit("GETFLOORLIST", res.data)
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
