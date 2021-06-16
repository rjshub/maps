<template>
    <div class="report-subscribe-container"
        v-loading="isLoading">
        <header>
            <span>{{$t('lang.report_subscribe_Schedule_Email')}}</span>
        </header>
        <main v-if="!list_empty">
            <div class="table-filter">
                <div class="select-container">
                    <el-button size="mini"
                        type="primary"
                        class="maps-button-mini"
                        @click="create_new_task">
                        <i class="iconfont maps-icon-add"></i> {{$t('lang.report_subscribe_Add_Task')}}
                    </el-button>
                    <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="delete_task">
                            <i class="iconfont maps-icon-trash"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip :text="$t('lang.public_enable')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="allow_task">
                            <i class="iconfont maps-icon-open"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip :text="$t('lang.public_disable')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="forbidden_task">
                            <i class="iconfont maps-icon-pause"></i>
                        </el-button>
                    </maps-tooltip>

                </div>
                <div class="select-container">
                    <el-select v-model="filter_form.type"
                        :placeholder="$t('lang.team_member_status')"
                        size="mini"
                        filterable
                        style="margin-right: 10px"
                        @change="filter_change">
                        <el-option :label="$t('lang.report_subscribe_Report_type_all')"
                            value=""></el-option>
                        <el-option v-for="item in report_list"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                    <el-select v-model="filter_form.status"
                        :placeholder="$t('lang.team_member_status')"
                        size="mini"
                        filterable
                        style="margin-right: 10px"
                        @change="filter_status_change">
                        <el-option :label="$t('lang.public_all_status')"
                            value="-1"></el-option>
                        <el-option :label="$t('lang.public_enable')"
                            value="1"></el-option>
                        <el-option :label="$t('lang.public_disable')"
                            value="0"></el-option>
                    </el-select>
                    <el-select v-model="filter_form.run_status"
                        style="margin-right: 10px"
                        :placeholder="$t('lang.report_subscribe_Running_status')"
                        size="mini"
                        filterable
                        :disabled="run_status_forbidden"
                        @change="filter_change">
                        <el-option :label="$t('lang.public_all_status')"
                            value="0"></el-option>
                        <el-option :label="$t('lang.report_subscribe_Running')"
                            value="1"></el-option>
                        <el-option :label="$t('lang.report_subscribe_Has_not_started')"
                            value="2"></el-option>
                    </el-select>
                    <el-input size="mini"
                        style="width:230px"
                        :placeholder="$t('lang.report_subscribe_Search_by_Email_subject')"
                        class="filter-input"
                        @keyup.enter.native="filter_change"
                        v-model="filter_form.word">
                        <div slot="prefix"
                            style="cursor: pointer">
                            <i class="iconfont maps-icon-search"
                                @click="filter_change"></i>
                        </div>
                    </el-input>
                </div>
            </div>
            <div class="task-table">
                <el-table ref="multipleTable"
                    :data="task_list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="100%"
                    stripe
                    :border="true"
                    @selection-change="handleSelectionChange"
                    @sort-change="table_sort_change">
                    <el-table-column type="selection"
                        width="55">
                    </el-table-column>

                    <el-table-column :label="$t('lang.report_subscribe_task_table.status')"
                        width="115"
                        :resizable="false"
                        class-name="operate">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status"
                                :active-value="1"
                                :inactive-value="0"
                                active-color="#0BB3B3"
                                inactive-color="#C4C4C4"
                                @change="handle_status(scope.row, $event)"></el-switch>
                            <span :style="`display: inline-block;color:${status_map[scope.row.status].color};`">{{status_map[scope.row.status].text}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('lang.report_subscribe_task_table.operate')"
                        width="140px"
                        :resizable="false"
                        class-name="operate">
                        <template slot-scope="scope">
                            <maps-tooltip :text="$t('lang.public_edit_tooltip')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_edit(scope.row)">
                                    <i class="iconfont maps-icon-edit"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_delete(scope.row)">
                                    <i class="iconfont maps-icon-trash"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip :text="$t('lang.report_subscribe_Send_manually')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_hand_send(scope.row)">
                                    <i class="iconfont maps-icon-hand"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip :text="$t('lang.report_subscribe_View_run_log')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_show_log(scope.row)">
                                    <i class="iconfont maps-icon-Book"></i>
                                </el-button>
                            </maps-tooltip>
                        </template>
                    </el-table-column>

                    <el-table-column :label="$t('lang.report_subscribe_task_table.running_status')"
                        :resizable="false"
                        :width="language == 'zh'? 90:140">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == '1'">{{scope.row.run_status}}</span>
                            <span v-if="scope.row.status == '0'">-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.email_title')"
                        show-overflow-tooltip
                        min-width="140"
                        prop="title">
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.report_type')"
                        width="220"
                        show-overflow-tooltip
                        prop="type_name">
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.data_during')"
                        min-width="110"
                        show-overflow-tooltip
                        prop="data_range_name">
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.last_running')"
                        width="170"
                        sortable="custom"
                        prop="last_run_time">
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.next_running')"
                        width="170"
                        sortable="custom"
                        prop="next_run_time">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == '1'">{{scope.row.next_run_time}}</span>
                            <span v-if="scope.row.status == '0'">-</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.receive_email')"
                        width="100">
                        <template slot-scope="scope">
                            <maps-tooltip :text="set_email_list(scope.row.emails).join('<br>')"
                                align="left">
                                <span style="color: #0BB3B3;cursor: default">{{set_email_list(scope.row.emails).length}}个</span>
                            </maps-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.send_period')"
                        show-overflow-tooltip
                        min-width="210">
                        <template slot-scope="scope">
                            <span>{{scope.row.sending_period}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_task_table.start_date')"
                        width="120"
                        sortable="custom"
                        prop="startdate">
                    </el-table-column>
                    <template slot="empty">
                        <table-empty></table-empty>
                    </template>
                </el-table>
            </div>
            <footer class="pagination-footer">
                <el-pagination background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 20, 50, 100, 200, 500]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </footer>
        </main>
        <div class="list-empty"
            v-if="list_empty">
            <i class="iconfont maps-icon-nodata"></i>
            <span>{{$t('lang.report_subscribe_list_empty_point')}}</span>
            <el-button type="primary"
                @click="create_new_task"
                size="mini">
                <i class="iconfont maps-icon-add"> {{$t('lang.report_subscribe_Add_Task')}}</i>
            </el-button>
        </div>
        <LogDrawer ref="LogDrawer"></LogDrawer>
        <TaskDrawer ref="TaskDrawer"
            @UpdateList="update_list"></TaskDrawer>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import LogDrawer from "../components/log-drawer";
import TaskDrawer from "../components/task-drawer";

export default {
  components: { LogDrawer, TaskDrawer },
  data() {
    return {
      isLoading: false,
      list_empty: false,
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
      report_list: [
        {
          id: "1",
          name: this.$t("lang.layout_report_customer_nav"),
        },
        {
          id: "2",
          name: this.$t("lang.layout_report_effect_nav"),
        },
      ],
      //   搜索
      filter_form: {
        type: "",
        status: "-1",
        run_status: "0",
        word: "",
        page: "1",
        page_size: "10",
        order: "",
        order_by: "",
      },
      run_status_forbidden: true, //禁用状态禁止选择运行状态
      currentPage: 0,
      pagesize: 10,
      total: 0,
      task_list: [],
      multipleSelection: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id"]),
  },
  methods: {
    ...mapActions("report", ["update_handle_task"]),
    // 表格内容映射
    set_email_list(str) {
      if (str != null && str.length) {
        return str.split(",");
      } else {
        return [];
      }
    },
    //   新建任务
    create_new_task() {
      this.update_handle_task("create");
      this.$refs.TaskDrawer.show();
    },
    // 新建、编辑刷新列表
    update_list() {
      this.get_task_list();
    },
    // 筛选搜索
    filter_status_change(param) {
      if (param != "1") {
        this.run_status_forbidden = true;
        this.filter_form.run_status = "0";
      } else {
        this.run_status_forbidden = false;
      }
      this.filter_change();
    },
    filter_change(param) {
      this.currentPage = 1;
      this.filter_form.page = 1;
      this.get_task_list();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.get_task_list();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filter_form.page = val;
      this.get_task_list();
    },
    table_sort_change(column) {
      const map = {
        ascending: "ASC",
        descending: "DESC",
      };
      this.filter_form.order = map[column.order];
      this.filter_form.order_by = column.prop;
      this.get_task_list();
    },
    // 获取列表
    async get_task_list() {
      const url = "/emailtask/list";
      this.$set(this.filter_form, "team_id", this.active_team_id);
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.task_list = data.list;
        this.total = data.total;
        if (data.list.length) {
          this.list_empty = false;
        }
      }
    },
    // 查看是否有数据
    async check_count() {
      const url = "/emailtask/list";
      const param = {
        team_id: this.active_team_id,
        type: "",
        status: "-1",
        run_status: "0",
        word: "",
        page: "1",
        page_size: "10",
        order: "",
        order_by: "",
      };
      const data = await this.fetchCore(url, param, false);
      if (data && data.list) {
        if (data.list.length > 0) {
          this.list_empty = false;
          this.get_task_list();
        } else {
          this.list_empty = true;
        }
      } else {
        this.list_empty = true;
      }
    },
    // 删除
    delete_task() {
      // 确定删除这条定时邮件任务吗？该条任务将从列表中消失。
      // 删除任务
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.report_subscribe_Delete_task"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.report_delete_task_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.report_delete_task_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/emailtask/delete";
          const param = {
            team_id: this.active_team_id,
            ids: this.get_task_ids(),
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 启用
    allow_task() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.public_enable"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.report_open_task_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.report_open_task_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            team_id: this.active_team_id,
            status: "1",
            ids: this.get_task_ids(),
          };
          const url = "/emailtask/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 禁用
    forbidden_task() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_Task_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.public_disable"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.report_close_task_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.report_close_task_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            team_id: this.active_team_id,
            status: "0",
            ids: this.get_task_ids(),
          };
          const url = "/emailtask/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 批量（判断+参数）
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    get_task_ids() {
      let data = [];
      this.multipleSelection.forEach((item) => {
        data.push(item.id);
      });
      return data.toString();
    },
    forbidden_batch() {
      if (this.multipleSelection.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    // 表格操作
    async handle_status(row, status) {
      const h = this.$createElement;
      const self = status == "0" ? "close" : "open";
      this.$msgbox({
        // 禁用任务
        title: status == "0" ? this.$t("lang.public_disable") : this.$t("lang.public_enable"),
        message: h("div", null, [
          // 确定禁用这条定时邮件任务吗？该定时任务将不会被系统执行。
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.report_${self}_task_this.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.report_${self}_task_this.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/emailtask/updateStatus";
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
    async handle_edit(row) {
      this.update_handle_task("edit");
      this.$refs.TaskDrawer.show(row.id);
    },
    async handle_delete(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.report_subscribe_Delete_task"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.report_delete_task_this.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.report_delete_task_this.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/emailtask/delete";
          const param = {
            team_id: this.active_team_id,
            ids: row.id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    async handle_hand_send(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.report_subscribe_Send_email_manually"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t("lang.report_subscribe_Send_email.confirm")),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t("lang.report_subscribe_Send_email.point")),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/emailtask/sendemailtask";
          const param = {
            team_id: this.active_team_id,
            email_task_id: row.id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_task_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    handle_show_log(row) {
      this.$refs.LogDrawer.show(row);
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
    this.check_count();
  },
};
</script>
<style lang="scss">
.report-subscribe-container {
  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    thead {
      th {
        padding: 6px 0;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.report-subscribe-container {
  background: #ffffff;
  padding: 0;
  margin: 20px 10px 0 10px;
  overflow-y: auto;
  position: relative;
  header {
    padding: 0 20px;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    font-size: 16px;
    color: #666;
    display: flex;
    align-items: center;
  }
  main {
    height: calc(100% - 61px);
    padding: 20px 20px 0 20px;
    .table-filter {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .task-table {
      height: calc(100% - 102px);
    }
  }
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
    & > span {
      margin: 20px 0;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>