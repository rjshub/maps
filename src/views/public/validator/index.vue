<template>
    <div class=""></div>
</template>

<script>
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('lang.reg_password_required')));
      } else {
        value = value.replace(/[^\a-\z\A-\Z0-9\!\+\-\*\@\#\$\.\~\s+]/g, "");
        this.sign_up_form.password = value;
        let reg = this.$constReg.password; //仅允许英文大小写、数字、特殊字符!-+*@#$ .~中的至少2种组合。8位到20位
        if (!reg.test(value)) {
          callback(new Error(this.$t('lang.reg_password_rule_error')));
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
        callback(new Error(this.$t('lang.reg_confirm_password_required')));
      } else if (value !== this.sign_up_form.password) {
        callback(new Error(this.$t('lang.reg_confirm_password_rule_error')));
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
      // 登录表单验证
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
      //   个人信息修改
      info_rules: {
        email: [
          {
            required: true,
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
      },
      //   个人中心修改密码
      password_rules: {
        old_password: [{ required: true, message: this.$t('lang.reg_Original_password_required') }],
        new_password: [{ required: true, validator: validatePass }],
        confirm_password: [{ required: true, validator: validate_confirm_password }],
      },
    };
  },
  watch: {},
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>