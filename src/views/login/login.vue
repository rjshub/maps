<template>
  <div class="login-main">
    <header class="login-header">
      <div class="system-logo-login"></div>
      <span
        class="eqiure-handle"
        style="width: auto"
      >
        {{$t('lang.login_no_account')}}
        <span @click="sign_up">{{$t('lang.login_sign_up')}}</span>
        <!-- <a class="to-HDTC"
                    href="http://www.hylink.com/">HYLINK · HDTC</a> -->
        <a class="to-HDTC">HYLINK · HDTC</a>
      </span>
    </header>
    <main class="login-center">
      <section></section>
      <section class="maps-introduce"></section>
      <section></section>
      <section class="login-form">
        <span>{{$t('lang.login_sign_in_form_title')}}</span>
        <el-form
          :model="login_form"
          status-icon
          :rules="rules"
          ref="login_form"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              :placeholder="$t('lang.public_login_username_placeholder')"
              v-model="login_form.username"
              :readonly="forbidden"
              auto-complete="off"
              @keyup.enter.native="submitForm('login_form')"
            >
              <i
                slot="prefix"
                class="iconfont maps-icon-mail"
              ></i>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <!-- <el-input type="password"
                            style="position: absolute;z-index: -1;"
                            value=""
                            auto-complete="new-password"
                            autocomplete="off" /> -->
            <el-input
              :type="pass_show? '':'password'"
              :placeholder="$t('lang.public_password_placeholder')"
              :readonly="forbidden"
              v-model="login_form.password"
              auto-complete="off"
              @keyup.enter.native="submitForm('login_form')"
            >
              <i
                slot="prefix"
                class="iconfont maps-icon-lock"
              ></i>
              <i
                slot="suffix"
                :class="`iconfont ${pass_show? 'maps-icon-eye-dis':'maps-icon-eye'}`"
                @click="show_password"
              ></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="vcode">
            <el-input
              v-model="login_form.vcode"
              :value="login_form.vcode"
              :readonly="forbidden"
              class="vcode-input"
              :placeholder="$t('lang.public_vcode_placeholder')"
              @keyup.enter.native="submitForm('login_form')"
            >
              <template slot="append">
                <maps-tooltip :text="$t('lang.public_vcode_tooltip')">
                  <img
                    :src="vcode_img_path"
                    class="vcode"
                    ref="vcode"
                    @click="get_vcode"
                  />
                </maps-tooltip>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              :loading="forbidden"
              @click.native="submitForm('login_form')"
            >{{button_text}}</el-button>
          </el-form-item>

          <span
            class="forgot-password"
            @click="find_pass"
          >{{$t('lang.login_forget_password')}}</span>
        </el-form>
      </section>
      <section></section>
    </main>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import fetch from "@/services/fetch";
import axios from "axios";
import VCode from '@/assets/image/vcode.png'

export default {
  data() {
    const THIS = this;
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_login_username_required")));
      } else {
        if (value.indexOf("@") !== -1) {
          const reg = this.$constReg.allEmail; //@hylink.com和@hylinkad.com
          if (!reg.test(value)) {
            callback(new Error(this.$t("lang.reg_is_email_error_message")));
          } else {
            callback();
          }
        } else {
          // const reg = this.$constReg.username; //@hylink.com和@hylinkad.com
          // if (!reg.test(value)) {
          //   callback(new Error(this.$t("lang.reg_username_error_message1")));
          // } else {
          //   callback();
          // }

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
      }
    };
    return {
      vcode_img_path: VCode,
      pass_show: false,
      login_form: {
        username: "",
        password: "",
        vcode: "",
      },
      rules: {
        username: [
          {
            required: true,
            validator: validateEmail,
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("lang.reg_password_required"),
            trigger: ["blur", "change"],
          },
          {
            min: 8,
            max: 20,
            message: this.$t("lang.reg_password_rule_error"),
            trigger: ["blur", "change"],
          },
        ],
        vcode: [
          {
            required: true,
            message: this.$t("lang.reg_vcode_required"),
            trigger: ["blur", "change"],
          },
          {
            min: 4,
            max: 4,
            message: this.$t("lang.reg_vcode_length"),
            trigger: ["blur", "change"],
          },
        ],
      },
      forbidden: false,
      button_text: this.$t("lang.login_button_login"),
    };
  },
  watch: {},
  computed: {
    ...mapGetters("user", ["isRoot"]),
    ...mapState("user", ["language", "language", "user_token", "token"]),
  },
  methods: {
    ...mapActions("user", [
      "update_pass_step",
      "login",
      "update_signup_step",
      "update_send_email",
      "remove_login_info",
      "update_language",
    ]),
    ...mapActions("permissions", ["fetch_permission"]),
    ...mapActions("system", ["update_active_team_id"]),
    ...mapActions("report", ["update_show_report_point"]),
    ...mapActions("advertising", ["update_show_sync_point"]),

    show_password() {
      this.pass_show = !this.pass_show;
    },
    find_pass() {
      this.update_pass_step("first");
      this.$router.push({ path: "/user/password_reset" });
    },
    sign_up() {
      this.update_signup_step("first");
      this.$router.push({ path: "/user/signup" });
    },
    async get_vcode() {
      // const data = await fetch.get("/nologin/vcode");
      // if (data) {
      //   this.vcode_img_path = data.url;
      //   // this.$refs.vcode.src = data.url;
      // }
    },
    // 获取默认语言环境
    async get_info_languag() {
      const url = "/nologin/getDefaultLang";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        document.cookie = `lang=${data.lang}`;
        this.update_language(data.lang || "zh");
        window.location.reload();
      }
    },
    to_next() {
      if (this.isRoot) {
        this.$router.replace("/system/root");
        // window.location.reload();
      } else {
        this.$router.replace("/user/team");
        // window.location.reload();
      }
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.button_text = this.$t("lang.login_button_logining");
          this.forbidden = true;
          this.login(this.login_form)
            .then(async (res) => {
              this.button_text = this.$t("lang.login_button_login");
              this.forbidden = false;

              // 判断用户是否弹出过报表提示
              let cookie_ = document.cookie;
              if (cookie_.length) {
                let cookies = cookie_.split("; ");
                if (!cookies.includes(`${res.username}_report_point=true`)) {
                  document.cookie = `${res.username}_report_point=true`;
                  this.update_show_report_point(true);
                } else {
                  this.update_show_report_point(false);
                }

                if (!cookies.includes(`${res.username}_sync_point=true`)) {
                  this.update_show_sync_point(false);
                } else {
                  this.update_show_sync_point(true);
                }
              }

              // 登录成功修改请求头参数
              axios.defaults.headers.common.Authorization = res.token;
              axios.defaults.headers.common.lang = this.language;
              this.to_next();
            })
            .catch((err) => {
              this.get_vcode();
              this.button_text = this.$t("lang.login_button_login");
              this.forbidden = false;
              this.login_form.vcode = "";
            });
        } else {
          return false;
        }
      });
    },
    get_dafault_language() {
      let cookie_ = document.cookie;
      if (cookie_.length && cookie_.indexOf("lang") > -1) {
        let cookies = cookie_.split(";");
        cookies.forEach((item) => {
          const item_data = item.split("=");
          if (item_data[0].trim() === "lang") {
            this.update_language(item_data[1]);
          }
        });
      } else {
        this.get_info_languag();
      }
    },
    async check_email() {
      const url = `/nologin/registerVerify?_s=${encodeURI(
        this.$route.query._s
      )}`;
      const data = await fetch.get(url);
      const self = this;
      if (data) {
        this.login_form.username = data.email;
        this.$message({
          message: self.$t("lang.login_email_verified"),
          duration: 5000,
          type: "success",
          offset: 3,
        });
      }
    },
    // 修改密码重置email
    set_pass_form_email(email) {
      this.login_form.username = email;
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
    // 判断是否是Chrome浏览器
    var isChrome = window.navigator.userAgent.indexOf("Chrome") > -1;
    // var isChrome = window.navigator.userAgent.toLowerCase()
    if (!isChrome) {
      this.$message({
        message: this.$t("lang.not_chrome"),
        duration: 5000,
        offset: 3,
      });
    }

    // if ((/msie/i.test(isChrome) && !/opera/.test(isChrome)) || (/chrome/i.test(isChrome) && /webkit/i.test(isChrome) && /mozilla/i.test(isChrome))) {
    //   alert('ok')
    // }
    this.remove_login_info();
    this.update_send_email("");
    this.update_active_team_id("");
    // this.get_dafault_language();
    if (this.$route.query._s) {
      this.check_email();
    }
    if (this.$route.query.email) {
      this.set_pass_form_email(this.$route.query.email);
    }
    this.get_vcode();
  },
};
</script>
<style lang='scss' scoped>
.login-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  .login-header {
    // width: 100%;
    padding: 0 110px;
    height: 90px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .system-logo-login {
      // width: 250px;
      // height: 60px;
      width: 124px;
      height: 30px;
      background: url("~@/assets/image/maps.svg") no-repeat center;
      background-size: cover;
    }
    .to-HDTC {
      margin-left: 50px;
      font-size: 18px;
      color: #0bb3b3;
      // cursor: pointer;
      text-decoration: none;
    }
  }
  .login-center {
    flex: 1;
    width: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    .maps-introduce {
      // width: 650px;
      // height: 220px;
      width: 674px;
      height: 224px;
      background: url("~@/assets/image/login/introduce.png") no-repeat center;
      // background-size: cover;
    }
    .login-form {
      width: 330px;
      & > span {
        display: inline-block;
        padding-bottom: 10px;
        font-size: 24px;
        font-family: Helvetica;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 33px;
      }
      .forgot-password {
        color: #0bb3b3;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        text-align: right;
        cursor: pointer;
      }

      .vcode {
        width: 97px;
        height: 37px;
        position: absolute;
        top: 1px;
        right: 2px;
      }
    }
  }
}
</style>