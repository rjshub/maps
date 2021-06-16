<template>
  <maps-drawer
    title="规则任务应用详情"
    :loading="isLoading"
    @close="close_drawer"
    :full="true"
    class="ad-rule-detail-drawer"
    ref="mpasDrawer_log"
  >
    <section slot="drawerHeader">
      <el-button
        size="mini"
        v-if="set_handle_state && rule_detail_status != 0"
        class="maps-button-mini"
        :disabled="rule_detail_status == 2 || rule_detail_status == 3 || check_permission.state"
        @click="handle_create"
        type="primary"
      >
        <maps-tooltip :text="check_permission.text">
          <span>新建任务</span>
        </maps-tooltip>
      </el-button>
    </section>
    <main slot="drawerBody">
      <div
        class="no-touch"
        v-if="rule_detail_status == 0"
      >
        <div class="list-empty select-container">
          <i class="iconfont maps-icon-nodata"></i>
          <span>当前{{ level_map[active_tab] }}未应用规则任务</span>
          <el-button
            size="mini"
            class="maps-button-mini"
            :disabled="check_permission.state"
            @click="handle_create"
            type="primary"
          >
            <maps-tooltip :text="check_permission.text">
              <span>新建任务</span>
            </maps-tooltip>
          </el-button>
        </div>
      </div>
      <div
        class="'has-touch"
        v-else
      >
        <div
          class="level-title"
          v-if="active_tab == 'ad'"
        >
          Ad: {{ config.ad_name }} (ID: {{ config.ad_id }})
        </div>
        <div class="level-title">
          Campaign: {{ config.campaign_name }} (ID: {{ config.campaign_id }})
        </div>
        <div class="account-title">
          所属账号: {{ config.advertiser_name }} (ID:
          {{ config.advertiser_id }})
        </div>
        <div class="task-detail">
          <div class="title">
            规则任务（总计：{{ config.rule_task_count || 0 }}条）
          </div>
          <div
            class="task-item"
            v-for="item in task_list"
            :key="item.task_id"
          >
            <div class="task-title">
              <span></span>任务名称：{{ item.task_name || '--' }} (ID:
              {{ item.task_rid }})
              <maps-tooltip text="前往编辑任务">
                <el-button
                  type="text"
                  size="mini"
                  v-if="set_handle_state"
                  :disabled="Rule_Task_permission != 2"
                  style="margin-left: 10px"
                  @click="handle_to_tools(item.task_id)"
                >
                  <maps-tooltip :text="Rule_Task_permission != 2? '无权限操作，请联系团队管理员！':''">
                    <i class="iconfont maps-icon-forward" style="font-size: 14px"></i>
                  </maps-tooltip>
                </el-button>
              </maps-tooltip>
            </div>
            <el-tabs
              type="card"
              :key="item.task_id+'_'+dom_key"
            >
              <el-tab-pane label="">
                <el-badge
                  :value="item.openrulecount"
                  :max="99"
                  class="item"
                  slot="label"
                  v-if="
                    item.hasOwnProperty('openrulecount') && item.openrulecount
                  "
                >
                  <div class="tab-label">应用规则</div>
                </el-badge>
                <div
                  class="tab-label"
                  slot="label"
                  v-else
                >应用规则</div>

                <el-table
                  :data="item.rulelist"
                  style="width: 100%"
                  max-height="400px"
                  :row-style="set_special_rule_row"
                >
                  <el-table-column
                    prop="open_status"
                    label="状态"
                    width="80"
                  >
                    <template slot-scope="scope">
                      {{ set_status(scope.row.open_status) }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="rule_name"
                    label="智能规则名称/ID"
                    min-width="100"
                  >
                    <template slot-scope="scope">
                      <maps-tooltip :text="scope.row.rule_name">
                        <div
                          class="ellipsis-label"
                          style="line-height: 18px"
                        >
                          {{ scope.row.rule_name }}
                        </div>
                      </maps-tooltip>
                      <div style="line-height: 18px">
                        ID: {{ scope.row.rule_rid }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="operations"
                    label="系统执行操作"
                    class-name="tooltip-ellipsis-3"
                    min-width="100"
                  >
                    <template slot-scope="scope">
                      <maps-tooltip
                        v-if="scope.row.open_status == 2"
                        :text="set_error_rule_text(scope.row)"
                        align="left"
                      >
                        <div>异常触发规则，无法执行操作</div>
                      </maps-tooltip>

                      <div
                        class="ellipsis-label-3"
                        v-else
                      >
                        {{ scope.row.operations || "--" }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="open_condition"
                    label="触发详情"
                    show-overflow-tooltip
                    class-name="tooltip-ellipsis-3"
                    min-width="100"
                  >
                    <template slot-scope="scope">
                      <div class="ellipsis-label-3">
                        {{ set_touch_detail(scope.row) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="open_ctime"
                    label="触发时间"
                    width="180px"
                  >
                    <template slot-scope="scope">
                      {{scope.row.open_ctime || '--'}}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="计算范围">
                <div
                  class="tab-label"
                  slot="label"
                >计算范围</div>
                <div class="range-detail-title">
                  <span>计算范围：</span>
                  <span>{{ item.range || "--" }}</span>
                </div>
                <el-table
                  :data="item.rangelist"
                  style="width: 100%"
                  max-height="375px"
                  :row-style="set_special_range_row"
                >
                  <el-table-column
                    prop="rule_status"
                    :label="`${level_map[active_tab]} ID`"
                    width="200"
                  >
                    <template slot-scope="scope">
                      {{ scope.row[`media_${active_tab}_id`] }}
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="rule_status"
                    :label="`${level_map[active_tab]} 名称`"
                    min-width="120"
                  >
                    <template slot-scope="scope">
                      {{ scope.row[`${active_tab}_name`] }}
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </main>
  </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  data() {
    return {
      isLoading: false,
      level_map: {
        campaign: "Campaign",
        ad: "Ad",
      },
      active_model: "",
      config: {},
      task_total: 0,
      task_list: [],
      status_map: {
        "-1": "已失效",
        0: "未触发",
        1: "已触发",
      },
      rule_detail_status: 1,
      dom_key: 0
    };
  },
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
    ]),
    ...mapState("permissions", [
      "AdSet_Manage_permission",
      "Rule_Task_permission",
    ]),
    check_permission() {
      let param = {
        state: false,
        text: "",
      };
      if (this.AdSet_Manage_permission != 2) {
        param.state = true;
        param.text = "无权限操作，请联系团队管理员！";
      }
      return param;
    },
    set_handle_state() {
      return this[`manage_${this.active_tab}_handle`] == "edit";
    },
  },
  methods: {
    show(row) {
      this.dom_key = 1
      this.$nextTick(() => {
        this.rule_detail_status = row.rule_detail_status;
        this.get_detail(row[`media_${this.active_tab}_id`]);
        this.$refs.mpasDrawer_log.show();
      });
    },
    close_drawer() {
      this.dom_key = 0
      this.$refs.mpasDrawer_log.close();
    },
    handle_create() {
      this.close_drawer();
      this.$eventHub.$emit(`create${this.level_map[this.active_tab]}Task`, [
        this.config[`${this.active_tab}_id`],
      ]);
    },
    async get_detail(id) {
      const url = "/ruletask/adsruledetail";

      let param = {
        media_campaign_id: "",
        media_ad_id: "",
      };
      param[`media_${this.active_tab}_id`] = id;

      const res = await this.fetchCore(url, param, true);
      if (res) {
        this.config = res;
        this.task_list = res.list;
      } else {
        this.isLoading = false;
      }
    },
    // 映射触发状态
    set_status(status) {
      if (status < 0) {
        return "已失效";
      } else if (status > 0) {
        return "已触发";
      } else {
        return "未触发";
      }
    },
    // 重写触发详情
    set_touch_detail(row) {
      let result = "";
      let str = row.open_condition
      let title = '满足以下所有条件：'
      if (row.open_connect == 1) {
        title = '满足以下所有条件：'
      } else {
        title = '满足以下任一条件：'
      }
      if (str && str.length) {
        const tmp = JSON.parse(str);
        result = title + tmp.join();
      } else {
        result = "--";
      }
      return result;
    },
    // 设置当前campaign或ad的样式
    set_special_range_row(obj) {
      if (
        obj.row[`media_${this.active_tab}_id`] ==
        this.config[`${this.active_tab}_id`]
      ) {
        return {
          color: "#0BB3B3",
        };
      }
    },
    // 设置已触发的规则样式
    set_special_rule_row(obj) {
      // open_status -1 已失效 ，0未触发 ，1 已触发 ，2 异常触发
      if (obj.row.open_status == 1 || obj.row.open_status == 2) {
        return {
          color: "#FF6600",
        };
      } else if (obj.row.open_status == -1) {
        return {
          color: "#999",
        };
      }
    },
    // 异常触发tooltip
    set_error_rule_text(row) {
      return `需执行操作：${row.operations || "--"}<br>无法执行操作原因：${
        row.error_reason || "--"
      }`;
    },
    // 跳转规则任务-编辑
    handle_to_tools(id) {
      const origin = window.origin;
      const url = origin + `/china/#/tools/rule/task?task_id=${id}`;
      window.open(url);
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        hasLoading && (this.isLoading = false);
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },
};
</script>

<style lang="scss">
.ad-rule-detail-drawer {
  .drawer-body {
    main {
      .el-tabs--card {
        display: flex;
        flex-flow: column;
        .el-tabs__header {
          border-width: 0;
          overflow: unset;
          margin-bottom: 15px;
          .el-tabs__nav-wrap {
            overflow: unset;
            height: 32px;
            .el-tabs__nav-scroll {
              overflow: unset;
            }
          }
          .el-tabs__nav {
            .el-tabs__item {
              height: 32px;
              background: #fff;
              padding: 0;
              color: #999;
              font-size: 12px;
              line-height: 30px;
              border: 1px solid #dddddd;
              .el-badge {
                height: 30px;
                .el-badge__content.is-fixed {
                  right: 20px;
                }
              }
              .tab-label {
                padding: 0 15px;
                font-size: 12px;
                line-height: 30px;
              }
            }
            .is-active {
              background: #0bb3b3;
              border-color: #0bb3b3;
              color: #fff;
            }
            .el-tabs__item:nth-child(1) {
              border-top-left-radius: 3px;
              border-bottom-left-radius: 3px;
            }
            .el-tabs__item:nth-child(2) {
              border-top-right-radius: 3px;
              border-bottom-right-radius: 3px;
            }
          }
        }
      }
      .tooltip-ellipsis-3 {
        .cell.el-tooltip {
          white-space: unset;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.ad-rule-detail-drawer {
  .drawer-body {
    main {
      height: 100%;
      overflow-y: auto;
      
      .account-title,.level-title {
        font-size: 12px;
        color: #666;
        line-height: 24px;
      }
      .level-title:nth-child(1) {
        font-size: 16px;
        font-weight: 700;
        color: #333;
      }
      .task-detail {
        .title {
          height: 40px;
          opacity: 1;
          background: #ebebeb;
          border-radius: 3px;
          padding: 0 20px;
          margin-top: 15px;
          font-size: 14px;
          font-weight: 700;
          color: #333;
          line-height: 40px;
        }
        .task-item {
          margin: 20px 0;
          .task-title {
            font-size: 14px;
            font-weight: 700;
            margin-bottom: 5px;
            text-align: left;
            color: #333333;
            display: flex;
            align-items: center;
            & > span {
              display: inline-block;
              width: 4px;
              height: 20px;
              background: #0bb3b3;
              border-radius: 2px;
              margin-right: 15px;
            }
          }
        }
      }
      .range-detail-title {
        font-size: 12px;
        font-weight: 700;
        line-height: 20px;
        margin-bottom: 5px;
        span:nth-child(1) {
          color: "#333";
        }
        span:nth-child(2) {
          color: #666;
        }
      }
      .no-touch {
        width: 100%;
        height: 100%;
        position: relative;
        .list-empty {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          color: #999999;
          font-size: 14px;
          text-align: center;
          & > i {
            font-size: 70px;
          }
          &>span {
            margin: 20px 0;
            color: #333;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>