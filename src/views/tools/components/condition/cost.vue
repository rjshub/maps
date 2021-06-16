<template>
  <div class="cost_condition">
    <el-form
      key="cost_form"
      :model="form"
      :rules="rules"
      ref="costForm"
      label-width="0"
      class="condition-form"
    >
      <el-form-item
        label=""
        :show-message="false"
        prop="data_range"
      >
        <el-select
          v-model="form.data_range"
          size="mini"
          class="formula"
          @change="data_range_change"
          :placeholder="$t('lang.public_select')"
        >
          <el-option
            v-for="item in dataScope"
            :key="item.code"
            :label="item[`name_${language}`]"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label=""
        prop="compare"
      >
        <el-select
          v-model="form.compare"
          size="mini"
          class="formula"
          @change="compare_change"
          :placeholder="$t('lang.public_select')"
        >
          <el-option
            v-for="item in formula"
            :key="item.code"
            :disabled="is_top3 && item.code != 1"
            :label="item[`name_${language}`]"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label=""
        :show-message="false"
        prop="costrange"
      >
        <el-select
          v-model="form.costrange"
          size="mini"
          class="formula"
          @change="costrange_change"
          :placeholder="$t('lang.public_select')"
        >
          <el-option
            v-for="item in data_type_list"
            :key="item.code"
            :label="item[`name_${language}`]"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 条件设置 -->
      <div
        v-for="(module_item, index) in module_list"
        :key="`cost_${index}`"
      >
        <!-- 输入框 -->
        <el-form-item
          label=""
          v-if="module_item.type == 'input' && module_item.show"
          :prop="module_item.key"
          :rules="module_item.show? rules[module_item.key]:{}"
        >
          <el-input
            size="mini"
            class="Number-int"
            @change="validator_form"
            :placeholder="module_item.placeholder"
            v-model="form[module_item.key]"
          >
            <template
              v-if="module_item.append"
              slot="append"
            >{{
              module_item.append
            }}</template>
          </el-input>
        </el-form-item>
        <!-- 下拉框 -->
        <el-form-item
          label=""
          v-if="module_item.type == 'select' && module_item.show"
          :prop="module_item.key"
          :rules="module_item.show? rules[module_item.key]:{}"
        >
          <maps-tooltip :text="
              module_item.tooltip
                ? set_tooltip(module_item.options, form[module_item.key])
                : ''
            ">
            <el-select
              v-model="form[module_item.key]"
              size="mini"
              class="formula"
              dir="ltr"
              :disabled="module_item.disabled"
              @change="vlaue_change($event, module_item)"
              :placeholder="$t('lang.public_select')"
            >
              <el-option
                v-for="item in module_item.options"
                :key="item.code"
                :disabled="item.disabled"
                :label="item[`name_${language}`]"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </maps-tooltip>
        </el-form-item>
        <!-- 文字占位 -->
        <span
          class="L"
          v-if="module_item.type == 'text' && module_item.show"
        >{{
          module_item.key
        }}</span>
      </div>
      <maps-tooltip
        :text="costrange_point"
        align="left"
        v-if="form.costrange == 2 && !is_2_1"
      >
        <i
          class="iconfont maps-icon-info"
          style="color: #999; font-size: 13px;line-height: 32px"
        ></i>
      </maps-tooltip>
    </el-form>
  </div>
</template>

<script>
import {
  config as formulaConfig,
  reset_range as reset_range,
  cost_campaignDataType as campaignDataType,
  cost_adDataType as adDataType,
} from "@/views/tools/mixins/index";
import validator from "./validator";
import _ from "lodash";

export default {
  components: {},
  props: {
    config: {
      type: Object,
    },
    range: {
      required: false,
    },
  },
  mixins: [validator],
  data() {
    return {
      form: _.cloneDeep(this.config),
      formula: formulaConfig.formulaList,
      dataScope: formulaConfig.dataScope,
      is_between: false,
      module_list: [],
      is_top3: false,
      is_2_1: false, //消耗+总数据
      costrange_point:
        '条件中的“范围”指计算范围。<br><br><span style="color:#FF6600">【案例1】</span><br><span style="font-weight: 700">如条件1：消耗（总数据）＞消耗（近3天数据）（范围内）*1000%</span><br><br>当您在【广告智投】模块将此规则挂在Campaign1上，指定计算范围为Campaign1、Campaign2时：<br><br>系统按照该条件检查Campaign1，会比对 Campaign1的总消耗是否大于范围内（Campaign1近3天数据+Campaign2近3天数据）的总消耗*1000%<br><br><span style="color:#FF6600">【案例2】</span><br><span style="font-weight: 700">如条件1：转化成本（上报）（近3日数据）≥ 转化成本（上报）（近3日数据）（范围内）*1000%</span><br><br>当您在【广告智投】模块将此规则挂在Campaign1上，指定计算范围为Campaign1、Campaign2时：<br><br>系统按照该条件检查Campaign1，会比对 Campaign1在近3天（包含系统检查当天）的转化成本（上报）是否≥范围内（Campaign1和Campaign2）近3天的平均转化成本*1000%<br><br><span style="font-weight: 700">平均转化成本的计算公式=</span><br>（Campaign1近3天消耗+Campaign2近3天消耗）/（Campaign1近3天转化数+Campaign2近3天转化数）<br><br><span style="color:#FF6600">【案例3】</span><br><span style="font-weight: 700">如条件1：转化成本（上报）（当天数据）=  转化成本（上报）（当天数据）（范围内TOP3）*100%</span><br><br>当您在【广告智投】模块将此规则挂在Campaign1上，指定计算范围为账号1下的Campaign1、Campaign2、Campaign3、Campaign4时：<br><br>系统按照该条件检查Campaign1，逻辑关系式右侧的 “转化成本（上报）（总数据）”对应的计算范围为（Campaign1、Campaign2、Campaign3、Campaign4），系统会将这4个Campaign按照总转化成本（上报）的金额从高到低进行排名，如果Campaign1的数据在此排名列表中排名前3，就算符合这个条件。',
    };
  },
  watch: {
    config: {
      handler: function (val) {
        if (_.isEqual(this.form, val)) {
          return false;
        }
        this.form = _.cloneDeep(val);

        reset_range(val, this.config);
        if (this.range == "1") {
          //维度 campaign
          this.form.costrange =
            this.form.costrange == "4" ? "3" : this.form.costrange; // form-type-campaign-"2"
          this.form.costrange2 =
            this.form.costrange2 == "4" ? "3" : this.form.costrange2;
        } else {
          this.form.costrange =
            this.form.costrange == "3" ? "4" : this.form.costrange; // form-type-campaign-"2"
          this.form.costrange2 =
            this.form.costrange2 == "3" ? "4" : this.form.costrange2;
        }
        this.costrange_change(this.form.costrange, false);
        if (this.form.costrangetype == 2) {
          this.is_top3 = true;
        } else {
          this.is_top3 = false;
        }
      },
      deep: true,
    },
    range: {
      handler: function (val) {
        reset_range(val, this.config);
        if (val == "1") {
          //维度 campaign
          this.form.costrange =
            this.form.costrange == "4" ? "3" : this.form.costrange; // form-type-campaign-"2"
          this.form.costrange2 =
            this.form.costrange2 == "4" ? "3" : this.form.costrange2;
        } else {
          this.form.costrange =
            this.form.costrange == "3" ? "4" : this.form.costrange; // form-type-campaign-"2"
          this.form.costrange2 =
            this.form.costrange2 == "3" ? "4" : this.form.costrange2;
        }

        this.costrange_change(this.form.costrange, false);
        if (this.form.costrangetype == 2) {
          this.is_top3 = true;
        } else {
          this.is_top3 = false;
        }
      },
      deep: true,
    },
  },
  computed: {
    data_type_list() {
      if (this.range == "1") {
        return campaignDataType;
      } else {
        return adDataType;
      }
    },
  },
  methods: {
    // 重置数据类型
    reset_data_type() {
      reset_range(this.range, this.config);
      this.costrange_change(this.form.costrange, false);
    },
    // 设置tooltip
    set_tooltip(options, key) {
      const index = options.findIndex((obj) => {
        return obj.code == key;
      });
      if (index >= 0) {
        return options[index][`name_${this.language}`];
      }
    },
    // 左侧数据类型变化
    data_range_change() {
      // 禁用不设置范围
      this.same_forbidden();
    },
    // 改变数据类型
    costrange_change(param, update = true) {
      this.is_top3 = false;
      this.renew_model();

      if (update) {
        this.refresh();
        this.$refs.costForm.clearValidate();
      }

      if (param == 1) {
        this.form.type = "";
        //固定值
        if (this.form.compare == 6) {
          //介于
          this.module_list = _.cloneDeep(formulaConfig.costrange_1_6);
          this.form.costrange2 = this.form.costrange;
        } else {
          // 其他
          this.module_list = _.cloneDeep(formulaConfig.costrange_1_X);
          this.form.costrange2 = "";
        }
      } else if (param == 2) {
        // 消耗
        // this.form.type = this.form.type || this.form.data_range;
        this.form.type = this.form.data_range == '1'? '2':this.form.type || this.form.data_range;
        this.form.costrangetype = this.form.costrangetype || "1";
        if (this.form.compare == 6) {
          //介于
          this.module_list = _.cloneDeep(formulaConfig.costrange_2_6);
          this.form.costrange2 = this.form.costrange;
          this.form.type2 = this.form.type;
          this.form.costrangetype2 = this.form.costrangetype;
          if (this.form.type == 1) {
            this.reset_2_1();
          }
          // top3
          if (this.form.costrangetype == 2) {
            this.reset_costrangetype_2();
          }
        } else {
          // 其他
          this.module_list = _.cloneDeep(formulaConfig.costrange_2_X);
          this.form.costrange2 = "";
          this.form.type2 = "";
          this.form.costrangetype2 = "";
          if (this.form.type == 1) {
            this.reset_2_1();
          }
          // top3
          if (this.form.costrangetype == 2) {
            this.reset_costrangetype_2();
          }
        }

        // 禁用不设置范围
        this.same_forbidden();
      } else if (param == 3 || param == 4) {
        this.form.type = "";
        // campaign和ad预算
        if (this.form.compare == 6) {
          //介于
          this.module_list = _.cloneDeep(formulaConfig.costrange_3_6);
          this.form.costrange2 = this.form.costrange;
        } else {
          // 其他
          this.module_list = _.cloneDeep(formulaConfig.costrange_3_X);
          this.form.costrange2 = "";
        }
      }

      //   this.$refs.costForm.validate()
    },
    compare_change(param) {
      this.refresh();
      this.$refs.costForm.clearValidate();
      if (this.form.costrange == "") {
        this.$refs.costForm.validate("costrange");
        this.$message({
          message: this.$t("lang.reg_rule_condition_required"),
          duration: 5000,
          type: "error",
          offset: 3,
        });
      } else {
        if (param == 6) {
          this.is_between = true;
          if (this.form.costrange == "1") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_1_6);
            this.form.costrange2 = this.form.costrange;
          } else if (this.form.costrange == "2") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_2_6);
            this.form.costrange2 = this.form.costrange;
            this.form.type2 = this.form.type;
            this.form.costrangetype2 = this.form.costrangetype;
          } else if (this.form.costrange == "3" || this.form.costrange == "4") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_3_6);
            this.form.costrange2 = this.form.costrange;
          }
        } else {
          this.is_between = false;
          if (this.form.costrange == "1") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_1_X);
            this.form.costrange2 = "";
          } else if (this.form.costrange == "2") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_2_X);
            this.form.costrange2 = "";
            this.form.type2 = "";
            this.form.costrangetype2 = "";
          } else if (this.form.costrange == "3" || this.form.costrange == "4") {
            this.module_list = _.cloneDeep(formulaConfig.costrange_3_X);
            this.form.costrange2 = "";
          }
        }
        // 两边一样
        if (this.form.costrange == 2 && this.form.type == 1) {
          this.reset_2_1();
        } else {
          this.renew_model();
        }
        // top3
        if (this.form.costrangetype == 2) {
          this.reset_costrangetype_2();
        }
        // 禁用不设置范围
        this.same_forbidden();
      }
    },
    vlaue_change(param, config) {
      this.$refs.costForm.clearValidate();
      if (config.key == "costrangetype") {
        if (this.form.costrangetype == 2) {
          this.is_top3 = true;
          this.form.compare = "1";
          this.module_list = _.cloneDeep(formulaConfig.costrange_2_X);
          this.form.costrange2 = "";
          this.form.type2 = "";
          this.form.costrangetype2 = "";
          this.form.percent2 = "";
          this.form.percent = "";
        } else {
          if (this.form.compare == 6) {
            this.module_list = _.cloneDeep(formulaConfig.costrange_2_6);
          } else {
            this.module_list = _.cloneDeep(formulaConfig.costrange_2_X);
          }
          
          this.is_top3 = false;
        }
      }
      // 数据类型变化
      if (config.key == "type") {
        this.form.costrangetype = this.form.costrangetype || '1'
        this.form.costrangetype2 = this.form.costrangetype
        this.is_top3 = false;
        this.renew_model();
        if (this.form.costrange == 2 && this.form.type == 1) {
          this.reset_2_1();
        }
        if (this.form.costrangetype == 2) {
          this.reset_costrangetype_2()
        }
      }
      // 范围变化
      if (config.key == "costrangetype") {
        this.is_top3 = false;
        this.renew_model();
        if (this.form.costrangetype == 2) {
          this.reset_costrangetype_2();
        }
      }
      // 禁用不设置范围
      this.same_forbidden();

      this.validator_form();
      if (config.hasOwnProperty("relation") && this.form.compare == "6") {
        this.form[config.relation] = this.form[config.key];
      }
    },
    // 消耗+总数据时重置表单
    reset_2_1() {
      this.form.costrangetype = "";
      this.form.costrangetype2 = "";
      this.is_2_1 = true;
      const not_show = ["costrangetype", "costrangetype2"];
      this.module_list.forEach((item) => {
        if (not_show.includes(item.key)) {
          item.show = false;
        }
      });
    },
    // 恢复表单
    renew_model() {
      this.is_2_1 = false;
      this.module_list.forEach((item) => {
        item.show = true;
      });
    },
    // top3隐藏
    reset_costrangetype_2() {
      this.form.percent = "";
      this.form.percent2 = "";
      this.is_2_1 = true;
      this.is_top3 = true;
      const not_show = ["×", "percent", "percent2"];
      this.module_list.forEach((item) => {
        if (not_show.includes(item.key)) {
          item.show = false;
        }
      });
    },
    // 左右数据格式+范围一样时，禁用不设置范围
    same_forbidden() {
      // 左侧是总数据，禁用右侧总数据
      const types = ['type', 'type1']
      if (this.form.data_range == 1) {
        this.form.type = this.form.type == '1'? '2':this.form.type
        this.form.type2 = this.form.type2 == '1'? '2':this.form.type2
        this.module_list.forEach((item) => {
          if (types.includes(item.key)) {
            item.options.forEach((option) => {
              if (option.code == 1) {
                option.disabled = true;
              }
            });
          }
        });
      } else {
        this.module_list.forEach((item) => {
          if (types.includes(item.key)) {
            item.options.forEach((option) => {
              option.disabled = false;
            });
          }
        });
      }
      const keys = ["costrangetype", "costrangetype2"];
      if (this.form.costrange == 2 && this.form.data_range == this.form.type) {
        this.form.costrangetype =
          this.form.costrangetype == 3 ? "" : this.form.costrangetype;
        this.form.costrangetype2 =
          this.form.costrangetype2 == 3 ? "" : this.form.costrangetype2;
        this.module_list.forEach((item) => {
          if (keys.includes(item.key)) {
            item.options.forEach((option) => {
              if (option.code == 3) {
                option.disabled = true;
              }
            });
          }
        });
      } else {
        this.module_list.forEach((item) => {
          if (keys.includes(item.key)) {
            item.options.forEach((option) => {
              option.disabled = false;
            });
          }
        });
      }
    },
    validator_form() {
      let state = true;
      this.$refs.costForm.validate((valid) => {
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
      this.form.cost = "";
      this.form.percent = ""; //50%
      this.form.cost2 = ""; //选择介于的时候才出现
      this.form.percent2 = ""; //选择介于的时候才出现
      if (this.range == "1") {
        //维度 campaign
        this.form.costrange =
          this.form.costrange == "4" ? "3" : this.form.costrange; // form-type-campaign-"2"
        this.form.costrange2 =
          this.form.costrange2 == "4" ? "3" : this.form.costrange2;
      } else {
        //维度 ad
        this.form.costrange =
          this.form.costrange == "3" ? "4" : this.form.costrange; // form-type-campaign-"2"
        this.form.costrange2 =
          this.form.costrange2 == "3" ? "4" : this.form.costrange2;
      }
    },
  },
  mounted() {
    // if (this.rule_handle_type != "create") {
    reset_range(this.range, this.config);
    this.costrange_change(this.form.costrange, false);
    if (this.form.costrangetype == 2) {
      this.is_top3 = true;
    }
    // }
  },
};
</script>
<style lang='scss' scoped>
.cost-container {
  display: flex;
}
</style>