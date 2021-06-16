<template>
    <el-table :data="tableData"
        height="100%"
        style="width: 100%"
        stripe
        :border="true"
        :row-class-name="tableRowClassName"
        @sort-change="table_sort_change"
        @cell-mouse-enter="cell_mouse"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"
            :selectable="set_column_select"
            width="55">
        </el-table-column>

        <el-table-column :label="$t('lang.public_operate')"
            class-name="operate"
            v-if="tableConfig.handleConfig.length"
            :width="tableConfig.handleWidth">
            <template slot-scope="scope">
                <maps-tooltip :text="date_status_2_tooltip || ''"
                    align="left">
                    <el-button type="text"
                        style="padding: 0"
                        @click="item.handle(scope.row)"
                        v-for="(item, index) in tableConfig.handleConfig"
                        :key="index"
                        :disabled="item.disabled">
                        <maps-tooltip :text="item.title">
                            <i class="iconfont"
                                v-if="item.icon"
                                :class="item.icon"></i>
                        </maps-tooltip>
                        <!-- <span v-if="item.text && scope.row.apply_status !== '2'">{{item.text}}</span> -->
                        <span v-if="item.text && (scope.row.hasOwnProperty('apply_status') && scope.row.apply_status != '2')"
                            :style="item.color? `color: ${item.color}`:''">{{item.text}}</span>
                    </el-button>
                </maps-tooltip>

            </template>
        </el-table-column>

        <el-table-column v-for="(item,index) in tableConfig.columnConfig"
            :key="index"
            :width="item.width"
            :show-overflow-tooltip="item.tooltip"
            :sortable="item.sortable"
            :label="item.label">
            <template slot-scope="scope">
                <maps-tooltip :text="date_status_2_tooltip || ''"
                    align="left">
                    <!-- 账号状态 -->
                    <div v-if="scope.row.hasOwnProperty('status') && item.prop === 'status'"
                        id="status">
                        <el-switch v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="just_show 
                            || (type == 'distribute' && scope.row.date_status == '2') 
                            || (type == 'all' && scope.row.syncstatus == '1')"
                            active-color="#0BB3B3"
                            inactive-color="#C4C4C4"
                            @change="handle_status(scope.row, $event)"></el-switch>
                        <span v-if="scope.row.status != null"
                            :style="`display: inline-block;color:${status_map[scope.row.status].color};`">{{status_map[scope.row.status].text}}</span>
                    </div>
                    <!-- 申请状态 -->
                    <div v-else-if="scope.row.hasOwnProperty('apply_status') && item.prop === 'apply_status'">
                        <span v-if="scope.row.apply_status != null"
                            :style="`color: ${apply_status_map[scope.row.apply_status].color}`">{{apply_status_map[scope.row.apply_status].text}}</span>
                    </div>
                    <!-- 平台 -->
                    <div v-else-if="item.prop === 'platform'">
                        <platform-icon :platform="scope.row.platform"></platform-icon>
                    </div>
                    <!-- 同步状态+时间 -->
                    <div v-else-if="scope.row.hasOwnProperty('syncstatus') && item.prop === 'syncstatus'">
                        <span v-if=" scope.row.syncstatus !== null">
                            <i :class="`iconfont ${syncstatus_map[scope.row.syncstatus].icon}`"
                                :style="`color:${syncstatus_map[scope.row.syncstatus].color};margin-right: 5px`"></i>
                            <span>{{syncstatus_map[scope.row.syncstatus].text}}</span>
                            <span v-if="scope.row.syncstatus != 1">{{scope.row.synctime || '--'}}</span>
                        </span>
                        <span v-else>- -</span>
                    </div>
                    <!-- 账号所属人 -->
                    <div v-else-if="scope.row.hasOwnProperty('owner') && item.prop === 'owner' && item.tooltip">
                        <maps-tooltip :text="`<span style='float: left'>${$t('lang.personal_user_email')}: ${scope.row.email || '--'}</span><br><span style='float: left'>${$t('lang.personal_user_truename')}: ${scope.row.truename || '--'}</span>`">
                            <span>{{scope.row.owner || '--'}}</span>
                        </maps-tooltip>
                    </div>
                    <!-- 申请时间 -->
                    <div v-else-if="scope.row.hasOwnProperty('apply_time') && item.prop == 'apply_time'">
                        <span style="color: #666666">{{scope.row.apply_time || '--'}}</span>
                    </div>
                    <div v-else>
                        <span>{{scope.row[item.prop] || '- -'}}</span>
                    </div>
                </maps-tooltip>

            </template>
        </el-table-column>
        <template slot="empty">
            <table-empty></table-empty>
        </template>
    </el-table>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  props: {
    tableData: {
      type: Array,
    },
    tableConfig: {
      type: Object,
      default: {},
    },
    type: String,
  },
  components: {},
  data() {
    return {
      multipleSelection: [],
      status_map: {
        1: {
          text: this.$t("lang.public_Visible"),
          color: "#0BB3B3",
        },
        0: {
          text: this.$t("lang.public_Invisible"),
          color: "#333",
        },
      },
      syncstatus_map: {
        0: {
          icon: "",
          color: "#FF3333",
          text: this.$t("lang.account_not_sync"),
        },
        1: {
          // 同步中
          icon: "maps-icon-sync",
          color: "#999999",
          text: this.$t("lang.account_syncing"),
        },
        2: {
          icon: "maps-icon-check-1",
          color: "#0BB3B3",
          text: "",
        },
        3: {
          icon: "maps-icon-alarm",
          color: "#FF3333",
          text: "",
        },
      },
      apply_status_map: {
        1: {
          text: this.$t("lang.public_Stateless"),
          color: "#999",
        },
        2: {
          text: this.$t("lang.public_Awaiting_response"),
          color: "#999",
        },
        3: {
          text: this.$t("lang.public_Rejected"),
          color: "#FF3333",
        },
        4: {
          text: this.$t("lang.public_Expired"),
          color: "#FF3333",
        },
      },
      date_status_2_tooltip: "",
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["account_manage", "team_manager", "team_info", "active_team_id", "platform_config"]),
    ...mapState("permissions", ["Account_permission"]),
    // 用户权限，查看和编辑
    just_show() {
      let state = false;
      if (!this.account_manage) {
        // 如果不是管理员则开始判断权限
        if (this.Account_permission == "1") {
          state = true;
        } else if (this.Account_permission == "2") {
          state = false;
        }
      }

      return state;
    },
  },
  methods: {
    // cell_mouse已分配，未生效, mouseover展示
    cell_mouse(row, column) {
      this.date_status_2_tooltip = "";
      if (this.type == "distribute") {
        // 已分配，未生效
        if (row.date_status == "2") {
          this.date_status_2_tooltip = `${this.$t("lang.account_can_not_see")}${row.startdate}。`;
        } else {
          // this.date_status_2_tooltip = "";
        }
        // 同步失败
        if (column.label == "同步时间" || column.label == "Sync Time") {
          if (row.syncstatus == "3") {
            this.date_status_2_tooltip = row.syncfailreason;
          } else {
            // this.date_status_2_tooltip = "";
          }
        }
      } else if (this.type == "all") {
        if (column.label == "状态" || column.label == "Status") {
          // 同步中的账号不能修改状态
          if (row.syncstatus == "1") {
            this.date_status_2_tooltip = this.$t("lang.account_syncing_not_handle");
          } else {
            // this.date_status_2_tooltip = "";
          }
        } else if (column.label == "同步时间" || column.label == "Sync Time") {
          if (row.syncstatus == "3") {
            this.date_status_2_tooltip = row.syncfailreason;
          } else {
            // this.date_status_2_tooltip = "";
          }
        }
      } else {
        // this.date_status_2_tooltip = "";
      }
    },
    // 已分配，未生效, 单元格样式
    tableRowClassName({ row, rowIndex }) {
      if (this.type == "distribute") {
        // 已分配，未生效
        if (row.date_status == "2") {
          return "warning-row";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    // 设置不可复选
    set_column_select(row, index) {
      let state = true;
      if (this.type == "undistribute") {
        // 未分配，待确认
        if (row.apply_status && row.apply_status == "2") {
          state = false;
        }
      } else if (this.type == "distribute") {
        // 已分配，未生效
        if (row.date_status && row.date_status == "2") {
          state = false;
        }
      } else if (this.type === "all") {
        if (row.syncstatus == "1") {
          state = false;
        }
      }

      return state;
    },
    handleSelectionChange(val) {
      let result = [];
      if (val.length) {
        val.forEach((item) => {
          result.push(item.advertiser_id);
        });
      } else {
        result = [];
      }
      this.multipleSelection = val;
      this.$emit("selectChange", { result, list: val });
    },
    async handle_status(row, status) {
      const self = status == 0 ? "close" : "open";
      const h = this.$createElement;
      this.$msgbox({
        title: status == 0 ? this.$t("lang.public_forbidden_tooltip") : this.$t("lang.public_open_tooltip"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.account_${self}_this.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_${self}_this.point_1`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_${self}_this.point_2`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/account/statusEdit";
          const param = {
            status: status,
            team_id: this.active_team_id,
            advertiser_id: [row.advertiser_id],
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.$emit("change_account_status");
          }
        })
        .catch(() => {
          row.status = status == 1 ? 0 : 1;
        });
    },
    set_sync_time(row) {
      if (row.syncstatus == "1") {
        return this.$t("lang.account_syncing");
      } else {
        if (!row.sync_time) {
          return "--";
        } else {
          return row.sync_time;
        }
      }
    },
    // 同步时间排序
    table_sort_change(column) {
      const map = {
        ascending: "ASC",
        descending: "DESC",
      };
      const param = {
        order: map[column.order],
      };
      this.$emit("update_list", param);
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
<style lang='scss' scoped>
#app_logo {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
.warning-row {
  td {
    .cell {
      & > div {
        span,
        i {
          color: #c0c4cc !important;
        }
      }
    }
  }
}
</style>