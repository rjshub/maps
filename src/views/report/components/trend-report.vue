<template>
    <div class="trend-container"
        v-loading="isLoading">
        <div class="report-filter">
            <div class="select-container">
                <el-select v-model="data_type_1"
                    style="width: 200px"
                    :placeholder="$t('lang.report_data_type')"
                    size="mini"
                    filterable
                    @change="data_type_1_change">
                    <el-option v-for="item in data_type_list"
                        v-show="item.name !== data_type_2"
                        :key="item.name"
                        :disabled="forbidden_convert_rate && forbidden_keys.includes(item.name)"
                        :label="item[language]"
                        :value="item.name"></el-option>
                </el-select>
                <el-checkbox v-model="contrast"
                    style="margin: 0 10px">{{$t('lang.report_Compare')}}</el-checkbox>
                <el-select v-model="data_type_2"
                    v-if="contrast"
                    style="width: 200px"
                    :placeholder="$t('lang.report_Compare')"
                    size="mini"
                    filterable
                    @change="data_type_2_change">
                    <el-option v-for="item in data_type_list"
                        v-show="item.name !== data_type_1"
                        :key="item.name"
                        :disabled="forbidden_convert_rate && forbidden_keys.includes(item.name)"
                        :label="item[language]"
                        :value="item.name"></el-option>
                </el-select>
            </div>
            <div class="select-container">
                <el-radio-group v-model="filter.time_type"
                    @change="view_type_change">
                    <maps-tooltip :text="set_forbidden_hour? $t('lang.report_forbidden_seven'):''">
                        <el-radio-button label="hour"
                            :disabled="set_forbidden_hour">{{$t('lang.report_hour')}}</el-radio-button>
                    </maps-tooltip>
                    <el-radio-button label="date">{{$t('lang.report_day')}}</el-radio-button>
                    <el-radio-button label="week">{{$t('lang.report_week')}}</el-radio-button>
                    <el-radio-button label="month">{{$t('lang.report_month')}}</el-radio-button>
                    <el-radio-button label="year">{{$t('lang.report_year')}}</el-radio-button>
                </el-radio-group>
            </div>
        </div>

        <main>
            <div v-if="empty_data">
                <Empty></Empty>
            </div>
            <div v-else>
                <MapsEcharts ref="trend_echarts"
                    width="100%"
                    :key="chart_key"
                    :config="trend_config"></MapsEcharts>
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FileSaver from "file-saver";
import fetch from "@/services/fetch";
import MapsEcharts from "./maps-echarts";
import colors from "@/assets/chart/color-config";
import $ from "jquery";
import Empty from "./broken-line-original";
import moment from "moment";

export default {
  components: { MapsEcharts, Empty },
  props: {
    filter: {
      type: Object,
    },
    convertRate: {
      tytpe: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      isLoading: false,
      chart_key: 0,
      contrast: false, //对比
      data_type_list: [],
      data_type_1: "cost",
      data_type_1_label: "消耗",
      data_type_1_total: [],
      data_type_2: "",
      data_type_2_label: "",
      data_type_2_total: [],
      trend_config: {},
      xAsix_list: [],
      customer_list: [],
      echart_1_series: [], //左侧数据
      echart_2_series: [], //右侧对比项数据
      empty_data: false,
      empty_contrast_data: false,
      date_zoom_end: 50,
      display_keys: [],
      forbidden_keys: [],
      forbidden_convert_rate: true,
      show_year_data: true,
      // 展示平均值
      Average_keys: ["ctr", "convert_rate", "deep_convert_rate", "convert_rate_imp", "deep_convert_rate_imp", "avg_show_cost", "avg_click_cost"],
    };
  },
  watch: {
    contrast(val) {
      if (!val) {
        this.data_type_2 = "";
        this.echart_2_series = [];
        this.set_trend_config();
      }
    },
    user_nav() {
      this.chart_key++;
      this.set_trend_config();
    },
    display_keys: {
      handler: function (val) {
        this.forbidden_keys = val.concat(this.convertRate) || [];
        this.check_forbidden();
      },
    },
    convertRate: {
      handler: function (val) {
        this.forbidden_keys = val.concat(this.display_keys) || [];
        this.check_forbidden();
      },
    },
  },
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("user", ["language", "user_nav"]),
    ...mapState("report", ["special_target"]),
    set_forbidden_hour() {
      let state = false;
      const startdate = new Date(this.filter.start_date).getTime();
      const enddate = new Date(this.filter.end_date).getTime();
      const seven = 1000 * 60 * 60 * 24 * 7;
      if (enddate - startdate > seven) {
        state = true;
      } else {
        state = false;
      }
      return state;
    },
  },
  methods: {
    // 判断要禁用的指标
    check_forbidden() {
      if (this.forbidden_keys.length > 0) {
        this.forbidden_convert_rate = true;
        if (!this.contrast) {
          if (this.forbidden_keys.includes(this.data_type_1)) {
            this.data_type_1 = this.data_type_list[0].name;
            this.data_type_1_label = this.data_type_list[0][this.language];
            this.data_type_1_total = [];
            this.get_data();
          }
        } else {
          if (this.data_type_2 != "") {
            if (this.forbidden_keys.includes(this.data_type_1)) {
              let result = [];
              this.data_type_list.forEach((item) => {
                if (item.name != this.data_type_2 && !this.forbidden_keys.includes(item.name)) {
                  result.push(item);
                }
              });

              this.data_type_1 = result[0].name;
              this.data_type_1_label = result[0][this.language];
              this.data_type_1_total = [];
              this.get_data();
            }

            if (this.forbidden_keys.includes(this.data_type_2)) {
              this.contrast = false;
              this.data_type_2 = "";
              this.data_type_2_label = "";
              this.data_type_2_total = [];
              this.get_data();
            }
          } else {
            if (this.forbidden_keys.includes(this.data_type_1)) {
              this.data_type_1 = this.data_type_list[0].name;
              this.data_type_1_label = this.data_type_list[0][this.language];
              this.data_type_1_total = [];
              this.get_data();
            }
          }
        }
      } else {
        this.forbidden_convert_rate = false;
      }
    },
    // 下载图片
    download_pic() {
      if (!this.empty_data || (this.empty_data && !this.empty_contrast_data)) {
        const YMD = moment(new Date().getTime()).format("YYYYMMDD");
        const HM = moment(new Date().getTime()).format("HHmm");
        const content = this.$refs.trend_echarts.download();
        const title = `${this.$t("lang.report_Trend_Chart_Client_Report")}_${YMD}_${HM}.png`;
        FileSaver.saveAs(content, title);
      }
    },
    // 下载Excel
    async download_excel() {
      const param = {
        team_id: this.active_team_id,
        client_id: this.filter.customer.join(),
        platform: this.filter.platform.join(),
        startdate: this.filter.start_date,
        enddate: this.filter.end_date,
        item1: this.data_type_1,
        itemTitle1: this.data_type_1_label,
        item2: this.data_type_2,
        itemTitle2: this.data_type_2_label,
        timetype: this.filter.time_type,
        time_line: this.filter.time_line,
      };
      const url = "/report/trendexport";
      const res = await this.fetchCore(url, param, false);
      if (res) {
        this.$downloadFile(res);
      }
    },
    // 获取数据类型
    async get_data_type_option() {
      const url = "/report/chartSelectlist";
      const data = await this.fetchCore(url, { time_line: this.filter.time_line }, false);
      const set_data = (int) => {
        if (this.special_target.includes(this[`data_type_${int}`])) {
          const index = this.data_type_list.findIndex((obj) => {
            return obj.map_name == this[`data_type_${int}`];
          });
          if (index >= 0) {
            this[`data_type_${int}`] = this.data_type_list[index].name;
            this[`data_type_${int}_label`] = this.data_type_list[index][this.language];
          }
        }
      };

      if (data) {
        if (data.hasOwnProperty("trendTitleList")) {
          this.data_type_list = data.trendTitleList;
          if (!this.contrast) {
            if (this.data_type_1 && this.data_type_1_label) {
              set_data("1");
            } else {
              this.data_type_1 = this.data_type_list[0].name;
              this.data_type_1_label = this.data_type_list[0][this.language];
            }
          } else {
            if (this.data_type_2 && this.data_type_2_label) {
              set_data("1");

              set_data("2");
            } else {
              set_data("1");
              this.contrast = false;
            }
          }
          // this.get_data();
        }
      }
    },
    view_type_change() {
      this.get_data();
    },
    update_filter(param = true) {
      this.show_year_data = param;
      if (param) {
        this.get_data();
      } else {
        this.empty_data = true;
        this.$emit("noData", this.empty_data);
      }
    },
    get_data() {
      this.data_type_1_change();
      if (this.contrast && this.data_type_2 != "") {
        this.data_type_2_change();
      }
    },
    set_config(name) {
      let label = "";
      let config = {};
      const index = this.data_type_list.findIndex((obj) => {
        return obj.name === name;
      });
      if (index >= 0) {
        // label = this.data_type_list[index][this.language];
        config = this.data_type_list[index];
      }
      return config;
    },
    data_type_1_change() {
      this.data_type_1_label = this.set_config(this.data_type_1)[this.language];
      this.get_trend_data(this.data_type_1, "line", 0);
    },
    data_type_2_change() {
      this.data_type_2_label = this.set_config(this.data_type_2)[this.language];
      this.get_trend_data(this.data_type_2, "bar", 1);
    },
    async get_trend_data(data_type, chart_type, Y_index) {
      if (!this.show_year_data) {
        return false;
      }

      let data = [];

      const url = "/report/trend";
      const param = {
        team_id: this.active_team_id,
        client_id: this.filter.customer.join(),
        platform: this.filter.platform.join(),
        startdate: this.filter.start_date,
        enddate: this.filter.end_date,
        timetype: this.filter.time_type,
        item: data_type,
        time_line: this.filter.time_line,
      };
      const res = await this.fetchCore(url, param, true);
      if (res && res.hasOwnProperty("data_list")) {
        this.empty_data = false;
        this.empty_contrast_data = false;
        let result = [];
        this.display_keys = res.displayKeys || [];
        if (res === null && this.data_type_2 === "") {
          this.empty_data = true;
          return false;
        }
        data = res;
        if (data.customer.length) {
          this.customer_list = data.customer;
          data.customer.forEach((item, index) => {
            result.push({
              name: item,
              type: chart_type,
              yAxisIndex: Y_index,
              data: data.data_list[index],
              top: 50,
              barGap: 0,
            });
          });
        }
        this.xAsix_list = data.time_list;
        if (this.xAsix_list.length) {
          const length = this.xAsix_list.length;
          this.set_date_zoom(length);
        }
        if (chart_type === "line") {
          this.echart_1_series = result;
          this.data_type_1_total = data.totalList;
          this.set_trend_config();
        } else {
          this.echart_2_series = result;
          this.data_type_2_total = data.totalList;
          this.set_trend_config();
        }
      } else {
        this.display_keys = [];
        if (Y_index == "0" && this.data_type_2 === "") {
          this.empty_data = true;
          this.$emit("noData", this.empty_data);
        }
        if (Y_index == "0" && this.data_type_2 != "") {
          this.empty_data = true;
        }
        if (Y_index == "1") {
          this.empty_contrast_data = true;
          if (this.empty_data) {
            this.$emit("noData", this.empty_data);
          }
        }
      }
    },
    set_date_zoom(length) {
      // 1000  1000  1
      let k = 2.6;
      const format = (size) => {
        if (length <= size) {
          this.date_zoom_end = 100;
        } else {
          this.date_zoom_end = Math.floor(100 / Math.ceil(length / size));
          // this.date_zoom_end = Math.floor(Math.ceil(1000 / length))/k;
        }
      };
      const time = this.filter.time_type;
      if (time == "hour") {
        format(24);
      } else if (time == "date") {
        format(14);
      } else if (time == "week") {
        format(8);
      } else if (time == "month") {
        format(12);
      } else if (time == "year") {
        format(6);
      }
    },
    set_trend_config() {
      const THIS = this;
      this.trend_config = {
        color: colors.ten,
        tooltip: {
          trigger: "axis",
          confine: true,
          //   backgroundColor: 'rgba(255,255,255,0.9)',
          //   textStyle: {
          //       color: '#000',
          //   },
          position: function (point, params, dom, rect, size) {
            return [point[0], "10%"];
          },
          axisPointer: {
            type: "shadow",
          },
          formatter: function (param, ticket) {
            let result = "";
            let date = "";
            THIS.customer_list.forEach((item) => {
              let str_1 = "";
              let str_2 = "";
              let dom = "";
              let domAfter = "";
              let markerAfter = "";
              param.findIndex((obj) => {
                if (obj.seriesName === item) {
                  date = obj.axisValueLabel;
                  dom = $(THIS.stringToDom(obj.marker)).find("span");
                  domAfter = dom.css("border-radius", 0);
                  markerAfter = THIS.domToString(domAfter);
                  if (obj.seriesType === "line") {
                    // str_1 = `${THIS.data_type_1}: ${obj.data || "--"}`;
                    str_1 = `${THIS.data_type_1_label}: ${
                      THIS.$formatNumber(obj.data, THIS.set_config(THIS.data_type_1).decimal, THIS.set_config(THIS.data_type_1).unit, ",", ".") ||
                      "--"
                    }`;
                  }
                  if (obj.seriesType === "bar") {
                    str_2 = `${THIS.data_type_2_label}: ${
                      THIS.$formatNumber(obj.data, THIS.set_config(THIS.data_type_2).decimal, THIS.set_config(THIS.data_type_2).unit, ",", ".") ||
                      "--"
                    }`;
                  }
                }
              });
              // public_Average
              result += `${markerAfter} 
              ${item}:<br><span style="margin-left: 20px"></span> ${str_1}${THIS.contrast ? "，" : ""}${str_2}<br>`;
            });

            const total_1 = `<span style="margin-left: 20px"></span> ${THIS.data_type_1_label} ${
              THIS.Average_keys.includes(THIS.data_type_1) ? THIS.$t("lang.public_Average") : THIS.$t("lang.public_total")
            }：${
              THIS.$formatNumber(
                THIS.data_type_1_total[date],
                THIS.set_config(THIS.data_type_1).decimal,
                THIS.set_config(THIS.data_type_1).unit,
                ",",
                "."
              ) || "--"
            }${THIS.contrast ? "" : "<br>"}`;
            const total_2 = THIS.contrast
              ? `<span style="margin-left: 20px"></span> ${THIS.data_type_2_label} ${
                  THIS.Average_keys.includes(THIS.data_type_2) ? THIS.$t("lang.public_Average") : THIS.$t("lang.public_total")
                }：${
                  THIS.$formatNumber(
                    THIS.data_type_2_total[date],
                    THIS.set_config(THIS.data_type_2).decimal,
                    THIS.set_config(THIS.data_type_2).unit,
                    ",",
                    "."
                  ) || "--"
                }<br>`
              : "";

            return `${date}<br>${total_1}${total_2}${result}`;
          },
        },
        calculable: true,
        legend: {
          type: "scroll",
          orient: "vertical",
          // bottom: "bottom",
          right: "right",
          top: 20,
          bottom: 20,
          itemWidth: 20,
          itemHeight: 5,
          data: this.customer_list,
        },
        grid: {
          top: "12%",
          left: "1%",
          right: "12%",
          bottom: 30, //图标到底部的距离
          containLabel: true,
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            zoomLock: false,
            // minSpan: 3,
            end: this.date_zoom_end,
          },
          {
            height: 20,
            bottom: 5,
            show: true,
            start: 0,
            end: 100,
            zoomLock: false,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: this.xAsix_list,
            axisTick: {
              alignWithLabel: true,
            },
            nameTextStyle: {
              color: "rgba(244, 17, 17, 1)",
            },
            axisLabel: {
              interval: 0, // 横坐标取值的间隔 https://echarts.apache.org/zh/option.html#xAxis.axisLabel
              margin: 15, // 横坐标值到X轴的距离
              rotate: 45,
              formatter: function (value) {
                var ret = ""; //拼接加\n返回的类目项
                var maxLength = 11; //每项显示文字个数
                var valLength = value.length; //X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1) {
                  //如果类目项的文字大于5,
                  for (var i = 0; i < rowN; i++) {
                    var temp = ""; //每次截取的字符串
                    var start = i * maxLength; //开始截取的位置
                    var end = start + maxLength; //结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                } else {
                  return value;
                }
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: this.data_type_1_label,
            // nameGap: 40
            nameLocation: "end",
            position: "left",
            nameTextStyle: {
              align: "left",
            },
          },
          THIS.contrast
            ? {
                type: "value",
                name: this.data_type_2_label,
                nameLocation: "end",
                position: "right",
                nameTextStyle: {
                  align: "right",
                },
                splitLine: {
                  lineStyle: {
                    type: "dashed",
                  },
                },
              }
            : {
                axisLine: {
                  show: false,
                },
              },
        ],
        series: [...this.echart_1_series, ...this.echart_2_series],
      };
      this.$nextTick(() => {
        this.$refs.trend_echarts.setOption(this.trend_config);
      });
    },
    stringToDom(str) {
      let dom = document.createElement("div");
      dom.innerHTML = str;
      return dom;
    },

    domToString(dom) {
      return dom[0].outerHTML;
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
    init() {
      this.get_data_type_option();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.trend-container {
  padding: 10px 20px;
  height: calc(100% - 20px);
  .report-filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  main {
    height: calc(100% - 42px);
    padding-top: 10px;
    & > div {
      height: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>