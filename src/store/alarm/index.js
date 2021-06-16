import _ from "lodash";
import fetch from "@/services/fetch";
import store from '../index.js'
const state = {
    alarm_count: 0
};

const mutations = {
    UPDATE_ALARM_COUNT(state, value) {
        state.alarm_count = value
    },
};
const actions = {
    update_alarm_count({ getters, commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            fetch
                .post("/message/getTotal", { team_id: store.state.system.active_team_id })
                .then(data => {
                    commit("UPDATE_ALARM_COUNT", data.total);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    update_alarm_count_in_maps({ commit, state }) {
        const data = state.alarm_count - 1
        commit('UPDATE_ACTIVE_FIELD_ID', data)
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
