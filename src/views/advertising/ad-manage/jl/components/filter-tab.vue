<template>
  <div class="select-container filter-box">
    <i class="iconfont maps-icon-filter"></i>
    <el-tabs
      type="card"
      ref="filter_tabs"
      @tab-remove="clear_item"
    >
      <el-tab-pane
        v-for="item in filter_tabs"
        :key="item.value"
        :name="item.value"
        :closable="item.value != 'create_date'"
      >
        <FilterPopover
          slot="label"
          :key="item.value"
          :config="[item]"
          :model="filter"
          :handle="handle"
          @update="update_filter"
        >
          <div
            class="tab-content"
            slot="reference"
          >
            {{ item.name }}
            <span style="margin: 0 5px">|</span>
            <span class="result-show ellipsis-label">
              {{ item.result[0].name }}</span>
            <div
              class="result-num"
              v-if="item.result.length > 1"
            >
              +{{ item.result.length - 1 }}
            </div>
          </div>
        </FilterPopover>
      </el-tab-pane>
    </el-tabs>
    <div class="handle">
      <el-button
        type="text"
        @click="clear_all"
        :disabled="set_forbidden_clear"
      >清空</el-button>
      <span
        style="color: #0bb3b3; padding: 0 5px"
        v-if="filter_tabs.length < set_filter_count"
      >|</span>
      <el-button
        type="text"
        @click="add_filter"
        v-if="filter_tabs.length < set_filter_count"
      >添加</el-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState } from "vuex";
import FilterPopover from "./filter-popover";

export default {
  name: "FilterTab",
  components: { FilterPopover },
  props: {
    config: {
      default: () => {
        return [];
      },
    },
    model: {
      type: Object,
      default: () => {
        return {};
      },
    },
    handle: {
      default: "1",
    },
  },
  data() {
    return {
      filter: {},
      filter_tabs: [],
    };
  },
  watch: {
    model: {
      handler() {
        this.filter = _.cloneDeep(this.model);
        if (this.config.length) {
          this.set_result();
        }
      },
      deep: true,
      immediate: true,
    },
    config: {
      handler() {
        this.set_result();
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
    ]),
    set_filter_count() {
      let list = [];
      // campaign
      if (
        (this.active_tab == "campaign") &
        (this.manage_campaign_handle == "edit")
      ) {
        this.config.forEach((item) => {
          if (item.show.includes("2")) {
            list.push(item);
          }
        });
      } else if (
        (this.active_tab == "campaign") &
        (this.manage_campaign_handle == "show")
      ) {
        this.config.forEach((item) => {
          if (item.show.includes("1")) {
            list.push(item);
          }
        });
      }
      // ad
      if ((this.active_tab == "ad") & (this.manage_ad_handle == "edit")) {
        this.config.forEach((item) => {
          if (item.show.includes("2")) {
            list.push(item);
          }
        });
      } else if (
        (this.active_tab == "ad") &
        (this.manage_ad_handle == "show")
      ) {
        this.config.forEach((item) => {
          if (item.show.includes("1")) {
            list.push(item);
          }
        });
      }
      // 账号和创意
      if (this.active_tab == "account" || this.active_tab == "creative") {
        list = this.config;
      }

      return list.length;
    },
    set_forbidden_clear() {
      return this.filter_tabs.length == 1 && this.filter_tabs[0].value == 'create_date'
    }
  },
  methods: {
    set_result() {
      let result = [];
      this.config.forEach((item) => {
        let options = [];
        //1多选 2单选 3时间 4单选+下拉
        if (item.type == "1") {
          //多选
          if (this.filter[item.value].length) {
            this.filter[item.value].forEach((checked) => {
              const index = item.list.findIndex((obj) => {
                return obj.value == checked;
              });
              if (index >= 0) {
                options.push(item.list[index]);
              }
            });
          }
        } else if (item.type == "2") {
          // 单选
          // if (this.filter[item.value] != "") {

          const index = item.list.findIndex((obj) => {
            return obj.value.toString() == this.filter[item.value].toString();
          });
          if (index >= 0) {
            options.push(item.list[index]);
          }
          // }
        } else if (item.type == "3") {
          if (this.filter[item.value].length) {
            const param = {
              name: `${this.filter[item.value][0]} 至 ${
                this.filter[item.value][1]
              }`,
              value: item.value,
            };
            options.push(param);
          }
        } else if (item.type == "4") {
          // 多选+下拉
          if (this.filter[item.value].length) {
            this.filter[item.value].forEach((checked) => {
              const index = item.list.findIndex((obj) => {
                return obj.value == checked;
              });
              if (index >= 0) {
                options.push(item.list[index]);
              }
            });
            // const index = item.list.findIndex((obj) => {
            //   return this.filter[item.value].includes(obj.value);
            // });
            // if (index >= 0) {
            //   options.push(item.list[index]);
            // }
          }
        }

        if (options.length) {
          let config = _.cloneDeep(item);
          config.result = options;
          result.push(config);
        }
      });
      this.filter_tabs = result;
      // return result;
    },
    clear_item(param) {
      const index = this.config.findIndex((obj) => {
        return obj.value == param;
      });
      let filter = _.cloneDeep(this.filter);

      if (index >= 0) {
        if (this.config[index].type == 2) {
          filter[param] = "";
        } else {
          filter[param] = [];
        }
        if (this.config[index].hasOwnProperty("relation")) {
          if (this.config[index].relation.type == 2) {
            filter[this.config[index].relation.value] = "";
          } else {
            filter[this.config[index].relation.value] = [];
          }
        }
      }

      let result = [];
      this.filter_tabs.forEach((item) => {
        if (item.value != param) {
          result.push(item);
        }
      });
      this.filter_tabs = result;

      this.$emit("update", {
        filter: filter,
        state: this.filter_tabs.length > 0,
      });
    },
    update_filter(param) {
      this.filter = param.filter;
      this.set_result();
      this.$emit("update", {
        filter: param.filter,
        state: this.filter_tabs.length > 0,
      });
    },
    // 清空
    clear_all() {
      let state = false;
      this.config.forEach((item) => {
        if (item.value != "create_date") {
          if (item.type == 2) {
            this.filter[item.value] = "";
          } else {
            this.filter[item.value] = [];
          }

          if (item.hasOwnProperty("relation")) {
            if (item.relation.type == 2) {
              this.filter[item.relation.value] = "";
            } else {
              this.filter[item.relation.value] = [];
            }
          }
        }
        if (item.value == "create_date") {
          state = true;
        }
      });

      this.$emit("update", { filter: this.filter, state });
    },
    // 添加
    add_filter() {
      this.$emit("add");
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.filter-box {
  .el-tabs {
    .el-tabs__header {
      border-width: 0;
      .el-tabs__nav-prev,
      .el-tabs__nav-next {
        line-height: 32px;
        background: #fff;
        padding: 0 2px;
      }

      .el-tabs__item {
        height: 32px;
        padding: 0 25px 0 10px !important;
        margin-right: 10px;
        line-height: 32px;
        border-radius: 3px;
        background: #fff;
        border-color: #fff;
        font-size: 12px;
        color: #666;
        position: relative;
        & > .el-icon-close {
          width: 14px;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        & > .el-icon-close:hover {
          color: #0bb3b3;
        }
      }
      .el-tabs__item:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.filter-box {
  height: 52px;
  background: #eaeffa;
  padding: 0 20px;
  .maps-icon-filter {
    margin-right: 10px;
  }
  .el-tabs {
    max-width: calc(100% - 130px);
    .el-tabs__header {
      .el-tabs__item {
        .tab-content {
          position: relative;
          display: flex;
          align-items: center;
          .result-show {
            display: inline-block;
            max-width: 160px;
          }
          .result-num {
            height: 16px;
            padding: 0 8px;
            margin-left: 3px;
            background: #f4f4f5;
            border: 1px solid #e9e9eb;
            border-radius: 3px;
            font-size: 12px;
            color: #909399;
            line-height: 16px;
          }
        }
      }
    }
  }
  .handle {
    padding-left: 20px;
  }
}
</style>