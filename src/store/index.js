import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; // 存储到localStorage

Vue.use(Vuex);
//pd缓存
import user from "./user";
import system from "./system";
import permissions from "./permissions";
import alarm from './alarm'
import theme from "./theme"
import report from './report'
import tools from './tools'
import advertising from './advertising'

const state = {
  scrollTop: 0,
  currentPage: 1
};
const getters = {
  isShowToTop: state => {
    return state.scrollTop > 0;
  }
};
const mutations = {
  UPDATA_SCROLLTOP(state, value) {
    state.scrollTop = value;
  },
  UPDATE_CURRENT_PAGE(state, value) {
    state.currentPage = value
  },
};
const actions = {
  updata_scrolltop({
    commit
  }, value) {
    commit("UPDATA_SCROLLTOP", value);
  },
  update_currentPage({
    commit
  }, data) {
    commit('UPDATE_CURRENT_PAGE', data)
  },
};
const modules = {
  user,
  system,
  permissions,
  alarm,
  theme,
  report,
  tools,
  advertising
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
  plugins: [createPersistedState({
    key: "maps_china"
  })],
  strict: process.env.NODE_ENV !== "production" //在生产环境启用导致性能损失
});
