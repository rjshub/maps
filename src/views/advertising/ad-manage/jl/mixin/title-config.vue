<template>
  <div class></div>
</template>

<script>
import fetch from "@/services/fetch";
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      table_reset_loading: false,
      title_all: [], // 全部的表头信息(数据拉平，无分组)
      title_cinfig: [], // 全部表头信息（原始。分组状态）
      title_module: [], //头部信息的模块分组
      title_checked: [], // 表头配置，已选
      table_config: [],
      title_key: "",
      is_total: true,
      key_num: 0,
      flag: false,
      forbidden_delete_title: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("advertising", [
      "active_tab",
      "campaign_checked_title",
      "ad_checked_title",
    ]),
  },
  methods: {
    ...mapActions("advertising", [
      "update_campaign_checked_title",
      "update_ad_checked_title",
    ]),
    // 配置表头保存刷新
    async update_table_config(param) {
      this.table_reset_loading = true;
      // this.show_ad_select = param.keys.includes("ad_name") || param.keys.includes("creative_name");
      // this.table_config=[]
      this.title_key = param.keys.join();
      if (this.active_tab == "campaign") {
        this.update_campaign_checked_title(param.keys);
      } else if (this.active_tab == "ad") {
        this.update_ad_checked_title(param.keys);
      }
      this.is_total = param.show_total;
      await this.get_table_data();
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
    async get_title_option_list() {
      this.isLoading = true;
      const url = this.request_titlelist_url;
      const data = await this.fetchCore(url, this.tittle_param, false);
      if (data) {
        let checked = [];

        this.special_title = data.notMoveTitles || [];
        this.forbidden_delete_title = data.notDeleteTitles || [];
        if (data.selectedTitles != null) {
          this.title_key = data.selectedTitles || "";
          if (
            this.active_tab == "campaign" &&
            this.campaign_checked_title.length
          ) {
            checked = this.campaign_checked_title;
          } else if (this.active_tab == "ad" && this.ad_checked_title.length) {
            checked = this.ad_checked_title;
          } else {
            checked = data.selectedTitles.split(",");
          }
        } else {
          this.title_key = [];
          checked = [];
        }

        // this.show_ad_select = checked.includes("ad_name") || checked.includes("creative_name");
        this.format_title(data.titlelists, checked);
        this.format_checked(checked);
        this.format_table_config(checked);
        this.filter_change(this.filter_form.page, false);
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
            if (
              this.special_title.includes(child.key) ||
              this.forbidden_delete_title.includes(child.key)
            ) {
              child.disable = true;
            } else {
              child.disable = false;
            }

            // 防止空值
            if (child[this.language]) {
              title.push({
                parent: item.zh,
                disable: false,
                ...child,
              });
              tmp_children.push({
                parent: item.zh,
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
            tooltip: true,
            desc: "",
            align: "left",
            relation: "",
            line: "",
            show: true,
            sort: false,
            wrap: true,
          };
          if (index >= 0) {
            if (this.special_title.includes(item)) {
              config.fixed = true;
            }
            config.label = this.title_all[index][this.language];
            config.align = this.title_all[index].align;
            config.relation = this.title_all[index].relation || "";
            config.line = this.title_all[index].line || "";
            config.sort = this.title_all[index].sort ? "custom" : false;
            config.prop = item;
            if (this.title_all[index].hasOwnProperty(`desc_${this.language}`)) {
              config.desc = this.title_all[index][`desc_${this.language}`];
            }

            if (item === "client_name") {
              config.width = "150";
            }
            String.prototype.pxWidth = function (font) {
              // re-use canvas object for better performance
              var canvas =
                  String.prototype.pxWidth.canvas ||
                  (String.prototype.pxWidth.canvas = document.createElement(
                    "canvas"
                  )),
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
            if (item === "preview") {
              config.width = "120";
              config.tooltip = false;
            }
            if (
              item === "media_advertiser_name" ||
              item === "ad_name" ||
              item === "creative_name" ||
              item == "delivery_date"
            ) {
              config.width = "240";
              config.tooltip = false;
              config.wrap = true;
            }
            // 单独设置广告组名称宽度
            if (
              item === "campaign_name"
            ) {
              config.width = "340";
              config.tooltip = false;
              config.wrap = true;
            }
          }
          result.push(config);
          if (item == "synctime") {
            const synctime_index = result.findIndex((obj) => {
              return obj.prop == "synctime";
            });
            if (synctime_index) {
              let tmp_th = _.cloneDeep(result[synctime_index]);
              tmp_th.desc = "广告组在MAPS平台最后一次被修改的时间。";
              tmp_th.prop = "utime";
              tmp_th.label = "最后编辑时间";
              tmp_th.show = false;
              result.splice(synctime_index, 0, tmp_th);
            }
          }
        });
      }

      this.table_reset_loading = false;
      this.table_config = result;
      this.key_num++;
      this.flag = true;
    },
    // 详细数据表格
    update_detail_table(param) {
      // 表格排序
      this.filter_form.order_by = param.order_by || "";
      this.filter_form.order = param.order || "";
      this.filter_change(this.filter_form.page);
    },
    // 复选
    update_selected(param, type) {
      let result = [];
      if (type == "account") {
        if (param.length) {
          param.forEach((item) => {
            result.push(item.id);
          });
        }
        this.update_checked_account(result);
        this.update_checked_campaign([]);
        this.update_checked_ad([]);
        this.update_checked_creative([]);
      } else if (type == "campaign") {
        if (param.length) {
          param.forEach((item) => {
            result.push(item.media_campaign_id);
          });
        }
        this.update_checked_campaign(result);
        this.update_checked_ad([]);
        this.update_checked_creative([]);
      } else if (type == "ad") {
        if (param.length) {
          param.forEach((item) => {
            result.push(item.media_ad_id);
          });
        }
        this.update_checked_ad(result);
        this.update_checked_creative([]);
      }
    },
    // 清空选中
    clear_select() {
      this.$refs.detail_DataTable.set_checked();
      this.filter_change(this.filter_form.page, false);
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