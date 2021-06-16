<template>
    <el-drawer :visible.sync="drawer"
        direction="rtl"
        size="50%"
        custom-class="invite-member-container"
        :close-on-press-escape="false"
        :show-close="false"
        :wrapperClosable="false"
        :destroy-on-close="true"
        v-loading="isLoading">
        <section class="drawer-header">
            <div class="back"
                @click="close_drawer">
                <i class="iconfont maps-icon-right"></i>
            </div>
            <div class="right-btn">
                <span>{{title}}</span>
                <div class="btn">
                    <el-button size="mini"
                        class="maps-button-mini"
                        @click="handle_cancel"
                        plain>{{$t('lang.public_button_cancel')}}</el-button>
                    <el-button size="mini"
                        class="maps-button-mini"
                        :disabled="disable_edit"
                        @click="handle_save('msg_form')"
                        type="primary">{{$t('lang.public_button_save')}}</el-button>
                </div>
            </div>
        </section>
        <section class="drawer-main">
            <!-- 成员信息 -->
            <section class="msg">
                <div class="title">
                    <span>*</span>{{$t('lang.team_member_info')}}
                </div>
                <main>
                    <el-form :model="msg_form"
                        :rules="rules"
                        ref="msg_form"
                        :hide-required-asterisk="true"
                        :label-width="language === 'zh'? '80px':'120px'"
                        label-position="left"
                        class="demo-msg_form">
                        <el-form-item :label="$t('lang.team_member_email')"
                            prop="email">
                            <el-input :readonly="member_handle_type === 'edit'"
                                :placeholder="$t('lang.team_maps_login_email')"
                                v-model="msg_form.email"></el-input>
                        </el-form-item>
                        <div class="inline-form">
                            <el-form-item :label="$t('lang.team_Accessible_time')"
                                class="check-limit">
                                <el-radio-group v-model="msg_form.limit"
                                    @change="date_limit_change">
                                    <el-radio label="0">{{$t('lang.team_time_Unlimited')}}</el-radio>
                                    <el-radio label="1">{{$t('lang.team_time_Custom')}}</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-form-item class="limit-date"
                                v-if="msg_form.limit === '1'"
                                prop="date">
                                <el-date-picker v-model="msg_form.date"
                                    size="mini"
                                    style="width: 60%"
                                    type="daterange"
                                    :picker-options="pickerOptions"
                                    format="yyyy.MM.dd"
                                    value-format="yyyy-MM-dd"
                                    :range-separator="$t('lang.public_range_separator')"
                                    :start-placeholder="$t('lang.public_start_time')"
                                    :end-placeholder="$t('lang.public_end_time')"
                                    @change="date_change">
                                </el-date-picker>

                                <maps-tooltip :text="$t('lang.team_time_Custom_point')">
                                    <i class="iconfont maps-icon-info" style="color: #999"></i>
                                </maps-tooltip>
                            </el-form-item>

                        </div>

                    </el-form>
                </main>
            </section>
            <!-- 广告账号 -->
            <section class="ad-account">
                <div class="title">
                    <span>*</span>{{$t('lang.team_Assign_ad_accounts')}}
                </div>
                <main>
                    <SelectCard :title="$t('lang.public_customer_placeholder')"
                        :list="customer_list"
                        :checked="select_param.client_id"
                        @select_result="select_customer"></SelectCard>
                    <SelectCard :title="$t('lang.public_platform_placeholder')"
                        :list="platform_list"
                        :checked="select_param.platform"
                        @select_result="select_app"></SelectCard>
                    <AccountCard ref="AccountCard"
                        :list="account_list"
                        @updateAccountList="update_account_ids"></AccountCard>
                    <div class="not-handle"
                        v-if="disable_edit"></div>
                </main>
            </section>
            <!-- 配置权限 -->
            <section class="permission">
                <div class="title">
                    <span>*</span>{{$t('lang.team_Assign_permissions')}}
                </div>
                <main>
                    <PermissionSetting ref="PermissionSetting"
                        :disabled="disable_edit"
                        @change="permission_change"></PermissionSetting>
                </main>
            </section>
            <!-- 填写备注 -->
            <section class="remark">
                <div class="title">
                    {{$t('lang.team_remark')}}
                </div>
                <el-form :model="remark"
                    :rules="rules">
                    <el-form-item prop="word">
                        <el-input type="textarea"
                            :disabled="disable_edit"
                            :rows="2"
                            :maxlength="30"
                            :show-word-limit="true"
                            v-model="remark.word">
                        </el-input>
                    </el-form-item>
                </el-form>

            </section>
        </section>
    </el-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import SelectCard from "../components/select-card";
import AccountCard from "../components/account-card";
import PermissionSetting from "../components/permission-setting";

export default {
  components: { SelectCard, AccountCard, PermissionSetting },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_email_required")));
      } else {
        value = value.replace(/[\'\"\’\‘\“\”\，]/g, "");
        this.msg_form.email = value;
        const reg = this.$constReg.allEmail; //@hylink.com和@hylinkad.com、@pagechoice.com
        if (value.indexOf(",") !== -1) {
          let emails = value.split(",");
          let errors = 0;
          emails.forEach((item) => {
            if (!reg.test(item) || item === "") {
              errors++;
              callback(new Error(this.$t("lang.reg_is_email_error_message")));
            }
          });
          if (errors === 0) {
            callback();
          }
        } else {
          if (!reg.test(value)) {
            callback(new Error(this.$t("lang.reg_is_email_error_message")));
          } else {
            callback();
          }
        }
      }
    };
    var validatename = (rule, value, callback) => {
      value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
      const reg = this.$constReg.input_word; //除了引号都允许
      if (reg.test(value)) {
        callback(new Error(this.$t("lang.reg_not_quotes")));
      } else {
        callback();
      }
    };
    return {
      isLoading: false,
      title: this.$t("lang.team_Add_Members"),
      drawer: false,
      msg_form: {
        email: "",
        limit: "0",
        startdate: "",
        enddate: "",
        date: [],
      },
      rules: {
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["blur"],
          },
        ],
        date: [{ required: true, message: this.$t("lang.reg_time_required"), trigger: ["blur"] }],
        word: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur"],
          },
        ],
      },
      // 不可选择过去的时间
      pickerOptions: {
        disabledDate(time) {
          // time.getTime() 默认选择的零点
          return time.getTime() + 1000 * 60 * 60 * 24 < Date.now(); // 之前的时间
        },
      },
      select_param: {
        team_id: "",
        client_id: "",
        platform: "",
      },
      customer_list: [],
      platform_list: [],
      account_list: [],
      account_ids: [],
      // 权限
      permission_form: {},
      remark: {
        word: "",
      },
      // 已过期用户不可以编辑（除了时间）
      disable_edit: false,
      info_datestatus: "1",
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["member_handle_type", "active_team_id"]),
    ...mapState("user", ["user_email", "language"]),
  },
  methods: {
    async show(type, row = "") {
      this.select_param.team_id = this.active_team_id;
      if (type === "invite") {
        this.disable_edit = false;
        this.title = this.$t("lang.team_Add_Members");
        this.$nextTick(async () => {
          await this.get_select_list();
          await this.$refs.PermissionSetting.get_auth_config();
        });
      } else if (type === "edit") {
        this.info_datestatus = row.datestatus;
        if (row.datestatus == "0") {
          this.disable_edit = true;
        } else {
          this.disable_edit = false;
        }
        this.title = this.$t("lang.team_edit_member");
        this.$nextTick(async () => {
          this.msg_form.email = row.email;
          await this.get_select_list();
          await this.$refs.PermissionSetting.get_auth_config();
          await this.get_member_info(row.user_id);
        });
      }
      this.drawer = true;
    },
    close_drawer() {
      this.refresh();
      this.drawer = false;
    },
    refresh() {
      this.msg_form = {
        email: "",
        limit: "0",
        startdate: "",
        enddate: "",
        date: [],
      };
      this.$refs.msg_form.resetFields();
      this.$refs.msg_form.clearValidate();

      this.$refs.AccountCard.update_checked_result();
      this.select_param = {
        team_id: "",
        client_id: "",
        platform: "",
      };
      this.customer_list = [];
      this.platform_list = [];
      this.account_list = [];
      this.account_ids = [];
      this.remark = {
        word: "",
      };
      this.$refs.AccountCard.refresh();
    },
    async get_select_list() {
      const url = "/team/selectlist";
      const data = await this.fetchCore(url, this.select_param, false);
      if (data) {
        this.customer_list = data.clientlist;
        if (data.hasOwnProperty("platformlist")) {
          this.platform_list = data.platformlist;
        }
        if (data.hasOwnProperty("advertiserlist")) {
          this.account_list = data.advertiserlist;
        }
      }
    },
    // 修改权限
    permission_change(param) {
      this.permission_form = param;
    },
    // 编辑。获取成员信息
    async get_member_info(id) {
      const url = "/team/userdetail";
      const param = {
        team_id: this.active_team_id,
        user_id: id,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.format_info(data);
      }
    },
    format_info(info) {
      // 处理时间
      this.msg_form.startdate = info.startdate || "";
      this.msg_form.enddate = info.enddate || "";
      if (info.startdate && info.enddate) {
        this.msg_form.limit = "1";
        this.msg_form.date = [info.startdate, info.enddate];
      }

      if (info.hasOwnProperty("advertiserlist")) {
        this.$refs.AccountCard.update_checked_result(info.advertiserlist);
      } else {
        this.$refs.AccountCard.update_checked_result();
      }

      if (info.hasOwnProperty("authdetail") && info.authdetail) {
        // const data = JSON.parse(info.authdetail);
        const data = info.authdetail;
        // data.forEach((item) => {
        //   Object.assign(this.permission_form, item);
        // });
        let keys = Object.keys(this.permission_form);
        keys.forEach((item) => {
          const index = data.findIndex((obj) => {
            let obj_key = Object.keys(obj);
            return obj_key[0] === item;
          });
          if (index >= 0) {
            this.permission_form[item] = data[index][item];
          } else {
            this.permission_form[item] = "1";
          }
        });
      } else {
        let keys = Object.keys(this.permission_form);
        keys.forEach((item) => {
          this.permission_form[item] = "1";
        });
      }
      this.$refs.PermissionSetting.update_permission(this.permission_form);

      if (info.hasOwnProperty("remark")) {
        this.remark.word = info.remark;
      }
    },
    // 是否对用户进行时间限制
    date_limit_change() {
      this.msg_form.startdate = "";
      this.msg_form.enddate = "";
      this.msg_form.date = [];

      if (this.member_handle_type === "edit") {
        if (this.msg_form.limit == "1" && this.info_datestatus == "0") {
          this.disable_edit = true;
        } else {
          this.disable_edit = false;
        }
      }
    },
    // 改变限制时间
    date_change() {
      this.disable_edit = false;
    },
    // 分配广告账号
    select_customer(id) {
      this.select_param.client_id = id;
      this.select_param.platform = "";
      this.account_list = [];
      this.get_select_list();
    },
    select_app(id) {
      this.select_param.platform = id;
      this.get_select_list();
    },
    update_account_ids(list) {
      let ids = [];
      if (list.length) {
        list.forEach((item) => {
          ids.push(item.split(",")[1]);
        });
      }
      this.account_ids = ids;
    },
    handle_cancel() {
      this.drawer = false;
      this.refresh();
    },
    handle_save(FormName) {
      const fonrmat_auth = () => {
        let result = [];
        const keys = Object.keys(this.permission_form);
        keys.forEach((item) => {
          let param = {};
          this.$set(param, item, this.permission_form[item]);
          result.push(param);
        });
        return result;
      };
      this.$refs[FormName].validate(async (valid) => {
        if (valid) {
          if (!this.account_ids.length) {
            this.$message({
              message: this.$t("lang.team_select_account_to_member"),
              duration: 5000,
              type: "error",
              offset: 3,
            });
          } else {
            let url = "/team/addteamuser";
            if (this.member_handle_type === "invite") {
              url = "/team/addteamuser";
            } else if (this.member_handle_type === "edit") {
              url = "/team/updateteamuser";
            }
            const param = {
              team_id: this.active_team_id,
              email: this.msg_form.email,
              startdate: this.msg_form.date[0],
              enddate: this.msg_form.date[1],
              advertiser_id: this.account_ids.join(),
              remark: this.remark.word,
              auth: fonrmat_auth(),
            };

            const data = await this.fetchCore(url, param, true);
            if (data) {
              if (this.member_handle_type === "invite" && data.hasOwnProperty("error_msg") && data.error_msg.length) {
                this.$message({
                  message: data.error_msg.join(),
                  duration: 5000,
                  type: "error",
                  offset: 3,
                });
              }

              this.refresh();
              this.$emit("handle_success");
              this.drawer = false;
            }
          }
        } else {
          return false;
        }
      });
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
.invite-member-container {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    height: calc(100% - 40px);
    flex: unset;
  }

  .el-form {
    .el-form-item {
      // width: 95%;
      width: 100%;
      .el-form-item__content {
        .el-radio-group {
          display: unset;
        }
      }
    }
    .el-form-item.check-limit {
      // width: 45%;
      width: 330px;
    }
    .el-form-item.limit-date {
      width: 50%;
      .el-form-item__content {
        margin: 0 !important;
        display: flex;
        align-items: center;
        .el-date-editor--daterange.el-input__inner {
          width: 100%;
        }
        .el-date-editor .el-range__icon {
          margin-left: unset;
        }
        .el-range-editor--mini .el-range__close-icon {
          display: none;
        }
        i {
          margin-left: 15px;
        }
      }
    }
  }

  .remark {
    .el-form {
      .el-form-item {
        margin-bottom: 0;
        .el-form-item__content {
          line-height: 14px;
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.invite-member-container {
  .drawer-header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .back {
      height: 24px;
      width: 35px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      margin-right: 20px;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 12px;
      }
    }
    .back:hover {
      background-color: #0bb3b3;
      color: #fff;
    }
    .right-btn {
      flex: 1;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .drawer-main {
    height: calc(100% - 50px);
    overflow-y: auto;
    padding: 0 20px;
    .title {
      height: 40px;
      background: #ebebeb;
      border-radius: 3px;
      font-size: 14px;
      color: #333;
      font-weight: 700;
      line-height: 40px;
      span {
        padding: 0 10px;
        color: #ff3333;
      }
    }
    .msg {
      main {
        margin-top: 10px;
        .inline-form {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .el-form-item__content {
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .ad-account {
      main {
        margin: 15px 0;
        height: 240px;
        display: flex;
        position: relative;
        .not-handle {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: #c0c4cc;
          opacity: 0.2;
          cursor: not-allowed;
        }
      }
    }
    .permission {
      main {
        margin: 15px 0;
      }
    }
    .remark {
      .title {
        padding-left: 20px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>