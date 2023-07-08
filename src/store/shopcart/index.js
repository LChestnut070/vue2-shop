import { reqGetCartList, reqDeleteCartById, reqUpdateCheckedById } from "../../api";
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
  // 获取购物车列表
  async getCartList({ commit }) {
    const res = await reqGetCartList();
    if (res.code === 200) {
      commit('GETCARTLIST', res.data)
    }
  },
  // 删除商品
  async deleteCartById({ commit }, skuId) {
    const res = await reqDeleteCartById(skuId)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 更新勾选状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    const res = await reqUpdateCheckedById(skuId, isChecked)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 删除全部已选中商品
  Store_deleteAllCheckedCart({ dispatch, getters }) {
    let AllPromis = []
    getters.cartInfoList.cartInfoList.filter(item => {
      return item.isChecked === 1
    }).forEach(item => {
      let deletePromise = dispatch('deleteCartById', item.skuId)
      AllPromis.push(deletePromise)
    })
    // 如果其中一个不为true,则返回false,都为true则返回true
    return Promise.all(AllPromis)
  },
  // 更新全部商品选中状态
  Store_updateAllChecked({ dispatch, state }, isChecked) {
    let AllPromis = []
    state.cartlist[0].cartInfoList.forEach(item => {
      let updatePromise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked
      })
      AllPromis.push(updatePromise)
    })

    return Promise.all(AllPromis)
  }

};
// 计算state
const getters = {
  cartInfoList(state) {
    return state.cartlist[0] || {}
  }
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
  getters

})
