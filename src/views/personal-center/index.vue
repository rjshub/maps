<template>
    <div class="profile-container"
        v-loading.fullscreen="isLoading">
        <main>
            <section>
                <header class="title">
                    <span>{{$t('lang.personal_user_info')}}</span>
                    <i class="iconfont maps-icon-edit"
                        @click="handle_edit_info"
                        v-if="!edit_info"></i>
                    <span v-if="edit_info">
                        <el-button @click="cancel_info_edit">{{$t('lang.public_button_cancel')}}</el-button>
                        <el-button type="primary"
                            @click="submit_info_edit('info_form')">{{$t('lang.public_button_save')}}</el-button>
                    </span>
                </header>
                <main>
                    <section class="content">
                        <div class="content-title">
                            {{$t('lang.personal_user_id')}}：{{user_show_id}}
                        </div>
                        <div v-if="!edit_info"
                            class="show profile-show">
                            <div>
                                <span>
                                    <i class="iconfont maps-icon-face"></i>{{$t('lang.personal_user_username')}}
                                </span>
                                <span>{{info_form.username}}</span>
                            </div>
                            <div>
                                <span>
                                    <i class="iconfont maps-icon-mail"></i>{{$t('lang.personal_user_email')}}
                                </span>
                                <span>{{user_email}}</span>
                            </div>
                            <div>
                                <span>
                                    <i class="iconfont maps-icon-user2"></i>{{$t('lang.personal_user_truename')}}
                                </span>
                                <span>{{info_form.truename}}</span>
                            </div>
                            <div>
                                <span>
                                    <i class="iconfont maps-icon-phone"></i>{{$t('lang.personal_user_phone')}}
                                </span>
                                <span>{{info_form.mobile}}</span>
                            </div>

                        </div>
                        <el-form :model="info_form"
                            :rules="info_rules"
                            ref="info_form"
                            :hide-required-asterisk="true"
                            status-icon
                            label-position="left"
                            label-width="120px"
                            v-if="edit_info"
                            class="demo-ruleForm">
                            <el-form-item prop="username">
                                <template slot="label">
                                    <i class="iconfont maps-icon-face"></i>
                                    {{$t('lang.personal_user_username')}}
                                </template>
                                <el-input show-word-limit
                                    v-model="info_form.username"
                                    maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item class="readonly-email">
                                <template slot="label">
                                    <i class="iconfont maps-icon-mail"></i>
                                    {{$t('lang.personal_user_email')}}
                                </template>
                                <el-input readonly
                                    v-model="user_email"></el-input>
                            </el-form-item>
                            <el-form-item prop="truename">
                                <template slot="label">
                                    <i class="iconfont maps-icon-user2"></i>
                                    {{$t('lang.personal_user_truename')}}
                                </template>
                                <el-input show-word-limit
                                    v-model="info_form.truename"
                                    maxlength="15"></el-input>
                            </el-form-item>
                            <el-form-item prop="mobile">
                                <template slot="label">
                                    <i class="iconfont maps-icon-phone"></i>
                                    {{$t('lang.personal_user_phone')}}
                                </template>
                                <el-input v-model.number="info_form.mobile"></el-input>
                            </el-form-item>
                        </el-form>
                    </section>
                </main>
            </section>

            <section>
                <header class="title">
                    <span>{{$t('lang.personal_password_manage')}}</span>
                    <i class="iconfont maps-icon-edit"
                        @click="handle_edit_password"
                        v-if="!edit_password"></i>
                    <span v-if="edit_password">
                        <el-button @click="cancel_password_edit">{{$t('lang.public_button_cancel')}}</el-button>
                        <el-button type="primary"
                            @click="submit_password_edit('sign_up_form')">{{$t('lang.public_button_save')}}</el-button>
                    </span>
                </header>
                <main>
                    <section class="content">
                        <div v-if="!edit_password"
                            class="show">
                            <div>
                                <span>
                                    <i class="iconfont maps-icon-lock"></i>{{$t('lang.personal_password')}}
                                </span>
                                <span>******</span>
                            </div>
                        </div>
                        <el-form :model="sign_up_form"
                            :rules="password_rules"
                            ref="sign_up_form"
                            status-icon
                            :hide-required-asterisk="true"
                            label-position="left"
                            :label-width="language === 'zh'? '120px':'190px'"
                            v-if="edit_password"
                            class="demo-ruleForm">
                            <el-form-item prop="old_password"
                                :style="set_margin">
                                <template slot="label">
                                    <i class="iconfont maps-icon-lock"></i>
                                    {{$t('lang.personal_password_original')}}
                                </template>
                                <!-- <el-input type="password"
                                    style="position: absolute;z-index: -1;"
                                    value=""
                                    autocomplete="off" /> -->
                                <el-input :type="pass_show_old? '':'password'"
                                    auto-complete="new-password"
                                    :placeholder="$t('lang.public_password_original_placeholder')"
                                    v-model="sign_up_form.old_password">
                                    <i slot="suffix"
                                        :class="`iconfont ${pass_show_old? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                                        @click="pass_show_old = !pass_show_old"></i>
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="new_password"
                                :style="set_margin">
                                <template slot="label">
                                    <i class="iconfont maps-icon-lock"></i>
                                    {{$t('lang.personal_password_new')}}
                                </template>
                                <el-input :type="pass_show_new? '':'password'"
                                    :placeholder="$t('lang.public_password_new_placeholder')"
                                    v-model="sign_up_form.new_password">
                                    <i slot="suffix"
                                        :class="`iconfont ${pass_show_new? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                                        @click="pass_show_new = !pass_show_new"></i>
                                </el-input>
                            </el-form-item>

                            <el-form-item prop="confirm_password"
                                :style="set_margin">
                                <template slot="label">
                                    <i class="iconfont maps-icon-lock"></i>
                                    {{$t('lang.personal_password_confirm')}}
                                </template>
                                <el-input :type="pass_show_confirm? '' :'password'"
                                    :placeholder="$t('lang.public_password_confirm_placeholder')"
                                    v-model="sign_up_form.confirm_password">
                                    <i slot="suffix"
                                        :class="`iconfont ${pass_show_confirm? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                                        @click="pass_show_confirm = !pass_show_confirm"></i>
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </section>
                </main>
            </section>
        </main>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import FormRule from "../public/validator";
import fetch from "@/services/fetch";
import store from "@/store";

export default {
  components: {},
  mixins: [FormRule],
  data() {
    const THIS = this;
    return {
      isLoading: false,
      // 基本信息
      edit_info: false,
      info_form: {
        username: "",
        truename: "",
        // email: "",
        mobile: "",
      },
      // 密码配置
      edit_password: false,
      sign_up_form: {
        // 为了公用验证起名sign_up_form
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      pass_show_old: false,
      pass_show_new: false,
      pass_show_confirm: false,
      user_show_id: "",
    };
  },
  computed: {
    ...mapState("user", ["user_name", "user_id", "user_email", "language"]),
    ...mapGetters("user", ["isRoot"]),
    set_margin() {
      if (this.language === "zh") {
        return "margin-bottom: 30px";
      } else {
        return "margin-bottom: 40px";
      }
    },
  },
  methods: {
    // 获取用户信息
    async get_user_info() {
      const url = "/user/getInfo";
      const data = await this.fetchCore(url, "", true);
      if (data) {
        this.info_form.username = data.username;
        this.info_form.truename = data.truename;
        this.info_form.mobile = data.mobile;
        this.user_show_id = data.userid;
      }
    },
    // 修改基本信息
    handle_edit_info() {
      this.edit_info = true;
    },
    cancel_info_edit() {
      this.edit_info = false;
      this.$refs.info_form.clearValidate();
      this.$refs.info_form.resetFields();
    },
    submit_info_edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/user/updateInfo";
          const data = await this.fetchCore(url, this.info_form, true);
          if (data) {
            this.get_user_info();
            this.edit_info = false;
          }
        } else {
          return false;
        }
      });
    },
    // 密码配置
    handle_edit_password() {
      this.edit_password = true;
    },
    cancel_password_edit() {
      this.edit_password = false;
      this.$refs.sign_up_form.clearValidate();
      this.$refs.sign_up_form.resetFields();
    },
    submit_password_edit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const url = "/user/updatePwd";
          const data = await this.fetchCore(url, this.sign_up_form, true);
          if (data) {
            this.edit_password = false;
            this.sign_up_form = {
              old_password: "",
              new_password: "",
              confirm_password: "",
            };

            this.$message({
              message: this.$t("lang.login_password_change_success"),
              duration: 5000,
              offset: 3,
              type: "success",
            });
            // this.$confirm(this.$t("lang.personal_password_changed"), "", {
            //   confirmButtonText: this.$t("lang.public_button_confirm"),
            //   showCancelButton: false,
            //   showClose: false,
            //   closeOnClickModal: false,
            //   closeOnPressEscape: false,
            //   closeOnHashChange: false,
            //   type: "warning",
            // }).then(() => {
            //   store.dispatch("user/remove_login_info").then(() => {
            //     this.$router.push("/user/login");
            //   });
            // });
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
  beforeRouteLeave(to, from, next) {
    if (!this.isRoot) {
      next();
    } else {
      if (to.path == "/system/root" || to.path == "/user/login" || to.path == "/maps/profile" || to.path == "/user/team") {
        next();
      } else {
        next(false);
      }
    }
  },
  mounted() {
    this.get_user_info();
  },
};
</script>
<style lang="scss">
.profile-container {
  .el-form {
    .el-form-item__label {
      color: #333;
      i {
        font-size: 16px;
        color: #333;
        margin-right: 10px;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.profile-container {
  padding-top: 20px;
  & > main {
    display: flex;
    flex-flow: column;
    align-items: center;
    color: #333333;
    font-size: 14px;
    header.title {
      height: 46px;
      padding: 0 20px;
      background: #e1e1e1;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        cursor: pointer;
      }
      i:hover {
        color: #33cccc;
      }
      .el-button {
        padding: 10px 20px;
      }
    }
    .content {
      margin-bottom: 5px;
      color: #333;
      .show {
        display: flex;
        flex-flow: column;
        line-height: 20px;
        & > div {
          padding: 10px 0;
          display: flex;
          justify-content: space-between;
        }
        span {
          display: inline;
          i {
            margin-right: 10px;
          }
        }
      }
      .profile-show {
        justify-content: flex-start;
        & > div {
          justify-content: flex-start;
        }
        span {
          display: inline-block;
          width: 150px;
        }
      }

      .content-title {
        font-size: 24px;
        margin-bottom: 10px;
      }
    }
    main {
      padding: 20px;
    }
    & > section {
      // min-height: 190px;
      width: 600px;
      background: #fff;
      margin-bottom: 20px;
    }
  }
}
</style>