<template>
    <div class="signup-main"
        v-loading="isLoading">
        <header v-if="signup_step === 'first'">
            <span>{{$t('lang.login_sign_up_step1_title1')}}</span>
            <p>{{$t('lang.login_sign_up_step1_title2')}}
                <span class="eqiure-handle"
                    style="display: inline;">
                    {{$t('lang.login_has_account')}}
                    <span @click="to_login">{{$t('lang.login_sign_in')}}</span>
                </span>
            </p>
        </header>
        <header v-if="signup_step === 'second'">
            <span>{{$t('lang.login_sign_up_step2_title1')}}</span>
            <p>
                {{$t('lang.login_sign_up_step2_title2')}} {{send_email}}
                <span v-html="$t('lang.login_sign_up_step2_title3')"></span>
            </p>
        </header>
        <main class="sign-up-form">
            <el-form :model="sign_up_form"
                status-icon
                :rules="rules"
                ref="sign_up_form"
                class="demo-ruleForm"
                v-if="signup_step === 'first'">
                <el-form-item prop="email"
                    style="margin-bottom: 25px">
                    <el-input :placeholder="$t('lang.public_email_placeholder')"
                        v-model="sign_up_form.email"
                        :readonly="forbidden"
                        auto-complete="off">
                        <i slot="prefix"
                            class="iconfont maps-icon-mail"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="username"
                    style="margin-bottom: 25px">
                    <el-input :placeholder="$t('lang.public_username_placeholder')"
                        v-model="sign_up_form.username"
                        :readonly="forbidden"
                        auto-complete="off">
                        <i slot="prefix"
                            class="iconfont maps-icon-face"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="truename"
                    style="margin-bottom: 25px">
                    <el-input :placeholder="$t('lang.public_truename_placeholder')"
                        v-model="sign_up_form.truename"
                        :readonly="forbidden"
                        auto-complete="off">
                        <i slot="prefix"
                            class="iconfont maps-icon-user2"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mobile"
                    style="margin-bottom: 25px">
                    <el-input :placeholder="$t('lang.public_phone_placeholder')"
                        v-model="sign_up_form.mobile"
                        :readonly="forbidden"
                        auto-complete="off">
                        <i slot="prefix"
                            class="iconfont maps-icon-phone"></i>
                    </el-input>
                </el-form-item>

                <el-form-item prop="password"
                    style="margin-bottom: 25px">
                    <!-- <el-input type="password"
                        style="position: absolute;z-index: -1;"
                        value=""
                        autocomplete="off" /> -->
                    <el-input :type="pass_show? '':'password'"
                        :placeholder="$t('lang.public_password_placeholder')"
                        v-model="sign_up_form.password"
                        auto-complete="new-password"
                        :readonly="forbidden">
                        <i slot="prefix"
                            class="iconfont maps-icon-lock"></i>
                        <i slot="suffix"
                            :class="`iconfont ${pass_show? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                            @click="show_password"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirm_password"
                    style="margin-bottom: 25px">
                    <el-input type="password"
                        :placeholder="$t('lang.public_confirm_password_placeholder')"
                        v-model="sign_up_form.confirm_password"
                        auto-complete="new-password"
                        :readonly="forbidden">
                        <i slot="prefix"
                            class="iconfont maps-icon-lock"></i>
                        <i slot="suffix"
                            class="iconfont maps-icon-eye-dis"></i>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary"
                        :loading="forbidden"
                        @click="submitForm('sign_up_form')">{{$t('lang.login_sign_up_step1_button')}}</el-button>
                </el-form-item>
            </el-form>

            <div class="email-box"
                v-if="signup_step === 'second'">
                <div class="icon-box">
                    <i class="iconfont maps-icon-mail"></i>
                    <div class="status">
                        <i class="iconfont maps-icon-success"></i>
                    </div>
                </div>
                <el-button type="primary"
                    :loading="send_wait"
                    @click="send_email_again">{{button_text}}</el-button>
                <span class="eqiure-handle"
                    style="text-align: right">
                    {{$t('lang.login_has_account')}}
                    <span @click="to_login">{{$t('lang.login_sign_in')}}</span>
                </span>
            </div>

        </main>
    </div>
</template>

<script>
import fetch from "@/services/fetch";
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_password_required")));
      } else {
        value = value.replace(/[^\a-\z\A-\Z0-9\!\+\-\*\@\#\$\.\~\s+]/g, "");
        this.sign_up_form.password = value;
        let reg = this.$constReg.password; //仅允许英文大小写、数字、特殊字符!-+*@#$ .~中的至少2种组合。8位到20位
        if (!reg.test(value)) {
          callback(new Error(this.$t("lang.reg_password_rule_error")));
        } else {
          if (this.sign_up_form.confirm_password !== "") {
            this.$refs.sign_up_form.validateField("confirm_password");
          }
          callback();
        }
      }
    };
    var validate_confirm_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_confirm_password_required")));
      } else if (value !== this.sign_up_form.password) {
        callback(new Error(this.$t("lang.reg_confirm_password_rule_error")));
      } else {
        callback();
      }
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_username_required")));
      } else {
        // const reg = this.$constReg.username; //只允许英文大小写字母2-64
        const value_ = value.replace(/[^\'\"\’\‘\“\”]/g, "");
        const reg = this.$constReg.input_word; //除了引号都允许
        if (reg.test(value_)) {
          callback(new Error(this.$t("lang.reg_not_quotes")));
        } else {
          if (value.length < 2 || value.length > 20) {
            callback(new Error(this.$t("lang.reg_user_name_length")));
          } else {
            callback();
          }
        }
      }
    };
    var validateTruename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_trueName_required")));
      } else {
        // const reg = this.$constReg.trueName; //只允许英文大小写字母2-64
        const value_ = value.replace(/[^\'\"\’\‘\“\”]/g, "");
        const reg = this.$constReg.input_word; //除了引号都允许
        if (reg.test(value_)) {
          callback(new Error(this.$t("lang.reg_not_quotes")));
        } else {
          if (value.length < 2 || value.length > 15) {
            callback(new Error(this.$t("lang.reg_trueName_length")));
          } else {
            callback();
          }
        }
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_phone_required")));
      } else {
        const reg = this.$constReg.phone_china; //手机号
        if (!reg.test(value)) {
          callback(new Error(this.$t("lang.reg_phone_rule_error")));
        } else {
          callback();
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_email_required")));
      } else {
        const reg = this.$constReg.allEmail; //@hylink.com和@hylinkad.com
        if (!reg.test(value)) {
          callback(new Error(this.$t("lang.reg_is_email_error_message")));
        } else {
          callback();
        }
      }
    };
    return {
      forbidden: false,
      isLoading: false,
      sign_up_form: {
        email: "",
        username: "",
        truename: "",
        mobile: "",
        password: "",
        confirm_password: "",
      },
      rules: {
        email: [
          {
            type: "email",
            validator: validateEmail,
            trigger: ["blur", "change"],
          },
        ],
        username: [
          {
            required: true,
            validator: validateUsername,
            trigger: ["blur", "change"],
          },
        ],
        truename: [
          {
            required: true,
            validator: validateTruename,
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["blur", "change"],
          },
        ],
        password: [{ required: true, validator: validatePass }],
        confirm_password: [{ required: true, validator: validate_confirm_password }],
      },
      wait_time: 60,
      send_wait: false,
      pass_show: false,
      button_text: this.$t("lang.login_send_email_again"),
    };
  },
  computed: {
    ...mapState("user", ["signup_step", "send_email", "tmp_username", "is_privacy"]),
  },
  methods: {
    ...mapActions("user", ["update_signup_step", "update_send_email", "update_tmp_username", "update_is_privacy"]),
    to_login() {
      this.update_signup_step("first");
      this.$router.push({ path: "/user/login" });
    },
    to_Privacy() {
      // this.update_signup_step("first");
      this.update_is_privacy(true);
      this.$router.push({ path: "/maps/privacy" });
    },
    show_password() {
      this.pass_show = !this.pass_show;
    },
    again_time() {
      let timer = setInterval(() => {
        this.wait_time--;
        if (this.wait_time === 0) {
          clearInterval(timer);
          this.send_wait = false;
          this.wait_time = 60;
          this.button_text = this.$t("lang.login_send_email_again");
        } else {
          this.send_wait = true;
          this.button_text = `${this.$t("lang.login_send_email_again")} (${this.wait_time}s)`;
        }
      }, 1000);
    },
    async send_email_again() {
      this.again_time();
      const url = "/nologin/sendRegisterAgain";
      const param = {
        // type: 1, // 1:注册，2:改密码,
        username: this.sign_up_form.username || this.tmp_username, // 提交的用户名
        email: this.sign_up_form.email || this.send_email,
      };
      await this.fetchCore(url, param, false);
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.again_time();
          this.forbidden = true;
          const url = "/nologin/register";
          const data = await this.fetchCore(url, this.sign_up_form, false);
          if (data) {
            this.update_signup_step("second");
            this.update_send_email(this.sign_up_form.email);
            this.update_tmp_username(this.sign_up_form.username);
          }
        } else {
          this.forbidden = false;
          return false;
        }
      });
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        this.forbidden = false;
        return _data;
      } catch (err) {
        this.forbidden = false;
        // throw err;
      } finally {
        this.forbidden = false;
        hasLoading && (this.isLoading = false);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.signup_step === "second" && !this.is_privacy) {
      this.update_signup_step("first");
      next(false);
    } else {
      next();
    }
  },
  destroyed() {
    if (!this.is_privacy) {
      this.update_signup_step("first");
    }
  },
  mounted() {
    if (this.signup_step === "second" && !this.is_privacy) {
      this.again_time();
    }
  },
};
</script>
<style lang="scss">
.signup-main {
  .sign-up-form {
    .el-form {
      .el-form-item {
        .el-form-item__content {
          .el-form-item__error {
            width: 300px;
            padding-top: 2px;
            right: -320px;
            top: 50%;
            left: unset;
            transform: translate(0, -50%);
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.signup-main {
  width: 80%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  header {
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    & > span {
      color: #ffffff;
      // color: $maps_base_active_color;
      font-size: 30px;
      // margin-bottom: 15px;
      // font-size: 1.2rem;
      margin-bottom: 0.61rem;
      font-weight: bold;
    }
    & > p {
      margin-bottom: 1.2rem;
      font-size: 14px;
      // font-size: 0.55rem;
      color: #97b4d7;
      text-align: center;
      span {
        font-size: 14px;
        // font-size: 0.55rem;
      }
    }
  }
  .sign-up-form {
    width: 370px;
    color: #f2f2f2;
    .email-box {
      display: flex;
      flex-flow: column;
      align-items: center;
      margin-bottom: 20px;
      .icon-box {
        width: 64px;
        height: 64px;
        margin-bottom: 36px;
        position: relative;
        i {
          color: #ffffff;
          font-size: 64px;
        }
        .status {
          width: 24px;
          height: 24px;
          position: absolute;
          bottom: -4px;
          right: -14px;
          i {
            color: #08b5b6;
            font-size: 24px;
          }
        }
      }
      .eqiure-handle {
        margin-top: 20px;
      }
    }
  }
}
</style>