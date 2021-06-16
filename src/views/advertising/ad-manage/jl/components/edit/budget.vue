<template>
  <el-form
    :model="form"
    :rules="rules"
    ref="form"
    class="demo-ruleForm"
  >
    <div v-if="active_tab == 'campaign'">
      <el-form-item style="margin-bottom: 5px">
        <el-radio-group v-model="form.budget_mode">
          <el-radio-button label="BUDGET_MODE_INFINITE">不限</el-radio-button>
          <el-radio-button label="BUDGET_MODE_DAY">日预算</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        prop="budget"
        v-if="form.budget_mode == 'BUDGET_MODE_DAY'"
      >
        <el-input
          placeholder="请输入预算金额"
          size="mini"
          v-model="form.budget"
        ></el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item
        prop="budget"
        label-width="80px"
        :label="budget_map[form.budget_mode]"
      >
        <el-input
          placeholder="请输入预算金额"
          size="mini"
          v-model="form.budget"
        ></el-input>
      </el-form-item>
    </div>

    <el-form-item style="text-align: right; margin: 0;padding-top: 10px">
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
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Budget",
  props: {
    config: {},
  },
  data() {
    var validateValue = (rule, value, callback) => {
      const pricing = this.config.pricing;
      const one = ["PRICING_CPC", "PRICING_CPM", "PRICING_CPV"];
      const three = ["PRICING_CPA", "PRICING_OCPC", "PRICING_OCPM"];
      const reg = this.$constReg.num; //正整数，最多保留两位小数
      if (!reg.test(value)) {
        callback(new Error("允许小数，最多保留两位小数。"));
      } else {
        value = Number(value)
        if (this.active_tab == "campaign") {
          if (this.config.campaign_type == "FEED") {
            if (value < 300 || value > 9999999.99) {
              callback(new Error("广告组日预算最低为300，最高不能超过9999999.99。"));
            } else {
              callback();
            }
          } else if (this.config.campaign_type == "SEARCH") {
            if (value < 1000 || value > 9999999.99) {
              callback(new Error("广告组日预算最低为1000，最高不能超过9999999.99。"));
            } else {
              callback();
            }
          }
        } else {
          if (value > 9999999.99) {
            callback(new Error(
              "修改金额不符合规则。CPC、CPM,最低计划日预算100；CPA、oCPC、oCPM最低计划日预算是300；计划预算最高设置不能超过9999999.99。"
            ))
          } else {
            if (one.includes(pricing)) {
              if (value < 100) {
                callback(
                  new Error(
                    "修改金额不符合规则。CPC、CPM,最低计划日预算100；CPA、oCPC、oCPM最低计划日预算是300；计划预算最高设置不能超过9999999.99。"
                  )
                );
              } else {
                callback();
              }
            } else if (three.includes(pricing)) {
              if (value < 300) {
                callback(
                  new Error(
                    "修改金额不符合规则。CPC、CPM,最低计划日预算100；CPA、oCPC、oCPM最低计划日预算是300；计划预算最高设置不能超过9999999.99。"
                  )
                );
              } else {
                callback();
              }
            }
          }
        }
      }
    };
    return {
      form: {
        budget_mode: "BUDGET_MODE_INFINITE",
        budget: "",
      },
      rules: {
        budget: [
          {
            required: true,
            validator: validateValue,
            trigger: ["blur"],
          },
        ],
      },
      budget_map: {
        BUDGET_MODE_INFINITE: "不限",
        BUDGET_MODE_DAY: "日预算",
        BUDGET_MODE_TOTAL: "总预算",
      },
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  watch: {
    config: {
      handler() {
        this.form.budget_mode =
          this.config.budget_mode || "BUDGET_MODE_INFINITE";
        this.form.budget = this.config.budget || 0;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handle_cancel() {
      // this.form.budget_mode = this.config.budget_mode;
      // this.form.budget = this.config.budget;
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
      this.$emit("cancel");
    },
    handle_save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("save", this.form);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>