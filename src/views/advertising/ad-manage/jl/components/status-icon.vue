<template>
  <el-popover
    placement="bottom-start"
    width="250"
    popper-class="manage-status-icon-popover"
    trigger="hover"
  >
    <div class="content">
      <span v-html="icon_config.desc"></span>
      <el-button
        v-if="show_create"
        size="mini"
        type="text"
        :disabled="check_permission.state"
        @click="handle_create"
      >
        <maps-tooltip :text="check_permission.text">
          <span>新建任务</span>
        </maps-tooltip>
      </el-button>
    </div>
    <i
      slot="reference"
      class="iconfont"
      style="margin-right: 10px; cursor: pointer"
      :class="icon_config.icon"
      :style="icon_config.style"
      @click="show_detail"
    ></i>
  </el-popover>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: {},
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
    ]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
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
    icon_config() {
      let config = {
        icon: "",
        style: "",
        desc: "",
      };

      const format_text = () => {
        const [ruleCount, errorCount, touchRuleCount] = [
          this.config.rule_detail.ruleCount || 0,
          this.config.rule_detail.errorCount || 0,
          this.config.rule_detail.touchRuleCount || 0,
        ];
        const title = `已应用规则任务（${ruleCount}条），已触发${touchRuleCount}条规则 <br><br>`;

        let rules = [];
        if (this.config.rule_detail.list.normal.length) {
          this.config.rule_detail.list.normal.forEach((item) => {
            const param = {
              type: "normal",
              ...item,
            };
            rules.push(param);
          });
        }
        if (this.config.rule_detail.list.error.length) {
          this.config.rule_detail.list.error.forEach((item) => {
            const param = {
              type: "error",
              ...item,
            };
            rules.push(param);
          });
        }

        let content = "";
        if (rules.length) {
          rules.forEach((rule_item, index) => {
            let item_content = "";
            if (rule_item.type == "normal") {
              let title = "满足以下所有条件：";
              if (rule_item.open_connect == 1) {
                title = "满足以下所有条件：";
              } else {
                title = "满足以下任一条件：";
              }
              item_content = `<span style="color:#FF6600;font-weight:700">${
                index + 1
              }.触发规则：${rule_item.rule_name} (ID:${
                rule_item.rule_id
              })</span><br><span style="font-weight:700">已执行操作: ${
                rule_item.operations || "--"
              }</span><br><br><span style="color:#FF6600;">${title}${
                rule_item.open_condition.length ? "" : "--"
              }</span><br><br>`;

              if (rule_item.open_condition.length) {
                rule_item.open_condition.forEach((condition, index) => {
                  if (index == rule_item.open_condition.length - 1) {
                    item_content += `${condition}<br><br>`;
                  } else {
                    item_content += `${condition}<br>`;
                  }
                });
              }
            } else if (rule_item.type == "error") {
              item_content = `<span style="color:#FF6600;font-weight:700">${
                index + 1
              }.触发规则：${rule_item.rule_name} (ID:${
                rule_item.rule_id
              })</span><br><span style="font-weight:700">需执行操作: ${
                rule_item.operations || "--"
              }</span><br><br><span>无法执行操作原因：${
                rule_item.error_reason || "--"
              }</span><span style="color:#FF6600;">。建议您“忽略”此提醒，再按照要求修改计划。</span><br><br>`;
            }

            content += item_content;
          });
        }

        return title + content;
      };

      switch (this.config.rule_detail_status) {
        case 0: // 未应用规则
          config.icon = "maps-icon-rule";
          config.style = "color:#333;font-size: 16px";
          config.desc = "未应用规则";
          break;
        case 1: // 已应用规则
          config.icon = "maps-icon-rule";
          config.style = "color:#0BB3B3;font-size: 16px";
          config.desc = `已应用规则任务（${
            this.config.rule_detail.ruleCount || 0
          }条）`;
          break;
        case 2: // 已应用规则并触发
          config.icon = "maps-icon-rule";
          config.style = "color:#FF9900;font-size: 16px";
          config.desc = format_text();
          break;
        case 3: // 已应用规则并有异常触发
          config.icon = "maps-icon-rule-error";
          config.style = "color:#FF9900;font-size: 20px;margin-right: 6px";
          config.desc = format_text();
          break;
      }

      if (
        this.config.rule_detail_status == 0 &&
        this[`manage_${this.active_tab}_handle`] == "show"
      ) {
        config.style = "color:#333;font-size: 16px;cursor:default";
      }

      return config;
    },
    show_create() {
      let state = false;
      //  已应用规则和未应用规则时可新建
      if (
        this.config.rule_detail_status == "0" ||
        this.config.rule_detail_status == "1"
      ) {
        //广告组合计划在编辑的时候状态tooltip展示操作按钮
        if (
          (this.active_tab == "campaign" &&
            this.manage_campaign_handle == "edit") ||
          (this.active_tab == "ad" && this.manage_ad_handle == "edit")
        ) {
          state = true;
        } else {
          state = false;
        }
      }

      return state;
    },
  },
  methods: {
    show_detail() {
      if (this.active_tab == "campaign") {
        if (
          this.manage_campaign_handle == "show" &&
          this.config.rule_detail_status == 0
        ) {
          return false;
        }
      } else if (this.active_tab == "ad") {
        if (
          this.manage_ad_handle == "show" &&
          this.config.rule_detail_status == 0
        ) {
          return false;
        }
      }

      this.$eventHub.$emit("showAdRuleDetail", this.config);
    },
    handle_create() {
      const map = {
        campaign: "Campaign",
        ad: "Ad",
      };
      this.$eventHub.$emit(`create${map[this.active_tab]}Task`, [
        this.config[`media_${this.active_tab}_id`],
      ]);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.manage-status-icon-popover {
  min-width: 70px;
  height: auto;
  max-height: 45%;
  overflow-y: auto;
  font-size: 12px;
  line-height: 16px;
  max-width: 350px;
  opacity: 0.9;
  background: rgba(58, 83, 147, 1);
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  transform-origin: center bottom;
  border-width: 0;
  color: #fff;
  .popper__arrow {
    display: none;
    // background: rgba(58, 83, 147, 1);
    // border-color: rgba(58, 83, 147, 1);
  }
}
</style>
<style lang='scss' scoped>
.manage-status-icon-popover {
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>