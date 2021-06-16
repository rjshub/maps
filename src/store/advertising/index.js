const state = {
  active_tab: 'account', //当前所在tab
  active_platform_nav: '1',
  manage_account_handle: 'show', //操作类型（查看、编辑）
  manage_campaign_handle: 'show',
  manage_ad_handle: 'show',
  manage_creative_handle: 'show',
  checked_account: [], //以选中的
  checked_campaign: [],
  checked_ad: [],
  checked_creative: [],
  account_filter: null, // 设置的list接口参数
  campaign_filter: null,
  ad_filter: null,
  creative_filter: null,
  account_has_filter: false, //是否设置过筛选框的条件
  campaign_has_filter: true, //默认有，投放状态不限
  ad_has_filter: true, //默认有，投放状态不限
  creative_has_filter: true, //默认有，投放状态不限
  campaign_checked_title: [], //广告组自定义表头
  ad_checked_title: [], //计划自定义表头

  show_sync_point: true, //当前登录是否出现过同步提示
  campaign_is_syncing: true, //campaign正在同步
  ad_is_syncing: true, //ad正在同步
  is_syncing: true,
}

const mutations = {
  UPDATE_ACTIVE_TAB(state, value) {
    state.active_tab = value
  },

  UPDATE_ACTIVE_PLATFORM_NAV(state, value) {
    state.active_platform_nav = value
  },

  UPDATE_MANAGE_ACCOUNT_HANDLE(state, value) {
    state.manage_account_handle = value
  },
  UPDATE_MANAGE_CAMPAIGN_HANDLE(state, value) {
    state.manage_campaign_handle = value
  },
  UPDATE_MANAGE_AD_HANDLE(state, value) {
    state.manage_ad_handle = value
  },
  UPDATE_MANAGE_CREATIVE_HANDLE(state, value) {
    state.manage_creative_handle = value
  },

  UPDATE_CHECKED_ACCOUNT(state, value) {
    state.checked_account = value
  },
  UPDATE_CHECKED_CAMPAIGN(state, value) {
    state.checked_campaign = value
  },
  UPDATE_CHECKED_AD(state, value) {
    state.checked_ad = value
  },
  UPDATE_CHECKED_CREATIVE(state, value) {
    state.checked_creative = value
  },

  UPDATE_ACCOUNT_FILTER(state, value) {
    state.account_filter = value
  },
  UPDATE_CAMPAIGN_FILTER(state, value) {
    state.campaign_filter = value
  },
  UPDATE_AD_FILTER(state, value) {
    state.ad_filter = value
  },
  UPDATE_CREATIVE_FILTER(state, value) {
    state.creative_filter = value
  },

  UPDATE_ACCOUNT_HAS_FILTER(state, value) {
    state.account_has_filter = value
  },
  UPDATE_CAMPAIGN_HAS_FILTER(state, value) {
    state.campaign_has_filter = value
  },
  UPDATE_AD_HAS_FILTER(state, value) {
    state.ad_has_filter = value
  },
  UPDATE_CREATIVE_HAS_FILTER(state, value) {
    state.creative_has_filter = value
  },

  UPDATE_CAMPAIGN_CHECKED_TITLE(state, value) {
    state.campaign_checked_title = value
  },
  UPDATE_AD_CHECKED_TITLE(state, value) {
    state.ad_checked_title = value
  },

  UPDATE_SHOW_SYNC_POINT(state, value) {
    state.show_sync_point = value
  },
  UPDATE_CAMPAIGN_SYNCING(state, value) {
    state.campaign_is_syncing = value
  },
  UPDATE_AD_SYNCING(state, value) {
    state.ad_is_syncing = value
  },
  UPDATE_SYNCING(state, value) {
    state.is_syncing = value
  } 
}

const actions = {
  // 当前tab
  update_active_tab({
    commit
  }, data) {
    commit("UPDATE_ACTIVE_TAB", data)
  },
  // 平台导航
  update_active_platform_nav({
    commit
  }, data) {
    commit("UPDATE_ACTIVE_PLATFORM_NAV", data)
  },
  // 账号、广告、计划、创意（查看、编辑）
  update_manage_account_handle({
    commit
  }, data) {
    commit('UPDATE_MANAGE_ACCOUNT_HANDLE', data)
  },
  update_manage_campaign_handle({
    commit
  }, data) {
    commit('UPDATE_MANAGE_CAMPAIGN_HANDLE', data)
  },
  update_manage_ad_handle({
    commit
  }, data) {
    commit('UPDATE_MANAGE_AD_HANDLE', data)
  },
  update_manage_creative_handle({
    commit
  }, data) {
    commit('UPDATE_MANAGE_CREATIVE_HANDLE', data)
  },
  // 账号、广告、计划、创意（更新选中，下一层级筛选）
  update_checked_account({
    commit
  }, data) {
    commit('UPDATE_CHECKED_ACCOUNT', data)
  },
  update_checked_campaign({
    commit
  }, data) {
    commit('UPDATE_CHECKED_CAMPAIGN', data)
  },
  update_checked_ad({
    commit
  }, data) {
    commit('UPDATE_CHECKED_AD', data)
  },
  update_checked_creative({
    commit
  }, data) {
    commit('UPDATE_CHECKED_CREATIVE', data)
  },
  // 账号、广告、计划、创意（筛选条件）
  update_account_filter({
    commit
  }, data) {
    commit("UPDATE_ACCOUNT_FILTER", data)
  },
  update_campaign_filter({
    commit
  }, data) {
    commit("UPDATE_CAMPAIGN_FILTER", data)
  },
  update_ad_filter({
    commit
  }, data) {
    commit("UPDATE_AD_FILTER", data)
  },
  update_creative_filter({
    commit
  }, data) {
    commit("UPDATE_CREATIVE_FILTER", data)
  },
  // 账号、广告、计划、创意（是否设置过筛选条件）
  update_account_has_filter({
    commit
  }, data) {
    commit("UPDATE_ACCOUNT_HAS_FILTER", data)
  },
  update_campaign_has_filter({
    commit
  }, data) {
    commit("UPDATE_CAMPAIGN_HAS_FILTER", data)
  },
  update_ad_has_filter({
    commit
  }, data) {
    commit("UPDATE_AD_HAS_FILTER", data)
  },
  update_creative_has_filter({
    commit
  }, data) {
    commit("UPDATE_CREATIVE_HAS_FILTER", data)
  },
  // 更新表头
  update_campaign_checked_title({commit}, data) {
    commit("UPDATE_CAMPAIGN_CHECKED_TITLE",data)
  },
  update_ad_checked_title({commit}, data) {
    commit("UPDATE_AD_CHECKED_TITLE",data)
  },
  // 重置所有
  reset_all_param({
    commit
  }, data) {
    commit("UPDATE_ACTIVE_TAB", 'account')

    commit('UPDATE_ACTIVE_PLATFORM_NAV', '1')

    commit('UPDATE_MANAGE_ACCOUNT_HANDLE', 'show')
    commit('UPDATE_MANAGE_CAMPAIGN_HANDLE', 'show')
    commit('UPDATE_MANAGE_AD_HANDLE', 'show')
    commit('UPDATE_MANAGE_CREATIVE_HANDLE', 'show')

    commit('UPDATE_CHECKED_ACCOUNT', [])
    commit('UPDATE_CHECKED_CAMPAIGN', [])
    commit('UPDATE_CHECKED_AD', [])
    commit('UPDATE_CHECKED_CREATIVE', [])

    commit("UPDATE_ACCOUNT_FILTER", null)
    commit("UPDATE_CAMPAIGN_FILTER", null)
    commit("UPDATE_AD_FILTER", null)
    commit("UPDATE_CREATIVE_FILTER", null)

    commit("UPDATE_ACCOUNT_HAS_FILTER", false)
    commit("UPDATE_CAMPAIGN_HAS_FILTER", true)
    commit("UPDATE_AD_HAS_FILTER", true)
    commit("UPDATE_CREATIVE_HAS_FILTER", true)

    commit("UPDATE_CAMPAIGN_CHECKED_TITLE",[])
    commit("UPDATE_AD_CHECKED_TITLE",[])
  },

  update_show_sync_point({ commit }, data) {
    commit("UPDATE_SHOW_SYNC_POINT", data)
  },
  update_campaign_syncing({ commit }, data) {
    commit("UPDATE_CAMPAIGN_SYNCING", data)
  },
  update_ad_syncing({ commit }, data) {
    commit("UPDATE_AD_SYNCING", data)
  },
  update_syncing({ commit }, data) {
    commit("UPDATE_SYNCING", data)
  },
}

const getters = {

};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
