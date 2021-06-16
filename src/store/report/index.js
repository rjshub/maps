import _ from "lodash";
import fetch from "@/services/fetch";
const state = {
  platform_list: [],
  advertiser_list: [],
  promotionpurpose_list: [],
  campaign_list: [],
  ad_list: [],
  report_synctime: '--',
  handle_task: 'create',
  special_target: [
    'convert', //转化数(上报)
    'convert_cost', //转化成本(上报)
    'convert_rate', //转化率(上报)
    'synthesize_convert_rate', //综合转化率(上报)
    'deep_convert_rate', //深度转化率(上报)
    'deep_convert', //深度转化数(上报)
    'deep_convert_cost', //深度转化成本(上报)
    'attribution_convert', //转化数(播放)
    'attribution_convert_cost', //转化成本(播放)
    'convert_rate_imp', //转化率(播放)
    'synthesize_convert_rate_imp', //综合转化率(播放)
    'attribution_deep_convert_cost', //深度转化成本(播放)
    'attribution_deep_convert', //深度转化数(播放)
    'attribution_deep_convert', //深度转化成本(播放)
  ],
  show_report_point: true,
};

const mutations = {
  UPDATE_PLATFORM_LIST(state, value) {
    state.platform_list = value
  },
  UPDATE_ADVERTISER_LIST(state, value) {
    state.advertiser_list = value
  },
  UPDATE_PROMOTIONPURPOSE_LIST(state, value) {
    state.promotionpurpose_list = value
  },
  UPDATE_CAMPAIGN_LIST(state, value) {
    state.campaign_list = value
  },
  UPDATE_AD_LIST(state, value) {
    state.ad_list = value
  },
  UPDATE_HANDLE_TASK(state, value) {
    state.handle_task = value
  },
  UPDATE_SHOW_REPORT_POINT(state, value) {
    state.show_report_point = value
  }
};
const actions = {
  fetch_selectlists({
    state,
    commit
  }, params) {
    return new Promise((resolve, reject) => {
      fetch
        .post("/report/selectlist", params)
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  fet_select_option({
    state,
    commit,
    dispatch,
    rootState
  }, payload) {
    return new Promise((resolve, reject) => {
      let params = {
        team_id: rootState.system.active_team_id,
        platform: payload.platform_id,
        advertiser_id: payload.advertiser_id,
        landing_type: payload.landing_type,
        campaign_id: payload.campaign_id,
        startdate: payload.startdate,
        enddate: payload.enddate,
        view_type: payload.view_type,
        title: payload.title,
      };
      dispatch("fetch_selectlists", params)
        .then(data => {
          commit("UPDATE_PLATFORM_LIST", data.platformlist);
          resolve({
            client_list: data.clientlist,
            platform_list: data.platformlist,
            advertiser_list: data.advertiserlist,
            promotionpurpose_list: data.promotionpurposelist,
            campaign_list: data.campaignlist,
            ad_list: data.adlist,
            sync_failure: data.sync_failure
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update_handle_task({
    commit
  }, data) {
    commit("UPDATE_HANDLE_TASK", data)
  },
  update_show_report_point({commit}, data) {
    commit("UPDATE_SHOW_REPORT_POINT", data)
  }
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
