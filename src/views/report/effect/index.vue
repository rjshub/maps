<template>
    <div class="effect-report-container"
        ref="toTop"
        v-loading.fullscreen="isLoading"
        :element-loading-text="download_text"
        @scroll="onScroll($event)">
        <section ref="effect_header"
            class="header">
            <div>
                <span>{{$t('lang.report_Effectiveness_Report')}}</span>
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
                <filter-select v-model="filter_form.platform"
                    :prop="{value: 'id', label: `name`}"
                    :options="platform_list"
                    filterable
                    multiple
                    @change="platform_change"
                    :placeholder="$t('lang.public_select_platform_placeholder')"></filter-select>

                <filter-select v-model="filter_form.account"
                    :prop="{value: 'id', label: `media_advertiser_name`, label_id: 'media_advertiser_id'}"
                    :options="account_list"
                    :showId="true"
                    filterable
                    multiple
                    @change="account_change"
                    :placeholder="$t('lang.public_select_account_placeholder')"></filter-select>

                <filter-select v-model="filter_form.landing_type"
                    :prop="{value: 'code', label: `name_${language}`}"
                    :options="landing_type_list"
                    :showId="false"
                    :loadMore="false"
                    filterable
                    multiple
                    @change="landing_type_change"
                    :placeholder="$t('lang.public_select_objectives_placeholder')"></filter-select>
                <!-- v-el-select-loadmore="loadMore_campaign"
                    @remoteMethod="campaign_remoteMethod" -->
                <filter-select v-model="filter_form.campaign"
                    :prop="{value: 'id', label: `campaign_name`, label_id: 'media_campaign_id'}"
                    :options="campaign_list"
                    :showId="true"
                    :loadMore="true"
                    filterable
                    multiple
                    @change="campaign_change"
                    placeholder="Campaign"></filter-select>

                <filter-select v-model="filter_form.ad"
                    v-if="show_ad_select"
                    :prop="{value: 'id', label: `ad_name`, label_id: 'media_ad_id'}"
                    :options="ad_list"
                    :showId="true"
                    :loadMore="true"
                    filterable
                    multiple
                    @change="ad_change"
                    placeholder="Ad"></filter-select>

                <el-date-picker v-model="date_list"
                    style="width:205px;margin: 0 10px 5px 0"
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
                <el-input size="mini"
                    style="width:200px;margin-bottom: 5px"
                    :placeholder="$t('lang.report_effect_search')"
                    class="filter-input"
                    @keyup.enter.native="word_change"
                    v-model="filter_form.word">
                    <div slot="prefix"
                        style="cursor: pointer">
                        <i class="iconfont maps-icon-search"
                            @click="word_change"></i>
                    </div>
                </el-input>
            </div>
        </section>
        <!-- 详细数据 -->
        <section ref="effect_table"
            class="main">
            <header>
                <span>{{$t('lang.report_Detailed_data')}}</span>
                <div class="btn">
                    <!-- 分日、分时 -->
                    <el-select v-model="filter_form.time_type"
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
                    <!-- 导出表格 -->
                    <maps-tooltip :text="$t('lang.report_Export_as_Excel')">
                        <el-button size="mini"
                            :loading="download_loading"
                            :disabled="!datail_data.length || effect_Report_permission == '1'"
                            @click="download_table">
                            <i class="iconfont maps-icon-download"></i>
                        </el-button>
                    </maps-tooltip>

                </div>
            </header>
            <main class="table-main"
                ref="table_main">
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
                    :maxHeight="table_height"
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
        <!-- 自定义列 -->
        <ConfigDrawer ref="ConfigDrawer"
            type="effect"
            :title="$t('lang.report_Effectiveness_Report')"
            :moduleList="title_module"
            :titleList="title_cinfig"
            :checkedList="title_checked"
            :special_key="special_title"
            :timeLine="filter_form.time_line"
            @update_table_config="update_table_config"
            @cancel_setting_config="cancel_setting_config"></ConfigDrawer>
        <!-- 全屏 -->
        <Fullscreen ref="Fullscreen"
            :title="$t('lang.report_Effectiveness_Report_Detailed_data')"
            :time="`${filter_form.start_date} - ${filter_form.end_date}`">
            <div slot="table-box"
                class="fullscreen-table">
                <main>
                    <DetailTable ref="fullscreenTable"
                        :key="key_num+Math.random()"
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
            :module="$t('lang.report_Effectiveness_Report')"
            @download_local="download_local"
            @download_offline="download_offline"></DownloadFile>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment";
import ProportionRepoprt from "../components/proportion-report";
import TrendReport from "../components/trend-report";
import DetailTable from "../components/data-table";
import ConfigDrawer from "../components/config-drawer";
import TitleConfig from "../mixin/title-config";
import Fullscreen from "../components/fullscreen";
import DownloadFile from "../components/download-file";

export default {
  components: { ProportionRepoprt, TrendReport, DetailTable, ConfigDrawer, Fullscreen, DownloadFile },
  mixins: [TitleConfig],
  data() {
    return {
      isLoading: false,
      showToTop: false,
      throttleTimer: null,
      // 过滤条件
      filter_form: {
        platform: [],
        account: [],
        landing_type: [],
        campaign: [],
        ad: [],
        time_line: "1",
        start_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        end_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        time_type: "date",
        page_size: "10",
        page: "1",
        order_by: "",
        order: "",
        word: "",
        filter: "1", // 是否展示数值为0的数据
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
      // 下拉框
      platform_list: [], // 平台
      account_list: [], //账号
      landing_type_list: [], // 推广目的
      campaign_list: [], //campaign
      ad_list: [], // ad
      failure_list: [], // 同步失败账号信息
      //   详细数据
      table_time: "day",
      special_title: ["date", "platform", "campaign_name", "media_advertiser_name"], // 固定表头
      datail_data: [],
      total_data: [],
      table_height: 600,
      // 表头配置参数
      tittle_param: {
        type: "effect",
        time_line: "1",
      },
      download_loading: false,
      download_text: "",
      // range_ad_Number: 10,
      // range_campaign_Number: 10,
    };
  },
  watch: {
    show_ad_select(val) {
      if (!val) {
        this.filter_form.ad = [];
      }
    },
  },
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id", "platform_config"]),
    ...mapState("permissions", ["effect_Report_permission"]),
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
    ...mapActions("report", ["fet_select_option"]),

    set_height() {
      if (this.$refs.table_main.offsetHeight > 600) {
        this.table_height = this.$refs.table_main.offsetHeight;
      } else {
        this.table_height = 600;
      }
    },

    toTop(event) {
      this.$refs.toTop.scrollTop = 0;
    },
    // 滚动隐藏筛选条件
    scrolltop_change(scrollTop) {
      const header = this.$refs.effect_header;
      const body = this.$refs.effect_table;
      if (scrollTop > 0) {
        header.style.height = 0;
        header.style.paddingTop = 0;
        header.style.paddingBottom = 0;
        header.style.margin = 0;
        body.style.height = "calc(100% + 41px)";
      } else {
        header.style.height = "auto";
        header.style.paddingTop = "10px";
        header.style.paddingBottom = "10px";
        header.style.marginBottom = "10px";
        body.style.height = "calc(100% - 116px);";
      }
      this.set_height();
    },
    onScroll(event) {
      let top = event.srcElement.scrollTop;
      this.scrolltop_change(top);
      clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => {
        this.updata_scrolltop(top);
      }, 500);
      this.showToTop = top > 0;
    },
    // 筛选
    time_line_change() {
      this.tittle_param.time_line = this.filter_form.time_line;
      this.filter_form.page = 1;
      this.currentPage = 1;
      this.get_title_option_list("effect_title");
    },
    date_change(param) {
      this.filter_form.start_date = param[0];
      this.filter_form.end_date = param[1];
      this.get_select_option();
      this.table_filter_change();
    },
    table_filter_change(page = 1) {
      if (page.toString() != "true") {
        this.filter_form.page = page;
        this.currentPage = page;
      }
      // this.get_select_option();
      this.get_detail_table_data();
    },
    async platform_change() {
      this.landing_type_list = [];
      this.campaign_list = [];
      this.ad_list = [];
      this.filter_form.account = [];
      this.filter_form.landing_type = [];
      this.filter_form.campaign = [];
      this.filter_form.ad = [];

      this.get_select_option();
      this.table_filter_change();
    },
    async account_change() {
      this.campaign_list = [];
      this.ad_list = [];
      this.filter_form.landing_type = [];
      this.filter_form.campaign = [];
      this.filter_form.ad = [];

      this.get_select_option();
      this.table_filter_change();
    },
    async landing_type_change() {
      this.ad_list = [];
      this.filter_form.campaign = [];
      this.filter_form.ad = [];

      this.get_select_option();
      this.table_filter_change();
    },
    async campaign_change() {
      this.filter_form.ad = [];

      this.get_select_option();
      this.table_filter_change();
    },
    ad_change() {
      this.table_filter_change();
    },
    view_type_change() {
      this.table_filter_change();
    },
    word_change() {
      this.get_select_option();
      this.table_filter_change();
    },
    // 获取下拉框内容
    async get_select_option() {
      const param = {
        platform_id: this.filter_form.platform.join(),
        advertiser_id: this.filter_form.account.join(),
        landing_type: this.filter_form.landing_type.join(),
        campaign_id: this.filter_form.campaign.join(),
        startdate: this.filter_form.start_date,
        enddate: this.filter_form.end_date,
        word: this.filter_form.word,
        view_type: this.filter_form.time_type,
        title: this.title_key,
      };
      const { platform_list, advertiser_list, promotionpurpose_list, campaign_list, ad_list, sync_failure } = await this.fet_select_option(param);
      this.platform_list = platform_list || [];
      this.account_list = advertiser_list || [];
      this.landing_type_list = promotionpurpose_list || [];
      this.campaign_list = campaign_list || [];
      this.ad_list = ad_list || [];
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
        account: [],
        platform: [],
        landing_type: [],
        campaign: [],
        ad: [],
        time_line: 1,
        start_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        end_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        time_type: "hour",
        page_size: "10",
        page: "1",
        order_by: "",
        order: "",
        word: "",
        filter: "1",
      };
      this.tittle_param.time_line = "1";
      this.date_list = [moment(new Date().getTime()).format("YYYY-MM-DD"), moment(new Date().getTime()).format("YYYY-MM-DD")];
    },
    // 响应详细表格的配置
    table_config_setting() {
      this.$refs.ConfigDrawer.show();
    },
    // 全屏查看
    fullscreen_show() {
      this.$refs.Fullscreen.show();
    },
    // 下载表格
    async download_table() {
      // 查询多少条数据
      // 超过一年禁止下载
      // 超过90天提示数据过大
      const times = new Date(this.filter_form.end_date).getTime() - new Date(this.filter_form.start_date).getTime();
      const full_year = 1000 * 60 * 60 * 24 * 365;
      const three_month = 1000 * 60 * 60 * 24 * 90; //90天

      if (times > full_year) {
        this.$message({
          message: this.$t("lang.report_download_loading_forbidden"),
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      } else if (times > three_month) {
        this.$refs.DownloadFile.show(true);
      } else {
        this.download_text = this.$t("lang.report_download_loading_text");
        this.isLoading = true;
        const obj = {
          total: "1",
        };
        const param = Object.assign(this.format_filter(), obj);
        const url = "/report/effectexport";
        const data = await this.fetchCore(url, param, false);
        if (data) {
          this.isLoading = false;
          this.download_text = "";
          const more_than_5000 = data.total > 5000;
          this.$refs.DownloadFile.show(more_than_5000);
        } else {
          this.isLoading = false;
          this.download_text = "";
        }
      }
    },
    // 实时下载（本地）
    async download_local(param) {
      const all_param = this.set_param(param);
      const url = "/report/effectexport";
      this.download_loading = true;
      this.$message({
        message: this.$t("lang.report_download_table_local_excel"),
        duration: 5000,
        offset: 3,
        type: "success",
      });
      const data = await this.fetchCore(url, all_param, false);
      if (data) {
        this.$downloadFile(data);
        this.download_loading = false;
      }
    },
    // 离线下载
    async download_offline(param) {
      const all_param = this.set_param(param);
      const url = "/report/effectexport";
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
    // 切换是否展示数值0
    handle_show_data() {
      this.filter_form.filter = this.filter_form.filter == "1" ? "0" : "1";
      this.table_filter_change();
    },
    // 详细数据表格
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
      this.table_filter_change(val);
    },
    // 查询详细数据的入口
    format_filter() {
      if (!this.show_ad_select) {
        this.filter_form.ad = [];
      }
      let param = {
        team_id: this.active_team_id,
        campaign_id: this.filter_form.campaign.join(),
        advertiser_id: this.filter_form.account.join(),
        platform: this.filter_form.platform.join(),
        startdate: this.filter_form.start_date,
        enddate: this.filter_form.end_date,
        landing_type: this.filter_form.landing_type.join(),
        order: this.filter_form.order,
        order_by: this.filter_form.order_by,
        view_type: this.filter_form.time_type,
        ad_id: this.filter_form.ad.join(),
        title: this.title_key,
        page_size: this.filter_form.page_size,
        page: this.filter_form.page,
        time_line: this.filter_form.time_line,
        word: this.filter_form.word,
        filter: this.filter_form.filter,
        type: "2",
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
      }

      const url = "/report/effectlist";
      const res = await this.fetchCore(url, this.format_filter(), true);
      if (res) {
        this.datail_data = res.list;
        if (res.total != 0) {
          this.total_data = [Object.assign(res.totallist, { date: `${this.$t("lang.public_total")}（${res.total}）${this.$t("lang.report_nums")}` })];
        } else {
          this.total_data = [];
        }

        this.total = res.total;
      } else {
        this.datail_data = [];
        this.total_data = [];
        this.total = 0;
      }
    },
    init() {
      this.get_select_option();
      this.get_title_option_list("effect_title");
    },
  },
  mounted() {
    this.init();
    this.set_height();
  },
};
</script>
<style lang="scss">
.effect-report-container {
  .multiple-select {
    margin-bottom: 5px;
  }
  .el-carousel__indicator--vertical {
    padding: 0;
  }
}
</style>
<style lang='scss' scoped>
@import "~@/assets/css/fullscreen.css";
.effect-report-container {
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
    margin-bottom: 10px;
    transition: all 0.5s;
    overflow: hidden;
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
      display: flex;
      flex-wrap: wrap;
    }
  }
  .main {
    height: calc(100% - 116px);
  }
  section {
    background: #fff;
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
    main {
      // height: calc(100% - 116px);
      transition: all 0.5s;
      overflow: hidden;
    }
    .table-main {
      height: calc(100% - 111px);
      padding: 20px 20px 0 20px;
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