<template>
  <div
    class="campaign-batch-box"
    v-loading.fullscreen="isLoading"
  >
    <el-dropdown trigger="click">
      <el-button
        size="mini"
        style="width: 104px; margin-left: 10px"
        :disabled="!checked_campaign.length || check_permission.state"
        @click="handle_to_batch"
      >
        <maps-tooltip :text="check_permission.text">
          <span>
            <i
              class="iconfont maps-icon-edit"
              style="margin-right: 5px"
            ></i>
            批量修改
          </span>
        </maps-tooltip>
      </el-button>
      <el-dropdown-menu
        slot="dropdown"
        v-if="!has_touch && !has_pushing"
      >
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          @click.native="handle_batch(item)"
        >
          <span>{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-popover
      placement="bottom"
      v-model="visible"
      width="100%"
      trigger="click"
      ref="batch_edit_popover"
      :popper-class="`campaign-batch-edit-popover ${user_nav? 'campaign-batch-isCollapse':''}`"
      @hide="edit_popover_close"
    >
      <!-- @show="edit_popover_show" -->
      <div
        class="mark"
        slot="reference"
      ></div>
      <main class="edit-popover-main">
        <header>
          <el-tabs v-model="activeName">
            <el-tab-pane
              :label="`修改广告组预算（已选${checked.length}个）`"
              name="budget"
            ></el-tab-pane>
          </el-tabs>
        </header>
        <div class="edit-table-main">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            class="batch-edit-Form"
          >
            <el-table
              :data="checked"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
            >
              <el-table-column
                show-overflow-tooltip
                prop="campaign_name"
                label="广告组名称"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="cost"
                label="当前消耗（元）"
                width="130"
              >
                <template slot-scope="scope">{{scope.row.cost || '--'}}</template>
              </el-table-column>
              <el-table-column
                prop="budget"
                label="当前预算（元）"
                width="130"
              >
                <template slot-scope="scope">
                  <div style="line-height: 16px;width: 100%">
                    <div>{{scope.row.budget || '--'}}</div>
                    <div>{{scope.row.budget_mode_lang || '--'}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="修改预算"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length"
                >
                  <el-form-item style="width: 120px">
                    <el-select
                      v-model="form[scope.row.id].budget_mode"
                      placeholder="预算类型"
                    >
                      <el-option
                        label="日预算"
                        value="BUDGET_MODE_DAY"
                      ></el-option>
                      <el-option
                        label="不限"
                        value="BUDGET_MODE_INFINITE"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    :prop="`${scope.row.id}.budget`"
                    style="width: 200px"
                    v-if="form[scope.row.id].budget_mode == 'BUDGET_MODE_DAY'"
                    :inline-message="true"
                    :class="error_msg.includes(scope.row.id)? 'is-error':''"
                  >
                    <el-input
                      placeholder="预算"
                      size="mini"
                      v-model="form[scope.row.id].budget"
                      @change="form_change($event, scope.row.id)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column
                label=""
                class-name="operate"
                width="150"
                v-if="checked.length > 1"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    ><span class="copy_all">复制到全部</span></el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>
        <div class="batch_btn">
          <el-button
            size="mini"
            class="maps-button-mini"
            @click="handle_cancel"
            plain
          >{{ $t("lang.public_button_cancel") }}</el-button>
          <el-button
            size="mini"
            class="maps-button-mini"
            @click="handle_save('form')"
            type="primary"
          >{{ $t("lang.public_button_save") }}</el-button>
        </div>
      </main>
    </el-popover>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {
    checked: {
      type: Array,
      default: () => {
        return [];
      },
    },
    has_touch: {
      type: Boolean,
      default: false,
    },
    has_pushing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // validateValue: validateValue,
      isLoading: false,
      visible: false,
      handle_text: "批量修改",
      activeName: "budget",
      type: "",
      options: [
        {
          label: "开启",
          value: "open",
        },
        {
          label: "暂停",
          value: "close",
        },
        {
          label: "修改预算",
          value: "budget",
        },
      ],
      first_cell: "",
      form: {},
      rules: {},
      error_msg: [],
      screenWidth: null, //屏幕尺寸(监听宽+高)
    };
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          const dom = document.querySelector(".manage-campaign-container");
          const popover = document.querySelector(
            ".campaign-batch-edit-popover"
          );
          popover.style.width = `${dom.clientWidth - 20}px`;
          popover.style.height = `${dom.clientHeight - 80}px`;
        }
      },
    },
    screenWidth: {
      handler() {
        this.$nextTick(() => {
          const dom = document.querySelector(".manage-campaign-container");
          const popover = document.querySelector(
            ".campaign-batch-edit-popover"
          );
          popover.style.width = `${dom.clientWidth - 20}px`;
          popover.style.height = `${dom.clientHeight - 80}px`;
        });
      },
    },
  },
  computed: {
    ...mapState("advertising", ["checked_campaign"]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
    ...mapState("user", ["user_nav"]),
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
  },
  methods: {
    handle_to_batch() {
      if (this.has_touch) {
        this.$message({
          message: "勾选项中包含已触发规则的广告组，请先处理或重新选择！",
          duration: 5000,
          offset: 3,
          type: "error",
        });
      }
      if (this.has_pushing) {
        this.$message({
          message:
            "勾选项中包含推送中的广告组，推送中的广告组不允许修改，请重新选择！",
          duration: 5000,
          offset: 3,
          type: "error",
        });
      }
    },
    set_form() {
      let form = {};
      let rules = {};

      if (this.checked.length) {
        this.first_cell = this.checked[0].id;
        this.checked.forEach((item) => {
          const param = {
            budget: item.budget || null,
            budget_mode: item.budget_mode,
          };

          const validateValue = (rule, value, callback) => {
            const reg = this.$constReg.num; //正整数，最多保留两位小数
            if (!reg.test(value)) {
              callback(new Error("允许小数，最多保留两位小数。"));
            } else {
              value = Number(value);
              if (item.campaign_type == "FEED") {
                if (value < 300 || value > 9999999.99) {
                  callback(
                    new Error("广告组日预算最低为300，最高不能超过9999999.99。")
                  );
                } else {
                  callback();
                }
              } else if (item.campaign_type == "SEARCH") {
                if (value < 1000 || value > 9999999.99) {
                  callback(
                    new Error(
                      "广告组日预算最低为1000，最高不能超过9999999.99。"
                    )
                  );
                } else {
                  callback();
                }
              }
            }
          };
          const rule = {
            budget: [
              {
                required: true,
                validator: validateValue,
                trigger: ["blur", "change"],
              },
              {
                required: true,
                message: "预算不能为空！",
                trigger: ["blur", "change"],
              },
            ],
          };

          this.$set(form, item.id, param);
          this.$set(rules, item.id, rule);
        });
      }
      this.form = form;
      this.rules = rules;
      this.isLoading = false;
    },
    async edit_popover_show() {
      let result = [];
      this.checked.forEach((item) => {
        result.push(item.media_campaign_id);
      });

      const url = `/adpush/jl/campaignedit/open`;
      let param = {
        media_campaign_ids: result.join(),
      };
      await this.fetchCore(url, param, false);
    },
    async check_open() {
      const url = `/adpush/jl/campaignedit/open`;
      let result = [];
      this.checked.forEach((item) => {
        result.push(item.media_campaign_id);
      });
      let param = {
        media_campaign_ids: result.join(),
      };
      return new Promise(async (resolve, reject) => {
        await this.fetchCore(url, param, false)
          .then((data) => {
            if (data) {
              resolve(true); //可以编辑
            } else {
              this.isLoading = false;
              reject(false); //正在被其他用户编辑，当前不可操作
            }
          })
          .catch((err) => {
            this.isLoading = false;
            reject(false);
          });
      });
    },
    form_change(value, id) {
      let form = {};
      this.$set(form, id, this.form[id]);
      this.check_form(form).then((res) => {
        if (!res) {
          if (!this.error_msg.includes(id)) {
            this.error_msg.push(id);
          }
        } else {
          if (this.error_msg.includes(id)) {
            this.error_msg = this.error_msg.filter((obj) => {
              return obj != id;
            });
          }
        }
      });
    },
    async check_form(form = this.form) {
      const url = "/adpush/jl/campaignedit/checkEditData";

      return new Promise(async (resolve, reject) => {
        await this.fetchCore(url, this.reset_form(form), false)
          .then((res) => {
            if (res.hasOwnProperty("id") && res.hasOwnProperty("msg")) {
              this.$message({
                message: res.msg,
                duration: 5000,
                offset: 3,
                type: "error",
              });
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    async edit_popover_close() {
      let result = [];
      this.checked.forEach((item) => {
        result.push(item.media_campaign_id);
      });
      this.error_msg = [];

      const url = `/adpush/jl/campaignedit/close`;
      let param = {
        media_campaign_ids: result.join(),
      };
      await this.fetchCore(url, param, false);
    },
    handle_batch(param) {
      this.handle_text = param.label;
      if (param.value == "budget") {
        this.isLoading = true;
        this.check_open().then(() => {
          this.visible = true;
          this.set_form();
        });
      } else if (param.value == "open") {
        let result = [];
        this.checked.forEach((item) => {
          // result.push(item.media_campaign_id);
          result.push(item.id);
        });
        const param = {
          opt_status: 1,
          ids: result.join(),
        };
        this.check_open().then(() => {
          this.$emit("changeStatus", param, (val) => {
            if (val) this.edit_popover_close();
          });
        });
      } else if (param.value == "close") {
        let result = [];
        this.checked.forEach((item) => {
          // result.push(item.media_campaign_id);
          result.push(item.id);
        });
        const param = {
          opt_status: 0,
          ids: result.join(),
        };
        this.check_open().then(() => {
          this.$emit("changeStatus", param, (val) => {
            if (val) this.edit_popover_close();
          });
        });
      }
    },
    // 复制到全部
    handle_copy_all() {
      if (this.error_msg.includes(this.first_cell)) {
        this.$message({
          message: "请先填写正确的内容，再操作复制",
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }

      const tmp_form = this.form[this.first_cell];
      const form_ids = Object.keys(this.form);
      const keys = Object.keys(tmp_form);
      if (form_ids.length) {
        form_ids.forEach((form_item) => {
          keys.forEach((key) => {
            if (key != "id") {
              this.form[form_item][key] = tmp_form[key];
            }
          });
        });
      }
    },
    handle_cancel() {
      this.visible = false;
      this.form = {};
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.error_msg.length) {
            this.$emit("batchSaveBudget", this.reset_form(this.form), (val) => {
              if (val) {
                this.visible = false;
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    reset_form(form) {
      let result = [];
      const ids = Object.keys(form);
      ids.forEach((item) => {
        const param = {
          id: item,
          ...this.form[item],
        };
        result.push(param);
      });
      return result;
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
  mounted() {
    this.screenWidth = document.body.clientWidth + document.body.clientHeight;
    window.onresize = () => {
      //屏幕尺寸变化就重新赋值
      return (() => {
        this.screenWidth =
          document.body.clientWidth + document.body.clientHeight;
      })();
    };
  },
};
</script>
<style lang="scss">
.campaign-batch-edit-popover {
  left: 200px !important;
  .popper__arrow {
    left: 310.5px !important;
  }
  .edit-table-main {
    .el-table {
      .cell {
        font-size: 12px;
      }
    }
    .batch-edit-Form {
      height: 100%;
      .operate {
        border-right: 0px;
        .el-form-item {
          margin-bottom: 0px;
          margin-right: 10px;
          display: flex;
          align-items: center;
          float: left;
          .el-form-item__content {
            line-height: 24px;
          }
          .el-select {
            .el-input__inner {
              color: #333;
              font-size: 12px;
            }
          }
          .copy_all {
            font-size: 12px;
            color: #0bb3b3;
          }
        }
      }
    }
  }
  .edit-popover-main {
    header {
      .el-tabs {
        .el-tabs__item {
          font-size: 14px;
          color: #333;
          font-weight: 700;
        }
      }
    }
  }
}

.campaign-batch-isCollapse {
  left: 74px !important;
}
</style>
<style lang='scss' scoped>
.edit-popover-main {
  height: 100%;
  header {
    height: 40px;
    margin-bottom: 10px;
  }
  .edit-table-main {
    height: calc(100% - 90px);
  }
  .batch_btn {
    padding-top: 10px;
    text-align: right;
  }
}
</style>