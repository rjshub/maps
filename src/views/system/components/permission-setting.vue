<template>
  <div class="permission-setting">
    <div class="form-title">
      <span>{{$t('lang.public_parent_module')}}</span>
      <span :style="`width: ${language == 'zh'? '170px':'230px'}`">{{$t('lang.public_child_module')}}</span>
      <span>{{$t('lang.public_permission')}}</span>
    </div>
    <el-form
      ref="permission_form"
      :model="permission_form"
      label-position="left"
      :label-width="language == 'zh'? '170px':'230px'"
    >
      <!-- :label-width="language == 'zh'? '120px':'170px'"> -->
      <!-- :class="set_stripe(index)" -->
      <div
        class="module-item"
        v-for="(item, index) in module_list"
        :key="index"
      >
        <div class="parent">{{item.name}}</div>
        <div class="child">
          <el-form-item
            :label="child.name"
            v-for="child in item.children"
            :key="child.id"
            class="permission_cell"
          >
            <!-- :class="set_stripe(child_index+index)" -->
            <el-radio-group
              v-model="permission_form[child.id]"
              :disabled="disabled"
              @change="permission_change(child, $event)"
            >
              <el-radio
                :disabled="!child.can_forbidden"
                label="0"
                v-if="!Array(4,6).includes(child.id)"
              >{{$t('lang.public_disable')}}</el-radio>
              <el-radio
                :disabled="!child.can_view"
                label="1"
              >{{child.id == '6'? $t('lang.public_disable'):$t('lang.public_show_permission')}}</el-radio>
              <el-radio
                :disabled="!child.can_edit"
                label="2"
              >{{child.id == '6'? $t('lang.public_enable'):$t('lang.public_edit_permission')}}</el-radio>
            </el-radio-group>
            <maps-tooltip
              :text="child.explain"
              align="left"
            >
              <i class="iconfont maps-icon-info"></i>
            </maps-tooltip>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 权限
      permission_form: {},
      module_list: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["user_email", "language"]),
    ...mapState("system", ["member_handle_type", "active_team_id"]),
  },
  methods: {
    // 修改权限
    permission_change(info, param) {
      //针对广告智投->广告管理(id=8),联动辅助工具->智能规则（id=10）规则任务（id=11）
      if (info.id == "8") {
        const ad_index = this.module_list.findIndex((obj) => {
          return obj.id == info.parent_id;
        });
        const tool_index = this.module_list.findIndex((obj) => {
          return obj.id == 9; // 找到辅助工具（parent_id=9）
        });
        const set_tool = (type, forbidden = true, view = true, edit = true) => {
          this.module_list[tool_index].children.forEach((item) => {
            item.can_forbidden = forbidden;
            item.can_view = view;
            item.can_edit = edit;
            if (type == "2" && item.id == "11") {
              item.can_view = false;
            }
          });
        };
        if (ad_index >= 0 && tool_index >= 0) {
          switch (param) {
            case "0":
              set_tool("0", true, false, false);
              this.permission_form[10] = "0";
              this.permission_form[11] = "0";
              break;
            case "1":
              set_tool("1", true, true, false);
              this.permission_form[10] = "1";
              this.permission_form[11] = "1";
              break;
            case "2":
              set_tool("2", false, true, true);
              this.permission_form[10] = "1";
              this.permission_form[11] = "2";
              break;
            default:
              set_tool("1", true, true, false);
              this.permission_form[10] = "1";
              this.permission_form[11] = "1";
          }
        }
      }
      this.$emit("change", this.permission_form);
    },
    // 斑马纹
    set_stripe(index) {
      if (index === 0) {
        return "light-item";
      } else if (index === 1) {
        return "dark-item";
      } else {
        if (index % 2 === 0) {
          return "light-item";
        } else {
          return "dark-item";
        }
      }
    },
    // 获取权限配置
    async get_auth_config() {
      const url = "/team/menuselectedlist";
      let data = await this.fetchCore(url, "", false);

      if (data) {
        if (data.hasOwnProperty("menulist") && data.menulist.length) {
          let module = [];
          data.menulist.forEach((item) => {
            let param = {
              name: item[`name_${this.language}`],
              id: "",
              children: [],
            };
            item.children.forEach((child) => {
              const tmp_child = {
                id: child.id,
                name: child[`name_${this.language}`],
                explain: child[`explain_${this.language}`],
                parent_id: child.parent_id,
                can_forbidden: true,
                can_view: true,
                can_edit: true,
              };
              this.$set(this.permission_form, child.id, "1");
              if (tmp_child.id == "10" || tmp_child.id == "11") {
                tmp_child.can_edit = false;
              }
              param.id = tmp_child.parent_id;
              param.children.push(tmp_child);
            });
            module.push(param);
          });
          this.module_list = module;
          this.$emit("change", this.permission_form);
        }
      }
    },
    // 编辑，查看时更新权限
    update_permission(form) {
      this.permission_form = form;

      const info = {
        id: 8,
        parent_id: 7,
      };
      const auth = form[8] || "0";

      const ad_index = this.module_list.findIndex((obj) => {
        return obj.id == info.parent_id; // 找到广告智投
      });
      const tool_index = this.module_list.findIndex((obj) => {
        return obj.id == 9; // 找到辅助工具（parent_id=9）
      });
      const set_tool = (type, forbidden = true, view = true, edit = true) => {
        this.module_list[tool_index].children.forEach((item) => {
          item.can_forbidden = forbidden;
          item.can_view = view;
          item.can_edit = edit;
          if (type == "2" && item.id == "11") {
            item.can_view = false;
          }
        });
      };
      if (ad_index >= 0 && tool_index >= 0) {
        switch (auth) {
          case "0":
            set_tool("0", true, false, false);
            break;
          case "1":
            set_tool("1", true, true, false);
            break;
          case "2":
            set_tool("2", false, true, true);
            break;
          default:
            set_tool("1", true, true, false);
        }
      }
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
<style lang="scss">
.permission-setting {
  .el-form {
    .el-form-item {
      // width: 95%;
      margin-bottom: 0;
      height: 49px;
      border-bottom: 1px solid #e4e4e4;
      .el-form-item__label {
        // padding-left: 20px;
        padding-right: 0;
        font-size: 12px;
        text-align: center;
        line-height: 48px;
        border-right: 1px solid #e4e4e4;
      }
      .el-form-item__content {
        padding-left: 10px;
        & > span {
          margin-left: 20px;
          color: #999999;
          line-height: 24px;
        }
      }
    }
    .module-item:last-child {
      .child {
        .el-form-item:last-child {
          border-bottom-width: 0;
        }
      }
    }

    .permission_cell {
      .el-form-item__content {
        height: 100%;
        display: flex;
        align-items: center;
        .el-radio-group {
          display: flex;
          .el-radio {
            margin-right: 20px;
            .el-radio__label {
              line-height: 16px;
            }
          }
          .el-radio:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .el-form-item.check-limit {
      width: 45%;
    }
    .el-form-item.limit-date {
      width: 50%;
      .el-form-item__content {
        margin: 0 !important;
        .el-date-editor--daterange.el-input__inner {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.permission-setting {
  border: 1px solid #e4e4e4;
  border-collapse: collapse;
  .form-title {
    height: 40px;
    // padding: 0 20px;
    background: #f1f1f1;
    font-size: 12px;
    color: #333;
    font-weight: 700;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    border-collapse: collapse;
    span {
      display: inline-block;
      // padding-left: 20px;
      width: 120px;
      height: 100%;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #e4e4e4;
    }
    span:nth-child(3) {
      padding-left: 20px;
      text-align: left;
      border-right-width: 0;
    }
  }
  .dark-item {
    width: 100%;
    background: #f1f1f1;
  }
  .light-item {
    width: 100%;
    background: #fff;
  }
  .module-item {
    display: flex;
    // border-bottom: 1px solid #eee;
    .parent {
      height: auto;
      width: 120px;
      font-size: 12px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
    }

    .child {
      flex: 1;
      i {
        font-size: 12px;
        color: #999;
        margin-left: 10px;
        line-height: 14px;
      }
    }
  }
  .module-item:last-child {
    .parent {
      border-bottom-width: 0;
    }
  }
}
</style>