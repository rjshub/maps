<template>
  <div class="campaign_budget_type-condition">
    <el-form
      :model="form"
      :rules="rules"
      ref="campaign_budget_typeForm"
      label-width="0"
      class="condition-form"
    >
      <el-form-item
        label=""
        prop=""
      >
        <el-input
          size="mini"
          class="Number-int"
          @change="validator_form"
          value="="
        >
        </el-input>
      </el-form-item>

      <el-form-item
        label=""
        prop="status"
      >
        <el-select
          v-model="form.type"
          size="mini"
          class="formula"
          @change="validator_form"
          :placeholder="$t('lang.public_select')"
        >
          <el-option
            v-for="item in type_list"
            :key="item.code"
            :label="item[`name_${language}`]"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { config as formulaConfig } from "@/views/tools/mixins/index";
import validator from "./validator";

export default {
  props: {
    config: {
      type: Object,
    },
    range: {
      required: false,
    },
  },
  mixins: [validator],
  components: {},
  data() {
    return {
      form: this.config,
      type_list: formulaConfig.campaignBudgetType,
    };
  },
  watch: {
    config: {
      handler: function (val) {
        this.form = val;
      },
      deep: true,
    },
    range: {
      handler: function () {
        if (this.range == "1") {
          //维度 campaign
          this.form.type = this.form.type == "3" ? "1" : this.form.type;
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    validator_form() {
      let state = true;
      this.$refs.campaign_budget_typeForm.validate((valid) => {
        if (valid) {
          state = true;
          this.$emit("success", this.form);
        } else {
          state = false;
          this.$emit("fail");
        }
      });
      return state;
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>