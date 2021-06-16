<template>
  <el-form
    :model="form"
    ref="form"
    class="demo-ruleForm"
  >
    <el-form-item style="margin-bottom: 5px">
      <el-radio-group v-model="form.flow_control_mode">
        <el-radio
          v-for="item in mode_list"
          :key="item.label"
          :label="item.label"
        >{{item.title}}</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item style="text-align: right; margin: 0">
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
  name: "FlowControlMode",
  props: {
    config: {},
  },
  data() {
    return {
      form: {
        flow_control_mode: "FLOW_CONTROL_MODE_FAST",
      },
      mode_list: [],
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  watch: {
    config: {
      handler() {
        if (this.active_tab == "ad") {
          // const mode_o = ["PRICING_OCPM", "PRICING_OCPC","PRICING_CPA"];
          // if (mode_o.includes(this.config.pricing)) {
          this.mode_list = [
            {
              label: "FLOW_CONTROL_MODE_FAST",
              title: "优先跑量",
            },
            {
              label: "FLOW_CONTROL_MODE_SMOOTH",
              title: "控制成本上限",
            },
            {
              label: "FLOW_CONTROL_MODE_BALANCE",
              title: "均衡投放",
            },
          ];
          // } else {
          //   this.mode_list = [
          //     {
          //       label: "FLOW_CONTROL_MODE_FAST",
          //       title: "加速投放",
          //     },
          //     {
          //       label: "FLOW_CONTROL_MODE_SMOOTH",
          //       title: "标准投放",
          //     },
          //   ];
          // }
          this.form.flow_control_mode =
            this.config.flow_control_mode || "FLOW_CONTROL_MODE_FAST";
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handle_cancel() {
      this.form.flow_control_mode = this.config.flow_control_mode;
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