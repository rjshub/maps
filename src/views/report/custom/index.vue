<template>
    <div class="customer-report-container"
        ref="toTop"
        v-loading.fullscreen="download_loading"
        :element-loading-text="download_text"
        @scroll="onScroll($event)">
        <section class="header">
            <div>
                <span>{{$t('lang.report_Clients_Report')}}</span>
                <el-carousel height="24px"
                    v-if="platform_list.length"
                    :style="language == 'zh'? 'width: 260px':'width: 280px'"
                    direction="vertical"
                    :autoplay="true">
                    <el-carousel-item v-for="item in platform_list"
                        :key="item.id">
                        <span class="update-time">{{item.name + $t('lang.report_Updated_time')}}{{item.report_synctime || '--'}}</span>
                    </el-carousel-item>
                </el-carousel>
                <maps-tooltip :text="$t('lang.report_Updated_time_point')">
                    <i class="iconfont maps-icon-info"
                        style="color: #999;margin-left: 10px"></i>
                </maps-tooltip>
                <maps-tooltip :text="set_failtext"
                    v-if="failure_list.length"
                    align="left">
                    <i class="iconfont maps-icon-alarm"
                        style="color: #FF3333;margin-left: 10px"></i>
                </maps-tooltip>
            </div>
            <div class="report-filter select-container">
                <el-radio-group v-model="filter_form.time_line"
                    style="margin: 0 10px 5px 0"
                    @change="time_line_change">
                    <maps-tooltip :text="item.desc"
                        align="left"
                        v-for="item in time_line_list"
                        :key="item.id">
                        <el-radio-button :label="item.id">{{item.name}}</el-radio-button>
                    </maps-tooltip>
                </el-radio-group>
                <filter-select v-model="filter_form.customer"
                    :prop="{value: 'id', label: `name`}"
                    :options="customer_list"
                    filterable
                    multiple
                    @change="customer_change"
                    :placeholder="$t('lang.public_select_customer_placeholder')"></filter-select>
                <filter-select v-model="filter_form.platform"
                    :prop="{value: 'id', label: `name`}"
                    :options="platform_list"
                    filterable
                    multiple
                    @change="platform_change"
                    :placeholder="$t('lang.public_select_platform_placeholder')"></filter-select>
                <el-date-picker v-model="date_list"
                    style="margin-bottom: 5px"
                    size="mini"
                    type="daterange"
                    align="right"
                    :clearable="false"
                    unlink-panels
                    :range-separator="$t('lang.public_range_separator')"
                    :start-placeholder="$t('lang.public_start_time')"
                    :end-placeholder="$t('lang.public_end_time')"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    @change="date_change"
                    :picker-options="pickerOptions">
                </el-date-picker>
            </div>
        </section>
        <!-- 数据报表 -->
        <section class="main">
            <header>
                <el-tabs v-model="activeName"
                    @tab-click="check_tab">
                    <el-tab-pane :label="$t('lang.report_Percentage_analysis')"
                        name="proportion"></el-tab-pane>
                    <el-tab-pane :label="$t('lang.report_Trend_analysis')"
                        name="trend"></el-tab-pane>
                </el-tabs>
                <div class="btn">
                    <el-dropdown trigger="click">
                        <el-button size="mini"
                            style="margin-right: 10px"
                            :disabled="disable_download_chart || client_Report_permission == '1'">
                            <i class="iconfont maps-icon-download"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="handle_download_chart">{{$t('lang.public_Export_as_PNG')}}</el-dropdown-item>
                            <el-dropdown-item @click.native="handle_download_excel">{{$t('lang.public_Export_as_Excel')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-button size="mini"
                        @click="show_report = !show_report">
                        <i class="iconfont maps-icon-down"
                            :style="show_report? '':`transform: rotate(0deg)`"></i>
                    </el-button>
                </div>
            </header>
            <main :style="set_report_height"
                class="chart-main">
                <component :is="activeNav"
                    ref="customer_chart"
                    :convertRate="convertRate"
                    @noData="chart_no_data"
                    :filter="filter_form"></component>
            </main>
        </section>
        <!-- 详细数据 -->
        <section class="main table-section">
            <header>
                <span>{{$t('lang.report_Detailed_data')}}</span>
                <div class="btn">
                    <!-- 分日、分时 -->
                    <el-select v-model="table_time"
                        size="mini"
                        style="width: 150px;margin-right: 10px"
                        @change="view_type_change"
                        :placeholder="$t('lang.public_select_view_type_placeholder')">
                        <el-option :label="$t('lang.report_View_daily_data')"
                            value="date"></el-option>
                        <el-option :label="$t('lang.report_View_hourly_data')"
                            value="hour"></el-option>
                    </el-select>
                    <!-- 自定义列 -->
                    <maps-tooltip :text="$t('lang.report_Customize_Columns')">
                        <el-button size="mini"
                            @click="table_config_setting">
                            <i class="iconfont maps-icon-menu"></i>
                        </el-button>
                    </maps-tooltip>
                    <!-- 是否展示数值为0 -->
                    <maps-tooltip :text="set_all_data_active.title"
                        align="left">
                        <el-button size="mini"
                            :class="set_all_data_active.class"
                            @click="handle_show_data">
                            <i class="iconfont maps-icon-bell-dis"></i>
                        </el-button>
                    </maps-tooltip>
                    <!-- 全屏 -->
                    <maps-tooltip :text="$t('lang.public_Full_screen_Mode')">
                        <el-button size="mini"
                            :disabled="!datail_data.length"
                            @click="fullscreen_show">
                            <i class="iconfont maps-icon-fullscreen"></i>
                        </el-button>
                    </maps-tooltip>
                    <!-- 导出 -->
                    <maps-tooltip :text="$t('lang.report_Export_as_Excel')">
                        <el-button size="mini"
                            :disabled="!datail_data.length || client_Report_permission == '1'"
                            :loading="download_local_loading"
                            @click="download_table">
                            <i class="iconfont maps-icon-download"></i>
                        </el-button>
                    </maps-tooltip>

                </div>
            </header>
            <main class="table-main">
                <!-- <div class="list-empty"
                    v-if="total == 0">
                    <i class="iconfont maps-icon-nodata"></i>
                    <span>{{$t('lang.report_No_data_during_selected_date_range')}}</span>
                </div> -->
                <DetailTable ref="DetailTable"
                    v-loading="table_reset_loading"
                    :key="key_num"
                    :is_total="is_total"
                    :config="table_config"
                    :data="datail_data"
                    :total_data="total_data"
                    :maxHeight="600"
                    @update_list="update_detail_table"></DetailTable>

            </main>
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
        </section>
        <div class="to-top"
            :title="$t('lang.public_back_top')"
            v-if='showToTop'
            @click="toTop($event)">
            <i class="iconfont maps-icon-arrow-top"></i>
        </div>
        <!-- 自定义 -->
        <ConfigDrawer ref="ConfigDrawer"
            :title="$t('lang.report_Clients_Report')"
            type="client"
            :moduleList="title_module"
            :titleList="title_cinfig"
            :checkedList="title_checked"
            :special_key="special_title"
            :timeLine="filter_form.time_line"
            @update_table_config="update_table_config"
            @cancel_setting_config="cancel_setting_config"></ConfigDrawer>
        <!-- 全屏 -->
        <Fullscreen ref="Fullscreen"
            :title="$t('lang.report_Clients_Report_Detailed_data')"
            :time="`${filter_form.start_date} - ${filter_form.end_date}`">
            <div slot="table-box"
                class="fullscreen-table">
                <main>
                    <DetailTable ref="fullscreenTable"
                        :key="key_num+1"
                        :is_total="is_total"
                        :config="table_config"
                        :data="datail_data"
                        :total_data="total_data"
                        @update_list="update_detail_table"></DetailTable>
                </main>
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
            </div>
        </Fullscreen>
        <!-- 下载 -->
        <DownloadFile ref="DownloadFile"
            :module="$t('lang.report_Clients_Report')"
            @download_local="download_local"
            @download_offline="download_offline"></DownloadFile>
        <!-- 查看数据提示 -->
        <ReportPoint ref="ReportPoint"
            :dialogVisible="show_report_point"
            @close="got_it"></ReportPoint>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import ProportionRepoprt from "../components/proportion-report";
import TrendReport from "../components/trend-report";
import DetailTable from "../components/data-table";
import ConfigDrawer from "../components/config-drawer";
import TitleConfig from "../mixin/title-config";
import Fullscreen from "../components/fullscreen";
import DownloadFile from "../components/download-file";
import ReportPoint from "../components/report_point";

export default {
  components: { ProportionRepoprt, TrendReport, DetailTable, ConfigDrawer, Fullscreen, DownloadFile, ReportPoint },
  mixins: [TitleConfig],
  data() {
    return {
      download_loading: false,
      download_text: this.$t("lang.report_download_loading_text"),
      show_report: true,
      showToTop: false,
      throttleTimer: null,
      activeName: "proportion",
      //   过滤条件
      filter_form: {
        customer: [],
        platform: [],
        time_line: "1",
        start_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        end_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        time_type: "hour",
        order_by: "",
        order: "",
        page_size: "10",
        page: "1",
        filter: "1", //是否展示为0的数
      },
      date_list: [moment(new Date().getTime()).format("YYYY-MM-DD"), moment(new Date().getTime()).format("YYYY-MM-DD")],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: this.$datePickerShortcuts,
      },
      currentPage: 1,
      pagesize: 10,
      total: 0,
      customer_list: [],
      platform_list: [],
      failure_list: [], // 同步失败账号信息
      // 报表
      convertRate: [],
      //   详细数据
      table_time: "date",
      special_title: ["date", "client_name"], // 固定表头
      datail_data: [],
      total_data: [],
      // 表头配置参数
      tittle_param: {
        type: "client",
        time_line: "1",
      },
      show_year_data: false, // checkReport无数据
      // 无数据，不能下载
      disable_download_chart: false,
      download_local_loading: false,
    };
  },
  watch: {
    activeName(val) {
      this.show_report = true;
    },
  },
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id", "platform_config"]),
    ...mapState("permissions", ["client_Report_permission"]),
    ...mapState("report", ["show_report_point"]),
    activeNav() {
      const maps = {
        proportion: "ProportionRepoprt", //占比分析
        trend: "TrendReport", // 趋势分析
      };
      //   this.refresh();
      return maps[this.activeName];
    },
    set_report_height() {
      let style = "";
      if (this.show_report) {
        style = "height: 450px;display:block";
      } else {
        style = "height: 0;display:none";
      }
      return style;
    },
    set_failtext() {
      let text = "";
      if (this.failure_list.length) {
        text = this.$t("lang.sync_fail_point") + "<br><br>";
        this.failure_list.forEach((item) => {
          let item_content = item.name + " :<br>";
          item.children.forEach((child) => {
            item_content += child + "<br>";
          });
          text += item_content + "<br>";
        });
      } else {
        text = "";
      }
      return text;
    },
    set_all_data_active() {
      let result = {
        title: this.$t("lang.report_not_show_zero"),
        class: "not-zero",
      };
      if (this.filter_form.filter == "1") {
        result = {
          title: this.$t("lang.report_not_show_zero"),
          class: "not-zero",
        };
      } else {
        result = {
          title: this.$t("lang.report_show_zero"),
          class: "all-data",
        };
      }
      return result;
    },
  },
  methods: {
    ...mapActions(["updata_scrolltop"]),
    ...mapActions("report", ["fet_select_option", "update_show_report_point"]),
    // 提示
    got_it() {
      this.update_show_report_point(false);
    },
    // 报表
    check_tab() {
      this.$nextTick(() => {
        this.$refs.customer_chart.update_filter(this.show_year_data);
      });
      this.show_report = true;
    },
    toTop(event) {
      this.$refs.toTop.scrollTop = 0;
    },
    onScroll(event) {
      let top = event.srcElement.scrollTop;
      clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => {
        this.updata_scrolltop(top);
      }, 500);

      this.showToTop = top > 0;
    },
    chart_no_data(param) {
      this.disable_download_chart = param;
    },
    // 下载图片
    handle_download_chart() {
      this.$refs.customer_chart.download_pic();
    },
    // 下载报表Excel
    handle_download_excel() {
      this.$refs.customer_chart.download_excel();
    },
    date_change(param) {
      this.filter_form.start_date = param[0];
      this.filter_form.end_date = param[1];

      const start_time = moment(param[0]).startOf("day").format("x");
      const end_time = moment(param[1]).endOf("day").format("x");
      const times = end_time - start_time;
      let time_type = "hour";
      if (times <= 1000 * 60 * 60 * 24) {
        time_type = "hour";
      } else if (times > 1000 * 60 * 60 * 24 && times <= 1000 * 60 * 60 * 24 * 14) {
        time_type = "date";
      } else if (times > 1000 * 60 * 60 * 24 * 14 && times <= 1000 * 60 * 60 * 24 * 60) {
        time_type = "week";
      } else if (times > 1000 * 60 * 60 * 24 * 60 && times <= 1000 * 60 * 60 * 24 * 730) {
        time_type = "month";
      } else {
        time_type = "year";
      }
      this.filter_form.time_type = time_type;
      this.filter_change();
    },
    filter_change() {
      this.show_report = true;
      // this.$refs.customer_chart.update_filter();
      this.filter_form.page = 1;
      this.currentPage = 1;
      this.table_filter_change(true);
    },
    time_line_change() {
      this.tittle_param.time_line = this.filter_form.time_line;
      this.show_report = true;
      this.$refs.customer_chart.get_data_type_option();
      this.filter_form.page = 1;
      this.currentPage = 1;
      this.get_title_option_list("client_title");
    },
    customer_change() {
      this.get_select_option();

      this.platform_list = [];
      this.filter_form.platform = [];

      this.filter_change();
    },
    platform_change() {
      this.get_select_option();

      this.filter_change();
    },
    // 获取下拉框内容
    async get_select_option() {
      const param = {
        platform_id: this.filter_form.platform.join(),
        advertiser_id: "",
        landing_type: "",
        campaign_id: "",
        startdate: this.filter_form.start_date,
        startdate: this.filter_form.end_date,
      };
      const { platform_list, client_list, sync_failure } = await this.fet_select_option(param);
      this.platform_list = platform_list || [];
      this.customer_list = client_list || [];
      this.failure_list = this.format_fail(sync_failure) || [];
    },
    format_fail(obj) {
      let result = [];
      if (obj.length == 0) {
        result = [];
      } else {
        let keys = Object.keys(obj);
        keys.forEach((item) => {
          const param = {
            name: item,
            children: obj[item],
          };
          result.push(param);
        });
      }
      return result;
    },

    refresh() {
      this.filter_form = {
        customer: [],
        platform: [],
        start_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        end_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        time_type: "hour",
        time_line: 1,
        filter: "1",
      };
      this.tittle_param.time_line = "1";
      this.date_list = [moment(new Date().getTime()).format("YYYY-MM-DD"), moment(new Date().getTime()).format("YYYY-MM-DD")];
    },
    // 响应详细表格的配置
    table_config_setting() {
      this.$refs.ConfigDrawer.show();
    },
    // 切换是否展示数值0
    handle_show_data() {
      this.filter_form.filter = this.filter_form.filter == "1" ? "0" : "1";
      this.table_filter_change();
    },
    // 全屏查看
    fullscreen_show() {
      this.$refs.Fullscreen.show();
    },
    // 下载表格
    async download_table() {
      // 查询多少条数据
      // moment(this.filter_form.start_date).get('year')
      // 超过一年禁止下载，防止数据量过大
      const times = new Date(this.filter_form.end_date).getTime() - new Date(this.filter_form.start_date).getTime();
      const full_year = 1000 * 60 * 60 * 24 * 365;
      if (times > full_year) {
        this.$message({
          message: this.$t("lang.report_download_loading_forbidden"),
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }

      this.download_loading = true;
      const obj = {
        total: "1",
      };
      const param = Object.assign(this.format_filter(), obj);
      const url = "/report/advertiserexport";
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
      const url = "/report/advertiserexport";
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
      const url = "/report/advertiserexport";
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
    // 详细数据表格
    view_type_change() {
      this.filter_form.page = 1;
      // this.filter_form.page_size = 10;
      // this.pagesize = 10;
      this.currentPage = 1;
      this.table_filter_change();
    },
    update_detail_table(param) {
      // 表格排序
      this.filter_form.order_by = param.order_by || "";
      this.filter_form.order = param.order || "";
      this.table_filter_change();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.table_filter_change();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.filter_form.page = val;
      this.table_filter_change();
    },
    // 分日、分时查看。查询详细数据的入口
    async table_filter_change(is_report = false) {
      // 检查数据
      const check_report_url = "/report/checkreportdate";
      const chech_report_data = await this.fetchCore(check_report_url, this.format_filter(), false);
      if (chech_report_data) {
        this.show_year_data = true;
        this.get_detail_table_data();
        if (is_report) {
          this.$refs.customer_chart.update_filter();
        }
      } else {
        this.show_year_data = false;
        this.$refs.customer_chart.update_filter(false);
        this.datail_data = [];
        this.total_data = [];
        this.total = 0;
      }
    },
    format_filter() {
      const param = {
        team_id: this.active_team_id,
        client_id: this.filter_form.customer.join(),
        platform: this.filter_form.platform.join(),
        startdate: this.filter_form.start_date,
        enddate: this.filter_form.end_date,
        view_type: this.table_time,
        page_size: this.filter_form.page_size,
        page: this.filter_form.page,
        order: this.filter_form.order,
        order_by: this.filter_form.order_by,
        title: this.title_key,
        time_line: this.filter_form.time_line,
        filter: this.filter_form.filter,
        type: "1", //fieldcheck接口用
      };
      return param;
    },
    async get_detail_table_data() {
      //判断微信数据
      const check_url = "/report/fieldcheck";
      const data = await this.fetchCore(check_url, this.format_filter(), false);
      if (data) {
        if (data.msg) {
          this.$message({
            message: data.msg,
            duration: 5000,
            offset: 3,
            type: "error",
          });
        }
        if (data.key) {
          this.convertRate = data.key || [];
        } else {
          this.convertRate = [];
        }
      } else {
        this.convertRate = [];
      }

      const url = "/report/advertiserlist";
      const res = await this.fetchCore(url, this.format_filter(), true);
      if (res) {
        this.datail_data = res.list || [];
        if (res.total != 0) {
          this.total_data = [
            Object.assign(res.totallist || {}, { date: `${this.$t("lang.public_total")}（${res.total}）${this.$t("lang.report_nums")}` }),
          ];
        } else {
          this.total_data = [];
        }
        this.total = Number(res.total);
      } else {
        this.datail_data = [];
        this.total_data = [];
        this.total = 0;
      }
    },

    init() {
      this.get_select_option();
      this.get_title_option_list("client_title");
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
.customer-report-container {
  .el-carousel__indicator--vertical {
    padding: 0;
  }
}
</style>
<style lang='scss' scoped>
@import "~@/assets/css/fullscreen.css";
.customer-report-container {
  display: flex;
  flex-flow: column;
  padding: 0;
  margin: 20px 10px 0 10px;
  overflow-y: auto;

  .to-top {
    position: fixed;
    right: 20px;
    bottom: 15px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #9c9ea1;
    z-index: 1;
    text-align: center;
    line-height: 32px;
    color: #fff;
    cursor: pointer;
  }
  .header {
    padding: 10px 20px;
    & > div:nth-child(1) {
      display: flex;
      align-items: center;
      span:nth-child(1),
      i {
        font-size: 16px;
        line-height: 24px;
        color: #666;
      }
      span.update-time {
        display: inline-block;
        width: 100%;
        text-align: center;
        font-size: 12px;
        line-height: 24px;
        color: #999;
        // margin: 0 10px;
      }
    }
    .report-filter {
      padding: 20px 0 5px 0;
    }
  }
  .table-section {
    // min-height: 400px;
    // height: auto;
    flex: 1;
  }
  section {
    background: #fff;
    margin-bottom: 10px;
    header {
      padding: 0 20px;
      height: 40px;
      border-bottom: 1px solid #dcdfe6;
      font-size: 16px;
      color: #666;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        display: flex;
        .maps-icon-down {
          display: block;
          transform: rotate(180deg);
        }
        .not-zero {
          background-color: #ecf5ff;
          border-color: #0bb3b3;
          i {
            color: #0bb3b3;
          }
        }
        .all-data {
          background-color: #fff;
          border-color: #dcdfe6;
          i {
            color: #606266;
          }
        }
      }
    }
    .chart-main {
      height: 500px;
      transition: all 0.5s;
      overflow: hidden;
    }
    .table-main {
      padding: 20px 20px 0 20px;
      height: calc(100% - 111px);
      min-height: 400px;
      position: relative;
      .list-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        // margin: 20px auto;
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
        span {
          margin-top: 20px;
          color: #333;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    footer {
      text-align: right;
    }
  }
}
</style>