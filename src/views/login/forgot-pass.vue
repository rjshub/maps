<template>
    <div class="forgot-pass-main">
        <header>
            <span>{{$t('lang.login_forget_password_step1_title1')}}</span>
            <span class="eqiure-handle"
                v-if="pass_step !== 'second'">
                {{$t('lang.login_forget_password_step1_title2')}}
                <span @click="to_login">{{$t('lang.login_button_login')}}</span>
            </span>
            <p v-if="pass_step === 'second'">
                {{$t('lang.login_sign_up_step2_title2')}} {{send_email}}
                <span v-html="$t('lang.login_forget_password_step2_title2')"></span>
            </p>
        </header>
        <main class="forgot-pass-form">
            <!-- 验证邮箱 -->
            <el-form v-if="pass_step === 'first'"
                :model="email_form"
                status-icon
                :rules="rules"
                ref="email_form"
                class="demo-ruleForm">
                <el-form-item prop="email">
                    <el-input :placeholder="$t('lang.public_email_placeholder')"
                        v-model="email_form.email"
                        auto-complete="off"
                        :readonly="forbidden"
                        @keyup.enter.native="submitEmailForm('email_form')">
                        <i slot="prefix"
                            class="iconfont maps-icon-mail"></i>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        :loading="forbidden"
                        @click="submitEmailForm('email_form')">{{$t('lang.login_forget_password_step1_button')}}</el-button>
                    <button type="submit"
                        hidden>submit</button>
                </el-form-item>
            </el-form>
            <!-- 发送邮件 -->
            <div class="email-box"
                v-if="pass_step === 'second'">
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
                    style="margin-top:40px">
                    {{$t('lang.login_forget_password_step1_title2')}}
                    <span @click="to_login">{{$t('lang.login_button_login')}}</span>
                </span>
            </div>
            <!-- 修改密码 -->
            <el-form v-if="pass_step === 'third'"
                :model="pass_form"
                status-icon
                :rules="rules"
                ref="pass_form"
                class="demo-ruleForm">
                <el-form-item prop="password">
                    <!-- <el-input type="password"
                        style="position: absolute;z-index: -1;"
                        value=""
                        autocomplete="off" /> -->
                    <el-input :type="pass_show? '':'password'"
                        :placeholder="$t('lang.public_new_password_placeholder')"
                        v-model="pass_form.password"
                        auto-complete="new-password"
                        :readonly="forbidden">
                        <i slot="prefix"
                            class="iconfont maps-icon-lock"></i>
                        <i slot="suffix"
                            :class="`iconfont ${pass_show? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                            @click="show_password"></i>
                    </el-input>
                </el-form-item>
                <el-form-item prop="confirm_password">
                    <el-input type="password"
                        :placeholder="$t('lang.public_new_confirm_password_placeholder')"
                        v-model="pass_form.confirm_password"
                        auto-complete="off"
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
                        @click="submitPassForm('pass_form')">{{$t('lang.login_forget_password_step3_button')}}</el-button>
                </el-form-item>
            </el-form>
        </main>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_password_required")));
      } else {
        value = value.replace(/[^\a-\z\A-\Z0-9\!\+\-\*\@\#\$\.\~\s+]/g, "");
        this.pass_form.password = value;
        let reg = this.$constReg.password;
        if (!reg.test(value)) {
          callback(new Error(this.$t("lang.reg_password_rule_error")));
        } else {
          if (this.pass_form.confirm_password !== "") {
            this.$refs.pass_form.validateField("confirm_password");
          }
          callback();
        }
      }
    };
    var validate_Confirm_password = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_confirm_password_required")));
      } else if (value !== this.pass_form.password) {
        callback(new Error(this.$t("lang.reg_confirm_password_rule_error")));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_login_username_required")));
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
      email_form: {
        email: "",
      },
      pass_form: {
        id: "",
        password: "",
        confirm_password: "",
      },
      rules: {
        email: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["blur", "change"],
          },
        ],
        password: [{ required: true, validator: validatePass }],
        confirm_password: [{ required: true, validator: validate_Confirm_password }],
      },
      pass_show: false,
      send_wait: false,
      wait_time: 60,
      button_text: this.$t("lang.login_send_email_again"),
    };
  },
  computed: {
    ...mapState("user", ["pass_step", "send_email", "tmp_userID", "is_privacy"]),
  },
  methods: {
    ...mapActions("user", ["update_pass_step", "update_send_email", "update_tmp_userID"]),

    to_login() {
      this.update_pass_step("first");
      this.$router.push({ path: "/user/login" });
    },
    show_password() {
      this.pass_show = !this.pass_show;
    },
    async submitEmailForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.again_time();
          this.forbidden = true;
          const url = "/nologin/findpwd";
          const data = await this.fetchCore(url, this.email_form, false);
          if (data) {
            this.update_send_email(this.email_form.email);
            this.update_pass_step("second");
          }
        } else {
          return false;
        }
      });
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
      const url = "/nologin/sendFindpwdAgain";
      const param = {
        // type: 2, // 改密码
        email: this.email_form.email || this.send_email,
      };
      await this.fetchCore(url, param, false);
    },
    async submitPassForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.forbidden = true;
          const url = "/nologin/resetpwd";
          this.pass_form.id = this.tmp_userID;
          const data = await this.fetchCore(url, this.pass_form, false);
          if (data) {
            this.update_pass_step("first");
            this.$router.push({ path: "/user/login", query: { email: this.send_email } });
          }
        } else {
          return false;
        }
      });
    },
    async check_email() {
      const url = `/nologin/findpwdVerify?_s=${encodeURI(this.$route.query._s)}`;

      const data = await fetch.get(url);
      if (data) {
        this.update_send_email(data.email);
        this.update_tmp_userID(data.id);
        this.update_pass_step("third");
      }
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        this.forbidden = false;
        return _data;
      } catch (err) {
        this.forbidden = false;
      } finally {
        this.forbidden = false;
        // hasLoading && (this.isLoading = false);
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    if (this.pass_step === "second" && !this.is_privacy) {
      this.update_pass_step("first");
      next(false);
    } else {
      next();
    }
  },
  destroyed() {
    if (!this.is_privacy) {
      this.update_pass_step("first");
    }
  },
  mounted() {
    if (this.$route.query._s) {
      this.check_email();
    }
    if (this.pass_step === "second") {
      this.again_time();
    }
  },
};
</script>
<style lang='scss' scoped>
.forgot-pass-main {
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
    & > span:nth-child(1) {
      color: #ffffff;
      font-size: 30px;
      margin-bottom: 16px;
      font-weight: bold;
    }
    & > span:nth-child(2) {
      font-size: 14px;
      color: #97b4d7;
      span {
        color: #0bb3b3;
      }
    }
    p {
      font-size: 14px;
      color: #97b4d7;
      line-height: 16px;
      text-align: center;
    }
  }
  .forgot-pass-form {
    width: 370px;
    margin-top: 40px;
    .email-box {
      display: flex;
      flex-flow: column;
      align-items: center;
      .icon-box {
        // width: 64px;
        // height: 64px;
        margin-bottom: 36px;
        position: relative;
        i {
          color: #fff;
          font-size: 64px;
        }
        .status {
          width: 24px;
          height: 24px;
          position: absolute;
          bottom: -2px;
          right: -4px;
          i {
            color: #08b5b6;
            font-size: 24px;
          }
        }
      }
    }
  }
}
</style>