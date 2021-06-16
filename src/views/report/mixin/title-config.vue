<template>
    <div class=""></div>
</template>

<script>
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      table_reset_loading: false,
      title_all: [], // 全部的表头信息(数据拉平，无分组)
      title_cinfig: [], // 全部表头信息（原始。分组状态）
      title_module: [], //头部信息的模块分组
      title_checked: [], // 表头配置，已选
      table_config: [],
      title_key: "",
      is_total: true,
      key_num: 0,

      show_ad_select: true,

      // 区分上报和播放
      time_line_list: [
        {
          id: "1",
          name: this.$t("lang.report_time_line_report_label"),
          desc: this.$t("lang.report_time_line_report_desc"),
        },
        {
          id: "2",
          name: this.$t("lang.report_time_line_IMP_label"),
          desc: this.$t("lang.report_time_line_IMP_desc"),
        },
      ],
    };
  },
  watch: {},
  methods: {
    // 配置表头保存刷新
    async update_table_config(param) {
      this.table_reset_loading = true;
      this.show_ad_select = param.keys.includes("ad_name") || param.keys.includes("creative_name");
      // this.table_config=[]
      this.title_key = param.keys.join();
      this.is_total = param.show_total;
      await this.get_select_option();
      await this.get_detail_table_data();
      this.format_table_config(param.keys);
      this.format_checked(param.keys);
    },
    // 取消配置
    cancel_setting_config(param) {
      let checked = [];
      param.forEach((item) => {
        checked.push(item.key);
      });
      this.format_title(this.title_cinfig, checked);
    },
    // 获取表头配置信息（全部）
    async get_title_option_list(type) {
      const url = "/report/titlelist";
      const data = await this.fetchCore(url, this.tittle_param, false);
      if (data) {
        let checked = [];
        if (data.selectedTitles != null) {
          this.title_key = data.selectedTitles[type] || [];
          checked = data.selectedTitles[type].split(",");
        } else {
          this.title_key = [];
          checked = [];
        }

        this.show_ad_select = checked.includes("ad_name") || checked.includes("creative_name");
        this.format_title(data.titlelists, checked);
        this.format_checked(checked);
        this.format_table_config(checked);
        this.table_filter_change(true);
      }
    },
    // 头部信息分组，全部表头配置
    format_title(arr, checked) {
      let [module, title] = [[], []];
      if (arr.length) {
        arr.map((item) => {
          const param = {
            zh: item.zh,
            en: item.en,
          };
          let tmp_children = [];
          item.mychecked = false; //全选
          item.indeterminate = false; // 不全选
          module.push(param);

          let num = 0;
          item.children.forEach((child) => {
            // 判断选中
            const index = checked.findIndex((obj) => {
              return obj === child.key;
            });
            if (index >= 0) {
              child.mychecked = true;
              item.mychecked = false;
              item.indeterminate = true;
              num++;
            } else {
              child.mychecked = false;
            }

            // 判断是否是特殊字段，禁用
            if (this.special_title.includes(child.key)) {
              child.disable = true;
            } else {
              child.disable = false;
            }

            // 防止空值
            if (child[this.language]) {
              title.push({
                parent: item.en,
                disable: false,
                ...child,
              });
              tmp_children.push({
                parent: item.en,
                disable: false,
                ...child,
              });
            } else {
              // const index = item.children.findIndex(obj => {
              //   return obj.key === child.key
              // })
              // if (index >= 0) {
              //   item.children.splice(index, 1)
              // }
            }
          });
          item.children = tmp_children;
          if (num === item.children.length) {
            item.mychecked = true;
            item.indeterminate = false;
          }
        });
      }
      this.title_cinfig = arr;
      this.title_module = module;
      this.title_all = title;
    },
    // 映射已选的表头配置
    format_checked(arr) {
      let result = [];
      if (arr.length) {
        arr.map((item) => {
          const index = this.title_all.findIndex((obj) => {
            return item === obj.key;
          });
          if (index >= 0) {
            result.push(this.title_all[index]);
          }
        });
      }
      this.title_checked = result;
    },
    // 生成表头配置
    format_table_config(arr) {
      let result = [];
      this.table_config = [];
      if (arr.length) {
        arr.map((item) => {
          const index = this.title_all.findIndex((obj) => {
            return item === obj.key;
          });
          let config = {
            label: "",
            prop: "",
            width: "150",
            // width: "",
            fixed: false,
            tooltip: false,
            desc: "",
            align: 'left'
          };
          if (index >= 0) {
            if (this.special_title.includes(item)) {
              config.fixed = true;
            }
            config.label = this.title_all[index][this.language];
            config.align = this.title_all[index].align;
            config.prop = item;
            if (this.title_all[index].hasOwnProperty(`desc_${this.language}`)) {
              config.desc = this.title_all[index][`desc_${this.language}`];
            }

            if (item === "media_advertiser_name") {
              config.width = "180";
            }
            if (item === "client_name") {
              config.width = "150";
            }
            String.prototype.pxWidth = function (font) {
              // re-use canvas object for better performance
              var canvas = String.prototype.pxWidth.canvas || (String.prototype.pxWidth.canvas = document.createElement("canvas")),
                context = canvas.getContext("2d");

              font && (context.font = font);
              var metrics = context.measureText(this);

              return metrics.width;
            };
            config.width = config.label.pxWidth() + 120;

            if (item === "platform") {
              config.width = this.language == "zh" ? "70" : "110";
            }
            if (item === "date") {
              config.width = "180";
            }
          }
          result.push(config);
        });
      }

      this.table_reset_loading = false;
      this.table_config = result;
      this.key_num++;
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
  mounted() {},
};
</script>
<style lang='scss'>
.customer-report-container,
.effect-report-container {
  .table-main {
    .el-table {
      .el-table__header-wrapper,
      .el-table__fixed-header-wrapper {
        thead th {
          .cell {
            display: flex;
            align-items: center;
          }
        }
      }
      .el-table__body-wrapper,
      .el-table__fixed-body-wrapper {
        tbody tr {
          .cell {
            line-height: 16px;
          }
        }
      }
    }
  }
}
</style>