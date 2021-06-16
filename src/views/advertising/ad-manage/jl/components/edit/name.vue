<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    class="demo-ruleForm"
  >
    <el-form-item prop="name">
      <el-input
        :placeholder="$t('lang.intelligent_rule_name_placeholder')"
        size="mini"
        v-model="form.name"
      ></el-input>
    </el-form-item>
    <el-form-item
      prop="name"
      style="display: none"
    >
      <el-input
        :placeholder="$t('lang.intelligent_rule_name_placeholder')"
        size="mini"
        v-model="form.name"
      ></el-input>
    </el-form-item>

    <el-form-item style="text-align: right;margin: 0">
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
      >{{$t('lang.public_button_cancel')}}</el-button>
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_save('form')"
        type="primary"
      >{{$t('lang.public_button_save')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  props: {
    config: {},
  },
  data() {
    var validatename = (rule, value, callback) => {
      const name = this.active_tab == "campaign" ? "广告组" : "计划";
      // const tmp_value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
      // const reg = this.$constReg.input_word; //除了引号都允许
      // if (reg.test(tmp_value)) {
      //   callback(new Error(`${name}名称不能为包含引号！`));
      // } else {
      const getBLen = function (str) {
        if (str == null) return 0;
        if (typeof str != "string") {
          str += "";
        }
        return str.replace(/[^\x00-\xff]/g, "01").length;
      };

      value = value.replace(/(^\s*)|(\s*$)/g, "");
      this.form.name = value
      if (getBLen(value) > 100) {
        callback(new Error(`${name}名称不超过50个字，请正确输入！`));
      } else {
        callback();
      }
      // }
    };
    return {
      form: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: validatename,
            trigger: ["blur"],
          },
          {
            required: true,
            message: "名称不能为空！",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  watch: {
    config: {
      handler() {
        if (this.active_tab == "campaign") {
          this.form.name = this.config.campaign_name;
        } else if (this.active_tab == "ad") {
          this.form.name = this.config.ad_name;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  methods: {
    handle_cancel() {
      this.form.name = "";
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
      this.$emit("cancel");
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const param = {};
          this.$set(param, `${this.active_tab}_name`, this.form.name);
          this.$emit("save", param);
        } else {
          return false;
        }
      });
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>