<template>
    <div class="proportion-container"
        v-loading="isLoading">
        <div class="select-container">
            <el-select v-model="data_type"
                style="width: 200px"
                :placeholder="$t('lang.report_data_type')"
                size="mini"
                filterable
                @change="data_type_change">
                <el-option v-for="item in data_type_list"
                    :key="item.name"
                    :disabled="forbidden_convert_rate && display_keys.includes(item.name)"
                    :label="item[language]"
                    :value="item.name"></el-option>
            </el-select>
        </div>
        <main>
            <div v-if="customer_empty">
                <Empty></Empty>
            </div>
            <div v-else>
                <MapsEcharts :config="customer_config"
                    :key="'client'+num"
                    @click_event="click_event"
                    ref="customer_echarts"></MapsEcharts>
            </div>
            <div v-if="platform_empty">
                <Empty></Empty>
            </div>
            <div v-else-if="!platform_empty"
                :config="platform_config"
                :key="'platform'+num">
                <MapsEcharts ref="platform_echart"></MapsEcharts>
            </div>
        </main>

    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import JSZip from "jszip";
import FileSaver from "file-saver";
import fetch from "@/services/fetch";
import MapsEcharts from "./maps-echarts";
import colors from "@/assets/chart/color-config";
import Empty from "./doughnut-pie-original";
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
      show_platform: true,
      // 数据查询类型
      data_type_list: [],
      data_type: "",
      data_type_label: "",
      customer_config: {}, //客户报表配置
      platform_config: {}, //平台报表配置
      data_all: [], // 全部数据
      target_total: [], // 全部平台总数据
      platform_total: "", //客户-平台总数
      customer_empty: false,
      platform_empty: false,
      num: 0,
      data_config: {},
      pie_active_client_id: "",
      display_keys: [],
      forbidden_convert_rate: true,
    };
  },
  watch: {
    display_keys: {
      handler: function (val) {
        if (val.length > 0) {
          this.forbidden_convert_rate = true;
          if (val.includes(this.data_type)) {
            this.data_type = this.data_type_list[0].name;
            this.data_type_label = this.data_type_list[0][this.language];
            this.get_customer_proportion_data();
          }
        } else {
          this.forbidden_convert_rate = false;
        }
      },
    },
  },
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("user", ["language"]),
    ...mapState("report", ["special_target"]),
  },
  methods: {
    // 下载图片
    download_pic() {
      if (!this.customer_empty) {
        const self = this;
        // 需要下载打包的路径
        const data = [
          { name: this.$t("lang.report_Donut_Chart_Client_Report") + ".png", path: this.$refs.customer_echarts.download() },
          { name: this.$t("lang.report_platform_Chart_Client_Report") + ".png", path: this.$refs.platform_echart.download() },
        ];
        const zip = new JSZip();
        const cache = {};
        const promises = [];

        const dataUrlFile = (url, fileName) => {
          var arr = url.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr], fileName, { type: mime });
        };

        data.forEach((item) => {
          zip.file(item.name, dataUrlFile(item.path, item.name));
        });
        zip.generateAsync({ type: "blob" }).then((content) => {
          FileSaver.saveAs(content, self.$t("lang.report_download_zip_title")); // 利用file-saver保存文件  自定义文件名
        });
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
        item: this.data_type,
        itemTitle: this.data_type_label,
        time_line: this.filter.time_line,
        client_id_selected: this.pie_active_client_id || "",
      };
      const url = "/report/percentageexport";
      const res = await this.fetchCore(url, param, false);
      if (res) {
        this.$downloadFile(res);
      }
    },
    // 获取数据类型
    async get_data_type_option() {
      const url = "/report/chartSelectlist";
      const data = await this.fetchCore(url, { time_line: this.filter.time_line }, false);

      if (data) {
        if (data.hasOwnProperty("percentageTitleList")) {
          this.data_type_list = data.percentageTitleList;

          if (this.data_type && this.data_type_label) {
            if (this.special_target.includes(this.data_type)) {
              const index = this.data_type_list.findIndex((obj) => {
                return obj.map_name == this.data_type;
              });
              if (index >= 0) {
                this.data_config = this.data_type_list[index];
                this.data_type = this.data_type_list[index].name;
                this.data_type_label = this.data_type_list[index][this.language];
              }
            }
          } else {
            this.data_config = this.data_type_list[0];
            this.data_type = this.data_type_list[0].name;
            this.data_type_label = this.data_type_list[0][this.language];
          }
          // this.get_customer_proportion_data();
        }
      }
    },
    //  改变数据类型
    data_type_change(param) {
      const index = this.data_type_list.findIndex((obj) => {
        return obj.name === param;
      });
      this.data_config = this.data_type_list[index];
      this.data_type_label = this.data_type_list[index][this.language];
      // this.show_platform = false;
      const customer_data = this.data_all[this.data_type] || [];
      if (customer_data.length) {
        this.customer_empty = false;
        this.platform_empty = false;
        this.set_customer_chart(customer_data);
      } else {
        this.customer_empty = true;
        this.platform_empty = true;
      }
    },
    update_filter(param = true) {
      if (param) {
        this.get_customer_proportion_data();
      } else {
        this.data_all = [];
        this.target_total = {};
        this.customer_empty = true;
        this.platform_empty = true;
        this.$emit("noData", this.customer_empty);
      }

      // this.show_platform = false;
    },
    // 获取客户占比数据
    async get_customer_proportion_data() {
      const url = "/report/percentage";
      const param = {
        team_id: this.active_team_id,
        client_id: this.filter.customer.join(),
        platform: this.filter.platform.join(),
        startdate: this.filter.start_date,
        enddate: this.filter.end_date,
        time_line: this.filter.time_line,
      };
      const res = await this.fetchCore(url, param, true);
      if (typeof res == "object" && res.data) {
        const data = res.data;
        this.data_all = data;
        this.target_total = res.total;
        const customer_data = data[this.data_type] || [];
        if (customer_data.length) {
          this.customer_empty = false;
          this.set_customer_chart(customer_data);
        } else {
          this.customer_empty = true;
          this.platform_empty = true;
        }
      } else {
        this.data_all = [];
        this.target_total = {};
        this.customer_empty = true;
        this.platform_empty = true;
        // this.set_customer_chart([]);
      }
      this.$emit("noData", this.customer_empty);
    },
    // 配置客户报表
    set_customer_chart(data) {
      const THIS = this;
      this.num++;
      this.customer_config = {
        backgroundColor: "#fff",
        title: {
          text: `${this.data_type_label}${this.$t("lang.report_analysis")}`,
          subtext: `${this.$t("lang.public_all")} ${
            this.$formatNumber(this.target_total[this.data_type], this.data_config.decimal, this.data_config.unit, ",", ".") || "--"
          }`,
          left: "center",
          top: 0,
        },
        series: [
          {
            type: "pie",
            data: data,
            animation: true,
            radius: [55, 110],
            // radius: ["28%", "63%"],
            center: ["50%", "60%"],
            bottom: 20,
            selectedMode: "single",
            labelLine: {
              show: true,
            },
            label: {
              // show: true,
              // formatter: function (param, ticket) {
              //   return `${param.data.name}: ${THIS.toDecimal(param.data.value / THIS.target_total[THIS.data_type]) || "--"}% \n ${
              //     THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"
              //   }`;
              // },
              formatter: function (param) {
                return `{title|${param.data.name}: }{content|${
                  THIS.toDecimal(param.data.value / THIS.target_total[THIS.data_type]) || "--"
                }%}\n{title2|${param.data.name}: }{content|${
                  THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"
                }}`;
              },
              rich: {
                title: {
                  align: "left",
                },
                title2: {
                  align: "left",
                  color: "#fff",
                },
                content: {
                  align: "left",
                },
              },
            },
          },
        ],
        color: colors.ten, //5色系颜色
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (param, ticket) {
            return `<div style="float: left">${param.data.name}: </div><div style="text-align: left;float: right">${
              THIS.toDecimal(param.data.value / THIS.target_total[THIS.data_type]) || "--"
            }%<br>${THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"}</sapn>`;
          },
          // formatter: function (param, ticket) {
          //   return `${param.data.name}: ${THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"} ${
          //     THIS.toDecimal(param.data.value / THIS.target_total[THIS.data_type]) || "--"
          //   }%`;
          // },
        },
      };

      this.$nextTick(() => {
        this.$refs.customer_echarts.setOption(this.customer_config);
      });
      // 获取所选或全部客户的平台数据
      this.get_clients_platform_data();
    },
    // 获取所选或全部客户的平台数据
    async get_clients_platform_data() {
      const url = "/report/platformPercentage";
      const msg = {
        team_id: this.active_team_id,
        platform: this.filter.platform.join(),
        client_id: this.filter.customer.join(),
        startdate: this.filter.start_date,
        enddate: this.filter.end_date,
        item: this.data_type,
        time_line: this.filter.time_line,
      };
      const res = await this.fetchCore(url, msg, true);

      if (res.data) {
        this.display_keys = res.displayKeys.concat(this.convertRate) || [];
        this.platform_total = res.total;
        const platfome_data = res.data || [];
        if (platfome_data.length) {
          this.platform_empty = false;
          this.set_platform_chart(this.$t("lang.public_all"), platfome_data);
        } else {
          this.platform_empty = true;
        }
      } else {
        this.display_keys = this.convertRate || [];
      }
    },
    // 获取某个客户的平台数据
    click_event(param) {
      if (this.pie_active_client_id == param.id) {
        this.pie_active_client_id = "";
        this.get_clients_platform_data();
      } else {
        this.platform_config.series = [];
        this.$refs.platform_echart.setOption(this.platform_config);
        this.pie_active_client_id = param.id;
        this.get_one_client_platfome_data(param);
      }
    },
    async get_one_client_platfome_data(param) {
      const url = "/report/clientPercentage";
      const msg = {
        team_id: this.active_team_id,
        platform: this.filter.platform.join(),
        client_id: param.id,
        startdate: this.filter.start_date,
        enddate: this.filter.end_date,
        item: this.data_type,
        time_line: this.filter.time_line,
      };
      const res = await this.fetchCore(url, msg, false);
      if (res.data) {
        this.platform_total = res.total;
        const platfome_data = res.data || [];

        if (platfome_data.length) {
          this.platform_empty = false;
          this.set_platform_chart(param.name, platfome_data);
        } else {
          this.platform_empty = true;
        }
      }
    },
    set_platform_chart(customer, platfome_data) {
      const THIS = this;
      this.platform_config = {
        backgroundColor: "#fff",
        title: {
          text: this.$t("lang.report_platform_analysis"),
          subtext: `${customer} ${THIS.$formatNumber(THIS.platform_total, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"}`,
          left: "center",
          top: 0,
        },
        dataset: {
          source: [["pieName", "pieValue"]].concat(Object.entries(platfome_data)),
        },
        series: [
          {
            type: "pie",
            data: platfome_data,
            animation: true,
            radius: [55, 110],
            center: ["50%", "60%"],
            silent: false,
            encode: { itemName: "pieName", value: "pieValue" },
            labelLine: {
              show: true,
            },
            label: {
              show: true,
              // formatter: function (param, ticket) {
              //   return `${param.data.name}: ${
              //     THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"
              //   } ${THIS.toDecimal(param.data.value / THIS.platform_total) || "--"}%`;
              // },
              formatter: function (param) {
                return `{title|${param.data.name}: }{content|${THIS.toDecimal(param.data.value / THIS.platform_total) || "--"}%}\n{title2|${
                  param.data.name
                }: }{content|${THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"}}`;
              },
              rich: {
                title: {
                  align: "left",
                },
                title2: {
                  align: "left",
                  color: "#fff",
                },
                content: {
                  align: "left",
                },
              },
            },
          },
        ],
        color: colors.platform, //平台色系颜色
        tooltip: {
          show: true,
          trigger: "item",
          formatter: function (param, ticket) {
            return `<div style="float: left">${param.data.name}: </div><div style="text-align: left;float: right">${
              THIS.toDecimal(param.data.value / THIS.platform_total) || "--"
            }%<br>${THIS.$formatNumber(param.data.value, THIS.data_config.decimal, THIS.data_config.unit, ",", ".") || "--"}</sapn>`;
          },
        },
      };
      this.$nextTick(() => {
        this.$refs.platform_echart.setOption(this.platform_config);
      });
    },
    async init() {
      this.get_data_type_option();
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
    // 保留小数点后两位有效数字
    toDecimal(x) {
      if (x == 0) {
        return "0.00";
      }
      if (x < 0.01) {
        let num_0 = 0;
        const format = (Y) => {
          num_0 += 1;
          if (Y * 10 < 0.1) {
            format(Y * 10);
          }
        };
        format(x);
        const tmp_num = (x * Math.pow(10, num_0)).toFixed(2).split(".");
        let str_0 = "";
        for (let i = 0; i < num_0 - 2; i++) {
          str_0 += "0";
        }
        return `${tmp_num[0]}.${str_0 + tmp_num[1]}`;
      } else {
        return (x * 100).toFixed(2);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang='scss' scoped>
.proportion-container {
  padding: 10px 20px;
  height: calc(100% - 20px);
  main {
    height: calc(100% - 32px);
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      height: 100%;
      // flex: 1;
      width: 50%;
      display: flex;
      align-items: center;
    }
  }
}
</style>