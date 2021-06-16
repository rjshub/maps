<template>
  <div
    class="manage-creative-container"
    ref="toTop"
    @scroll="onScroll($event)"
    v-loading.fullscreen="isLoading"
    element-loading-text="MAPS拼命加载中，请稍等..."
  >
    <section
      ref="list_filter"
      class="list_filter"
    >
      <div class="select-container list_filter">
        <div class="left">
          <QuiteRoute></QuiteRoute>
        </div>
        <div class="right">
          <el-input
            size="mini"
            style="width: 200px; margin-right: 10px"
            placeholder=" 搜索创意名称/ID"
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
            title="创意层筛选项"
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
        v-if="creative_has_filter"
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
          :showSelect="false"
          :deepIntoKeys="deep_into_keys"
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
      title="创意"
      type="creative"
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
      title="巨量引擎-创意列表"
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
      request_titlelist_url: "/adpush/jl/creative/titlelist",
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
        image_mode: [],
        landing_type: [], // 推广目的
        campaign_type: [], // 广告组类型
        creative_material_mode: ['INTERVENE'], // 创意方式
        page_size: 10,
        page: 1,
        startdate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        enddate: moment(new Date().getTime()).format("YYYY-MM-DD"),
        order: "desc",
        order_by: "cost",
      },
      options_config: [], // 筛选条件
      special_title: [], //禁止移动删除
      deep_into_keys: [], // 可切换到下一级
      can_edit_keys: [], //可以编辑
      datail_data: [],
      total_data: [],
      download_local_loading: false,
    };
  },
  watch: {},
  computed: {
    ...mapState("advertising", [
      "creative_filter",
      "creative_has_filter",
      "checked_account",
      "checked_campaign",
      "checked_ad",
    ]),
    ...mapState("system", ["active_team_id"]),
  },
  methods: {
    ...mapActions("advertising", [
      "update_creative_filter",
      "update_checked_account",
      "update_checked_campaign",
      "update_checked_ad",
      "update_checked_creative",
      "update_creative_has_filter",
      "update_checked_campaign",
      "update_checked_ad",
    ]),
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
        status: this.filter_form.status,
        client_id: this.filter_form.client_id.join(),
        landing_type: this.filter_form.landing_type.join(),
        image_mode: this.filter_form.image_mode.join(),
        create_date: date,
        campaign_type: this.filter_form.campaign_type.join(),
        creative_material_mode: this.filter_form.creative_material_mode.join(),
        creative_word: this.filter_form.word.replace(/(^\s*)|(\s*$)/g, ""),
        startdate: this.filter_form.startdate,
        enddate: this.filter_form.enddate,
        page_size: this.filter_form.page_size,
        page: this.filter_form.page,
        order: this.filter_form.order,
        order_by: this.filter_form.order_by,
        title: this.title_key,
        advertiser_id: this.checked_account.join(),
        media_campaign_id: this.checked_campaign.join(),
        media_ad_id: this.checked_ad.join(),
      };
      return param;
    },
    // 获取列表
    async get_table_data() {
      const url = "/adpush/jl/creative/getList";
      const res = await this.fetchCore(url, this.format_filter(), true);

      if (res && res.total) {
        this.datail_data = res.list;
        this.total = res.total || 0;
        if (res.total != 0) {
          this.total_data = [
            Object.assign(res.totallist, {
              media_creative_id: `${this.$t("lang.public_total")}（${
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
      }
    },
    // 查询
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

      this.update_creative_has_filter(param.state);
      this.filter_change();
    },
    add_filter() {
      this.$refs.FilterPopover.show();
    },
    filter_change(page = 1, state = true) {
      this.filter_form.page = page;
      this.currentPage = page;

      const param = _.cloneDeep(this.filter_form);
      this.update_creative_filter(param);
      this.get_table_data();

      // if (state) {
      //   this.update_selected([], "creative");
      // }
    },
    // 筛选条件改变
    update_filter(param) {
      this.filter_form = param.filter;

      this.update_creative_has_filter(param.state);
      this.filter_change();
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
      // 计划-先判断时间
      const times =
        new Date(this.filter_form.create_date[1]).getTime() -
        new Date(this.filter_form.create_date[0]).getTime();
      const full_year = 1000 * 60 * 60 * 24 * 90;
      if (times > full_year) {
        this.$refs.DownloadFile.show(true);
      } else {
        this.download_loading = true;
        const obj = {
          total: "1",
        };
        const param = Object.assign(this.format_filter(), obj);
        const url = "/adpush/jl/creative/download";
        const data = await this.fetchCore(url, param, false);
        if (data) {
          this.download_loading = false;
          const more_than_5000 = data.total > 5000;
          this.$refs.DownloadFile.show(more_than_5000);
        } else {
          this.download_loading = false;
        }
      }
    },
    // 实时下载（本地）
    async download_local(param) {
      const all_param = this.set_param(param);
      const url = "/adpush/jl/creative/download";
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
      const url = "/adpush/jl/creative/download";
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
    async get_select_list() {
      // 获取账号列表筛选条件
      // type区分类型  1多选 2单选 3输入 4时间
      const url = "/adpush/jl/creative/getFilterList";
      const param = {
        team_id: this.active_team_id,
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
    if (this.creative_filter != null) {
      this.filter_form = _.cloneDeep(this.creative_filter);
      this.pagesize = this.filter_form.page_size;
      this.currentPage = this.filter_form.page;
    }
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.manage-creative-container {
  overflow-y: auto;
  section.list_filter {
    padding: 10px 0;
  }
}
</style>