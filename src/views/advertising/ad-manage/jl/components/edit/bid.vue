<template>
  <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
    <el-form-item prop="bid" label-width="50px" label="出价">
      <el-input placeholder="预算" size="mini" v-model="form.bid"></el-input>
    </el-form-item>
    <span class="point"
      >1. 建议您尽量不修改、少修改。系统在修改出价后会重新计算投放模型。</span
    >
    <span class="point"
      >2. 若您仍要修改出价，请短时间不要再修改计划其他
      内容，否则可能会影响投放稳定性。</span
    >
    <el-form-item style="text-align: right; margin: 0">
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
        >{{ $t("lang.public_button_cancel") }}</el-button
      >
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_save('form')"
        type="primary"
        >{{ $t("lang.public_button_save") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Bid",
  props: {
    config: {},
  },
  data() {
    var validateValue = (rule, value, callback) => {
      const pricing = this.config.pricing;
      const reg = this.$constReg.num; //正整数，最多保留两位小数
      const pricing_map = {
        PRICING_CPM: {
          data: [4, 100],
          msg: "出价类型为CPM的计划，最低出价为4元，最高出价为100元。",
        },
        PRICING_OCPM: {
          data: [0.1, 10000],
          msg: "出价类型为OCPM的计划，最低出价为0.1元，最高出价为10000元。",
        },
        PRICING_CPC: {
          data: [0.2, 100],
          msg: "出价类型为CPC的计划，最低出价为0.2元，最高出价为100元。",
        },
        PRICING_OCPC: {
          data: [0.1, 10000],
          msg: "出价类型为OCPC的计划，最低出价为0.1元，最高出价为10000元。",
        },
        PRICING_CPA: {
          data: [1, 1500],
          msg: "出价类型为CPA的计划，最低出价为1元，最高出价为1500元。",
        },
        PRICING_CPV: {
          data: [0.07, 100],
          msg: "出价类型为CPV的计划，最低出价为0.07元，最高出价为100元。",
        },
      };
      if (!reg.test(value)) {
        callback(new Error("允许小数，最多保留两位小数。"));
      } else {
        value = Number(value)
        if (
          value < pricing_map[pricing].data[0] ||
          value > pricing_map[pricing].data[1]
        ) {
          callback(new Error(pricing_map[pricing].msg));
        } else {
          if (value > Number(this.config.budget)) {
            callback(new Error("计划出价需小于计划预算。"));
          } else {
            callback();
          }
        }
      }
    };
    return {
      form: {
        bid: "",
      },
      rules: {
        bid: [
          {
            required: true,
            validator: validateValue,
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
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  watch: {
    config: {
      handler() {
        if (this.active_tab == "ad") {
          this.form.bid = this.config.bid || 0;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handle_cancel() {
      // this.form.bid = this.config.bid;
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

<style scoped>
.point {
  display: inline-block;
  color: #ff0000;
  line-height: 24px;
}
</style>