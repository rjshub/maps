<template>
  <div
    class="manage-campaign-container"
    ref="toTop"
    @scroll="onScroll($event)"
    v-loading.fullscreen="isLoading"
    element-loading-text="MAPS拼命加载中，请稍等..."
  >
    <section ref="list_filter">
      <div class="select-container list_filter">
        <div class="left">
          <QuiteRoute></QuiteRoute>
          <ShowCreate
            v-if="!check_permission.state"
            :activeHandle="manage_campaign_handle"
            :error="has_error"
            @updateHandle="update_handle"
          ></ShowCreate>
          <ErrorMsg
            v-if="has_error && manage_campaign_handle == 'show'"
            :Number="rule_error"
          ></ErrorMsg>
          <div
            class="left-right"
            v-if="manage_campaign_handle == 'edit'"
          >
            <!-- 推送 -->
            <maps-tooltip text="批量推送">
              <el-button
                size="mini"
                :disabled="!checked_campaign.length || check_permission.state"
                style="margin-left: 10px"
                @click="handle_batch_push"
              >
                <maps-tooltip :text="check_permission.text">
                  <i class="iconfont maps-icon-send"></i>
                </maps-tooltip>
              </el-button>
            </maps-tooltip>
            <!-- 批量忽略 -->
            <maps-tooltip text="批量忽略">
              <el-button
                size="mini"
                v-if="has_touch_rule"
                :disabled="!checked_campaign.length || check_permission.state"
                style="margin-left: 10px"
                @click="handle_batch_ignore"
              >
                <maps-tooltip :text="check_permission.text">
                  <i class="iconfont maps-icon-back"></i>
                </maps-tooltip>
              </el-button>
            </maps-tooltip>
            <!-- 批量修改 -->
            <CampaignBatchEdit
              :checked="set_select_data"
              :has_touch="has_touch_rule"
              :has_pushing="has_pushing"
              @batchSaveBudget="batch_save_budget"
              @changeStatus="change_status"
            ></CampaignBatchEdit>
            <!-- 新建任务 -->
            <el-button
              size="mini"
              :disabled="check_permission.state"
              style="margin-left: 10px"
              @click="handle_create_task([])"
            >
              <maps-tooltip :text="check_permission.text">
                <span>
                  <i
                    class="iconfont maps-icon-rule"
                    style="margin-right: 5px"
                  ></i>规则任务
                </span>
              </maps-tooltip>
            </el-button>
          </div>
        </div>
        <div class="right">
          <el-input
            size="mini"
            style="width: 200px; margin-right: 10px"
            placeholder=" 广告组名称/ID"
            class="filter-input"
            @keyup.enter.native="word_change"
            v-model="filter_form.word"
          >
            <div
              slot="prefix"
              style="cursor: pointer"
            >
              <i
                class="iconfont maps-icon-search"
                @click="word_change"
              ></i>
            </div>
          </el-input>
          <!-- 筛选 -->
          <FilterPopover
            title="广告组层筛选项"
            ref="FilterPopover"
            :config="options_config"
            :model="filter_form"
            :handle="set_handle"
            @update="update_filter"
          >
            <maps-tooltip
              slot="reference"
              text="筛选"
            >
              <el-button size="mini">
                <i class="iconfont maps-icon-filter"></i>
              </el-button>
            </maps-tooltip>
          </FilterPopover>
          <!-- 自定义 -->
          <maps-tooltip
            :text="$t('lang.report_Customize_Columns')"
            v-if="manage_campaign_handle == 'show'"
          >
            <el-button
              size="mini"
              style="margin-left: 10px"
              @click="table_config_setting"
            >
              <i class="iconfont maps-icon-menu"></i>
            </el-button>
          </maps-tooltip>
          <!-- 全屏 -->
          <maps-tooltip
            :text="$t('lang.public_Full_screen_Mode')"
            v-if="manage_campaign_handle == 'show'"
          >
            <el-button
              size="mini"
              :disabled="!detail_data.length"
              @click="fullscreen_show"
            >
              <i class="iconfont maps-icon-fullscreen"></i>
            </el-button>
          </maps-tooltip>
          <!-- 导出 -->
          <maps-tooltip
            :text="$t('lang.report_Export_as_Excel')"
            v-if="manage_campaign_handle == 'show'"
          >
            <el-button
              size="mini"
              :loading="download_local_loading"
              @click="download_table"
            >
              <i class="iconfont maps-icon-download"></i>
            </el-button>
          </maps-tooltip>
        </div>
      </div>
      <FilterTab
        ref="FilterTab"
        v-if="campaign_has_filter"
        :config="options_config"
        :model="filter_form"
        :handle="set_handle"
        @update="update_filter"
        @add="add_filter"
      ></FilterTab>
    </section>
    <section
      ref="list_table"
      class="list-table"
    >
      <main ref="table_main">
        <DataTable
          v-loading="table_reset_loading"
          ref="detail_DataTable"
          v-if="flag"
          :key="key_num"
          :is_total="is_total"
          :config="table_config"
          :data="detail_data"
          :total_data="total_data"
          :maxHeight="table_height"
          :showSelect="true"
          :deepIntoKeys="deep_into_keys"
          :canEditKeys="can_edit_keys"
          :is_edit="manage_campaign_handle == 'edit'"
          :checked="checked_campaign"
          @update_list="update_detail_table"
          @selected="update_selected($event, 'campaign')"
          @changeStatus="change_status"
          @saveOneEdit="save_one_edit"
          @ignoreChange="ignore_someone"
          @pushData="push_someone"
        ></DataTable>
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
        ></el-pagination>
      </footer>
    </section>
    <!-- 回到顶部 -->
    <div
      class="to-top"
      :title="$t('lang.public_back_top')"
      v-if="showToTop"
      @click="toTop($event)"
    >
      <i class="iconfont maps-icon-arrow-top"></i>
    </div>
    <!-- 自定义 -->
    <ConfigDrawer
      ref="ConfigDrawer"
      title="广告组"
      type="campaign"
      :moduleList="title_module"
      :titleList="title_cinfig"
      :checkedList="title_checked"
      :special_key="special_title"
      :forbidden_delete_key="forbidden_delete_title"
      @update_table_config="update_table_config"
      @cancel_setting_config="cancel_setting_config"
    ></ConfigDrawer>
    <!-- 全屏 -->
    <FullScreen
      ref="FullScreen"
      title="巨量引擎-广告组列表"
      :time="`${filter_form.startdate} - ${filter_form.enddate}`"
    >
      <div
        slot="table-box"
        class="fullscreen-table"
      >
        <main>
          <DataTable
            ref="DataTable"
            :key="key_num + 1"
            :is_total="is_total"
            :config="table_config"
            :data="detail_data"
            :total_data="total_data"
            @update_list="update_detail_table"
          ></DataTable>
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
          ></el-pagination>
        </footer>
      </div>
    </FullScreen>
    <!-- 下载 -->
    <download-file
      ref="DownloadFile"
      :module="$t('lang.report_Clients_Report')"
      @download_local="download_local"
      @download_offline="download_offline"
    ></download-file>
    <!-- 新建任务 -->
    <CreateTask
      ref="CreateTask"
      @success="create_success"
      :checked="tree_checked"
    ></CreateTask>
    <!-- 忽略 -->
    <IgnoreDialog
      ref="IgnoreDialog"
      @save="save_ignore"
      @closed="ignore_closed"
    ></IgnoreDialog>
    <PushDialog
      ref="PushDialog"
      @save="save_push"
      @closed="push_closed"
    ></PushDialog>
    <!-- 规则任务应用详情 -->
    <AdRuleDeatil ref="AdRuleDeatil"></AdRuleDeatil>
    <!-- 新建任务弹框 -->
    <TaskPoint ref="TaskPoint"></TaskPoint>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import _ from "lodash";
import scroll from "./mixin/scroll";
import TableConfig from "./mixin/title-config";
import QuiteRoute from "./components/quite-route";
import ShowCreate from "./components/show-create";
import ErrorMsg from "./components/error-msg";
import FilterPopover from "./components/filter-popover";
import ConfigDrawer from "./components/config-drawer";
import FullScreen from "./components/fullscreen";
import FilterTab from "./components/filter-tab";
import DataTable from "./components/data-table";
import CampaignBatchEdit from "./components/edit/campaign-batch-edit";
import CreateTask from "@/views/tools/components/task-create-edit.vue";
import IgnoreDialog from "./components/edit/ignore";
import PushDialog from "./components/edit/push";
import AdRuleDeatil from "./components/ad-rule-detail";
import TaskPoint from "./components/task_point";

export default {
  props: {
    date: Array,
  },
  components: {
    QuiteRoute,
    ShowCreate,
    ErrorMsg,
    FilterPopover,
    ConfigDrawer,
    FullScreen,
    FilterTab,
    DataTable,
    CampaignBatchEdit,
    CreateTask,
    IgnoreDialog,
    AdRuleDeatil,
    PushDialog,
    TaskPoint,
  },
  mixins: [scroll, TableConfig],
  data() {
    return {
      request_titlelist_url: "/adpush/jl/campaign/titlelist",
      currentPage: 1,
      pagesize: 10,
      total: 0,
      filter_form: {
        word: "",
        status: 1,
        client_id: [],
        create_date: [
          moment().subtract("days", 30).format("YYYY-MM-DD"),
          moment(new Date().getTime()).format("YYYY-MM-DD"),
        ],
        landing_type: [], // 推广目的
        push_status: "", //编辑特有的两个参数
        campaign_type: [], // 广告组类型
        apply_rule: [],
        rule_id: [],
        trigger_rule: [],
        page_size: 10,
        page: 1,
        startdate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        enddate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        order: "",
        order_by: "",
      },
      options_config: [], // 筛选条件
      special_title: [], //禁止移动删除
      deep_into_keys: ["campaign_name"], // 可切换到下一级
      can_edit_keys: ["campaign_name", "budget"], //可以编辑
      detail_data: [],
      total_data: [],
      download_local_loading: false,

      // 不统一参数
      has_error: false, // 是否有未推送，触发规则待确认
      rule_error: "0,0,0", //触发、异常、修改未推送的数量
      // 总计表头
      total_header: "",
      // 新建，选中的campaign
      tree_checked: [],

      // 批量编辑
      has_touch_rule: false,
      has_pushing: false,
    };
  },
  watch: {
    manage_campaign_handle: {
      handler(val) {
        if (val == "show") {
          this.total_data[0].campaign_name = this.total_header;
          this.total_data[0].operate = "";
        } else {
          this.total_data[0].operate = this.total_header;
          this.total_data[0].campaign_name = "";
        }
      },
    },
  },
  computed: {
    ...mapState("advertising", [
      "campaign_filter",
      "campaign_has_filter",
      "manage_campaign_handle",
      "checked_account",
      "checked_campaign",
    ]),
    ...mapState("system", ["active_team_id"]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
    // 给筛选传参
    set_handle() {
      // 默认是查看
      let type = "1";
      if (this.manage_campaign_handle == "show") {
        type = "1";
      } else {
        type = "2";
      }
      return type;
    },
    // 给批量操作传递选中的数据
    set_select_data() {
      let result = [];
      this.has_touch_rule = false;
      this.has_pushing = false;
      const not = ["2", "3", 2, 3];
      if (this.checked_campaign.length) {
        this.checked_campaign.forEach((item) => {
          const index = this.detail_data.findIndex((obj) => {
            return obj.media_campaign_id == item;
          });
          if (index >= 0) {
            if (
              !not.includes(this.detail_data[index].rule_detail_status) ||
              this.detail_data[index].status != "CAMPAIGN_STATUS_DELETE"
            ) {
              result.push(this.detail_data[index]);
            }
            if (not.includes(this.detail_data[index].rule_detail_status)) {
              this.has_touch_rule = true;
            }

            if (this.detail_data[index].push_status == 5) {
              this.has_pushing = true;
            }
          }
        });
      }
      return result;
    },
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
  },
  methods: {
    ...mapActions("tools", ["update_task_handle_type"]),
    ...mapActions("advertising", [
      "update_campaign_filter",
      "update_checked_campaign",
      "update_campaign_has_filter",
      "update_checked_account",
      "update_checked_ad",
      "update_checked_creative",
      "update_campaign_syncing",
      "update_syncing",
    ]),
    // 新建任务成功
    create_success(param) {
      this.$refs.TaskPoint.show(param);
      this.get_table_data();
    },
    // 设置参数
    format_filter() {
      let date = "";
      if (this.filter_form.create_date.length) {
        date = `${this.filter_form.create_date[0]}~${this.filter_form.create_date[1]}`;
      }

      this.filter_form.startdate = this.date[0];
      this.filter_form.enddate = this.date[1];
      const param = {
        team_id: this.active_team_id,
        create_date: date,
        status: this.filter_form.status,
        client_id: this.filter_form.client_id.join(),
        landing_type: this.filter_form.landing_type.join(),
        campaign_type: this.filter_form.campaign_type.join(),
        push_status: this.filter_form.push_status,
        apply_rule: this.filter_form.apply_rule.join(),
        rule_id: this.filter_form.rule_id.join(),
        trigger_rule: this.filter_form.trigger_rule.join(),
        campaign_word: this.filter_form.word.replace(/(^\s*)|(\s*$)/g, ""),
        startdate: this.filter_form.startdate,
        enddate: this.filter_form.enddate,
        page_size: this.filter_form.page_size,
        page: this.filter_form.page,
        order: this.filter_form.order,
        order_by: this.filter_form.order_by,
        title: this.title_key,
        advertiser_id: this.checked_account.join(),
      };
      return param;
    },
    // 获取列表
    async get_table_data() {
      this.reset_edit_table_header();
      let url = "/adpush/jl/campaign/getList";
      if (this.manage_campaign_handle == "show") {
        url = "/adpush/jl/campaign/getList";
      } else {
        url = "/adpush/jl/campaignedit/getList";
      }
      const res = await this.fetchCore(url, this.format_filter(), false);
      if (res && res.total) {
        this.$nextTick(() => {
          if (this.manage_campaign_handle == "edit") {
            // this.update_campaign_syncing(res.sync)
            this.update_syncing(res.sync);
          }
          this.detail_data = this.format_table_data(res.list);
        });
        this.total = res.total || 0;
        if (res.total != 0) {
          this.total_data = [
            Object.assign(res.totallist, {
              operate: "",
              campaign_name: `${this.$t("lang.public_total")}（${
                res.total
              }）${this.$t("lang.report_nums")}`,
              is_total: true,
            }),
          ];
          this.total_header = `${this.$t("lang.public_total")}（${
            res.total
          }）${this.$t("lang.report_nums")}`;
        } else {
          this.detail_data = [];
          this.total_data = [];
          this.total = 0;
          this.total_header = "";
        }

        if (res.hasOwnProperty("ruleTotal")) {
          if (
            res.ruleTotal.open_rule_total ||
            res.ruleTotal.error_rule_total ||
            res.ruleTotal.nopush
          ) {
            this.has_error = true;
          }

          this.rule_error = `${res.ruleTotal.open_rule_total || 0},${
            res.ruleTotal.error_rule_total || 0
          },${res.ruleTotal.nopush || 0}`;
        }

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.detail_data = [];
        this.total_data = [];
        this.total = 0;
        this.total_header = "";
        this.has_error = false;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    },
    // 重写list
    format_table_data(arr) {
      arr.map((item) => {
        // 投放状态
        // const tmp_status = item.status;
        // const status_map = {
        //   CAMPAIGN_STATUS_ENABLE: "2",
        //   CAMPAIGN_STATUS_DISABLE: "1",
        //   CAMPAIGN_STATUS_DELETE: "0",
        // };
        // item.status_key = item.status;
        // item.status = status_map[item.status];
        // 开关状态
        if (item.hasOwnProperty("opt_status")) {
          const open_map = {
            CAMPAIGN_STATUS_ENABLE: 1,
            CAMPAIGN_STATUS_DISABLE: 0,
          };
          item.opt_status = open_map[item.opt_status] || 0;
        }
      });

      return arr;
    },
    reset_edit_table_header() {
      if (this.manage_campaign_handle == "show") {
        if (this.table_config.length) {
          const index = this.table_config.findIndex((obj) => {
            return obj.prop == "utime";
          });
          if (index >= 0) {
            this.table_config[index].show = false;
          }
        }
      } else {
        if (this.table_config.length) {
          const index = this.table_config.findIndex((obj) => {
            return obj.prop == "utime";
          });
          if (index >= 0) {
            this.table_config[index].show = true;
          }
        }
      }
    },
    // 筛选条件
    date_change(date) {
      this.filter_form.startdate = date[0];
      this.filter_form.enddate = date[1];
      this.filter_change();
    },
    word_change() {
      this.filter_change();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.filter_change();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filter_form.page = val;
      this.filter_change(val);
    },
    // 更新筛选
    update_filter(param) {
      // 处理
      this.filter_form = param.filter;

      this.update_campaign_has_filter(param.state);
      this.filter_change();
    },
    add_filter() {
      this.$refs.FilterPopover.show();
    },
    filter_change(page = 1, state = true) {
      this.filter_form.page = page;
      this.currentPage = page;
      this.isLoading = true;
      const param = _.cloneDeep(this.filter_form);
      this.update_campaign_filter(param);
      this.get_table_data();
      if (state) {
        this.update_selected([], "campaign");
      }
    },
    // 查看或编辑
    update_handle(param) {
      this.flag = false;
      this.isLoading = true;

      this.$nextTick(() => {
        if (param == "show") {
          this.filter_form.push_status = "";
          this.filter_form.order_by = "";
          this.filter_form.order = "";
          this.filter_form.trigger_rule = [];
        } else {
          this.filter_form.push_status = 0;
          this.update_campaign_has_filter(true);
        }
        this.filter_form.page = 1;
        // this.filter_change(this.filter_form.page);
        this.get_title_option_list();
        this.update_checked_campaign([]);
        this.update_checked_ad([]);
        this.update_checked_creative([]);
      });
    },
    // 自定义列
    table_config_setting() {
      this.$refs.ConfigDrawer.show();
    },
    // 全屏查看
    fullscreen_show() {
      this.$refs.FullScreen.show();
    },
    // 下载表格
    async download_table() {
      this.download_loading = true;
      const obj = {
        total: "1",
      };
      const param = Object.assign(this.format_filter(), obj);
      const url = "/adpush/jl/campaign/download";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.download_loading = false;
        const more_than_5000 = data.total > 5000;
        this.$refs.DownloadFile.show(more_than_5000);
      } else {
        this.download_loading = false;
      }
    },
    // 实时下载（本地）
    async download_local(param) {
      const all_param = this.set_param(param);
      const url = "/adpush/jl/campaign/download";
      this.download_local_loading = true;
      this.$message({
        message: this.$t("lang.report_download_table_local_excel"),
        duration: 5000,
        offset: 3,
        type: "success",
      });
      const data = await this.fetchCore(url, all_param, false);
      if (data) {
        this.$downloadFile(data);
        this.download_local_loading = false;
      } else {
        this.download_local_loading = false;
      }
    },
    // 离线下载
    async download_offline(param) {
      const all_param = this.set_param(param);
      const url = "/adpush/jl/campaign/download";
      this.$message({
        message: this.$t("lang.report_download_table_offline_excel"),
        duration: 5000,
        offset: 3,
        type: "success",
      });
      const data = await this.fetchCore(url, all_param, false);
      if (data) {
      }
    },
    set_param(param) {
      const obj = {
        title: this.title_key,
        is_total: this.is_total,
      };
      const tmp_param = Object.assign(param, obj);
      const all_param = Object.assign(this.format_filter(), tmp_param);
      return all_param;
    },
    // 推送
    handle_batch_push() {
      let result = [];
      let not_edit = [];
      let error_touch = [];
      let param = {
        form: {
          media_campaign_ids: [],
        },
        point:
          "<span>确定要推送这些广告组的修改吗？系统将在<span style='color: #ff0000'>5分钟</span>之内完成修改，您将无法撤销本次推送。</span>",
        row_id: this.checked_campaign,
      };

      if (this.checked_campaign.length) {
        this.checked_campaign.forEach((item) => {
          const index = this.detail_data.findIndex((obj) => {
            return obj.media_campaign_id == item;
          });
          if (index >= 0) {
            const row = this.detail_data[index];
            // 存在触发
            if (row.rule_detail_status == 2) {
              param.point =
                "<span>勾选项中<span style='color: #ff0000'>包含已触发规则的广告组</span>，系统已完成自动修改。确认要向巨量引擎平台推送这些广告组的修改吗？系统将在10分钟之内完成修改，您将无法撤销本次推送。</span>";
            }
            // 存在异常
            if (row.rule_detail_status == 3) {
              error_touch.push(row.id);
            }
            // 排除异常触发、推送中、未修改
            const not_handle_push = [1, "1", 4, "4", 5, "5"];
            if (
              row.rule_detail_status != 3 &&
              !not_handle_push.includes(row.push_status)
            ) {
              result.push(row.media_campaign_id);
            }
            if (row.push_status == 4) {
              not_edit.push(row.id);
            }
          }
        });
        param.form.media_campaign_ids = result;
      }

      if (error_touch.length) {
        this.$message({
          message: "勾选项中包含异常触发规则的广告组，请先处理或重新选择！",
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }
      if (this.checked_campaign.length == not_edit.length) {
        this.$message({
          message: "勾选项中没有可推送的内容，请重新选择或修改后再进行推送。",
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }
      if (!result.length) {
        this.$message({
          message: "勾选项中没有可推送的内容。",
          duration: 5000,
          offset: 3,
          type: "error",
        });
      } else {
        this.$refs.PushDialog.show(param);
      }
    },
    // 忽略
    handle_batch_ignore() {
      let result = [];
      let param = {
        point:
          "确定要忽略触发规则提醒吗？ 系统将撤销根据规则自动修改的内容，此操作无法撤回，请仔细确认！",
        form: {
          media_campaign_ids: [],
          is_ignore_normal: 1,
        },
        single: true, // 是否只存在正常
        row_id: this.checked_campaign,
      };
      let has_error = false;
      let has_normal = false;
      if (this.checked_campaign.length) {
        this.checked_campaign.forEach((item) => {
          const index = this.detail_data.findIndex((obj) => {
            return obj.media_campaign_id == item;
          });
          if (index >= 0) {
            const row = this.detail_data[index];
            result.push(row.media_campaign_id);

            //error, normal
            if (
              row.rule_detail.errorCount != 0 &&
              row.rule_detail.touchRuleCount - row.rule_detail.errorCount != 0
            ) {
              has_error = true;
              has_normal = true;
            }
            //error
            if (
              row.rule_detail.errorCount != 0 &&
              row.rule_detail.touchRuleCount == row.rule_detail.errorCount
            ) {
              has_error = true;
            }
            //normal
            if (
              row.rule_detail.errorCount == 0 &&
              row.rule_detail.touchRuleCount != 0 &&
              row.rule_detail.touchRuleCount == row.rule_detail.ruleCount
            ) {
              has_normal = true;
            }
          }
        });
        param.form.media_campaign_ids = result;
      }

      if (has_error && has_normal) {
        param.point =
          "勾选项中包含异常触发规则的提醒，确定要忽略吗？系统将撤销提醒，此操作无法撤回，请仔细确认！";
        param.single = false;
        param.form.is_ignore_normal = 0;
      }

      this.$refs.IgnoreDialog.show(param);
    },
    // 新建任务
    handle_create_task(id = []) {
      if (id.length) {
        let result = [];
        const not = ["2", "3", 2, 3];
        id.forEach((item) => {
          const index = this.detail_data.findIndex((obj) => {
            return obj.media_campaign_id == item;
          });
          if (index >= 0) {
            if (!not.includes(this.detail_data[index].rule_detail_status)) {
              result.push(this.detail_data[index].str_campaign_id);
            }
          }
        });

        this.tree_checked = result;
      } else {
        let result = [];
        const not = ["2", "3", 2, 3];
        if (this.checked_campaign.length) {
          this.checked_campaign.forEach((item) => {
            const index = this.detail_data.findIndex((obj) => {
              return obj.media_campaign_id == item;
            });
            if (index >= 0) {
              if (!not.includes(this.detail_data[index].rule_detail_status)) {
                result.push(this.detail_data[index].str_campaign_id);
              }
            }
          });
        }

        this.tree_checked = result;
      }

      this.$nextTick(() => {
        this.update_task_handle_type("create");
        this.$refs.CreateTask.show("", 1);
      });
    },
    // 表格操作
    // 开关
    async change_status(param, callback) {
      const open_map = {
        1: "CAMPAIGN_STATUS_ENABLE",
        0: "CAMPAIGN_STATUS_DISABLE",
      };
      param.opt_status = open_map[param.opt_status];
      const url = "/adpush/jl/campaignedit/optstatus";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        // this.$refs.detail_DataTable.check_leave(param.ids);
        callback(true);
        // this.filter_form.order = "DESC";
        // this.filter_form.order_by = "utime";
        this.get_table_data();
        this.$message({
          message: "广告组修改成功，本次修改仅在MAPS中生效！",
          duration: 5000,
          offset: 3,
          type: "success",
        });
      } else {
        callback(true);
      }
    },
    async save_one_edit(param, callback) {
      const url = "/adpush/jl/campaignedit/save";
      const data = await this.fetchCore(url, param, true);
      if (data) {
        callback(true, data.media_campaign_id);
        // this.filter_form.order = "DESC";
        // this.filter_form.order_by = "utime";
        this.get_table_data();
        this.$message({
          message: "广告组修改成功，本次修改仅在MAPS中生效！",
          duration: 5000,
          offset: 3,
          type: "success",
        });
      } else {
        callback(false);
      }
    },
    async batch_save_budget(param, callback) {
      const url = "/adpush/jl/campaignedit/savebudget";
      const data = await this.fetchCore(url, param, true);
      if (data) {
        callback(true);
        // this.filter_form.order = "DESC";
        // this.filter_form.order_by = "utime";
        this.get_table_data();
        this.$message({
          message: "广告组修改成功，本次修改仅在MAPS中生效！",
          duration: 5000,
          offset: 3,
          type: "success",
        });
      } else {
        callback(false);
      }
    },
    // 推送
    push_someone(row) {
      let param = {
        form: {
          media_campaign_ids: [row.media_campaign_id] || [],
        },
        point:
          "<span>确定要推送这条广告组的修改吗？系统将在<span style='color: #ff0000'>5分钟</span>之内完成修改，您将无法撤销本次推送。</span>",
        row_id: row.id,
      };

      if (row.rule_detail_status == 0 || row.rule_detail_status == 1) {
        // 未触发规则
        param.point =
          "<span>确定要推送这条广告组的修改吗？系统将在<span style='color: #ff0000'>5分钟</span>之内完成修改，您将无法撤销本次推送。</span>";
      } else if (row.rule_detail_status == 2) {
        // 正常触发规则
        param.point =
          "<span>当前广告组触发规则，系统已完成自动修改。确认要向巨量引擎平台推送这条广告组的修改吗？系统将在<span style='color: #ff0000'>5分钟</span>之内完成修改，您将无法撤销本次推送。</span>";
      }

      this.$refs.PushDialog.show(param);
    },
    async save_push(param) {
      const url = "/adpush/jl/campaignedit/pushcampaign";
      const res = await this.fetchCore(url, param, false);
      if (res) {
        // this.$message({
        //   message: "系统正在推送，请稍后...",
        //   duration: 5000,
        //   offset: 3,
        //   type: "success",
        // });
        // this.filter_form.order = "DESC";
        // this.filter_form.order_by = "utime";
        if (res.success && res.error) {
          this.$message({
            message: `${res.success}条广告组推送成功！${res.error}条广告组推送失败！您可联系管理员寻求帮助！`,
            duration: 5000,
            offset: 3,
            type: "error",
          });
        } else if (!res.success && res.error) {
          this.$message({
            message: `${res.error}条广告组推送失败！您可联系管理员寻求帮助！`,
            duration: 5000,
            offset: 3,
            type: "error",
          });
        } else if (res.success && !res.error) {
          this.$message({
            message: `${res.success}条广告组推送成功！`,
            duration: 5000,
            offset: 3,
            type: "success",
          });
        }
        this.get_table_data();
        this.$refs.PushDialog.close();
      }
    },
    async push_closed(id) {
      // this.$refs.detail_DataTable.check_leave(id);
    },
    // 忽略
    ignore_someone(row) {
      let param = {
        point: "",
        form: {
          media_campaign_ids: [row.media_campaign_id] || [],
          is_ignore_normal: 1,
        },
        single: true, // 是否只存在正常或异常
        row_id: row.id,
      };
      if (
        row.rule_detail.errorCount == 0 ||
        row.rule_detail.errorCount == row.rule_detail.touchRuleCount
      ) {
        param.point =
          "确定要忽略触发规则提醒吗？系统将撤销根据规则自动修改的内容，此操作无法撤回，请仔细确认！";
        param.single = true;
      } else if (
        row.rule_detail.errorCount != 0 &&
        row.rule_detail.touchRuleCount - row.rule_detail.errorCount != 0
      ) {
        param.point =
          "勾选项中包含异常触发规则的提醒，确定要忽略吗？系统将撤销提醒，此操作无法撤回，请仔细确认！";
        param.single = false;
        param.form.is_ignore_normal = 0;
      }

      this.$refs.IgnoreDialog.show(param);
    },
    async save_ignore(param) {
      const url = "/adpush/jl/campaignedit/ignore";
      const res = await this.fetchCore(url, param, false);
      if (res) {
        // this.filter_form.order = "DESC";
        // this.filter_form.order_by = "utime";
        this.get_table_data();
        this.$refs.IgnoreDialog.close();
      }
    },
    ignore_closed(id) {
      this.$refs.detail_DataTable.check_leave(id);
    },
    // 任务详情弹框
    show_ad_rule_detail(param) {
      this.$refs.AdRuleDeatil.show(param);
    },
    // 获取账号列表筛选条件
    async get_select_list() {
      // type区分类型  1多选 2单选 3时间 4下拉
      const url = "/adpush/jl/campaign/getFilterList";
      const param = {
        team_id: this.active_team_id,
        advertiser_id: this.checked_account.join(),
      };
      const data = await this.fetchCore(url, param, false);

      if (data) {
        this.options_config = data;
      }
    },
    init() {
      this.get_select_list();
      this.get_title_option_list();
    },
  },
  mounted() {
    this.init();
    this.$eventHub.$on("showAdRuleDetail", (data) => {
      this.$nextTick(() => {
        this.show_ad_rule_detail(data);
      });
    });
    this.$eventHub.$on("createCampaignTask", (data) => {
      this.handle_create_task(data);
    });
    this.$eventHub.$on("handle_hand_sync", () => {
      this.get_table_data();
    });
  },
  created() {
    if (this.campaign_filter != null) {
      this.filter_form = _.cloneDeep(this.campaign_filter);
      this.currentPage = this.campaign_filter.page;
      this.pagesize = this.campaign_filter.page_size;
    }
  },
};
</script>
<style lang='scss' scoped>
.manage-campaign-container {
  overflow-y: auto;
  .list_filter {
    padding: 10px 0;
    .left {
      .left-right {
        float: left;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>