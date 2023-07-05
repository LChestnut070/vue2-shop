import { reqGetGoodsInfo, reqUpdateCart } from "../../api";
import { getUUID } from '../../utils/uuid_token'
// 数据存储
const state = {
  // 商品信息
  goodsinfo: {},
  // 临时用户uuid
  uuid_token: getUUID()
};
// 修改state
const mutations = {
  GETGOODSINFO(state, goodsinfo) {
    state.goodsinfo = goodsinfo
  }
};
// 处理异步
const actions = {
  // 获取商品详细信息
  async getGoodsInfo({ commit }, skuid) {
    const res = await reqGetGoodsInfo(skuid);
    if (res.code == 200) {
      commit('GETGOODSINFO', res.data)
    }
  },
  // 获取添加到购物车返回数据
  async updateCart({ commit }, { skuId, skuNum }) {
    const res = await reqUpdateCart(skuId, skuNum);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }
};
// 计算state
const getters = {
  categoryView(state) {
    return state.goodsinfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsinfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsinfo.spuSaleAttrList || {}
  }
};
export default ({
  namespaced: true,
  state,
  mutations,
  actions,
  getters

})
