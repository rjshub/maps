import _ from "lodash";
import fetch from "@/services/fetch";
const state = {
  team_manager: false,
  account_manage: false,
  team_info: '',
  active_team_id: '', // 当前用户选择的团队id（全局）
  is_joined: false,
  teamID: '',
  member_handle_type: 'invite',
  platform_config: [],
  fail_showed: false, //是否展示过同步失败
  connect_sync: false, //是否关联完成并开始进行同步
};

const mutations = {
  UPDATE_TEAM_MANAGER(state, value) {
    if (value == '1') {
      state.team_manager = true
      state.account_manage = true
    } else {
      state.team_manager = false
      state.account_manage = false
    }
  },
  UPDATE_TEAM_INFO(state, value) {
    state.team_info = value
  },
  UPDATE_ACTIVE_TEAM_ID(state, value) {
    state.active_team_id = value
  },
  UPDATE_ACCOUNT_MANAGER(state, value) {
    state.account_manage = value
  },
  UPDATE_IS_JOINED(state, value) {
    state.is_joined = value
  },
  UPDATE_TEAM_ID(state, value) {
    state.teamID = value
  },
  UPDATE_HANDLE_MEMBER_TYPE(state, value) {
    state.member_handle_type = value
  },
  // 平台
  UPDATE_PLATFORM_CONFIG(state, value) {
    state.platform_config = value
  },
  // 同步失败是否提示过
  UPDATE_FAIL_SHOWED(state, value) {
    state.fail_showed = true
  },
  UPDATE_CONNECT_SYNC(state, value) {
    state.connect_sync = true
  },
};
const actions = {
  update_team_manager({
    commit
  }, data) {
    commit('UPDATE_TEAM_MANAGER', data)
  },
  update_team_info({
    commit
  }, data) {
    commit("UPDATE_TEAM_INFO", data)
    commit('UPDATE_TEAM_MANAGER', data.is_manager)
    commit("UPDATE_ACTIVE_TEAM_ID", data.id)
    return Promise.resolve();
  },
  update_active_team_id({
    commit
  }, data) {
    commit("UPDATE_ACTIVE_TEAM_ID", data)
  },
  update_account_manager({
    commit
  }, data) {
    commit('UPDATE_ACCOUNT_MANAGER', data)
  },
  update_is_joined({
    commit
  }, data) {
    commit("UPDATE_IS_JOINED", data)
  },
  update_team_id({
    commit
  }, data) {
    commit('UPDATE_TEAM_ID', data)
  },
  update_member_handle_type({
    commit
  }, data) {
    commit('UPDATE_HANDLE_MEMBER_TYPE', data)
  },
  update_platform_config({
    commit
  }, data) {
    commit("UPDATE_PLATFORM_CONFIG", data)
  },
  update_fail_showed({commit}, data) {
    commit("UPDATE_FAIL_SHOWED", data)
  },
  update_connect_sync({commit}, data) {
    commit("UPDATE_CONNECT_SYNC", data)
    return Promise.resolve();
  },
};
const getters = {

};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
