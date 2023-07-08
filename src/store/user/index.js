import { reqGetCode, reqUserRegister, reqUserLogin, reqGetUserInfo, reqUserLogout, reqGetUserAddress } from "../../api";
import { setToken, getToken, removeToken } from '../../utils/token'
// 数据存储
const state = {
  store_code: '',
  token: getToken(),
  userinfo: {},
  address: []
};
// 修改state
const mutations = {
  GETCODE(state, code) {
    state.store_code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  },
  USERLOGOUT(state) {
    state.token = ''
    state.userinfo = {}
    removeToken()
  },
  GETUSERADDRESS(state, address) {
    state.address = address
  }
};
// 处理异步
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    const res = await reqGetCode(phone)
    if (res.code == 200) {
      commit('GETCODE', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 注册
  async userRegister({ commit }, user) {
    const res = await reqUserRegister(user)
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 登录
  async userLogin({ commit }, user) {
    const res = await reqUserLogin(user)
    if (res.code == 200) {
      commit('USERLOGIN', res.data.token)
      // 持久化存储
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {

    var res = await reqGetUserInfo()
    if (res.code == 200) {
      commit('GETUSERINFO', res.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getuserinfo faile'))
    }

  },
  // 退出登录
  async userLogout({ commit }) {
    const res = await reqUserLogout()
    if (res.code == 200) {
      commit('USERLOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户地址
  async getUserAddress({ commit }) {
    const res = await reqGetUserAddress()
    if (res.code == 200) {
      commit('GETUSERADDRESS', res.data)
      return 'ok'
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
