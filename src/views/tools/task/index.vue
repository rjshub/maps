<template>
  <div class="task-list-container">
    <header>任务列表</header>
    <main v-loading="isLoading">
      <div class="table-filter">
        <div class="btn">
          <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
            <el-button
              size="mini"
              plain
              :disabled="just_show().state"
              class="maps-button-mini"
              @click="handle_batch_delete"
            >
              <maps-tooltip
                :text="just_show().text"
                align="left"
              >
                <i class="iconfont maps-icon-trash"></i>
              </maps-tooltip>
            </el-button>
          </maps-tooltip>
          <maps-tooltip :text="$t('lang.public_enable')">
            <el-button
              size="mini"
              plain
              :disabled="just_show().state"
              class="maps-button-mini"
              @click="allow_account"
            >
              <maps-tooltip
                :text="just_show().text"
                align="left"
              >
                <i class="iconfont maps-icon-open"></i>
              </maps-tooltip>
            </el-button>
          </maps-tooltip>
          <maps-tooltip :text="$t('lang.public_disable')">
            <el-button
              size="mini"
              plain
              :disabled="just_show().state"
              class="maps-button-mini"
              @click="forbidden_account"
            >
              <maps-tooltip
                :text="just_show().text"
                align="left"
              >
                <i class="iconfont maps-icon-pause"></i>
              </maps-tooltip>
            </el-button>
          </maps-tooltip>
        </div>

        <div class="select-container">
          <el-select
            v-model="filter_form.platform"
            :placeholder="$t('lang.public_select_platform_placeholder')"
            size="mini"
            style="width: 180px"
            filterable
            @change="filter_change"
          >
            <!-- <el-option :label="$t('lang.public_all_platform')"
                        value=""></el-option> -->
            <el-option
              v-for="item in platform_config"
              :key="item.id"
              :label="item[`name_${language}`]"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.status"
            :placeholder="$t('lang.public_status_placeholder')"
            size="mini"
            filterable
            style="width: 120px; margin: 0 10px"
            @change="filter_change"
          >
            <el-option
              :label="$t('lang.public_all_status')"
              value=""
            ></el-option>
            <el-option
              v-for="item in status_list"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.level"
            :placeholder="$t('lang.public_status_placeholder')"
            size="mini"
            filterable
            style="width: 120px; margin-right: 10px"
            @change="filter_change"
          >
            <el-option
              label="全部响应层级"
              value=""
            ></el-option>
            <el-option
              v-for="item in level_list"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            size="mini"
            style="width: 200px"
            placeholder="搜索任务名称或ID"
            class="filter-input"
            @keyup.enter.native="filter_change"
            v-model="filter_form.word"
          >
            <div
              slot="prefix"
              style="cursor: pointer"
            >
              <i
                class="iconfont maps-icon-search"
                @click="filter_change"
              ></i>
            </div>
          </el-input>
        </div>
      </div>
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="task_list"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          stripe
          border
          @cell-mouse-enter="cell_mouse"
          @selection-change="handleSelectionChange"
          @sort-change="task_sort_change"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            type="selection"
            width="55"
            :selectable="set_task_select"
          >
          </el-table-column>

          <el-table-column
            label="状态"
            width="100"
            class-name="operate"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                :disabled="not_permission(scope.row)"
                active-color="#0BB3B3"
                inactive-color="#C4C4C4"
                @change="handle_status(scope.row, $event)"
              ></el-switch>
              <maps-tooltip
                :text="just_show().state? just_show().text:disable_handle"
                align="left"
              >
                <span :style="`display: inline-block;color:${
                  status_map[scope.row.status].color
                };`">
                  {{ status_map[scope.row.status].text }}
                </span>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
            class-name="operate"
          >
            <template slot-scope="scope">
              <maps-tooltip :text="$t('lang.public_edit_tooltip')">
                <el-button
                  size="mini"
                  type="text"
                  :disabled="not_permission(scope.row)"
                  @click="handle_edit(scope.row)"
                >
                  <maps-tooltip
                    :text="just_show().state? just_show().text:disable_handle"
                    align="left"
                  >
                    <i class="iconfont maps-icon-edit"></i>
                  </maps-tooltip>
                </el-button>
              </maps-tooltip>
              <maps-tooltip :text="$t('lang.public_delete_tooltip')">
                <el-button
                  size="mini"
                  type="text"
                  :disabled="not_permission(scope.row)"
                  @click="handle_delate(scope.row)"
                >
                  <maps-tooltip
                    :text="just_show().state? just_show().text:disable_handle"
                    align="left"
                  >
                    <i class="iconfont maps-icon-trash"></i>
                  </maps-tooltip>
                </el-button>
              </maps-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="rid"
            label="任务ID"
            width="100"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  {{ scope.row.rid }}
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            prop="name"
            label="任务名称"
            resizable
            show-overflow-tooltip
            min-width="140"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  {{ scope.row.name || "--" }}
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="level"
            label="响应层级"
            width="100"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  {{ level_map[scope.row.level] }}
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="响应范围"
            width="140"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  <maps-tooltip
                    :text="scope.row.res_result"
                    align="left"
                  >
                    <span style="color: #0bb3b3">{{ scope.row.res_num }}个{{
                        level_map[scope.row.level]
                      }}</span>
                  </maps-tooltip>
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="应用规则"
            width="100"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  <maps-tooltip
                    :text="scope.row.rule_content"
                    align="left"
                  >
                    <span style="color: #0bb3b3">{{ scope.row.rule_num }}个</span>
                  </maps-tooltip>
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="range_detail"
            label="计算范围"
            resizable
            min-width="200"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle || scope.row.range_detail"
                align="left"
              >
                <span class="ellipsis-label">
                  {{ scope.row.range_detail }}
                </span>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="创建人"
            resizable
            sortable
            width="180"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  <div style="line-height: 18px">
                    {{ scope.row.create_user }}
                  </div>
                  <div style="line-height: 18px">{{ scope.row.ctime }}</div>
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="任务更新时间"
            resizable
            sortable
            width="180"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="disable_handle"
                align="left"
              >
                <div>
                  <maps-tooltip
                    :text="scope.row.update_list"
                    align="left"
                  >
                    <div style="line-height: 18px">
                      {{ scope.row.utime }}
                    </div>
                  </maps-tooltip>
                </div>
              </maps-tooltip>
            </template>
          </el-table-column>
          <template slot="empty">
            <table-empty></table-empty>
          </template>
        </el-table>
      </div>
    </main>
    <footer class="pagination-footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </footer>
    <EditTask
      ref="EditTask"
      @success="edit_success"
    ></EditTask>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import EditTask from "../components/task-create-edit";

export default {
  components: { EditTask },
  data() {
    return {
      isLoading: false,
      not_permission_text: "",
      disable_handle: "",
      multipleSelection: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      task_list: [],
      filter_form: {
        team_id: "",
        platform: "1",
        status: "",
        level: "",
        word: "",
        order: "",
        order_by: "",
        page: "1",
        page_size: "10",
      },
      platform_config: [
        {
          name_zh: "应用于巨量引擎",
          name_en: "Apply to Ocean Engine",
          id: "1",
        },
      ],
      status_list: [
        {
          id: "1",
          label: this.$t("lang.public_enable"),
        },
        {
          id: "0",
          label: this.$t("lang.public_disable"),
        },
      ],
      level_list: [
        {
          id: "1",
          label: "Campaign",
        },
        {
          id: "2",
          label: "Ad",
        },
      ],
      level_map: {
        1: "Campaign",
        2: "Ad",
      },
      status_map: {
        1: {
          text: this.$t("lang.public_enable"),
          color: "#0BB3B3",
        },
        0: {
          text: this.$t("lang.public_disable"),
          color: "#333",
        },
      },
    };
  },
  watch: {},
  computed: {
    ...mapState("permissions", ["Rule_Task_permission"]),
    ...mapState("user", ["language", "user_id"]),
    ...mapState("system", ["active_team_id"]),
  },
  methods: {
    ...mapActions("tools", ["update_task_handle_type"]),
    // 设置操作权限
    just_show() {
      let state = false;
      let text = "";
      return {
        state: this.Rule_Task_permission != "2",
        text: "无权操作，请联系团队管理员！",
      };
    },
    not_permission(row) {
      let state = false;
      if (this.Rule_Task_permission == "2") {
        state = false;
        if (row.user_id != this.user_id) {
          state = true;
        }
      } else {
        state = true;
      }

      return state;
    },
    // 设置复选
    set_task_select(row, index) {
      return row.user_id == this.user_id;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.user_id != this.user_id) {
        return `warning-row`;
      }
    },
    cell_mouse(row) {
      if (row.user_id != this.user_id) {
        this.disable_handle =
          "团队内其他成员创建了这条任务，您只能查看，无法修改。如需修改，请您联系该成员。";
      } else {
        this.disable_handle = "";
      }
    },
    //   查找任务列表
    // 过滤
    filter_change(param, page = "1") {
      this.filter_form.page = page;
      this.get_task_list();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.filter_change("", this.filter_form.page);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.filter_form.page = val;
      this.filter_change("", val);
    },
    async get_task_list() {
      const url = "/ruletask/ruletasklist";
      this.filter_form.team_id = this.active_team_id;

      const res = await this.fetchCore(url, this.filter_form, true);
      if (res) {
        this.total = res.total;
        this.task_list = this.format_list(res.list) || [];
      }
    },
    format_list(arr) {
      if (arr.length) {
        arr.map((item) => {
          // 重写应用规则
          let rule_content = "";
          let rule_num = 0;
          if (item.rule_detail && item.rule_detail.length) {
            rule_num = item.rule_detail.length;

            item.rule_detail.forEach((rule_item, index) => {
              rule_content += `${
                index > 0 ? "<br><br>" : ""
              }<span style="font-weight: 700">${rule_item.name} (${
                rule_item.id
              })</span> <br>执行操作：${rule_item.operation}`;
            });
          }

          item.rule_content = rule_content;
          item.rule_num = rule_num;
          // 重写响应范围
          let res_result = "";
          let res_num = 0;
          if (item.response != null && item.response.length) {
            item.response.forEach((res_item) => {
              let item_result = `<span style="font-weight:700">账号：${res_item.advertiser_name} (${res_item.advertiser_id})</span><br>`;
              if (item.level == 1) {
                item_result += `<br>`;
              } else {
                item_result += `Campaign: ${res_item.campaign_name} (${res_item.campaign_id})<br><br>`;
              }
              if (res_item.list.length) {
                res_item.list.forEach((list_item, index) => {
                  res_num++;
                  if (index == res_item.list.length - 1) {
                    item_result += `${list_item.name} (${list_item.id})<br><br>`;
                  } else {
                    item_result += `${list_item.name} (${list_item.id})<br>`;
                  }
                });
              }
              res_result += item_result;
            });
          }
          item.res_result = res_result.trim();
          item.res_num = res_num;

          // 重写更新时间
          let update_list = "";
          if (item.editlist && item.editlist.length) {
            item.editlist.forEach((item) => {
              update_list += `${item.ctime}<br>`;
            });
          }

          item.update_list = update_list;
        });
        return arr;
      }
    },
    //   批量操作
    forbidden_batch() {
      if (this.multipleSelection.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectionChange(val) {
      if (val.length) {
        let result = [];
        val.forEach((item) => {
          result.push(item.id);
        });
        this.multipleSelection = result;
      } else {
        this.multipleSelection = [];
      }
    },
    handle_batch_delete() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip_x"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_task_delete_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_task_delete_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/ruletask/delete";
          const param = {
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (
              this.task_list.length == this.multipleSelection.length &&
              this.filter_form.page != 1
            ) {
              this.filter_form.page -= 1;
            }
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    allow_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_enable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_task_open_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_task_open_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "1",
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const url = "/ruletask/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    forbidden_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_disable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_task_close_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_task_close_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "0",
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const url = "/ruletask/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 表格操作
    // 编辑成功
    edit_success() {
      this.get_task_list();
    },
    task_sort_change(param) {
      const map = {
        // ASC，DESC
        descending: "DESC",
        ascending: "ASC",
      };
      if (param.order) {
        this.filter_form.order = map[param.order];
        this.filter_form.order_by = param.prop;
      } else {
        this.filter_form.order = "";
        this.filter_form.order_by = "";
      }

      this.get_task_list();
    },
    async handle_status(row, status) {
      const h = this.$createElement;
      const self = status == "0" ? "close" : "open";
      this.$msgbox({
        title:
          status == "0"
            ? this.$t("lang.public_disable")
            : this.$t("lang.public_enable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_task_${self}_this.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_task_${self}_this.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/ruletask/updateStatus";
          const param = {
            team_id: this.active_team_id,
            ids: row.id,
            status: status,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          row.status = status == "1" ? 0 : 1;
        });
    },
    handle_edit(row) {
      this.update_task_handle_type("edit");
      this.$refs.EditTask.show(row.id, row.level);
    },
    handle_delate(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip_x"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_task_delete_this.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_task_delete_this.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/ruletask/delete";
          const param = {
            team_id: this.active_team_id,
            ids: row.id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (
              this.task_list.length == this.multipleSelection.length &&
              this.filter_form.page != 1
            ) {
              this.filter_form.page -= 1;
            }
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
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
  mounted() {
    this.get_task_list();
    if (this.$route.query.task_id) {
      this.update_task_handle_type("edit");
      this.$refs.EditTask.show(this.$route.query.task_id, this.$route.query.level);
    }
  },
};
</script>
<style lang="scss">
.task-list-container {
  .el-table {
    .warning-row {
      background: #f1f1f1;
      opacity: 0.7;
      td {
        background: #f1f1f1 !important;
      }
    }
    // .active-warning {
    //   display: inline-block;
    //   padding: 10px 14px;
    //   border: 1px solid #ddd;
    //   border-radius: 5px;
    //   position: absolute;
    //   top: 0px;
    //   left: 0px;
    // }
  }
}
</style>
<style lang='scss' scoped>
.task-list-container {
  height: 100%;
  background: #fff;
  & > header {
    height: 39px;
    padding: 0 20px;
    border-bottom: 1px solid #f1f2f8;
    font-size: 16px;
    color: #666;
    line-height: 39px;
  }
  & > main {
    height: calc(100% - 90px);
    .table-filter {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
    }
    .table-box {
      padding: 0 20px;
      height: calc(100% - 62px);
    }
  }
}
</style>