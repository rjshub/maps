<template>
  <div
    class="manage-account-container"
    ref="toTop"
    v-loading.fullscreen="isLoading"
    element-loading-text="MAPS拼命加载中，请稍等..."
    @scroll="onScroll($event)"
  >
    <section ref="list_filter">
      <div class="select-container list_filter">
        <div class="left">
          <QuiteRoute></QuiteRoute>
        </div>
        <div class="right">
          <el-input
            size="mini"
            style="width:200px;margin-right: 10px"
            placeholder=" 搜索账号名称/ID"
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
            title="账号层筛选项"
            ref="FilterPopover"
            :config="options_config"
            :model="filter_form"
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
          <maps-tooltip :text="$t('lang.report_Customize_Columns')">
            <el-button
              size="mini"
              style="margin-left: 10px"
              @click="table_config_setting"
            >
              <i class="iconfont maps-icon-menu"></i>
            </el-button>
          </maps-tooltip>
          <!-- 全屏 -->
          <maps-tooltip :text="$t('lang.public_Full_screen_Mode')">
            <el-button
              size="mini"
              :disabled="!datail_data.length"
              @click="fullscreen_show"
            >
              <i class="iconfont maps-icon-fullscreen"></i>
            </el-button>
          </maps-tooltip>
          <!-- 导出 -->
          <maps-tooltip :text="$t('lang.report_Export_as_Excel')">
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
        v-if="account_has_filter"
        :config="options_config"
        :model="filter_form"
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
          ref="detail_DataTable"
          v-loading="table_reset_loading"
          :key="key_num"
          :is_total="is_total"
          :config="table_config"
          :data="datail_data"
          :total_data="total_data"
          :maxHeight="table_height"
          :showSelect="true"
          :deepIntoKeys="deep_into_keys"
          :checked="checked_account"
          @update_list="update_detail_table"
          @selected="update_selected($event, 'account')"
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
      title="账号"
      type="advertiser"
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
      title="巨量引擎-账号列表"
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
            :data="datail_data"
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import _ from "lodash";
import scroll from "./mixin/scroll";
import TableConfig from "./mixin/title-config";
import QuiteRoute from "./components/quite-route";
import FilterPopover from "./components/filter-popover";
import ConfigDrawer from "./components/config-drawer";
import FullScreen from "./components/fullscreen";
import FilterTab from "./components/filter-tab";
import DataTable from "./components/data-table";

export default {
  props: {
    date: Array,
  },
  components: {
    QuiteRoute,
    FilterPopover,
    ConfigDrawer,
    FullScreen,
    FilterTab,
    DataTable,
  },
  mixins: [scroll, TableConfig],
  data() {
    return {
      request_titlelist_url: "/adpush/jl/advertiser/titlelist",
      currentPage: 1,
      pagesize: 10,
      total: 0,
      filter_form: {
        word: "",
        client_id: [],
        page_size: 10,
        page: 1,
        startdate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        enddate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        order: "desc",
        order_by: "cost",
      },
      options_config: [], // 筛选条件
      special_title: [], //禁止移动删除
      deep_into_keys: ["media_advertiser_name"], // 可切换到下一级
      can_edit_keys: [], //可以编辑
      datail_data: [],
      total_data: [],
      download_local_loading: false,
    };
  },
  watch: {},
  computed: {
    ...mapState("advertising", [
      "account_filter",
      "account_has_filter",
      "checked_account",
    ]),
    ...mapState("system", ["active_team_id"]),
  },
  methods: {
    ...mapActions("advertising", [
      "update_account_filter",
      "update_checked_account",
      "update_account_has_filter",
      "update_checked_campaign",
      "update_checked_ad",
      "update_checked_creative",
    ]),
    // 设置参数
    format_filter() {
      this.filter_form.startdate = this.date[0];
      this.filter_form.enddate = this.date[1];
      const param = {
        team_id: this.active_team_id,
        client_id: this.filter_form.client_id.join(),
        advertiser_word: this.filter_form.word.replace(/(^\s*)|(\s*$)/g, ""),
        startdate: this.filter_form.startdate,
        enddate: this.filter_form.enddate,
        page_size: this.filter_form.page_size,
        page: this.filter_form.page,
        order: this.filter_form.order,
        order_by: this.filter_form.order_by,
        title: this.title_key,
      };
      return param;
    },
    // 获取列表
    async get_table_data() {
      const url = "/adpush/jl/advertiser/getList";
      const res = await this.fetchCore(url, this.format_filter(), true);
      if (res && res.total) {
        this.datail_data = res.list;
        this.total = res.total || 0;
        if (res.total != 0) {
          this.total_data = [
            Object.assign(res.totallist, {
              media_advertiser_name: `${this.$t("lang.public_total")}（${
                res.total
              }）${this.$t("lang.report_nums")}`,
              is_total: true,
            }),
          ];
        } else {
          this.datail_data = [];
          this.total_data = [];
          this.total = 0;
        }
      } else {
        this.datail_data = [];
        this.total_data = [];
        this.total = 0;
        if (res.hasOwnProperty('msg_type')) {
          this.$emit('isEmpty', res.msg_type)
        }
      }
    },
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
    // 筛选条件改变
    update_filter(param) {
      this.filter_form = param.filter;

      this.update_account_has_filter(param.state);
      this.filter_change();
    },
    add_filter() {
      this.$refs.FilterPopover.show();
    },
    filter_change(page = 1, state = true) {
      this.filter_form.page = page;
      this.currentPage = page;

      const param = _.cloneDeep(this.filter_form);
      this.update_account_filter(param);
      this.get_table_data();

      if (state) {
        this.update_selected([], "account");
      }
    },
    async get_select_list() {
      // 获取账号列表筛选条件
      // type区分类型  1多选 2单选 3输入 4时间
      const url = "/adpush/jl/advertiser/getFilterList";
      const param = {
        team_id: this.active_team_id,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.options_config = data;
      }
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
      // 账号-只查询多少条数据
      this.download_loading = true;
      const obj = {
        total: "1",
      };
      const param = Object.assign(this.format_filter(), obj);
      const url = "/adpush/jl/advertiser/download";
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
      const url = "/adpush/jl/advertiser/download";
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
      const url = "/adpush/jl/advertiser/download";
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
    init() {
      this.get_select_list();
      this.get_title_option_list();
    },
  },
  mounted() {
    if (this.account_filter != null) {
      this.filter_form = _.cloneDeep(this.account_filter);
      this.pagesize = this.filter_form.page_size;
      this.currentPage = this.filter_form.page;
    }
    this.init();
  },
};
</script>
<style lang='scss' scoped>
// .manage-account-container {
//   height: 100%;
//   overflow-y: auto;

//   section {
//     .list_filter {
//       padding: 10px 20px;
//       display: flex;
//       justify-content: space-between;
//       .right {
//         display: flex;
//         align-items: center;
//       }
//     }
//   }
//   section.list-table {
//     height: 100%;
//     main {
//       height: calc(100% - 70px);
//       padding: 10px 20px 0 20px;
//     }
//   }
// }
</style>