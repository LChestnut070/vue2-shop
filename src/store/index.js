import Vue from "vue";
import Vuex from 'vuex'

import home from './home'
import search from "./search";
import detail from "./detail"
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    'm_home': home,
    'm_search': search,
    'm_detail': detail,
    'm_shopcart': shopcart,
    'm_user': user,
    'm_trade': trade
  }
})




