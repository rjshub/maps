<template>
  <div
    class="ad-batch-box"
    v-loading.fullscreen="isLoading"
  >
    <el-dropdown trigger="click">
      <el-button
        size="mini"
        style="width: 104px; margin-left: 10px"
        :disabled="!checked_ad.length || check_permission.state"
        @click="handle_to_batch"
      >
        <maps-tooltip :text="check_permission.text">
          <span>
            <i
              class="iconfont maps-icon-edit"
              style="margin-right: 5px"
            ></i>
            批量修改
          </span>
        </maps-tooltip>
      </el-button>
      <el-dropdown-menu
        slot="dropdown"
        v-if="!has_touch && !has_pushing"
      >
        <el-dropdown-item
          v-for="item in options"
          :key="item.value"
          @click.native="handle_batch(item)"
        >
          <span>{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-popover
      placement="bottom"
      v-model="visible"
      width="100%"
      trigger="click"
      ref="batch_edit_popover"
      :popper-class="`ad-batch-edit-popover ${user_nav? 'ad-batch-isCollapse':''}`"
      @hide="edit_popover_close"
    >
      <!-- @show="edit_popover_show" -->
      <div
        class="mark"
        slot="reference"
      ></div>
      <main class="edit-popover-main">
        <header>
          <el-tabs
            v-model="activeName"
            key="activeName"
            v-if="model_list.length"
            :before-leave="change_active_name"
          >
            <el-tab-pane
              v-for="item in model_list"
              :key="item.name"
              :label="item.label"
              :name="item.name"
            ></el-tab-pane>
          </el-tabs>
        </header>
        <el-tabs
          key="activeType"
          v-model="active_type"
          v-if="set_type_tab.length"
          class="show-create-tabs"
          type="card"
          style="height: 32px; margin: 0 0 10px 0; float: unset"
          :before-leave="change_handle_type"
        >
          <el-tab-pane
            v-for="item in set_type_tab"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <div class="edit-table-main">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            :key="form_flag"
            class="batch-edit-Form"
          >
            <!-- 预算 -->
            <el-table
              :data="set_table_data"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
              v-if="activeName == 'budget' && set_table_data.length"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ad_name"
                label="计划名称"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="cost"
                label="当前消耗（元）"
                width="130"
              >
                <template slot-scope="scope">
                  {{scope.row.cost || '--'}}
                </template>
              </el-table-column>
              <el-table-column
                prop="budget"
                label="当前预算（元）"
                width="130"
              >
                <template slot-scope="scope">
                  <div style="line-height: 18px">
                    <div>{{scope.row.budget? $formatNumber(scope.row.budget, 2, '', ",", "."):"--"}}</div>
                    <div style="color: #999999">{{ scope.row.budget_mode_lang }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="修改预算"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length && Object.keys(form).includes(set_table_data[0].id.toString())"
                >
                  <el-form-item
                    :prop="`${scope.row.id}.budget`"
                    style="width: 200px"
                    class="budget_input"
                    :class="error_msg.includes(scope.row.id)? 'is-error':''"
                    :inline-message="true"
                  >
                    <el-input
                      placeholder="预算"
                      size="mini"
                      v-model="form[scope.row.id].budget"
                      @change="form_change($event, scope.row.id)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                label=""
                class-name="operate"
                width="150"
                v-if="set_table_data.length > 1"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    >
                      <span class="copy_all">复制到全部</span>
                    </el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
            <!-- 计划出价 -->
            <el-table
              :data="set_table_data"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
              v-if="activeName == 'bid' && set_table_data.length"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ad_name"
                label="计划名称"
                width="250"
              ></el-table-column>
              <el-table-column
                label="当前出价（元）"
                width="130"
              >
                <template slot-scope="scope">
                  <div style="line-height: 18px">
                    <div>{{scope.row.smart_bid_type == 'SMART_BID_CONSERVATIVE'? '自动':scope.row.bid? $formatNumber(scope.row.bid, 2, '', ",", "."):"--"}}</div>
                    <div style="color: #999999">{{ scope.row.pricing_lang }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="修改出价"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length && Object.keys(form).includes(set_table_data[0].id.toString())"
                >

                  <div v-if="active_type != 'SMART_BID_CONSERVATIVE'">
                    <el-form-item
                      :prop="`${scope.row.id}.bid`"
                      style="width: 200px"
                      :class="error_msg.includes(scope.row.id)? 'is-error':''"
                      :inline-message="true"
                    >
                      <el-input
                        placeholder="出价"
                        size="mini"
                        @change="form_change($event, scope.row.id)"
                        v-model="form[scope.row.id].bid"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div
                    v-else
                    style="color: #ff0000;line-height: 36px"
                  >不支持修改！</div>
                </template>
              </el-table-column>
              <el-table-column
                label=""
                class-name="operate"
                v-if="
                  active_type != 'SMART_BID_CONSERVATIVE' &&
                  set_table_data.length > 1
                "
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    ><span class="copy_all">复制到全部</span></el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
            <!-- 投放速速度 -->
            <el-table
              :data="set_table_data"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
              v-if="activeName == 'flow_control_mode'"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ad_name"
                label="计划名称"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="flow_control_mode_lang"
                label="当前投放速度类型"
                width="160"
              ></el-table-column>
              <el-table-column
                label="修改投放速度类型"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length && Object.keys(form).includes(set_table_data[0].id.toString())"
                >
                  <!-- <div v-if="active_type == 'SMART_BID_CUSTOM_1'"> -->
                  <div v-if="active_type != 'SMART_BID_CONSERVATIVE'">
                    <el-form-item :inline-message="true">
                      <el-radio-group
                        v-model="form[scope.row.id].flow_control_mode"
                        style="display: unset"
                        @change="form_change"
                      >
                        <el-radio label="FLOW_CONTROL_MODE_FAST">优先跑量</el-radio>
                        <el-radio label="FLOW_CONTROL_MODE_SMOOTH">控制成本上限</el-radio>
                        <el-radio label="FLOW_CONTROL_MODE_BALANCE">均衡投放</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <!-- <div v-if="active_type == 'SMART_BID_CUSTOM_2'">
                    <el-form-item :inline-message="true">
                      <el-radio-group
                        v-model="form[scope.row.id].flow_control_mode"
                        style="display: unset"
                      >
                        <el-radio label="FLOW_CONTROL_MODE_FAST">加速投放</el-radio>
                        <el-radio label="FLOW_CONTROL_MODE_SMOOTH">标准投放</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div> -->

                  <div
                    v-if="active_type == 'SMART_BID_CONSERVATIVE'"
                    style="color: #ff0000"
                  >
                    不支持修改！
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label=""
                class-name="operate"
                v-if="
                  active_type != 'SMART_BID_CONSERVATIVE' &&
                  set_table_data.length > 1
                "
                width="150"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    ><span class="copy_all">复制到全部</span></el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
            <!-- 投放日期 -->
            <el-table
              :data="set_table_data"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
              v-if="activeName == 'delivery_date'"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ad_name"
                label="计划名称"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="delivery_date"
                label="当前投放日期"
                width="200"
              ></el-table-column>
              <el-table-column
                label="修改投放日期"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length && Object.keys(form).includes(set_table_data[0].id.toString())"
                >
                  <el-form-item style="margin-bottom: 5px">
                    <el-radio-group
                      v-model="form[scope.row.id].schedule_type"
                      style="display: unset"
                      @change="handle_change_schedule_type(scope.row.id)"
                    >
                      <el-radio
                        label="SCHEDULE_FROM_NOW"
                        :disabled="form[scope.row.id].is_budegt_total"
                      >从今天起长期投放</el-radio>
                      <el-radio label="SCHEDULE_START_END">设置结束日期</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <div
                    v-if="
                      form[scope.row.id].schedule_type == 'SCHEDULE_START_END'
                    "
                    style="height: 56px"
                  >
                    <el-col :span="11">
                      <el-form-item :prop="`${scope.row.id}.start_time`">
                        <el-date-picker
                          v-model="form[scope.row.id].start_time"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择开始时间"
                          :disabled="form[scope.row.id].is_start_end"
                          :picker-options="startpickerOptions"
                          @change="form_change"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col
                      class="line"
                      :span="2"
                    >-</el-col>
                    <el-col :span="11">
                      <el-form-item :prop="`${scope.row.id}.end_time`">
                        <el-date-picker
                          v-model="form[scope.row.id].end_time"
                          type="date"
                          value-format="yyyy-MM-dd"
                          placeholder="选择结束时间"
                          :picker-options="startpickerOptions"
                          @change="form_change"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label=""
                class-name="operate"
                width="150"
                v-if="set_table_data.length > 1"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    ><span class="copy_all">复制到全部</span></el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
            <!-- 智能放量 -->
            <el-table
              :data="set_table_data"
              style="width: 100%"
              height="100%"
              stripe
              :border="true"
              v-if="activeName == 'automatic_targeting'"
            >
              <el-table-column
                show-overflow-tooltip
                prop="ad_name"
                label="计划名称"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="auto_extend_targets_lang"
                label="当前智能放量"
                width="200"
              >
                <template slot-scope="scope">
                  {{scope.row.auto_extend_targets_lang || '--'}}
                </template>
              </el-table-column>
              <el-table-column
                label="修改智能放量"
                class-name="operate select-container"
              >
                <template
                  slot-scope="scope"
                  v-if="Object.keys(form).length && Object.keys(form).includes(set_table_data[0].id.toString())"
                >
                  <div
                    style="display: flex; flex-flow: column"
                    v-if="active_type == 'new'"
                  >
                    <el-form-item style="margin-bottom: 5px;min-height: 24px">
                      <!-- <el-radio-group v-model="form[scope.row.id].auto_extend_enabled">
                        <el-radio-button label="0">不启用</el-radio-button>
                        <maps-tooltip :text="check_automatic_open(form[scope.row.id].config).text">
                          <el-radio-button
                            label="1"
                            :disabled="check_automatic_open(form[scope.row.id].config).state"
                          >启用</el-radio-button>
                        </maps-tooltip>
                      </el-radio-group> -->
                      <maps-tooltip
                        :text="check_automatic_open(form[scope.row.id].config).text"
                        align="left"
                      >
                        <el-switch
                          v-model="form[scope.row.id].auto_extend_enabled"
                          :disabled="check_automatic_open(form[scope.row.id].config).state"
                          @change="form_change"
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#0BB3B3"
                          inactive-color="#C4C4C4"
                        ></el-switch>
                      </maps-tooltip>
                      <span style="line-height: 20px;margin-left: 5px;font-size: 12px">{{form[scope.row.id].auto_extend_enabled == '1'? '启用':'禁用'}}</span>
                    </el-form-item>

                    <el-form-item
                      :prop="`${scope.row.id}.auto_extend_targets`"
                      class="extend_targets_form"
                      v-if="form[scope.row.id].auto_extend_enabled == '1'"
                    >
                      <el-checkbox-group
                        v-model="form[scope.row.id].auto_extend_targets"
                        @change="form_change"
                      >
                        <maps-tooltip
                          :text="
                            !item.enable ? '您未设置该定向，因此无法勾选' : ''
                          "
                          v-for="item in form[scope.row.id].config"
                          :key="item.value"
                        >
                          <el-checkbox
                            :label="item.value"
                            :disabled="!item.enable"
                            name="type"
                          >
                            {{ item.label }}
                          </el-checkbox>
                        </maps-tooltip>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <div
                    v-if="active_type == 'has'"
                    style="color: #ff0000"
                  >
                    当前计划使用了定向包，系统暂不支持修改定向包内的设置，以免影响其他计划。
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label=""
                class-name="operate"
                width="150"
                v-if="active_type == 'new' && set_table_data.length > 1"
              >
                <template slot-scope="scope">
                  <el-form-item v-if="scope.row.id == first_cell">
                    <el-button
                      size="mini"
                      class="maps-button-mini"
                      type="text"
                      @click="handle_copy_all"
                    ><span class="copy_all">复制到全部</span></el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>

        <div class="batch_btn">
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
        </div>
      </main>
    </el-popover>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import fetch from "@/services/fetch";
import _ from "lodash";

export default {
  components: {},
  props: {
    checked: {
      type: Array,
      default: () => {
        return [];
      },
    },
    has_touch: {
      type: Boolean,
      default: false,
    },
    has_pushing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      visible: false,
      handle_text: "批量修改",
      activeName: "budget",
      type: "",
      options: [
        {
          label: "开启",
          value: "open",
        },
        {
          label: "暂停",
          value: "close",
        },
        {
          label: "计划预算",
          value: "budget",
        },
        {
          label: "计划出价",
          value: "bid",
        },
        {
          label: "投放速度",
          value: "flow_control_mode",
        },
        {
          label: "投放日期",
          value: "delivery_date",
        },
        {
          label: "智能放量",
          value: "automatic_targeting",
        },
      ],
      model_list: [
        {
          label: "批量修改计划预算",
          name: "budget",
        },
        {
          label: "批量修改计划出价",
          name: "bid",
        },
        {
          label: "批量修改投放速度",
          name: "flow_control_mode",
        },
        {
          label: "批量修改投放日期",
          name: "delivery_date",
        },
        {
          label: "批量修改智能放量",
          name: "automatic_targeting",
        },
      ],
      type_list: {
        budget: [
          {
            label: "按日预算",
            key: "budget_mode",
            name: "BUDGET_MODE_DAY",
            show: true,
          },
          {
            label: "总预算",
            key: "budget_mode",
            name: "BUDGET_MODE_TOTAL",
            show: true,
          },
        ],
        bid: [
          {
            label: "CPM",
            key: "pricing",
            name: "PRICING_CPM",
            show: true,
          },
          {
            label: "oCPM",
            key: "pricing",
            name: "PRICING_OCPM",
            show: true,
          },
          {
            label: "CPC",
            key: "pricing",
            name: "PRICING_CPC",
            show: true,
          },
          {
            label: "oCPC",
            key: "pricing",
            name: "PRICING_OCPC",
            show: true,
          },
          {
            label: "CPA",
            key: "pricing",
            name: "PRICING_CPA",
            show: true,
          },
          {
            label: "CPV",
            key: "pricing",
            name: "PRICING_CPV",
            show: true,
          },
          {
            label: "自动出价",
            key: "smart_bid_type",
            name: "SMART_BID_CONSERVATIVE",
            show: true,
          },
        ],
        flow_control_mode: [
          {
            label: "常规投放（oCPC/oCPM/CPA）",
            key: "smart_bid_type",
            name: "SMART_BID_CUSTOM_1",
            relation_key: "pricing",
            relation_name: "PRICING_OCPC,PRICING_OCPM,PRICING_CPA",
            show: true,
          },
          {
            label: "常规投放（CPC/CPM/CPV）",
            key: "smart_bid_type",
            name: "SMART_BID_CUSTOM_2",
            relation_key: "pricing",
            relation_name: "PRICING_CPC,PRICING_CPM,PRICING_CPV",
            show: true,
          },
          {
            label: "放量投放（oCPM）",
            key: "smart_bid_type",
            name: "SMART_BID_CONSERVATIVE",
            relation_key: "",
            relation_name: "",
            show: true,
          },
        ],
        delivery_date: [],
        automatic_targeting: [
          {
            label: "新建定向",
            key: "audience_package_id",
            name: "new",
            show: true,
          },
          {
            label: "定向包",
            key: "audience_package_id",
            name: "has",
            show: true,
          },
        ],
      },
      first_cell: "",
      form: {},
      rules: {},
      active_type: "BUDGET_MODE_DAY",
      table_flag: false,
      startpickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      batch_form: {
        budget: {},
        bid: {},
        flow_control_mode: {},
        delivery_date: {},
        automatic_targeting: {},
      },
      form_flag: 0,
      active_edit_form: "",
      error_msg: [],
      screenWidth: null, //屏幕尺寸(监听宽+高)
    };
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          const dom = document.querySelector(".manage-ad-container");
          const popover = document.querySelector(".ad-batch-edit-popover");
          popover.style.width = `${dom.clientWidth - 20}px`;
          popover.style.height = `${dom.clientHeight - 80}px`;
        }
      },
    },
    screenWidth: {
      handler() {
        this.$nextTick(() => {
          const dom = document.querySelector(".manage-ad-container");
          const popover = document.querySelector(".ad-batch-edit-popover");
          popover.style.width = `${dom.clientWidth - 20}px`;
          popover.style.height = `${dom.clientHeight - 80}px`;
        });
      },
    },
  },
  computed: {
    ...mapState("advertising", ["checked_ad"]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
    ...mapState("user", ["user_nav"]),
    check_permission() {
      let param = {
        state: false,
        text: "",
      };
      if (this.AdSet_Manage_permission != 2) {
        param.state = true;
        param.text = "无权限操作，请联系团队管理员！";
      }
      return param;
    },
    set_type_tab() {
      let tmp_tabs = _.cloneDeep(this.type_list[this.activeName]);

      if (this.activeName == "budget") {
        tmp_tabs.forEach((item) => {
          item.show = false;
          this.checked.findIndex((obj) => {
            if (obj[item.key] == item.name) {
              item.show = true;
            }
          });
        });
      } else if (this.activeName == "bid") {
        tmp_tabs.forEach((item) => {
          item.show = false;
          this.checked.findIndex((obj) => {
            if (item.key == "pricing") {
              if (
                obj[item.key] == item.name &&
                obj.smart_bid_type != "SMART_BID_CONSERVATIVE"
              ) {
                item.show = true;
              }
            } else {
              if (obj[item.key] == item.name) {
                item.show = true;
              }
            }
          });
        });
      } else if (this.activeName == "flow_control_mode") {
        tmp_tabs.forEach((item) => {
          item.show = false;
          const customs = ["SMART_BID_CUSTOM_1", "SMART_BID_CUSTOM_2"];
          if (customs.includes(item.name)) {
            this.checked.findIndex((obj) => {
              // 常规投放（oCPC/oCPM/CPA）
              if (obj[item.key] == "SMART_BID_CUSTOM") {
                if (
                  item.relation_name.split(",").includes(obj[item.relation_key])
                ) {
                  item.show = true;
                }
              }
            });
          } else {
            this.checked.findIndex((obj) => {
              if (obj[item.key] == "SMART_BID_CONSERVATIVE") {
                item.show = true;
              }
            });
          }
        });
      } else if (this.activeName == "automatic_targeting") {
        tmp_tabs.forEach((item) => {
          item.show = false;
          if (item.name == "new") {
            this.checked.findIndex((obj) => {
              if (
                !obj.hasOwnProperty("audience_package_id") ||
                !obj.audience_package_id
              ) {
                item.show = true;
              }
            });
          } else if (item.name == "has") {
            this.checked.findIndex((obj) => {
              if (
                obj.hasOwnProperty("audience_package_id") &&
                obj.audience_package_id
              ) {
                item.show = true;
              }
            });
          }
        });
      } else if (this.activeName == "delivery_date") {
        this.active_type = "delivery_date";
      }

      let result = [];
      if (tmp_tabs.length) {
        tmp_tabs.forEach((tab) => {
          if (tab.show) {
            result.push(tab);
          }
        });
        this.active_type = result.length ? result[0].name : "";
      }

      return result;
    },
    set_table_data() {
      let result = [];
      const active = this.set_type_tab.filter((obj) => {
        return obj.name == this.active_type;
      });

      if (this.checked.length) {
        this.checked.forEach((item) => {
          if (this.activeName == "budget") {
            result = this.checked.filter((obj) => {
              return obj[active[0].key] == this.active_type;
            });
          } else if (this.activeName == "bid") {
            result = this.checked.filter((obj) => {
              if (active[0].key == "pricing") {
                if (obj.smart_bid_type != "SMART_BID_CONSERVATIVE") {
                  return obj[active[0].key] == this.active_type;
                }
              } else {
                return obj[active[0].key] == this.active_type;
              }
            });
          } else if (this.activeName == "flow_control_mode") {
            const customs = ["SMART_BID_CUSTOM_1", "SMART_BID_CUSTOM_2"];

            result = this.checked.filter((obj) => {
              if (customs.includes(this.active_type)) {
                return (
                  obj[active[0].key] == "SMART_BID_CUSTOM" &&
                  active[0].relation_name
                    .split(",")
                    .includes(obj[active[0].relation_key])
                );
              } else {
                return obj[active[0].key] == this.active_type;
              }
            });
          } else if (this.activeName == "delivery_date") {
            result = this.checked;
          } else if (this.activeName == "automatic_targeting") {
            if (active[0].name == "new") {
              result = this.checked.filter((obj) => {
                return (
                  !obj.hasOwnProperty("audience_package_id") ||
                  !obj.audience_package_id
                );
              });
            } else {
              result = this.checked.filter((obj) => {
                return (
                  obj.hasOwnProperty("audience_package_id") &&
                  obj.audience_package_id
                );
              });
            }
          }
        });
      }

      return result;
    },
  },
  methods: {
    handle_to_batch() {
      if (this.has_touch) {
        this.$message({
          message: "勾选项中包含已触发规则的计划，请先处理或重新选择！",
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }
      if (this.has_pushing) {
        this.$message({
          message:
            "勾选项中包含推送中的计划，推送中的计划不允许修改，请重新选择！",
          duration: 5000,
          offset: 3,
          type: "error",
        });
        return false;
      }
    },
    set_form() {
      // this.form = {};
      let form = {};
      let rules = {};
      if (this.activeName == "budget") {
        if (this.set_table_data.length) {
          this.first_cell = this.set_table_data[0].id;
          this.set_table_data.forEach((item) => {
            const param = {
              budget: item.budget || 0,
              budget_mode: item.budget_mode,
            };

            // 预算
            var validateBudget = (rule, value, callback) => {
              const pricing = item.pricing;
              const one = ["PRICING_CPC", "PRICING_CPM", "PRICING_CPV"];
              const three = ["PRICING_CPA", "PRICING_OCPC", "PRICING_OCPM"];
              const reg = this.$constReg.num; //允许小数，最多保留两位小数。
              if (!reg.test(value)) {
                callback(new Error("允许小数，最多保留两位小数。"));
              } else {
                value = Number(value);
                if (value > 9999999.99) {
                  callback(
                    new Error(
                      "修改金额不符合规则。CPC、CPM,最低计划日预算100；CPA、oCPC、oCPM最低计划日预算是300；计划预算最高设置不能超过9999999.99。"
                    )
                  );
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
            };
            const rule = {
              budget: [
                {
                  required: true,
                  validator: validateBudget,
                  trigger: ["blur", "change"],
                },
                {
                  required: true,
                  message: "预算不能为空！",
                  trigger: ["blur", "change"],
                },
              ],
            };

            this.$set(form, item.id, param);
            this.$set(rules, item.id, rule);
          });
        }
      } else if (this.activeName == "bid") {
        if (this.set_table_data.length) {
          this.first_cell = this.set_table_data[0].id;
          this.set_table_data.forEach((item) => {
            const param = {
              bid: item.bid || "",
              pricing: item.pricing,
            };
            this.$set(form, item.id, param);

            var validateBid = (rule, value, callback) => {
              const pricing = item.pricing;
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
                value = Number(value);
                // if (item.smart_bid_type == 'SMART_BID_CONSERVATIVE') {
                //   callback();
                // }
                if (
                  value < pricing_map[pricing].data[0] ||
                  value > pricing_map[pricing].data[1]
                ) {
                  callback(new Error(pricing_map[pricing].msg));
                } else {
                  if (value > Number(item.budget)) {
                    callback(new Error("计划出价需小于计划预算。"));
                  } else {
                    callback();
                  }
                }
              }
            };
            const rule = {
              bid: [
                {
                  required: true,
                  validator: validateBid,
                  trigger: ["blur", "change"],
                },
                {
                  required: true,
                  message: "计划出价不能为空！",
                  trigger: ["blur", "change"],
                },
              ],
            };

            this.$set(rules, item.id, rule);
          });
        }
      } else if (this.activeName == "flow_control_mode") {
        if (this.set_table_data.length) {
          this.first_cell = this.set_table_data[0].id;
          this.set_table_data.forEach((item) => {
            const param = {
              flow_control_mode: item.flow_control_mode,
            };
            this.$set(form, item.id, param);
          });
        }
      } else if (this.activeName == "delivery_date") {
        if (this.set_table_data.length) {
          this.first_cell = this.set_table_data[0].id;
          this.set_table_data.forEach((item) => {
            const param = {
              schedule_type: item.schedule_type,
              delivery_date: item.delivery_date,
              is_start_end: true,
              start_time: "",
              end_time: "",
              is_budegt_total: false,
            };
            // const date = item.delivery_date.split(" ");
            // param.start_time = date[0];
            param.start_time = item.start_time.split(" ")[0];
            if (item.schedule_type == "SCHEDULE_START_END") {
              // param.is_start_end = true;
              const date = item.end_time.split(" ");
              param.end_time = date[0];
            } else if (item.schedule_type == "SCHEDULE_FROM_NOW") {
              // param.is_start_end = false;
              param.end_time = "";
            }
            //   总预算
            if (item.budget_mode == "BUDGET_MODE_TOTAL") {
              param.is_budegt_total = true;
              param.schedule_type = "SCHEDULE_START_END";
            } else {
              param.is_budegt_total = false;
            }

            this.$set(form, item.id, param);

            var validateDate = (rule, value, callback) => {
              if (
                form[item.id].start_time.length &&
                form[item.id].end_time.length
              ) {
                const start = new Date(form[item.id].start_time).getTime();
                const end = new Date(form[item.id].end_time).getTime();
                if (start >= end) {
                  callback(new Error("结束日期必须大于开始日期！"));
                } else {
                  callback();
                }
              } else {
                if (form[item.id].start_time == "") {
                  callback(new Error("请选择开始时间。"));
                } else {
                  callback();
                }
                if (form[item.id].end_time == "") {
                  callback(new Error("请选择结束时间。"));
                } else {
                  callback();
                }
              }
            };
            const rule = {
              start_time: [
                {
                  required: true,
                  validator: validateDate,
                  trigger: ["blur", "change"],
                },
                {
                  required: true,
                  message: "请选择开始时间。",
                  trigger: ["blur", "change"],
                },
              ],
              end_time: [
                {
                  required: true,
                  message: "请选择结束时间。",
                  trigger: ["blur", "change"],
                },
              ],
            };

            this.$set(rules, item.id, rule);
          });
        }
      } else if (this.activeName == "automatic_targeting") {
        const rule = {
          auto_extend_targets: [
            {
              required: true,
              message: "请选择可开放定向！",
              trigger: ["blur", "change"],
            },
          ],
        };
        if (this.set_table_data.length) {
          this.first_cell = this.set_table_data[0].id;
          this.set_table_data.forEach((item) => {
            const param = {
              auto_extend_enabled: item.auto_extend_enabled,
              auto_extend_targets: JSON.parse(item.auto_extend_targets) || [],
              config: [
                {
                  label: "地域",
                  value: "REGION",
                  map: "district",
                  enable: true,
                },
                {
                  label: "性别",
                  value: "GENDER",
                  map: "gender",
                  enable: true,
                },
                {
                  label: "年龄",
                  value: "AGE",
                  map: "age",
                  enable: true,
                },
                {
                  label: "行为兴趣",
                  value: "INTEREST_ACTION",
                  map: "interest_action_mode",
                  enable: true,
                },
                {
                  label: "自定义人群",
                  value: "CUSTOM_AUDIENCE",
                  map_1: "retargeting_tags",
                  map_2: "retargeting_tags_exclude",
                  enable: true,
                },
              ],
            };

            param.config.forEach((config_item) => {
              if (config_item.value == "CUSTOM_AUDIENCE") {
                if (
                  (!item.hasOwnProperty(config_item.map_1) ||
                    !item[config_item.map_1]) &&
                  (!item.hasOwnProperty(config_item.map_2) ||
                    !item[config_item.map_2])
                ) {
                  config_item.enable = false;
                } else {
                  if (
                    (item.hasOwnProperty(config_item.map_1) &&
                      item[config_item.map_1] != "[]") ||
                    (item.hasOwnProperty(config_item.map_2) &&
                      item[config_item.map_2] != "[]")
                  ) {
                    config_item.enable = true;
                  } else {
                    config_item.enable = false;
                  }
                }
              } else if (
                config_item.value == "REGION" ||
                config_item.value == "GENDER"
              ) {
                //地域和性别为none时，表示不限
                if (
                  item.hasOwnProperty(config_item.map) &&
                  item[config_item.map] == "NONE"
                ) {
                  config_item.enable = false;
                } else {
                  config_item.enable = true;
                }
              } else if (config_item.value == "AGE") {
                //没有返回年龄，表示不限
                if (
                  !item.hasOwnProperty(config_item.map) ||
                  item[config_item.map] == "[]" ||
                  item[config_item.map] == null
                ) {
                  config_item.enable = false;
                } else {
                  config_item.enable = true;
                }
              } else if (config_item.value == "INTEREST_ACTION") {
                // 行为兴趣是UNLIMITED，表示不限
                if (
                  item.hasOwnProperty(config_item.map) &&
                  item[config_item.map] == "UNLIMITED"
                ) {
                  config_item.enable = false;
                } else {
                  config_item.enable = true;
                }
              }
            });

            this.$set(form, item.id, param);
            this.$set(rules, item.id, rule);
          });
        }
      }
      this.table_flag = true;
      this.$nextTick(() => {
        this.form = form;
        this.rules = rules;
        this.isLoading = false;
        this.set_batch_form();
      });
    },
    // 生成批量form表单
    set_batch_form() {
      const keys = Object.keys(this.batch_form[this.activeName]);
      if (!keys.includes(this.active_type)) {
        // if (this.active_edit_form != "") {
        //   this.$set(
        //     this.batch_form[this.activeName],
        //     this.active_type,
        //     this.form
        //   );
        // }
      } else {
        this.form = _.cloneDeep(
          this.batch_form[this.activeName][this.active_type]
        );
      }
    },
    form_change(value, id) {
      this.active_edit_form = this.active_type;

      if (this.activeName == "budget") {
        let form = {};
        this.$set(form, id, this.form[id]);
        this.check_form(form).then((res) => {
          if (!res) {
            if (!this.error_msg.includes(id)) {
              this.error_msg.push(id);
            }
          } else {
            if (this.error_msg.includes(id)) {
              this.error_msg = this.error_msg.filter((obj) => {
                return obj != id;
              });
            }
          }
        });
      }
    },
    async check_form(form = this.form) {
      const url = "/adpush/jl/adedit/checkEditData";

      return new Promise(async (resolve, reject) => {
        await this.fetchCore(url, this.reset_form(form), false)
          .then((res) => {
            if (res.hasOwnProperty("id") && res.hasOwnProperty("msg")) {
              this.$message({
                message: res.msg,
                duration: 5000,
                offset: 3,
                type: "error",
              });
              resolve(false);
            } else {
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    validator_form() {
      let state = true;

      this.$refs.form.validate((valid) => {
        if (valid) {
          state = true;
        } else {
          state = false;
        }
      });
      return state;
    },
    // 检查只能放量是否可以开启
    check_automatic_open(list = []) {
      let state = true;
      let text =
        "以下定向被设置为不限，不可开启智能放量：地域、性别、年龄、行为兴趣、自定义人群。";
      list.forEach((item) => {
        if (item.enable) {
          state = false;
          text = "";
        }
      });
      return { state, text };
    },
    async edit_popover_show() {
      let result = [];
      this.checked.forEach((item) => {
        result.push(item.media_ad_id);
      });

      const url = `/adpush/jl/adedit/open`;
      let param = {
        media_ad_ids: result.join(),
      };
      await this.fetchCore(url, param, false);
    },
    async check_open() {
      const url = `/adpush/jl/adedit/open`;
      let result = [];
      this.checked.forEach((item) => {
        result.push(item.media_ad_id);
      });
      let param = {
        media_ad_ids: result.join(),
      };
      return new Promise(async (resolve, reject) => {
        await this.fetchCore(url, param, false)
          .then((data) => {
            if (data) {
              resolve(true); //可以编辑
            } else {
              this.isLoading = false;
              reject(false); //正在被其他用户编辑，当前不可操作
            }
          })
          .catch((err) => {
            this.isLoading = false;
            reject(false);
          });
      });
    },
    async edit_popover_close() {
      this.batch_form = {
        budget: {},
        bid: {},
        flow_control_mode: {},
        delivery_date: {},
        automatic_targeting: {},
      };
      this.active_edit_form = "";
      let result = [];
      this.error_msg = [];
      this.checked.forEach((item) => {
        result.push(item.media_ad_id);
      });

      const url = `/adpush/jl/adedit/close`;
      let param = {
        media_ad_ids: result.join(),
      };
      await this.fetchCore(url, param, false);
    },
    handle_batch(param) {
      this.handle_text = param.label;
      const not_show_popover = ["open", "close"];
      if (!not_show_popover.includes(param.value)) {
        this.isLoading = true;
        this.check_open()
          .then(() => {
            this.visible = true;
            this.activeName = param.value;
            this.set_form();
          })
          .catch(() => {
            this.isLoading = false;
          });
      } else {
        if (param.value == "open") {
          let result = [];
          this.checked.forEach((item) => {
            // result.push(item.media_ad_id);
            result.push(item.id);
          });
          const param = {
            opt_status: 1,
            ids: result.join(),
          };
          this.check_open().then(() => {
            this.$emit("changeStatus", param, (val) => {
              if (val) this.edit_popover_close();
            });
          });
        } else if (param.value == "close") {
          let result = [];
          this.checked.forEach((item) => {
            // result.push(item.media_ad_id);
            result.push(item.id);
          });
          const param = {
            opt_status: 0,
            ids: result.join(),
          };
          this.check_open().then(() => {
            this.$emit("changeStatus", param, (val) => {
              if (val) this.edit_popover_close();
            });
          });
        }
      }
    },
    // 切换一级tab
    async change_active_name(activeName, oldActiveName) {
      if (this.activeName == activeName) return false;

      return new Promise(async (resolve, reject) => {
        if (this.validator_form() && !this.error_msg.length) {
          await this.check_form()
            .then((val) => {
              if (val) {
                if (
                  this.active_edit_form.length != 0 &&
                  this.active_edit_form == this.active_type
                ) {
                  this.$set(
                    this.batch_form[this.activeName],
                    this.active_type,
                    this.form
                  );
                }

                this.active_edit_form = "";
                this.activeName = activeName;
                this.form_flag++;
                this.active_type = "";
                this.error_msg = [];
                this.$nextTick(() => {
                  this.set_form();
                });
                resolve(true);
              } else {
                reject(false);
              }
            })
            .catch(() => {
              reject(false);
            });
        } else {
          reject(false);
        }
      });
    },
    // 切换数据类型
    change_handle_type(activeName, oldActiveName) {
      if (this.active_type == activeName) return;

      const tabs = this.type_list[this.activeName];
      const index = tabs.findIndex((obj) => {
        return obj.name == oldActiveName;
      });
      if (index < 0) {
        return true;
      }
      return new Promise(async (resolve, reject) => {
        if (this.validator_form()) {
          await this.check_form()
            .then((val) => {
              if (val) {
                if (
                  this.active_edit_form.length != 0 &&
                  this.active_edit_form == this.active_type
                ) {
                  this.$set(
                    this.batch_form[this.activeName],
                    this.active_type,
                    this.form
                  );
                }

                this.active_edit_form = "";
                this.form_flag++;
                // this.active_type =
                //   activeName || this.set_type_tab.length
                //     ? this.set_type_tab[0].name
                //     : "";
                this.active_type = activeName;
                this.table_flag = false;
                this.error_msg = [];
                this.$nextTick(() => {
                  this.set_form();
                });
                resolve(true);
              } else {
                reject(false);
              }
            })
            .catch(() => {
              reject(false);
            });
        } else {
          reject(false);
        }
      });
    },
    // 保存批量
    save_batch() {
      let result = [];
      const keys = Object.keys(this.batch_form);
      keys.forEach((item) => {
        const childs = Object.keys(this.batch_form[item]);
        if (childs.length) {
          childs.forEach((child) => {
            result.push({
              form: this.batch_form[item][child],
              type: item,
            });
          });
        }
      });
      return result;
    },
    // 切换投放日期类型
    handle_change_schedule_type(id) {
      this.active_edit_form = this.active_type;
      // this.form[id].end_time == ''
    },
    // 复制到全部
    handle_copy_all() {
      this.active_edit_form = this.active_type;
      const tmp_form = this.form[this.first_cell];

      if (this.activeName == "budget" || this.activeName == "bid") {
        if (this.error_msg.includes(this.first_cell)) {
          this.$message({
            message: "请先填写正确的内容，再操作复制",
            duration: 5000,
            offset: 3,
            type: "error",
          });
          return false;
        }
      }

      const keys = Object.keys(this.form);
      if (keys.length) {
        keys.forEach((item) => {
          if (this.activeName == "delivery_date") {
            if (tmp_form.is_budegt_total) {
              this.form[item].schedule_type = tmp_form.schedule_type;
              this.form[item].end_time = tmp_form.end_time;
            } else {
              if (tmp_form.schedule_type == "SCHEDULE_FROM_NOW") {
                if (!this.form[item].is_budegt_total) {
                  this.form[item].schedule_type = tmp_form.schedule_type;
                  this.form[item].end_time = tmp_form.end_time;
                }
              } else {
                this.form[item].schedule_type = tmp_form.schedule_type;
                this.form[item].end_time = tmp_form.end_time;
              }
            }
          } else if (this.activeName == "automatic_targeting") {
            if (tmp_form.auto_extend_enabled == "1") {
              if (tmp_form.auto_extend_targets.length == 0) {
                return false;
              }

              // 判断时候可以复制
              let can_copy = false;
              this.form[item].config.forEach((target_item) => {
                if (target_item.enable) {
                  can_copy = true;
                }
              });
              if (can_copy) {
                this.form[item].auto_extend_enabled =
                  tmp_form.auto_extend_enabled;
              }

              let result = [];
              // this.form[item].auto_extend_targets = [];
              tmp_form.auto_extend_targets.forEach((target) => {
                const index = this.form[item].config.findIndex((obj) => {
                  return obj.value == target;
                });
                if (this.form[item].config[index].enable) {
                  result.push(target);
                }
              });
              this.form[item].auto_extend_targets = result;
            } else {
              this.form[item].auto_extend_targets = [];
              this.form[item].auto_extend_enabled =
                tmp_form.auto_extend_enabled;
            }
          } else {
            const keys = Object.keys(tmp_form);
            keys.forEach((key) => {
              if (key != "id") {
                this.form[item][key] = tmp_form[key];
              }
            });
          }
        });
      }
      this.$set(this.batch_form[this.activeName], this.active_type, this.form);
    },
    handle_cancel() {
      this.visible = false;
      this.form = {};
      this.$refs.form.resetFields();
      this.$refs.form.clearValidate();
    },
    handle_save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid && !this.error_msg.length) {
          await this.check_form()
            .then((val) => {
              if (val) {
                this.isLoading = true;
                this.$set(
                  this.batch_form[this.activeName],
                  this.active_type,
                  this.form
                );
                const url = "/adpush/jl/adedit/savebudget";

                let request = [];
                this.save_batch().forEach((item) => {
                  request.push(
                    this.fetchCore(
                      url,
                      this.reset_form(item.form, item.type),
                      false
                    )
                  );
                });
                Promise.all(request).then((res) => {
                  this.$emit("batchSave");
                  this.isLoading = false;
                  this.visible = false;
                });
                // resolve(true);
              } else {
                // reject(false);
              }
            })
            .catch(() => {
              // reject(false);
            });
        } else {
          return false;
        }
      });
    },
    reset_form(form, type) {
      let result = [];
      const ids = Object.keys(form);
      ids.forEach((item) => {
        let param = {};
        if (type == "delivery_date") {
          let time = "";
          if (form[item].schedule_type == "SCHEDULE_START_END") {
            time = `${form[item].start_time}~${form[item].end_time}`;
          } else {
            time = `${form[item].start_time}~`;
          }
          param = {
            id: item,
            schedule_type: form[item].schedule_type,
            delivery_date: time,
            start_time: form[item].start_time,
            end_time: form[item].end_time,
          };
        } else if (type == "automatic_targeting") {
          if (form[item].auto_extend_enabled == "0") {
            form[item].auto_extend_targets = [];
          }
          param = {
            id: item,
            auto_extend_enabled: form[item].auto_extend_enabled,
            auto_extend_targets: form[item].auto_extend_targets,
          };
        } else {
          param = {
            id: item,
            ...form[item],
          };
        }

        result.push(param);
      });
      return result;
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
  mounted() {
    this.screenWidth = document.body.clientWidth + document.body.clientHeight;
    window.onresize = () => {
      //屏幕尺寸变化就重新赋值
      return (() => {
        this.screenWidth =
          document.body.clientWidth + document.body.clientHeight;
      })();
    };
  },
};
</script>
<style lang="scss">
.ad-batch-edit-popover {
  left: 200px !important;
  .popper__arrow {
    left: 310.5px !important;
  }
  .edit-popover-main {
    .el-tabs {
      .el-tabs__item,
      .el-tabs__item.is-active {
        font-size: 12px;
      }
    }
    .show-create-tabs {
      .el-tabs__header {
        border: 0;
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            border-radius: 3px;
            .el-tabs__item {
              height: 32px;
              line-height: 32px;
              border-top: 1px solid #dddddd;
              border-bottom: 1px solid #dddddd;
              border-color: #dddddd;
            }
            .el-tabs__item.is-active {
              border-color: #0bb3b3;
            }
            .el-tabs__item:first-child {
              border-top-left-radius: 3px;
              border-bottom-left-radius: 3px;
              border-left: 1px solid #dddddd;
            }
            .el-tabs__item:last-child {
              border-top-right-radius: 3px;
              border-bottom-right-radius: 3px;
              border-right: 1px solid #dddddd;
            }
          }
        }
      }
    }
    .edit-table-main {
      .el-table {
        .cell {
          font-size: 12px;
        }
      }
    }
  }
  .edit-table-main {
    .batch-edit-Form {
      height: 100%;
      .operate {
        border-right: 0px;
        .el-form-item {
          margin-bottom: 0px;
          margin-right: 10px;
          .el-select {
            .el-input__inner {
              color: #333;
            }
          }
          .copy_all {
            font-size: 12px;
            color: #0bb3b3;
          }
          .el-date-editor .el-input__inner {
            font-size: 12px;
          }
        }
        .line {
          color: #333;
          text-align: center;
          line-height: 40px;
        }
        .extend_targets_form {
          height: 45px;
          .el-form-item__content {
            line-height: 24px;
          }
        }
        .budget_input {
          .el-input__inner {
            height: 35px;
            line-height: 35px;
          }
        }
        .el-select-dropdown__item {
          color: #333;
        }
      }
    }
  }
}

.ad-batch-isCollapse {
  left: 74px !important;
}
</style>
<style lang='scss' scoped>
.edit-popover-main {
  height: 100%;
  header {
    height: 40px;
    margin-bottom: 10px;
  }
  .edit-table-main {
    height: calc(100% - 130px);
    overflow-y: auto;
    .batch-edit-Form {
      height: 100%;
    }
  }
  .batch_btn {
    padding-top: 10px;
    text-align: right;
  }
}
</style>