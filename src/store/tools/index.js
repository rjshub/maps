const {
  startsWith,
  startCase
} = require("lodash")

const state = {
  rule_handle_type: 'create',
  task_handle_type: 'create',
}

const mutations = {
  UPDATE_RULE_HANDLE_TYPE(state, type) {
    state.rule_handle_type = type
  },
  UPDATE_TASK_HANDLE_TYPE(state, type) {
    state.task_handle_type = type
  }
}

const actions = {
  update_rule_handle_type({
    commit
  }, type) {
    commit('UPDATE_RULE_HANDLE_TYPE', type)
  },
  update_task_handle_type({
    commit
  }, type) {
    commit('UPDATE_TASK_HANDLE_TYPE', type)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
