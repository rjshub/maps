import fetch from "@/services/fetch";

const state = {
  client_Report_permission: '0', // 客户数据报表（3）  2可读可写  1只读  0禁用
  effect_Report_permission: '0', // 效果数据报表（5）  2可读可写  1只读  0禁用
  subscribe_Report_permission: '1', // 报表订阅（6）  2启用  1禁用  不存在禁用0
  Account_permission: '1', // 账号管理（4） 2可读可写  1只读 不存在禁用0

  AdSet_Manage_permission: '0', //  广告智投->广告管理（8） 2可读可写  1只读  0禁用
  Rule_Intelligent_permission: '0', // 智能规则（10） 2可读可写  1只读  0禁用
  Rule_Task_permission: '0', // 规则任务（11） 2可读可写  1只读  0禁用

  /*1 可写（页面导航栏新建按钮可以点击）
  2 只读，相当于没有权限（页面导航栏点击提示没有权限，仿照系统管理）*/
  permission: [],
};

const mutations = {
  UPDATE_CLIENT_REPORT_PERMISSION(state, value) {
    state.client_Report_permission = value;
  },
  UPDATE_EFFECT_REPORT_PERMISSION(state, value) {
    state.effect_Report_permission = value;
  },
  UPDATE_SUBSCRIBE_REPORT_PERMISSION(state, value) {
    state.subscribe_Report_permission = value;
  },
  UPDATE_ACCOUNT_PERMISSION(state, value) {
    state.Account_permission = value;
  },

  UPDATE_ADSET_PERMISSION(state, value) {
    state.AdSet_Manage_permission = value
  },
  UPDATE_RULE_INTELLIGENT_PERMISSION(state, value) {
    state.Rule_Intelligent_permission = value;
  },
  UPDATE_RULE_TASK_PERMISSION(state, value) {
    state.Rule_Task_permission = value;
  },
};
const actions = {
  clear_permission({
    state,
    commit,
    rootState
  }) {
    commit("UPDATE_CLIENT_REPORT_PERMISSION", '0');
    commit("UPDATE_EFFECT_REPORT_PERMISSION", '0');
    commit("UPDATE_SUBSCRIBE_REPORT_PERMISSION", '1');
    commit("UPDATE_ACCOUNT_PERMISSION", '1');

    commit("UPDATE_ADSET_PERMISSION", '0');
    commit("UPDATE_RULE_INTELLIGENT_PERMISSION", '0');
    commit("UPDATE_RULE_TASK_PERMISSION", '0');
  },
  fetch_permission({
    getters,
    commit,
    dispatch,
    rootState
  }, data) {
    return new Promise((resolve, reject) => {
      fetch
        .post("/team/userdetail", data)
        .then(res => {
          if (res.hasOwnProperty("authdetail") && res.hasOwnProperty("is_manager")) {
            if (res.is_manager == 1) {
              commit("UPDATE_CLIENT_REPORT_PERMISSION", '2');
              commit("UPDATE_EFFECT_REPORT_PERMISSION", '2');
              commit("UPDATE_SUBSCRIBE_REPORT_PERMISSION", '2');
              commit("UPDATE_ACCOUNT_PERMISSION", '2');

              commit("UPDATE_ADSET_PERMISSION", '2');
              commit("UPDATE_RULE_INTELLIGENT_PERMISSION", '2');
              commit("UPDATE_RULE_TASK_PERMISSION", '2');
            } else {
              if (res.authdetail !== null) {
                res.authdetail.forEach((item, index) => {
                  let obj_key = Object.keys(item);
                  if (obj_key[0] == 3) {
                    commit("UPDATE_CLIENT_REPORT_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 4) {
                    commit("UPDATE_ACCOUNT_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 5) {
                    commit("UPDATE_EFFECT_REPORT_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 6) {
                    commit("UPDATE_SUBSCRIBE_REPORT_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 8) {
                    commit("UPDATE_ADSET_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 10) {
                    commit("UPDATE_RULE_INTELLIGENT_PERMISSION", item[obj_key[0]]);
                  }
                  if (obj_key[0] == 11) {
                    commit("UPDATE_RULE_TASK_PERMISSION", item[obj_key[0]]);
                  }
                })
              } else {
                commit("UPDATE_CLIENT_REPORT_PERMISSION", '0');
                commit("UPDATE_EFFECT_REPORT_PERMISSION", '0');
                commit("UPDATE_SUBSCRIBE_REPORT_PERMISSION", '1');
                commit("UPDATE_ACCOUNT_PERMISSION", '1');

                commit("UPDATE_ADSET_PERMISSION", '0');
                commit("UPDATE_RULE_INTELLIGENT_PERMISSION", '0');
                commit("UPDATE_RULE_TASK_PERMISSION", '0');
              }
            }
          }
          resolve();
        })
        .catch(err => {
          console.log('err')
          reject(err);
        });
    });
  },
};


const getters = {
  isRoot: (state, getters, rootState) => fn => {
    if (rootState.user.user_id != 1) {
      return fn && fn();
    } else {
      return true;
    }
  },
  //创建项目的读写权限
  enableWriteCreateProject: (state, getters, rootState) => {

    if (rootState.project.pageType == 'ProjectArchive' || rootState.project.curVersion != 0) {
      return false;
    } else {
      return getters.isRoot(() => {
        if (rootState.project.projectID) {
          if (state.readWrite_permission.hasOwnProperty(rootState.project.projectID)) {
            return state.readWrite_permission[rootState.project.projectID];
          } else {
            return true;
          }
        } else {
          return true;
        }

      });
    }

  },
  //创建项目的权限
  /* enableCreateProject: (state, getters, rootState) => {
    return getters.isRoot(() => {
      // console.log("state.permission1", state.permission);
      if (Array.isArray(state.permission)) {
        let rs = state.permission.find(i => i == 2);
        return !!rs;
      }
    });
  }, */

  enableMediaCpm: (state, getters, rootState) => {
    return getters.isRoot(() => {
      return state.hasMediaCpm;
    });
  },
  //项目list的权限
  enableProjectList: (state, getters, rootState) => {
    return getters.isRoot(() => {
      // console.log("state.permission2", state.permission);
      if (Array.isArray(state.permission)) {
        let rs = state.permission.find(i => i == 3);
        return !!rs;
      }

    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
