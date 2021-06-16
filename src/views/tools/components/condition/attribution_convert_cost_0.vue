<template>
    <div class="attribution_convert_cost-condition">
        <el-form :model="form"
            :rules="rules"
            ref="attribution_convert_costForm"
            label-width="0"
            class="condition-form">
            <el-form-item label=""
                :show-message="false"
                prop="data_range">
                <el-select v-model="form.data_range"
                    size="mini"
                    class="formula"
                    @change="data_range_change"
                    :placeholder="$t('lang.public_select')">
                    <el-option v-for="item in dataScope"
                        :key="item.code"
                        :label="item[`name_${language}`]"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=""
                prop="compare">
                <el-select v-model="form.compare"
                    size="mini"
                    class="formula"
                    @change="compare_change"
                    :placeholder="$t('lang.public_select')">
                    <el-option v-for="item in formula"
                        :key="item.code"
                        :label="item[`name_${language}`]"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- 条件设置 -->
            <div v-for="(module_item, index) in module_list"
                :key="index">
                <el-form-item label=""
                    v-if="module_item.type == 'input'"
                    :prop="module_item.key"
                    :rules="rules[module_item.key]">
                    <el-input size="mini"
                        class="Number-int"
                        @change="validator_form"
                        :placeholder="module_item.placeholder"
                        v-model="form[module_item.key]">
                        <template v-if="module_item.append"
                            slot="append">{{module_item.append}}</template>
                    </el-input>
                </el-form-item>
                <el-form-item label=""
                    v-if="module_item.type == 'select'"
                    :prop="module_item.key"
                    :rules="rules[module_item.key]">
                    <maps-tooltip :text="module_item.tooltip? set_tooltip(module_item.options, form[module_item.key]):''">
                        <el-select v-model="form[module_item.key]"
                            size="mini"
                            class="formula"
                            @change="validator_form"
                            :placeholder="$t('lang.public_select')">
                            <el-option v-for="item in module_item.options"
                                :key="item.code"
                                :label="item[`name_${language}`]"
                                :value="item.code">
                            </el-option>
                        </el-select>
                    </maps-tooltip>

                </el-form-item>
                <span class="L"
                    v-if="module_item.type == 'text'">{{module_item.key}}</span>
            </div>
        </el-form>
    </div>
</template>

<script>
import { config as formulaConfig } from "@/views/tools/mixins/index";
import validator from "./validator";
import _ from "lodash";

export default {
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [validator],
  components: {},
  data() {
    return {
      form: this.config,
      formula: formulaConfig.formulaList,
      dataScope: formulaConfig.dataScopeCostPer,
      is_between: false,
      module_list: [],
    };
  },
  watch: {
    config: {
      handler: function (val) {
        this.form = val;
        this.data_range_change(this.form.data_range, false);
      },
      deep: true,
    },
  },
  methods: {
    // 设置tooltip
    set_tooltip(options, key) {
      const index = options.findIndex((obj) => {
        return obj.code == key;
      });
      if (index >= 0) {
        return options[index][`name_${this.language}`];
      }
    },
    data_range_change(param, update = true) {
      if (update) {
        this.refresh();
        this.$refs.attribution_convert_costForm.clearValidate();
      }

      if (param == 1) {
        //总数据
        if (this.form.compare == 6) {
          //介于
          this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_1_6);
        } else {
          // 其他
          this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_1_X);
        }
      } else if (param == 3) {
        if (this.form.compare == 6) {
          //介于
          this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_3_6);
        } else {
          // 其他
          this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_3_X);
        }
      }
    },
    compare_change(param) {
      this.refresh();
      this.$refs.attribution_convert_costForm.clearValidate();
      if (this.form.data_range == "") {
        this.$refs.costForm.validate("data_range");
        this.$message({
          message: this.$t("lang.reg_rule_condition_required"),
          duration: 5000,
          type: "error",
          offset: 3,
        });
      } else {
        if (param == 6) {
          this.is_between = true;
          if (this.form.data_range == "1") {
            this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_1_6);
          } else if (this.form.data_range == "3") {
            this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_3_6);
          }
        } else {
          this.is_between = false;
          if (this.form.data_range == "1") {
            this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_1_X);
          } else if (this.form.data_range == "3") {
            this.module_list = _.cloneDeep(formulaConfig.attribution_convert_cost_3_X);
          }
        }
      }
    },
    validator_form() {
      let state = true;
      this.$refs.attribution_convert_costForm.validate((valid) => {
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
    refresh() {
      this.form.attribution_convert_cost = "";
      this.form.percent = "";
      this.form.attribution_convert_cost2 = "";
      this.form.percent2 = "";
    },
  },
  mounted() {
    // if (this.rule_handle_type != "create") {
    this.data_range_change(this.form.data_range, false);
    // }
  },
};
</script>
<style lang='scss' scoped>
</style>