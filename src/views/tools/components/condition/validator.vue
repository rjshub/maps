<template>
    <div class=""></div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    // %
    var validateNumber1 = (rule, value, callback) => {
      let reg = /^([1-9][0-9]{0,1}|100)$/; //
      let msg = this.$t("lang.reg_rule_condition_1_100");
      if (!reg.test(value)) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    // 0-9999999.99
    var validateNumber2 = (rule, value, callback) => {
      
      if (!value) {
        callback(new Error(this.$t("lang.reg_rule_condition_0_9999999")));
      }
      if (value >= 0 && value <= 9999999.99) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 2) {
            callback(new Error(this.$t("lang.reg_2_places")));
          } else {
            callback()
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_rule_condition_0_9999999")));
      }
    };
    // 0-10000
    var validateNumber3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("lang.reg_rule_condition_0_10000")));
      }
      if (value >= 0 && value <= 10000) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 0) {
            callback(new Error(this.$t("lang.reg_rule_condition_0_10000")));
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_rule_condition_0_10000")));
      }
    };
    // 0-999999999
    var validateNumber4 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("lang.reg_rule_condition_0_999999999")));
      }
      if (value >= 0 && value <= 999999999) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 0) {
            callback(new Error(this.$t("lang.reg_rule_condition_0_999999999")));
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_rule_condition_0_999999999")));
      }
    };
    // 验证投放时间大小
    var validateHourSize = (rule, value, callback) => {
      if (this.is_between && this.form.hour != "") {
        if (Number(this.form.hour2) < Number(this.form.hour)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.hour}`));
        } else if (this.form.hour2 == this.form.hour) {
          this.form.hour2 = "";
          this.is_between = false;
          this.form.compare = "1";
          callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证消耗预估转化成本大小
    var validateCostSize = (rule, value, callback) => {
      if (this.is_between && value != "") {
        if (value < Number(this.form.cost)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.cost}`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证消耗预估转化成本百分数大小
    var validateCostPercentSize = (rule, value, callback) => {
      if (this.is_between && this.form.percent2 != "") {
        if (Number(this.form.percent2) < Number(this.form.percent)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.percent}`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证转换成本（上报）cost大小
    var validateConvertCostSize = (rule, value, callback) => {
      if (this.is_between && this.form.convert_cost2 != "") {
        if (Number(this.form.convert_cost2) < Number(this.form.convert_cost)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.convert_cost}`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证转换成本（播放）cost大小
    var validateAttributionConvertCostSize = (rule, value, callback) => {
      if (this.is_between && this.form.attribution_convert_cost2 != "") {
        if (Number(this.form.attribution_convert_cost2) < Number(this.form.attribution_convert_cost)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.attribution_convert_cost}`));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证转化数（上报）大小
    var validateConvertSize = (rule, value, callback) => {
      if (this.is_between && this.form.convert != "") {
        if (Number(this.form.convert2) < Number(this.form.convert)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.convert}`));
        } else if (this.form.convert2 == this.form.convert) {
          this.form.convert2 = "";
          this.is_between = false;
          this.form.compare = "1";
          callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    // 验证转化数（播放）大小
    var validateAttributionConvertSize = (rule, value, callback) => {
      if (this.is_between && this.form.attribution_convert != "") {
        if (Number(this.form.attribution_convert2) < Number(this.form.attribution_convert)) {
          callback(new Error(`${this.$t("lang.public_must")} ≥ ${this.form.attribution_convert}`));
        } else if (this.form.attribution_convert2 == this.form.attribution_convert) {
          this.form.attribution_convert2 = "";
          this.is_between = false;
          this.form.compare = "1";
          callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      rules: {
        // 投放时间
        hour: [{ required: true, validator: validateNumber1, trigger: ["blur","change"] }],
        hour2: [
          { required: true, validator: validateNumber1, trigger: ["blur"] },
          { required: true, validator: validateHourSize, trigger: ["blur"] },
        ],
        // 消耗
        data_range: [{ required: true, trigger: ["blur"] }],
        costrange: [{ required: true, trigger: ["blur"] }],
        costrangetype: [{ required: true, message: '请选择数据范围。',trigger: ["blur"] }],
        cost: [{ required: true, validator: validateNumber2, trigger: ["blur"] }],
        percent: [{ required: true, validator: validateNumber3, trigger: ["blur"] }],
        cost2: [
          { required: true, validator: validateNumber2, trigger: ["blur"] },
          { required: true, validator: validateCostSize, trigger: ["blur"] },
        ],
        percent2: [
          { required: true, validator: validateNumber3, trigger: ["blur"] },
          { required: true, validator: validateCostPercentSize, trigger: ["blur"] },
        ],
        // 转化数（上报）
        convert: [{ required: true, validator: validateNumber4, trigger: ["blur"] }],
        convert2: [
          { required: true, validator: validateNumber4, trigger: ["blur"] },
          { required: true, validator: validateConvertSize, trigger: ["blur"] },
        ],
        // 转化成本（上报）
        convert_cost: [{ required: true, validator: validateNumber2, trigger: ["blur"] }],
        convert_cost2: [
          { required: true, validator: validateNumber2, trigger: ["blur"] },
          { required: true, validator: validateConvertCostSize, trigger: ["blur"] },
        ],
        // 转化数（播放）
        attribution_convert: [{ required: true, validator: validateNumber4, trigger: ["blur"] }],
        attribution_convert2: [
          { required: true, validator: validateNumber4, trigger: ["blur"] },
          { required: true, validator: validateAttributionConvertSize, trigger: ["blur"] },
        ],
        // 转化成本（播放）
        attribution_convert_cost: [{ required: true, validator: validateNumber2, trigger: ["blur"] }],
        attribution_convert_cost2: [
          { required: true, validator: validateNumber2, trigger: ["blur"] },
          { required: true, validator: validateAttributionConvertCostSize, trigger: ["blur"] },
        ],
      },
    };
  },
  computed: {
    ...mapState("user", ["language"]),
    ...mapState("tools", ["rule_handle_type"]),
  },
  watch: {},
  methods: {},
  mounted() {},
};
</script>
<style lang='scss'>
.condition-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    //   float: left;
    padding-left: 0 !important;
    margin-right: 10px;
    margin-bottom: 15px !important;
    .el-form-item__content {
      line-height: 31px;
      //   .formula.el-select {
      //     width: 100px !important;
      //   }
      //   .Number-int.el-input {
      //     width: 150px !important;
      //   }
      .el-select,
      .el-input {
        width: 150px !important;
      }
    }
  }

  .inline-condition-form {
    display: flex;
  }
  .L {
    display: inline-block;
    line-height: 32px;
    padding-right: 10px;
  }
}
</style>