<template>
  <maps-drawer
    :title="drawer_title"
    :loading="isLoading"
    @close="close_drawer"
    size="calc(100% - 190px)"
    class="rule-create-drawer"
    ref='mpasDrawer_log'
  >
    <section slot="drawerHeader">
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
      >{{$t('lang.public_button_cancel')}}</el-button>
      <el-button
        size="mini"
        :disabled="!is_checked_model"
        class="maps-button-mini"
        @click="handle_save('rule_form')"
        type="primary"
      >{{$t('lang.public_button_save')}}</el-button>
    </section>
    <section
      slot="drawerBody"
      class="create-main"
    >
      <el-collapse
        v-model="activeNames"
        @change="activeNames_change"
      >
        <!-- 选择规则模板 -->
        <el-collapse-item
          :title="$t('lang.intelligent_rule_create_collapse.title_1')"
          name="1"
          v-loading="load_model"
        >
          <el-radio-group
            v-model="model_type"
            size="mini"
          >
            <el-radio-button label="">{{$t('lang.intelligent_rule_create_model.All')}}</el-radio-button>
            <el-radio-button label="budget">{{$t('lang.intelligent_rule_create_model.Budget')}}</el-radio-button>
            <el-radio-button label="quality">{{$t('lang.intelligent_rule_create_model.Quality')}}</el-radio-button>
          </el-radio-group>
          <div class="model-list">
            <el-row
              :gutter="20"
              style="width: 100%"
              v-for="(row_item, row_index) in Math.ceil(set_active_model_list.length/4)"
              :key="row_index"
            >
              <el-col
                :span="6"
                v-for="model_item in set_active_model_list.slice(row_index*4, (row_index+1)*4)"
                :key="model_item.id"
              >
                <ModelItem
                  :config="model_item"
                  @update_model="update_model"
                ></ModelItem>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-form
          :model="rule_form"
          :rules="rules"
          ref="rule_form"
          :hide-required-asterisk="true"
          :label-width="language === 'zh'? '80px':'110px'"
          label-position="left"
          class="demo-rule_form"
        >
          <!-- 新建智能规则 -->
          <el-collapse-item
            :title="$t('lang.intelligent_rule_create_collapse.title_2')"
            :disabled="!is_checked_model"
            name="2"
          >
            <el-form-item
              :label="$t('lang.intelligent_rule_create_form.name')"
              prop="name"
            >
              <el-input
                :placeholder="$t('lang.intelligent_rule_name_placeholder')"
                style="width:90%"
                maxlength="40"
                size="mini"
                show-word-limit
                @change="rule_name_change"
                v-model="rule_form.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('lang.intelligent_rule_create_form.platform')"
              class="error-reset "
              style="margin-bottom: 5px"
              prop="platform"
            >
              <el-checkbox-group
                v-model="rule_form.platform"
                @change="rule_platform_change"
                :min="1"
              >
                <el-checkbox
                  :label="String(item.id)"
                  v-for="item in platform_config"
                  :disabled="rule_handle_type == 'create' && (active_model.id != '1' && !active_model.platform.split(',').includes(String(item.id)))"
                  :key="item.code"
                >
                  {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item
              :label="$t('lang.intelligent_rule_create_form.range')"
              class="error-reset "
              style="margin-bottom: 0px"
              prop="range"
            >
              <el-radio-group
                v-model="rule_form.range"
                @change="range_change"
              >
                <el-radio
                  :label="item.code"
                  v-for="item in range_list"
                  :key="item.code"
                >{{item.name}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="inline-form">
              <el-form-item
                :label="$t('lang.intelligent_rule_create_form.validity')"
                class="error-reset "
                style="margin-bottom: 0px"
                prop=""
              >
                <el-radio-group
                  v-model="rule_form.validity"
                  @change="rule_form.date_list = []"
                >
                  <el-radio
                    :label="item.code"
                    v-for="item in validity_list"
                    :key="item.code"
                  >{{item[`name_${language}`]}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label=""
                label-width="0"
                v-if="rule_form.validity == '1'"
                class="error-reset "
                style="margin-bottom: 5px"
                prop="date_list"
              >
                <el-date-picker
                  v-model="rule_form.date_list"
                  size="mini"
                  type="daterange"
                  align="right"
                  :clearable="false"
                  unlink-panels
                  :range-separator="$t('lang.public_range_separator')"
                  :start-placeholder="$t('lang.public_start_time')"
                  :end-placeholder="$t('lang.public_end_time')"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </div>

          </el-collapse-item>
          <!-- 设置规则触发条件 -->
          <el-collapse-item
            title=""
            :disabled="!is_checked_model"
            name="3"
          >
            <template slot="title">
              {{$t('lang.intelligent_rule_create_collapse.title_3')}}
              <el-form-item
                label=""
                label-width="0"
                class="collapse-header-form"
                style="margin-bottom: 0px"
                prop="validity"
              >
                <el-radio-group
                  v-model="rule_form.open_connect"
                  :disabled="!is_checked_model"
                >
                  <el-radio
                    :label="item.code"
                    v-for="item in condition_limit_list"
                    :key="item.code"
                  >{{item[`name_${language}`]}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <div class="conditions">
              <div
                class="cindition-item"
                v-for="(item, index) in rule_form.open_condition"
                :key="`open_condition_${index}`"
              >
                <div class="num">{{`${$t('lang.intelligent_rule_Condition')}${index + 1}`}}</div>
                <div class="content">
                  <el-form-item
                    label=""
                    label-width="0"
                    class="condition-field"
                    :prop="`open_condition.${index}.field`"
                  >
                    <maps-tooltip :text="set_condition_tooltip(rule_form.open_condition[index].field)">
                      <el-select
                        v-model="rule_form.open_condition[index].field"
                        size="mini"
                        @change="condition_change($event, index, 'open_condition')"
                        :placeholder="$t('lang.intelligent_rule_Choose_metric')"
                      >
                        <el-option
                          v-for="item in condition_list"
                          :key="item.code"
                          :disabled="active_open_condition_list.includes(item.code)"
                          :label="item[`name_${language}`]"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </maps-tooltip>

                  </el-form-item>
                  <!-- style="width: calc(100% - 140px)" -->
                  <component
                    class="condition-detail"
                    :ref="`open_condition_${rule_form.open_condition[index].field}`"
                    :is="rule_form.open_condition[index].field"
                    :config="rule_form.open_condition[index]"
                    :range="rule_form.range"
                    @success="success_condition($event, 'open_condition')"
                  ></component>
                </div>
                <div class="delete-condition">
                  <i
                    v-if="index > 0"
                    @click="delete_condition(index, 'open_condition')"
                    class="iconfont maps-icon-trash"
                  ></i>
                </div>
              </div>
            </div>
            <el-button
              type='text'
              v-if="active_open_condition_list.length < condition_list.length"
              class="add_condition"
              @click="add_condition('open_condition')"
            >
              <i class="iconfont maps-icon-add"></i> {{$t('lang.intelligent_rule_Add_a_condition')}}
            </el-button>
          </el-collapse-item>
          <!-- 设置规则排除条件 -->
          <el-collapse-item
            title=""
            class="collapse-not-required"
            :disabled="!is_checked_model"
            name="4"
          >
            <template slot="title">
              {{$t('lang.intelligent_rule_create_collapse.title_4')}}
              <el-form-item
                label=""
                label-width="0"
                class="collapse-header-form"
                style="margin-bottom: 0px"
                prop="validity"
              >
                <el-radio-group
                  v-model="rule_form.remove_connect"
                  :disabled="!is_checked_model"
                >
                  <el-radio
                    :label="item.code"
                    v-for="item in condition_limit_list"
                    :key="item.code"
                  >{{item[`name_${language}`]}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>

            <div class="conditions">
              <div
                class="cindition-item"
                v-for="(item, index) in rule_form.remove_condition"
                :key="`remove_condition_${index}`"
              >
                <div
                  class="num"
                  :style="remove_repeat_condition.includes(index)? 'color: #ff3333':''"
                >{{`${$t('lang.intelligent_rule_Condition')}${index + 1}`}}</div>
                <div class="content">
                  <el-form-item
                    label=""
                    label-width="0"
                    class="condition-field"
                    :prop="`remove_condition.${index}.field`"
                  >
                    <maps-tooltip :text="condition_list.length? set_condition_tooltip(rule_form.remove_condition[index].field):''">
                      <el-select
                        v-model="rule_form.remove_condition[index].field"
                        size="mini"
                        :class="remove_repeat_condition.includes(index)? 'is-repeat':''"
                        @change="condition_change($event, index, 'remove_condition')"
                        :placeholder="$t('lang.intelligent_rule_Choose_metric')"
                      >
                        <el-option
                          v-for="item in condition_list"
                          :key="item.code"
                          :disabled="active_remove_condition_list.includes(item.code)"
                          :label="item[`name_${language}`]"
                          :value="item.code"
                        >
                        </el-option>
                      </el-select>
                    </maps-tooltip>

                  </el-form-item>

                  <component
                    class="condition-detail"
                    :ref="`remove_condition_${rule_form.remove_condition[index].field}`"
                    :is="rule_form.remove_condition[index].field"
                    :config="rule_form.remove_condition[index]"
                    :range="rule_form.range"
                    @success="success_condition($event, 'remove_condition')"
                  ></component>
                </div>
                <!-- 排除条件非必填,可全部删除 -->
                <div class="delete-condition">
                  <i
                    @click="delete_condition(index, 'remove_condition')"
                    class="iconfont maps-icon-trash"
                  ></i>
                </div>
              </div>
            </div>

            <el-button
              type='text'
              v-if="active_remove_condition_list.length < condition_list.length"
              class="add_condition"
              @click="add_condition('remove_condition')"
            >
              <i class="iconfont maps-icon-add"></i> {{$t('lang.intelligent_rule_Add_a_condition')}}
            </el-button>
          </el-collapse-item>
          <!-- 设置执行操作 -->
          <el-collapse-item
            :title="$t('lang.intelligent_rule_create_collapse.title_5')"
            :disabled="!is_checked_model"
            class="handle-setting"
            name="5"
          >
            <div
              class="inline-form"
              style="margin-bottom: 5px;align-items: flex-start;"
            >
              <div calss="left">
                <el-form-item
                  :label="$t('lang.intelligent_rule_create_form.action')"
                  label-width="60px"
                  prop="operation.operate"
                >
                  <el-select
                    v-model="rule_form.operation.operate"
                    size="mini"
                    style="width: 185px"
                    @change="handle_type_change"
                    :placeholder="$t('lang.intelligent_rule_Choose_action')"
                  >
                    <el-option
                      v-for="item in set_handle_list"
                      :key="item.code"
                      :label="item[`name_${language}`]"
                      :value="item.code"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-checkbox
                  style="margin-left:80px"
                  v-if="rule_form.platform.length > 1 && (rule_form.operation.operate == '3' || rule_form.operation.operate == '4')"
                  v-model="show_every_platform"
                >{{$t('lang.intelligent_rule_Set_by_platform')}}</el-checkbox>
              </div>
              <div
                class="handle-detail"
                v-if="rule_form.operation.operate == '3' || rule_form.operation.operate == '4'"
              >
                <div
                  class="platform-item"
                  v-for="(operate_item, index) in rule_form.operation.res"
                  :key="index"
                >
                  <span class="title">{{set_operate_title(operate_item.platform)}}</span>
                  <el-form-item
                    label=""
                    label-width="0"
                    :prop="`operation.res[${index}].action`"
                  >
                    <el-select
                      v-model="rule_form.operation.res[index].action"
                      size="mini"
                      style="width: 115px"
                      :disabled="show_every_platform && operate_item.platform == '0'"
                      @change="operate_action_change($event, index)"
                      :placeholder="$t('lang.intelligent_rule_Choose_action')"
                    >
                      <el-option
                        v-for="item in handle_update_list"
                        :key="item.code"
                        :label="item[`name_${language}`]"
                        :value="item.code"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    label=""
                    label-width="0"
                    style="flex: 1"
                    :prop="show_every_platform && operate_item.platform == '0'? '':`operation.res[${index}].value`"
                  >
                    <el-input
                      placeholder=""
                      style="min-width:180px;max-width: 300px;"
                      size="mini"
                      :disabled="show_every_platform && operate_item.platform == '0'"
                      v-model="rule_form.operation.res[index].value"
                      class="input-with-select"
                    >
                      <el-select
                        v-model="rule_form.operation.res[index].format"
                        slot="append"
                        :disabled="(show_every_platform && operate_item.platform == '0') || rule_form.operation.res[index].action == '1'"
                        @change="operate_format_change($event, index)"
                      >
                        <el-option
                          label="%"
                          :disabled="rule_form.operation.res[index].action == '1'"
                          value="%"
                        ></el-option>
                        <el-option
                          label="¥"
                          value="¥"
                        ></el-option>
                      </el-select>
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <!-- 自定义 频率-->
          <el-collapse-item
            :title="$t('lang.intelligent_rule_create_collapse.title_6')"
            :disabled="!is_checked_model"
            name="6"
          >
            <el-form-item
              :label="$t('lang.intelligent_rule_create_form.Check_Schedule')"
              class="error-reset "
              style="margin-bottom: 0px"
              prop="period"
            >
              <el-radio-group
                v-model="rule_form.period"
                @change="period_change"
              >
                <el-radio label="1">{{$t('lang.public_all_day')}}</el-radio>
                <el-radio label="2">{{$t('lang.public_Custom')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <HourWeek
              ref="HourWeek"
              v-if="rule_form.period == '2'"
              @save="get_check_time_result"
              @clear="reset_check_time_result"
              :config="set_hour_week_config(rule_form.timeline)"
              style="padding-left: 20px"
            ></HourWeek>
            <el-form-item
              :label="$t('lang.intelligent_rule_create_form.Frequency')"
              label-width="80px"
              class="error-reset "
              style="margin-bottom: 0px"
              prop="interval"
            >
              <el-radio-group v-model="rule_form.interval">
                <maps-tooltip
                  v-for="item in rate_list"
                  :key="item.code"
                  :text="!item.enable? $t('lang.intelligent_rule_interval_disabled_point'):''"
                  align="left"
                >
                  <el-radio
                    :disabled="!item.enable"
                    :label="item.code"
                  >
                    {{item[`name_${language}`]}}
                  </el-radio>
                </maps-tooltip>
              </el-radio-group>
            </el-form-item>
            <div
              class="check-point"
              v-if="rule_form.period == '2'"
            >{{$t('lang.intelligent_rule_Custom_point')}}</div>
          </el-collapse-item>
        </el-form>
      </el-collapse>
    </section>
  </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import moment from "moment";
import _ from "lodash";

import ModelItem from "../components/model-item";
import HourWeek from "../components/hour-week";
import { config as listConfig, reset_range as reset_range } from "../mixins";
import elapsed_time from "../components/condition/elapsed_time"; // 投放时间
import cost from "../components/condition/cost"; //消耗
import delivery from "../components/condition/delivery"; //投放状态
import convert from "../components/condition/convert"; //转化数（上报）
import convert_cost from "../components/condition/convert_cost"; //转化成本（上报）
import attribution_convert from "../components/condition/attribution_convert"; //转化数（播放）
import attribution_convert_cost from "../components/condition/attribution_convert_cost"; //转化成本（播放）
import campaign_budget_type from "../components/condition/campaign_budget_type"; //campaign预算类型
import ad_budget_type from "../components/condition/ad_budget_type"; //ad预算类型
import { files } from "jszip";

export default {
  components: {
    ModelItem,
    HourWeek,
    elapsed_time,
    cost,
    delivery,
    convert,
    convert_cost,
    attribution_convert,
    attribution_convert_cost,
    campaign_budget_type,
    ad_budget_type,
  },
  data() {
    var validatename = (rule, value, callback) => {
      value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
      const reg = this.$constReg.input_word; //除了引号都允许
      if (reg.test(value)) {
        callback(new Error(this.$t("lang.reg_not_quotes")));
      } else {
        callback();
      }
    };
    // %
    var validateNumberInt = (rule, value, callback) => {
      let reg = this.$constReg.positiveInt1; //
      let msg = this.$t("lang.reg_percent_error");
      if (!reg.test(value)) {
        callback(new Error(msg));
      } else {
        callback();
      }
    };
    // 1000 - 9999999.99
    var validateNumberNum5 = (rule, value, callback) => {
      if (value >= 1000 && value <= 9999999.99) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 2) {
            callback(new Error(this.$t("lang.reg_2_places")));
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_1000_9999999")));
      }
    };
    // 50 - 1000000
    var validateNumber50 = (rule, value, callback) => {
      if (value >= 50 && value <= 1000000) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 2) {
            callback(new Error(this.$t("lang.reg_2_places")));
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_50_1000000")));
      }
    };
    // 100 - 1000000
    var validateNumber100 = (rule, value, callback) => {
      if (value >= 100 && value <= 1000000) {
        const str = value.toString();
        if (str.split(".")[1]) {
          if (str.split(".")[1].length > 2) {
            callback(new Error(this.$t("lang.reg_2_places")));
          }
        } else {
          callback();
        }
      } else {
        callback(new Error(this.$t("lang.reg_100_1000000")));
      }
    };
    return {
      rule_id: "",
      change_save: false,
      open_update_form: 0,
      remove_update_form: 0,
      validateNumber_INT: validateNumberInt,
      validateNumber_thousand: validateNumberNum5,
      validateNumber_50: validateNumber50,
      validateNumber_100: validateNumber100,
      isLoading: false,
      // 模板
      load_model: false,
      activeNames: ["1"],
      model_type: "", //模板
      model_list: [],
      is_checked_model: false, // 是否选择了模板
      active_model: {
        id: "",
        platform: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return moment(time).endOf("day").format("x") < Date.now();
        },
      },
      rule_form: {
        team_id: "",
        name: "", // 规则标题，
        platform: [], // 平台
        range: "1", //维度
        validity: "0", //有效期（永久、限制）
        date_list: [],
        startdate: "",
        enddate: "",
        open_connect: "1", //规则触发条件限制（全部、任一）
        open_condition: [
          {
            field: "",
          },
        ],
        remove_connect: "2", //规则排除条件限制（全部、任一）
        remove_condition: [],
        operation: {
          operate: "",
          res: [
            {
              platform: "0", //全部
              action: "1", // 调整、提高、降低
              value: "",
              format: "¥",
            },
          ],
        },
        period: "1", //全天、自定义
        timeline: {
          timestr: [],
          content: [],
          section: [],
        },
        interval: "3", //5个频率，默认每3小时
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
            message: this.$t("lang.reg_rule_name_required"),
            trigger: ["blur"],
          },
        ],
        platform: [
          {
            required: true,
            message: this.$t("lang.reg_rule_platform_required"),
            trigger: ["blur"],
          },
        ],
        date_list: [
          {
            required: true,
            message: this.$t("lang.reg_rule_date_required"),
            trigger: ["blur"],
          },
        ],
        open_condition: [
          {
            field: [
              {
                required: true,
                message: this.$t("lang.reg_rule_condition_required"),
                trigger: ["blur"],
              },
            ],
          },
        ],
        remove_condition: [
          {
            field: [
              {
                required: true,
                message: this.$t("lang.reg_rule_condition_required"),
                trigger: ["blur"],
              },
            ],
          },
        ],
        operation: {
          operate: [
            {
              required: true,
              message: this.$t("lang.reg_rule_operate_required"),
              trigger: ["blur", "change"],
            },
          ],
          res: [
            {
              action: [
                {
                  required: true,
                  message: this.$t("lang.reg_rule_operate_required"),
                  trigger: ["blur"],
                },
              ],
              value: [
                {
                  required: true,
                  validator: validateNumberNum5,
                  trigger: ["blur"],
                },
              ],
            },
          ],
        },
      },
      range_list: listConfig.rangeList,
      validity_list: listConfig.validityList,
      //   条件设置
      condition_limit_list: listConfig.conditionLimitList,
      condition_list: [], // 指标列表
      active_open_condition_list: [], // 已选触发的指标
      active_remove_condition_list: [], // 已选排除的指标
      remove_repeat_condition: [], //排除和触发重复的条件
      //   操作设置
      handle_update_list: listConfig.handleUpdateList,
      show_every_platform: false, //是否分平台设置
      //   检查频率
      rate_list: listConfig.rateList,
    };
  },
  watch: {
    show_every_platform(val) {
      // 默认值
      let result = [
        {
          platform: 0,
          action: "1",
          value: "",
          format: "¥",
        },
      ];
      let result_rules = [
        {
          action: [
            {
              required: true,
              message: this.$t("lang.reg_rule_operate_required"),
              trigger: ["blur"],
            },
          ],
          value: [
            {
              required: true,
              validator: this.validateNumber_thousand,
              trigger: ["blur"],
            },
          ],
        },
      ];
      // 分平台操作
      if (val) {
        this.$refs.rule_form.clearValidate(`operation.res[${0}].value`);
        // 每个平台对应生成一个表单内容和校验规则
        this.rule_form.platform.forEach((item) => {
          result.push({ platform: item, action: "1", value: "", format: "¥" });
          result_rules.push({
            action: [
              {
                required: true,
                message: this.$t("lang.reg_rule_operate_required"),
                trigger: ["blur"],
              },
            ],
            value: [
              {
                required: true,
                validator:
                  item == "1"
                    ? this.validateNumber_100
                    : this.validateNumber_50,
                trigger: ["blur"],
              },
            ],
          });
        });
      }
      this.rule_form.operation.res = result;
      this.rules.operation.res = result_rules;
    },
  },
  computed: {
    ...mapState("tools", ["rule_handle_type"]),
    ...mapState("user", ["language"]),
    ...mapState("system", ["platform_config"]),
    ...mapState("system", ["active_team_id"]),
    // 抽屉标题
    drawer_title() {
      let title = this.$t("lang.intelligent_rule_Create_Automated_Rule_title");
      switch (this.rule_handle_type) {
        case "create":
          title = this.$t("lang.intelligent_rule_Create_Automated_Rule_title");
          break;
        case "edit":
          title = this.$t("lang.intelligent_rule_edit_Automated_Rule_title");
          break;
        case "copy":
          title = this.$t("lang.intelligent_rule_copy_Automated_Rule_title");
          break;
        default:
          title = this.$t("lang.intelligent_rule_Create_Automated_Rule_title");
      }
      return title;
    },
    // 操作类型
    set_handle_list() {
      let list = [
        {
          name_zh: "开启",
          name_en: "Enable",
          code: "1",
        },
        {
          name_zh: "暂停",
          name_en: "Pause",
          code: "2",
        },
        this.rule_form.range == 2
          ? {
              name_zh: "更新AD预算",
              name_en: "Update Ad Budget",
              code: "3",
            }
          : {
              name_zh: "更新Campaign预算",
              name_en: "Update Campaign Budget",
              code: "4",
            },
        {
          name_zh: "仅通知",
          name_en: "Just send alert",
          code: "5",
        },
      ];
      return list;
    },
    // model列表
    set_active_model_list() {
      let result = [];
      if (this.model_type == "") {
        result = this.model_list;
      } else {
        this.model_list.forEach((item) => {
          if (item.model == this.model_type) {
            result.push(item);
          }
        });
      }
      return result;
    },
  },
  methods: {
    show(id = "") {
      this.rule_id = id;
      this.$refs.mpasDrawer_log.show();
      if (this.rule_handle_type == "create") {
        this.is_checked_model = false;
      } else {
        this.is_checked_model = true;
        this.activeNames = ["2", "3", "4", "5", "6"];
        this.get_rule_info(id);
      }

      this.get_model_list();
    },
    close_drawer() {
      this.handle_cancel();
    },
    handle_cancel() {
      if (this.change_save) {
        this.$confirm(
          this.$t("lang.intelligent_rule_quit_point"),
          this.$t("lang.intelligent_rule_quit_title"),
          {
            confirmButtonText: this.$t("lang.public_button_confirm"),
            cancelButtonText: this.$t("lang.public_button_cancel"),
            type: "warning",
          }
        )
          .then(() => {
            this.refresh();
          })
          .catch(() => {});
      } else {
        this.refresh();
      }
    },
    handle_save(formName) {
      const open_length = this.rule_form.open_condition.length;
      const remove_length = this.rule_form.remove_condition.length;
      let open_last_state = true; //触发条件校验信息
      let remove_last_state = true; //排除条件校验信息
      let check_period_time = true; //自定义校验信息
      // 校验触发条件最后一条是否填写正确
      if (this.rule_form.open_condition[open_length - 1].field != "") {
        // 再次全部校验，避免用户修改已校验过的条件
        this.rule_form.open_condition.forEach((item) => {
          const dom = `open_condition_${item.field}`;
          if (!this.$refs[dom][0].validator_form()) {
            open_last_state = false;
          }
        });
        // const dom = `open_condition_${this.rule_form.open_condition[open_length - 1].field}`;
        // open_last_state = this.$refs[dom][0].validator_form(); //对上一条进行校验
        if (!open_last_state) {
          this.$message({
            message: this.$t("lang.intelligent_rule_condition_point"),
            duration: 5000,
            type: "error",
            offset: 3,
          });
        }
      }
      // 校验排除条件最后一条是否填写正确
      if (
        remove_length > 0 &&
        this.rule_form.remove_condition[remove_length - 1].field != ""
      ) {
        // 再次全部校验，避免用户修改已校验过的条件
        this.rule_form.remove_condition.forEach((item) => {
          const dom = `remove_condition_${item.field}`;
          if (!this.$refs[dom][0].validator_form()) {
            remove_last_state = false;
          }
        });
        // const dom = `remove_condition_${this.rule_form.remove_condition[remove_length - 1].field}`;
        // remove_last_state = this.$refs[dom][0].validator_form(); //对上一条进行校验
        if (!remove_last_state && open_last_state) {
          this.$message({
            message: this.$t("lang.intelligent_rule_condition_point"),
            duration: 5000,
            type: "error",
            offset: 3,
          });
        }
      }
      // 设置为自定义检查是否选择了时间
      if (
        this.rule_form.period == "2" &&
        this.rule_form.timeline.timestr.length == 0
      ) {
        check_period_time = false;
        const send_msg = () => {
          this.$message({
            message: this.$t("lang.intelligent_rule_save_check_time"),
            duration: 5000,
            type: "error",
            offset: 3,
          });
        };
        if (!remove_last_state || !open_last_state) {
          setTimeout(() => {
            send_msg();
          }, 100);
        } else {
          send_msg();
        }
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (
            open_last_state &&
            remove_last_state &&
            this.check_remove_condition() &&
            check_period_time
          ) {
            const url = "/rule/save";
            const data = await this.fetchCore(url, this.get_param(), true);
            if (data) {
              this.$emit("success", data);
              this.refresh();
            }
          }
        } else {
          return false;
        }
      });
    },
    get_param() {
      const check_is_range = () => {
        let result = "0";
        const allCondition = this.rule_form.open_condition.concat(
          this.rule_form.remove_condition
        );
        const fields = ["cost", "convert_cost", "attribution_convert_cost"];
        const types = ["1", "2"];
        allCondition.forEach((item) => {
          if (fields.includes(item.field)) {
            if (item.costrange == "2" && types.includes(item.costrangetype)) {
              result = "1";
              if (item.costrangetype == "2") {
                try {
                  result = "2";
                } catch (error) {
                  throw new Error("parse excel failed");
                }
              }
            }
          }
        });

        return result;
      };

      let param = {
        id: "",
        team_id: this.active_team_id,
        is_range: check_is_range(),
        name: this.rule_form.name, // 规则标题，
        platform: this.rule_form.platform.join(), // 平台
        range: this.rule_form.range, //维度
        startdate:
          this.rule_form.validity == "0"
            ? moment(new Date()).format("YYYY-MM-DD")
            : this.rule_form.date_list[0],
        enddate:
          this.rule_form.validity == "0" ? "" : this.rule_form.date_list[1],
        open_connect: this.rule_form.open_connect, //规则触发条件限制（全部、任一）
        open_condition: this.rule_form.open_condition,
        remove_connect: this.rule_form.remove_connect, //规则排除条件限制（全部、任一）
        remove_condition: this.rule_form.remove_condition,
        operation: {
          operate: this.rule_form.operation.operate,
          res: [],
        },
        period: this.rule_form.period, //全天、自定义
        timeline: this.rule_form.timeline,
        interval: this.rule_form.interval, //5个频率，默认每3小时
      };
      if (this.rule_form.operation.res.length == 1) {
        param.operation.res = this.rule_form.operation.res;
      } else {
        let tmp = _.cloneDeep(this.rule_form.operation.res);
        tmp.splice(0, 1);
        param.operation.res = tmp;
      }

      if (this.rule_handle_type == "edit") {
        param.id = this.rule_id;
      }

      return param;
    },
    refresh() {
      this.change_save = false;
      this.model_type = "";
      this.activeNames = ["1"];
      this.is_checked_model = false;
      this.active_model = {
        id: "",
        platform: "",
      };
      this.active_open_condition_list = [];
      this.active_remove_condition_list = [];
      this.rule_form = {
        team_id: "",
        name: "", // 规则标题，
        platform: [], // 平台
        range: "1", //维度
        validity: "0", //有效期（永久、限制）
        date_list: [],
        startdate: "",
        enddate: "",
        open_connect: "1", //规则触发条件限制（全部、任一）
        open_condition: [],
        remove_connect: "2", //规则排除条件限制（全部、任一）
        remove_condition: [],
        operation: {
          operate: "",
          res: [
            {
              platform: "0",
              action: "1",
              value: "",
              format: "¥",
            },
          ],
        },
        period: "1", //全天、自定义
        timeline: {
          timestr: [],
          content: [],
          section: [],
        },
        interval: "3", //5个频率，默认每3小时
      };
      this.$refs.mpasDrawer_log.close();
      this.$refs.rule_form.resetFields();
      this.$refs.rule_form.clearValidate();
    },
    // 编辑、复制查询详情
    async get_rule_info(id) {
      this.isLoading = true;
      const url = "/rule/detail";
      const param = {
        id,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.set_info_to_form(data);
      } else {
        this.isLoading = false;
      }
    },
    async get_model_list() {
      this.load_model = true;
      const url = "/rule/modellist";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.load_model = false;
        this.model_list = data;
      } else {
        this.load_model = false;
      }
    },
    // 折叠面板
    activeNames_change(param) {
      if (param[param.length - 1] == "1") {
        this.activeNames = ["1"];
      }
      if (param[0] == "1" && this.is_checked_model) {
        this.activeNames = ["2", "3", "4", "5", "6"];
      }
    },
    // 更新选中模板
    update_model(config) {
      this.change_save = true;
      this.is_checked_model = true;
      this.show_every_platform = false;
      this.activeNames = ["2", "3", "4", "5", "6"];
      this.active_open_condition_list = [];
      this.active_remove_condition_list = [];
      this.remove_repeat_condition = [];

      this.active_model = config;
      // this.rule_form.platform = this.active_model.platform.length ? this.active_model.platform.split(",") : [];
      this.get_condition_list(config.range.toString());
      this.set_info_to_form(config);

      this.$refs.rule_form.resetFields();
      this.$refs.rule_form.clearValidate();
    },
    // form回填配置
    set_info_to_form(config) {
      const form = {
        team_id: this.active_team_id,
        name:
          this.rule_handle_type == "copy"
            ? config.copy_name
            : config.name || "", // 规则标题，
        platform: config.platform.length ? config.platform.split(",") : [], // 平台
        range: config.range.toString(), //维度
        validity: config.enddate ? "1" : "0", //有效期（永久0、限制1）
        date_list: config.enddate ? [config.startdate, config.enddate] : [],
        startdate: config.startdate || "",
        enddate: config.enddate || "",
        open_connect: config.open_connect
          ? config.open_connect.toString()
          : "1", //规则触发条件限制（全部、任一）
        open_condition: config.open_condition_detail
          ? config.open_condition_detail
          : [
              {
                field: "",
              },
            ],
        remove_connect: config.remove_connect
          ? config.remove_connect.toString()
          : "2", //规则排除条件限制（全部、任一）
        remove_condition: config.remove_condition_detail
          ? config.remove_condition_detail
          : [],
        operation: {
          operate: config.operation_detail
            ? config.operation_detail.operate
            : "",
          res:
            config.operation_detail && config.operation_detail.res.length
              ? config.operation_detail.res
              : [
                  {
                    platform: "0", //全部
                    action: "1", // 调整、提高、降低
                    value: "",
                    format: "¥",
                  },
                ],
        },
        period: config.period.toString(), //全天、自定义
        timeline: config.timeline_detail
          ? config.timeline_detail
          : {
              timestr: [],
              content: [],
              section: [],
            },
        interval: config.interval.toString(), //5个频率，默认每3小时
      };
      // 检查已有的触发条件
      if (form.open_condition[0].field != "") {
        form.open_condition.forEach((item) => {
          this.active_open_condition_list.push(item.field);
        });
      }
      // 检查已有的排除条件
      if (form.remove_condition.length) {
        form.remove_condition.forEach((item) => {
          this.active_remove_condition_list.push(item.field);
        });
      }
      // 检查已有的操作
      if (form.operation.res[0].platform != 0) {
        this.show_every_platform = true;
        const def = [
          {
            platform: "0", //全部
            action: "1", // 调整、提高、降低
            value: "",
            format: "¥",
          },
        ];
        form.operation.res = def.concat(form.operation.res);
      } else {
        this.show_every_platform = false;
      }

      this.set_operation_rules(form.operation.res);
      // this.rule_form = _.cloneDeep(form);
      this.$nextTick(() => {
        this.rule_form = _.cloneDeep(form);
        this.isLoading = false;
        this.get_condition_list(this.rule_form.range);
        this.$refs.rule_form.clearValidate(`operation.operate`);
      });
    },
    // 回填操作设置校验
    set_operation_rules(arr) {
      let result_rules = [
        {
          action: [
            {
              required: true,
              message: this.$t("lang.reg_rule_operate_required"),
              trigger: ["blur"],
            },
          ],
          value: [
            {
              required: true,
              validator: this.validateNumber_thousand,
              trigger: ["blur"],
            },
          ],
        },
      ];
      if (arr.length == 1) {
        if (arr[0].format == "¥") {
          result_rules = [
            {
              action: [
                {
                  required: true,
                  message: this.$t("lang.reg_rule_operate_required"),
                  trigger: ["blur"],
                },
              ],
              value: [
                {
                  required: true,
                  validator: this.validateNumber_thousand,
                  trigger: ["blur"],
                },
              ],
            },
          ];
        } else {
          result_rules = [
            {
              action: [
                {
                  required: true,
                  message: this.$t("lang.reg_rule_operate_required"),
                  trigger: ["blur"],
                },
              ],
              value: [
                {
                  required: true,
                  validator: this.validateNumber_INT,
                  trigger: ["blur"],
                },
              ],
            },
          ];
        }
      } else {
        arr.forEach((item, index) => {
          if (index != 0) {
            if (item.format == "%") {
              result_rules.push({
                action: [
                  {
                    required: true,
                    message: this.$t("lang.reg_rule_operate_required"),
                    trigger: ["blur"],
                  },
                ],
                value: [
                  {
                    required: true,
                    validator: this.validateNumber_INT,
                    trigger: ["blur"],
                  },
                ],
              });
            } else {
              // 单位选择¥，分平台限制输入的数值范围，巨量最小100，其他50
              if (item.platform == "1") {
                result_rules.push({
                  action: [
                    {
                      required: true,
                      message: this.$t("lang.reg_rule_operate_required"),
                      trigger: ["blur"],
                    },
                  ],
                  value: [
                    {
                      required: true,
                      validator: this.validateNumber_100,
                      trigger: ["blur"],
                    },
                  ],
                });
              } else {
                result_rules.push({
                  action: [
                    {
                      required: true,
                      message: this.$t("lang.reg_rule_operate_required"),
                      trigger: ["blur"],
                    },
                  ],
                  value: [
                    {
                      required: true,
                      validator: this.validateNumber_50,
                      trigger: ["blur"],
                    },
                  ],
                });
              }
            }
          }
        });
      }
      this.rules.operation.res = result_rules;
    },
    // 名称更改
    rule_name_change() {
      this.change_save = true;
    },
    // 平台更改
    rule_platform_change(list) {
      this.change_save = true;

      if (list.length < 2) {
        this.show_every_platform = false;
        this.rule_form.operation.res = [
          {
            platform: 0,
            action: "1",
            value: "",
            format: "¥",
          },
        ];
        this.rules.operation.res = [
          {
            action: [
              {
                required: true,
                message: this.$t("lang.reg_rule_operate_required"),
                trigger: ["blur"],
              },
            ],
            value: [
              {
                required: true,
                validator: this.validateNumber_thousand,
                trigger: ["blur"],
              },
            ],
          },
        ];
      } else {
        if (this.show_every_platform) {
          const all_platform = [
            {
              platform: 0,
              action: "1",
              value: "",
              format: "¥",
            },
          ];
          const all_rule = [
            {
              action: [
                {
                  required: true,
                  message: this.$t("lang.reg_rule_operate_required"),
                  trigger: ["blur"],
                },
              ],
              value: [
                {
                  required: true,
                  validator: this.validateNumber_thousand,
                  trigger: ["blur"],
                },
              ],
            },
          ];
          let operate_result = [];
          let rule_result = [];
          list.forEach((platform, platform_index) => {
            const index = this.rule_form.operation.res.findIndex((obj) => {
              return obj.platform == platform;
            });
            if (index >= 0) {
              operate_result.push(this.rule_form.operation.res[index]);
              rule_result.push(this.rules.operation.res[index]);
            } else {
              operate_result.push({
                platform: platform,
                action: "1",
                value: "",
                format: "¥",
              });
              rule_result.push({
                action: [
                  {
                    required: true,
                    message: this.$t("lang.reg_rule_operate_required"),
                    trigger: ["blur"],
                  },
                ],
                value: [
                  {
                    required: true,
                    validator: this.validateNumber_thousand,
                    trigger: ["blur"],
                  },
                ],
              });
            }
          });

          this.rule_form.operation.res = all_platform.concat(operate_result);
          this.rules.operation.res = all_rule.concat(rule_result);
          this.rule_form.operation.res.forEach((item, index) => {
            this.$refs.rule_form.clearValidate(`operation.res[${index}].value`);
          });
        }
      }
    },
    // 维度更改
    range_change() {
      // ad_budget_type
      // campaign_budget_type
      reset_range(this.rule_form.range);
      // 切换维度时置换预算类型
      const reset_condition = (field_1, field_2) => {
        if (this.active_open_condition_list.length) {
          const index = this.active_open_condition_list.findIndex((item) => {
            return item == field_1;
          });
          if (index >= 0) {
            this.active_open_condition_list.splice(index, 1, field_2);
            this.rule_form.open_condition[index].field = field_2;
          }
        }
        if (this.active_remove_condition_list.length) {
          const index = this.active_remove_condition_list.findIndex((item) => {
            return item == field_1;
          });
          if (index >= 0) {
            this.active_remove_condition_list.splice(index, 1, field_2);
            this.rule_form.remove_condition[index].field = field_2;
          }
        }
      };
      // 切换到campaign判断已添加条件是否含有已投放时间(elapsed_time)
      const check_elapsed_time = () => {
        const index = this.rule_form.open_condition.findIndex((obj) => {
          return obj.field == "elapsed_time";
        });
        if (index >= 0) {
          this.rule_form.open_condition.splice(index, 1);
          this.active_open_condition_list.splice(index, 1);
          this.rules.open_condition.splice(index, 1);
        }
        // 触发条件要保留一个空白条件
        if (this.rule_form.open_condition.length == 0) {
          this.rule_form.open_condition = [
            {
              field: "",
            },
          ];
          this.rules.open_condition = [
            {
              field: [
                {
                  required: true,
                  message: this.$t("lang.reg_rule_condition_required"),
                  trigger: ["blur"],
                },
              ],
            },
          ];
        }
        // 判断排除条件
        if (this.rule_form.remove_condition.length) {
          const index = this.rule_form.remove_condition.findIndex((obj) => {
            return obj.field == "elapsed_time";
          });
          if (index >= 0) {
            this.rule_form.remove_condition.splice(index, 1);
            this.active_remove_condition_list.splice(index, 1);
            this.rules.remove_condition.splice(index, 1);
            if (this.remove_repeat_condition.includes(index)) {
              const repest_index = this.remove_repeat_condition.findIndex(
                (item) => {
                  return item == index;
                }
              );
              this.remove_repeat_condition.splice(repest_index, 1);
            }
          }
        }
      };
      this.change_save = true;
      this.get_condition_list(this.rule_form.range);
      if (this.rule_form.range == "1") {
        //切换到campaign
        reset_condition("ad_budget_type", "campaign_budget_type");
        this.rule_form.operation.operate =
          this.rule_form.operation.operate == "3"
            ? "4"
            : this.rule_form.operation.operate; //update_campaign
        check_elapsed_time();
      } else if (this.rule_form.range == "2") {
        reset_condition("campaign_budget_type", "ad_budget_type");
        this.rule_form.operation.operate =
          this.rule_form.operation.operate == "4"
            ? "3"
            : this.rule_form.operation.operate; //update_ad
      }
    },
    // 条件设置
    // 获取条件模板列表
    get_condition_list(range) {
      let result = [];
      // 区分campaign和ad
      if (range == "1") {
        result = listConfig.campaignConditionTarget;
      } else {
        result = listConfig.AdConditionTarget;
      }
      this.condition_list = result;
    },
    check_remove_condition() {
      let state = true;
      if (this.rule_form.remove_condition.length) {
        let [open_str, remove_str, repeat] = [[], [], []];
        this.rule_form.open_condition.forEach((item) => {
          open_str.push(JSON.stringify(item));
        });
        this.rule_form.remove_condition.forEach((item) => {
          remove_str.push(JSON.stringify(item));
        });
        open_str.forEach((open) => {
          const index = remove_str.findIndex((remove) => {
            return open == remove;
          });
          if (index >= 0) {
            repeat.push(index);
          }
        });
        this.remove_repeat_condition = repeat;
        if (repeat.length) {
          this.$message({
            message: this.$t("lang.intelligent_rule_remove_repeat"),
            duration: 5000,
            offset: 3,
            type: "error",
          });
          state = false;
        } else {
          state = true;
        }
      }
      return state;
    },
    // 添加触发条件
    add_condition(type) {
      // 判断排除条件中是否存在和触发相同的条件，停止新加并标红
      if (type == "remove_condition") {
        if (!this.check_remove_condition()) return false;
      }

      if (this[`active_${type}_list`].length) {
        const dom = `${type}_${
          this[`active_${type}_list`][this[`active_${type}_list`].length - 1]
        }`;
        const state = this.$refs[dom][0].validator_form(); //对上一条进行校验
        if (!state) {
          // 校验未通过。不可进行添加
          return false;
        }
      }

      if (
        this.rule_form[type].length &&
        this.rule_form[type][this.rule_form[type].length - 1].field == ""
      ) {
        this.$message({
          message: this.$t("lang.reg_rule_condition_required"),
          duration: 5000,
          type: "error",
          offset: 3,
        });
      } else {
        this.rule_form[type].push({
          field: "",
        });
        this.rules[type].push({
          field: [
            {
              required: true,
              message: this.$t("lang.reg_rule_condition_required"),
              trigger: ["blur"],
            },
          ],
        });
      }
    },
    // 删除一个条件
    delete_condition(index, type) {
      this.change_save = true;
      this[`active_${type}_list`].splice(index, 1); // 删除active记录
      this.rule_form[type].splice(index, 1); // 删除form
      this.rules[type].splice(index, 1); //删除校验
    },
    // 更新触发条件
    condition_change(param, index, type) {
      if (type == "remove_condition") {
        if (this.remove_repeat_condition.includes(index)) {
          const repest_index = this.remove_repeat_condition.findIndex(
            (item) => {
              return item == index;
            }
          );
          this.remove_repeat_condition.splice(repest_index, 1);
        }
      }

      if (this[`active_${type}_list`][index]) {
        this[`active_${type}_list`].splice(index, 1, param); //更新已存在
      } else {
        this[`active_${type}_list`].push(param); // 增加新的
      }
      // 校验每一个变化的指标（不为空）
      this.$refs.rule_form.validateField(`${type}.${index}.field`);

      let form = {};
      switch (param) {
        case "elapsed_time":
          form = _.cloneDeep(listConfig.elapsedTimeForm);
          break;
        case "cost":
          form = _.cloneDeep(listConfig.costForm);
          break;
        case "delivery":
          form = _.cloneDeep(listConfig.deliveryForm);
          break;
        case "convert":
          form = _.cloneDeep(listConfig.convertForm);
          break;
        case "convert_cost":
          form = _.cloneDeep(listConfig.convertCostForm);
          break;
        case "attribution_convert":
          form = _.cloneDeep(listConfig.attributionConvertForm);
          break;
        case "attribution_convert_cost":
          form = _.cloneDeep(listConfig.attributionConvertCostForm);
          break;
        case "campaign_budget_type":
          form = _.cloneDeep(listConfig.campaignBudgetTypeForm);
          break;
        case "ad_budget_type":
          form = _.cloneDeep(listConfig.adBudgetTypeForm);
          break;
      }
      this.rule_form[type][index] = _.cloneDeep(form); // 替换对应的form表单

      const configs = ["cost", "convert_cost", "attribution_convert_cost"];
      if (configs.includes(param)) {
        const dom = `${type}_${param}`;
        this.$nextTick(() => {
          this.$refs[dom][0].reset_data_type();
        });
      }
    },
    // 条件设置成功、正确
    success_condition(form, type) {
      this.change_save = true;
      const index = this.rule_form[type].findIndex((obj) => {
        return obj.field == form.field;
      });
      if (index >= 0) {
        this.rule_form[type][index] = form;
      }
    },
    // 映射条件tooltip
    set_condition_tooltip(key) {
      if (!key) return "";
      const index = this.condition_list.findIndex((obj) => {
        return obj.code == key;
      });
      if (index >= 0) {
        return this.condition_list[index][`name_${this.language}`];
      }
    },
    // 操作设置
    // 设置平台名称
    set_operate_title(platform) {
      let title = this.$t("lang.public_all_platform");
      switch (platform) {
        case "0":
          title = this.$t("lang.public_all_platform");
          break;
        case "1":
          title = this.$t("lang.public_jl");
          break;
        case "2":
          title = this.$t("lang.public_tx");
          break;
        case "3":
          title = this.$t("lang.public_wx");
          break;
        default:
          title = this.$t("lang.public_all_platform");
      }
      return title;
    },
    handle_type_change() {
      this.change_save = true;
      this.show_every_platform = false;
      // 除了ad和campaign更新，其他的操作不需要输入值
      if (
        this.rule_form.operation.operate == "3" ||
        this.rule_form.operation.operate == "4"
      ) {
        this.rule_form.operation.res = [
          {
            platform: "0",
            action: "1",
            value: "",
            format: "¥",
          },
        ];
      } else {
        this.rule_form.operation.res = [];
      }
    },
    // 改变操作
    operate_action_change(param, index) {
      this.change_save = true;
      this.$refs.rule_form.clearValidate(`operation.res[${index}].value`);
      if (this.rule_form.operation.res[index].action == "1") {
        // （调整为），单位¥，%禁用，验证为1000-9999999.99
        this.rule_form.operation.res[index].format = "¥";
        this.rules.operation.res[
          index
        ].value[0].validator = this.validateNumber_thousand;
      } else {
        // （提高、降低），单位可选,默认%
        this.rule_form.operation.res[index].format = "%";
        this.rules.operation.res[
          index
        ].value[0].validator = this.validateNumber_INT;
      }
    },
    // 改变单位
    operate_format_change(param, index) {
      this.change_save = true;
      this.$refs.rule_form.clearValidate(`operation.res[${index}].value`);
      this.rule_form.operation.res[index].value = "";
      // 单位选择%，只能输入0-100
      if (param == "%") {
        this.rules.operation.res[
          index
        ].value[0].validator = this.validateNumber_INT;
      } else {
        // 单位选择¥，分平台限制输入的数值范围，巨量最小100，其他50
        if (this.rule_form.operation.res[index].platform == "1") {
          this.rules.operation.res[
            index
          ].value[0].validator = this.validateNumber_100;
        } else {
          this.rules.operation.res[
            index
          ].value[0].validator = this.validateNumber_50;
        }
      }
    },
    // 频率设置
    period_change() {
      this.change_save = true;
      this.reset_check_time_result();
    },
    get_check_time_result(param) {
      this.change_save = true;
      this.rule_form.timeline.timestr = param.timeStr;
      this.rule_form.timeline.content = param.timeContent;
      this.rule_form.timeline.section = param.timeSection;
      this.format_time_rate(param.timeSection);
    },
    format_time_rate(arr) {
      let time_line = [];
      if (arr.length) {
        arr.forEach((days) => {
          if (days.length) {
            let time = 0;
            days.forEach((times) => {
              time += times[1] - times[0]; //获取一天的时间段之和
            });
            time_line.push(time);
          }
        });
      }
      // 设置的时间段的排序、正序
      time_line.sort(function (a, b) {
        return a - b;
      });

      this.rate_list.forEach((item) => {
        // 禁用小于最小时间段的频率
        if (item.key > time_line[0]) {
          item.enable = false;
        } else {
          item.enable = true;
        }
        // 最小时间段小于3小时频率设置为半小时。时间段大于等于3小时默认频率为3小时
        if (time_line[0] < 3) {
          this.rule_form.interval = "0.5";
        } else if (time_line[0] > 3) {
          this.rule_form.interval = "3";
        }
      });
    },
    reset_check_time_result() {
      this.change_save = true;
      this.rule_form.timeline.timestr = [];
      this.rule_form.timeline.content = [];
      this.rule_form.timeline.section = [];

      this.rule_form.interval = "3";
      this.rate_list.forEach((item) => {
        if (this.rule_form.period == "1") {
          item.enable = true;
        } else {
          item.enable = false;
        }
      });
    },
    // 编辑拷贝回填
    set_hour_week_config(config) {
      return {
        timeContent: config.content,
        timeSection: config.section,
        timeStr: config.timestr,
      };
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
  mounted() {},
};
</script>
<style lang="scss">
.rule-create-drawer {
  .el-collapse {
    border-width: 0;
    .el-collapse-item {
      .el-radio-group {
        display: unset;
      }
      .el-collapse-item__header {
        height: 40px;
        background: #ebebeb;
        border-width: 0;
        border-radius: 3px;
        padding: 0 20px 0 10px;
        margin-bottom: 10px;
        font-size: 14px;
        line-height: 24px;
        color: #333;
        font-weight: 700;
        position: relative;
        i {
          font-weight: 700;
        }
        .collapse-header-form {
          position: absolute;
          right: 65px;
          top: 4px;
        }
      }

      .el-collapse-item__header:before {
        content: "*";
        font-size: 14px;
        line-height: 24px;
        color: #ff3333;
        margin-right: 5px;
      }

      .el-collapse-item__wrap {
        border-bottom-width: 0;
        .el-collapse-item__content {
          padding: 0;
          padding-bottom: 15px;
          .el-form-item {
            padding-left: 20px;
            margin-bottom: 10px;
            .el-form-item__label {
              font-size: 12px;
              font-weight: 400;
              color: #333333;
            }
            .el-checkbox-group {
              height: 40px;
            }
          }
          .condition-field {
            .el-form-item__content {
              line-height: 31px;
              .is-repeat {
                .el-input {
                  .el-input__inner {
                    border-color: #ff3333;
                  }
                }
              }
            }
          }
          .condition-detail {
            .el-form {
              & > div:first-of-type {
                margin-left: 140px;
              }
            }
          }
          .inline-form {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .el-form-item__content {
              height: 40px;
              display: flex;
              align-items: center;
            }
            .customize-form {
              .el-form-item__content {
                margin-left: 0px !important;
                .el-input {
                  margin: 0 15px;
                }
              }
            }
          }

          .conditions {
            .el-select {
              width: 130px;
            }
          }
          .add_condition {
            font-size: 12px;
            margin-left: 20px;
            i {
              font-size: 10px;
            }
          }
          .unit {
            margin: 0 0 10px 5px;
            font-size: 12px;
            color: #333;
            line-height: 32px;
          }
        }
      }
    }

    .handle-setting {
      .handle-detail {
        .platform-item {
          .el-input-group__append {
            width: 25px;
          }
        }
      }
    }
    .collapse-not-required {
      .el-collapse-item__header:before {
        content: " ";
        font-size: 14px;
        line-height: 24px;
        margin-right: 5px;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.rule-create-drawer {
  .create-main {
    height: 100%;
    overflow-y: auto;
    .model-list {
      min-height: 100px;
      margin-top: 15px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    .conditions {
      display: flex;
      flex-flow: column;
      .cindition-item {
        display: flex;
        // align-items: center;
        flex-wrap: wrap;
        padding-left: 20px;
        .num {
          font-size: 12px;
          color: #333;
          width: 63px;
          line-height: 32px;
        }
        .content {
          width: calc(100% - 93px);
          display: flex;
          // align-items: center;
          // flex-wrap: wrap;
          position: relative;
          & > div {
            margin: 0 10px 5px 0;
          }
          .condition-field {
            position: absolute;
            top: 0;
            left: 0;
          }
          .condition-detail {
            width: 100%;
            padding-left: 20px;
          }
        }
        .delete-condition {
          width: 30px;
          i {
            font-size: 16px;
            color: #333;
            line-height: 32px;
            cursor: pointer;
          }
          i:hover {
            color: #0bb3b3;
          }
        }
      }
    }
    .handle-setting {
      .inline-form {
        .handle-detail {
          flex: 1;
          height: auto;
          .platform-item {
            width: 100%;
            margin-bottom: 5px;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            .title {
              line-height: 40px;
              margin-left: 20px;
              display: inline-block;
              width: 83px;
            }
          }
        }
      }
    }
    .check-point {
      padding-left: 100px;
      font-size: 12px;
      line-height: 24px;
      color: #666;
    }
  }
}
</style>