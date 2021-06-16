<template>
  <maps-drawer
    :title="drawer_title"
    :loading="isLoading"
    @close="close_drawer"
    @opened="drawer_opened"
    @closed="drawer_closed"
    :full="true"
    class="task-detail-drawer"
    ref="mpasDrawer_log"
  >
    <section
      slot="drawerHeader"
      style="felx: 1"
    >
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_cancel"
        plain
      >{{ $t("lang.public_button_cancel") }}</el-button>
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="handle_save('taskForm')"
        type="primary"
      >{{ $t("lang.public_button_save") }}</el-button>
    </section>
    <section
      slot="drawerBody"
      style="height: 100%; overflow-y: auto"
    >
      <el-form
        :model="taskForm"
        :rules="rules"
        :hide-required-asterisk="true"
        ref="taskForm"
        label-width="120px"
        class="demo-taskForm"
      >
        <el-form-item
          label="任务名称："
          prop="name"
        >
          <el-input
            v-model="taskForm.name"
            maxlength="40"
            size="mini"
            show-word-limit
            placeholder="选填"
          ></el-input>
        </el-form-item>

        <el-form-item label>
          <template slot="label">
            <span>
              <maps-tooltip
                :text="$t('lang.intelligent_task_create_level_point')"
                align="left"
              >
                <i class="iconfont maps-icon-info"></i>
              </maps-tooltip>响应层级：
            </span>
          </template>
          <el-radio-group
            v-model="taskForm.level"
            @change="level_change"
          >
            <el-radio
              v-for="item in level_list"
              :key="item.value"
              :label="item.value"
            >{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="响应范围：">
          <el-row>
            <el-col
              :span="14"
              class="scope-tree-box"
              v-loading="tree_loading"
            >
              <div class="col-title select-container">
                <span>
                  选择{{ level_map[taskForm.level].label }}
                </span>

                <div class="tree-days">
                  剔除投放结束
                  <el-select
                    size="mini"
                    style="width: 70px;margin: 0 5px"
                    v-model="tree_days"
                    @change="tree_days_change"
                  >
                    <el-option
                      :label="60"
                      :value="60"
                    ></el-option>
                    <el-option
                      :label="30"
                      :value="30"
                    ></el-option>
                    <el-option
                      :label="14"
                      :value="14"
                    ></el-option>
                    <el-option
                      :label="7"
                      :value="7"
                    ></el-option>
                  </el-select>
                  天的

                  <maps-tooltip
                    :text="set_tree_tooltip()"
                    align="left"
                  >
                    <i class="iconfont maps-icon-info"></i>
                  </maps-tooltip>
                </div>
              </div>
              <main>
                <div class="tree-filter ">
                  <el-input
                    style="padding-bottom: 10px;"
                    :placeholder="set_tree_search"
                    v-model="filterText"
                  ></el-input>
                </div>
                <table-empty
                  v-show="tree_empty"
                  text="没有可选择的响应范围"
                ></table-empty>
                <div class="scope-tree">
                  <el-tree
                    v-show="!tree_empty"
                    class="filter-tree"
                    :data="scope_tree_data[level_map[taskForm.level].key]"
                    node-key="id"
                    show-checkbox
                    :default-expanded-keys="checked_keys"
                    :default-checked-keys="checked_keys"
                    :filter-node-method="filterNode"
                    @check-change="tree_check_change"
                    ref="tree"
                  >
                    <span
                      class="custom-tree-node"
                      slot-scope="{ data }"
                    >
                      <span>{{ data.name
                        }}{{
                          data.children ? `(${data.children.length || 0})` : ""
                        }}</span>
                      <maps-tooltip
                        :text="disabled_text[level_map[taskForm.level].key]"
                        align="left"
                      >
                        <i
                          class="iconfont maps-icon-effect"
                          v-if="data.flag"
                        ></i>
                      </maps-tooltip>
                      <span
                        class="end_60"
                        v-if="data.end_flag"
                      >已结束</span>
                    </span>
                  </el-tree>
                </div>
              </main>
            </el-col>
            <el-col
              :span="10"
              class="rule-list-box"
              v-loading="rule_loading"
            >
              <div class="col-title">选择规则</div>
              <main>
                <el-input
                  style="padding-bottom: 10px"
                  placeholder="搜索规则名称或ID"
                  v-model="rule_keywords"
                ></el-input>
                <table-empty
                  v-show="filter_rules.length == 0"
                  text="没有可应用的规则"
                ></table-empty>
                <el-checkbox
                  v-show="filter_rules.length"
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >全选</el-checkbox>
                <div class="rule-list">
                  <el-checkbox-group
                    v-model="checkedrules"
                    @change="handleCheckedRulesChange"
                  >
                    <el-checkbox
                      v-for="item in filter_rules"
                      :disabled="item.status == 0"
                      :label="item.id"
                      :key="item.id"
                    >
                      <maps-tooltip
                        :text="item.status == '0' ? disabled_rule : ''"
                        align="left"
                      >
                        <div class="rule-label ellipsis-label">
                          {{ item.name }}
                        </div>
                      </maps-tooltip>

                      <maps-tooltip
                        :text="item.desc"
                        align="left"
                      >
                        <i class="iconfont maps-icon-effect"></i>
                      </maps-tooltip>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </main>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item
          label
          prop="range"
        >
          <template slot="label">
            <span>
              <maps-tooltip
                :text="$t('lang.intelligent_task_create_range_point')"
                align="left"
              >
                <i class="iconfont maps-icon-info"></i>
              </maps-tooltip>计算范围：
            </span>
          </template>
          <el-radio-group
            v-model="taskForm.range"
            v-if="set_range_config.length"
          >
            <maps-tooltip
              v-for="item in set_range_config"
              :key="item.key"
              :text="item.disabled ? item.desc : ''"
              align="left"
            >
              <el-radio
                v-if="item.show"
                :disabled="item.disabled"
                :label="item.key"
              >{{ item.zh }}</el-radio>
            </maps-tooltip>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </section>
  </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {
    checked: {
      type: Array,
      required: false,
    },
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
    return {
      drawer_title: "创建规则任务",
      isLoading: false,
      tree_loading: false,
      rule_loading: false,
      active_task_id: "",
      task_info: {},
      edit_task_level: "",
      checked_keys: [],
      taskForm: {
        team_id: "",
        platform: "1",
        id: "",
        name: "",
        level: 1,
        rule_id: [],
        range: 1,
        advertiser_ids: [],
        campaign_ids: [],
        ids: [],
      },
      rules: {
        name: [
          {
            required: false,
            validator: validatename,
            trigger: ["blur"],
          },
        ],
        range: [
          {
            required: true,
            message: "请选择计算范围！",
            trigger: ["blur"],
          },
        ],
      },
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      level_list: [],
      level_map: {
        1: {
          label: "Campaign",
          key: "campaign",
        },
        2: {
          label: "Ad",
          key: "ad",
        },
      },
      disabled_text: {
        campaign:
          "广告组已触发规则，无法勾选。请您先处理“推送”或“忽略”，才能为该广告组新建规则任务。",
        ad:
          "计划已触发规则，无法勾选。请您先处理“推送”或“忽略”，才能为该计划新建规则任务。",
      },
      scope_tree_data: {},
      tree_empty: false,
      tree_days: 60,
      rule_keywords: "",
      disabled_rule:
        "智能规则已失效，无法被应用。您可前往【辅助工具】-【规则管理】-【智能规则】页面管理规则。",
      rule_list: [],
      all_rules: [],
      checkAll: false,
      checkedrules: [],
      isIndeterminate: false,
      has_range: false, //选择的规则里面是否包含范围内，默认是空，所以没有
      is_all_campaign: false, //是否全部都是一个账号下的campaign
      is_all_ad: false, //是否全部都是一个账号下的ad
      has_top_3: false, //选中的规则是否存在top3
      top_3_rules: [],
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    checkedrules(val) {
      this.has_range = false;
      this.has_top_3 = false;
      this.top_3_rules = [];
      if (val.length) {
        val.forEach((item) => {
          const index = this.rule_list.findIndex((obj) => {
            return obj.id == item;
          });
          if (index >= 0) {
            if (this.rule_list[index].is_all_range_flag) {
              this.has_range = true;
              if (this.rule_list[index].is_all_range_flag == "2") {
                this.has_top_3 = true;
                this.top_3_rules.push(this.rule_list[index].name);
              }
            }
          }
        });
      }
    },
    has_range(val) {
      if (!val) {
        this.taskForm.level == "1"
          ? (this.taskForm.range = 1)
          : (this.taskForm.range = 4);
      } else {
        if (this.taskForm.range == "1" || this.taskForm.range == "4") {
          this.taskForm.range = "";
        } else {
          this.taskForm.range = this.taskForm.range || "";
        }
      }
    },
  },
  computed: {
    ...mapState("tools", ["task_handle_type"]),
    ...mapState("system", ["active_team_id"]),
    ...mapState("advertising", ["active_tab"]),
    filter_rules() {
      if (this.rule_keywords) {
        let result = this.rule_list.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(this.rule_keywords.toLowerCase()) !=
              -1 ||
            item.rid.toString().indexOf(this.rule_keywords.toLowerCase()) != -1
          );
        });
        return result;
      } else {
        return this.rule_list;
      }
    },
    set_range_config() {
      let config = [];
      if (this.taskForm.level == 1) {
        config = [
          {
            key: 1,
            zh: "单个Campaign",
            en: "",
            disabled: this.has_range,
            desc: "",
            show: true,
          },
          {
            key: 2,
            zh: "1个账号下全部Campaign（总是包括新建Campaign）",
            en: "",
            // disabled: !(
            //   this.taskForm.hasOwnProperty("advertiser_ids") &&
            //   this.taskForm.advertiser_ids.length
            // ),
            disabled: !this.is_all_campaign,
            desc: "仅当响应范围勾选了1个账号下所有Campaign时可以勾选。",
            show: this.has_range,
          },
          {
            key: 3,
            zh: "1个账号下选中的Campaign",
            en: "",
            disabled: false,
            desc: "",
            show: this.has_range,
          },
        ];
      } else {
        config = [
          {
            key: 4,
            zh: "单个Ad",
            en: "",
            disabled: this.has_range,
            desc: "",
            show: true,
          },
          {
            key: 5,
            zh: "1个账号下全部Ad（总是包括新建Ad）",
            en: "",
            // disabled: !(
            //   this.taskForm.hasOwnProperty("advertiser_ids") &&
            //   this.taskForm.advertiser_ids.length
            // ),
            disabled: !this.is_all_campaign,
            desc: "仅当响应范围勾选了1个账号下所有Ad时可以勾选。",
            show: this.has_range,
          },
          {
            key: 6,
            zh: "1个账号下选中的Ad",
            en: "",
            disabled: false,
            desc: "",
            show: this.has_range,
          },
          {
            key: 7,
            zh: "1个Campaign下全部Ad（总是包括新建Ad）",
            en: "",
            // disabled: !(
            //   this.taskForm.hasOwnProperty("campaign_ids") &&
            //   this.taskForm.campaign_ids.length
            // ),
            disabled: !this.is_all_ad,
            desc: "仅当响应范围勾选了1个Campaign下所有Ad时可以勾选。",
            show: this.has_range,
          },
          {
            key: 8,
            zh: "1个Campaign下选中的Ad",
            en: "",
            disabled: false,
            desc: "",
            show: this.has_range,
          },
        ];
      }
      return config;
    },
    set_tree_search() {
      let text = "搜索账号、Campaign名称或ID";
      if (this.taskForm.level == 1) {
        text = "搜索账号、Campaign名称或ID";
      } else {
        text = "搜索账号、Campaign、Ad名称或ID";
      }
      return text;
    },
  },
  methods: {
    async show(id = "", level = "") {
      this.taskForm.level = level;
      this.active_task_id = id;
      this.edit_task_level = level;
      if (level == 2) {
        this.taskForm.range = 4;
      } else {
        this.taskForm.range = 1;
      }
      this.$refs.mpasDrawer_log.show();
    },
    async drawer_opened() {
      if (this.task_handle_type == "edit") {
        this.drawer_title = "编辑规则任务";

        Promise.all([this.get_tree_data(), this.get_rule_data()]).then(() => {
          this.get_task_info(this.active_task_id);
        });
      } else {
        if (this.active_tab == "campaign") {
          this.level_list = [
            {
              label: "Campaign",
              value: 1,
            },
            {
              label: "Ad",
              value: 2,
            },
          ];
        } else {
          this.taskForm.level = 2;
          this.level_list = [
            {
              label: "Ad",
              value: 2,
            },
          ];
        }

        this.get_tree_data();
        this.checked_keys = this.checked;
        if (this.checked.length) {
          setTimeout(() => {
            this.tree_check_change();
          }, 1000);
        }
        this.get_rule_data();
      }
    },
    close_drawer() {
      this.edit_task_level = "";
      this.isIndeterminate = false;
      this.checkAll = false;
      this.$refs.mpasDrawer_log.close();
    },
    drawer_closed() {
      this.$refs.taskForm.resetFields();
      this.$refs.taskForm.clearValidate();
      this.checkedrules = [];
      this.checked_keys = [];
      this.scope_tree_data = {};
      this.filterText = "";
    },
    // 获取树形组件数据
    set_tree_tooltip() {
      let state = "";
      if (this.taskForm.level == 1) {
        state = `响应范围列表默认剔除投放结束超出60天的Campaign。<br><br>由于对已投放结束较长时间的Campaign添加规则没有意义，因此在响应范围列表中，我们默认为您剔除了所有投放结束超过60天的Campaign，您也可修改过滤的天数。下方的计算范围选项也不会包含这些过期的Campaign。<br><br>${
          this.task_handle_type == "edit"
            ? "如果您之前创建该任务时勾选的Campaign已投放结束超过60天，您可看到这些Campaign名称右侧出现“已投放结束”的标记。<br><br>"
            : ""
        }<span style="color:#FF6600">注意：Campaign下最近一条Ad投放结束超出60天，则算该Campaign已投放结束超出60天。</span>`;
      } else {
        state = `响应范围列表默认剔除了投放结束超出60天的Ad。<br><br>由于对已投放结束较长时间的Ad添加规则没有意义，因此在响应范围列表中，我们默认为您剔除了所有投放结束超过60天的Ad，您也可修改过滤的天数。下方的计算范围选项也不会包含这些过期的Ad。<br><br>${
          this.task_handle_type == "edit"
            ? "如果您之前创建该任务时勾选的Ad已投放结束超过60天，您可看到这些Ad名称右侧出现“已投放结束”的标记。"
            : ""
        }`;
      }
      return state;
    },
    tree_days_change() {
      this.get_tree_data();
    },
    async get_tree_data() {
      this.tree_loading = true;
      const url = "/ruletask/trees";
      const param = {
        team_id: this.active_team_id,
        days: this.tree_days,
        level: this.edit_task_level,
        rule_task_id: this.active_task_id,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.scope_tree_data = this.format_tree_data(data);
        this.tree_loading = false;
      } else {
        this.scope_tree_data = { campaign: [], ad: [] };
        this.tree_loading = false;
        this.tree_empty = true;
      }
    },
    format_tree_data(obj) {
      const tmp_campaign = obj.campaign || [];
      const tmp_ad = obj.ad || [];
      const format = (arr) => {
        arr.map((item) => {
          item.level = 1;
          if (item.flag) {
            item.disabled = true;
          } else {
            item.disabled = false;
          }

          if (item.hasOwnProperty("children") && item.children.length) {
            const format_child = (par) => {
              par.children.map((child_item) => {
                child_item.level = par.level + 1;
                if (child_item.flag) {
                  child_item.disabled = true;
                } else {
                  child_item.disabled = false;
                }

                if (
                  child_item.hasOwnProperty("children") &&
                  child_item.children.length
                ) {
                  format_child(child_item);
                }
              });
            };
            format_child(item);
          }
        });

        return arr;
      };
      return { campaign: format(tmp_campaign), ad: format(tmp_ad) };
    },
    // 获取规则列表
    async get_rule_data() {
      this.rule_loading = true;
      const url = "/ruletask/rulelist";
      const param = {
        team_id: this.active_team_id,
        platform: "1",
        rule_task_id: this.active_task_id,
        level: this.edit_task_level,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.rule_loading = false;
        this.rule_list = this.format_rule(data);
      } else {
        this.rule_loading = false;
        this.rule_list = [];
      }

      this.rule_list.forEach((item) => {
        if (item.status != 0) {
          this.all_rules.push(item.id);
        }
      });
    },
    format_rule(arr) {
      arr.map((item) => {
        let desc = "";
        desc = item.name + "<br>ID：" + item.rid + "<br><br>";

        let opens = "";
        item.detail.open_condition.forEach((open_item, open_index) => {
          opens += `${open_index + 1}. ${open_item}<br>`;
        });

        desc += `触发条件（${item.detail.open_connect}）：<br>` + opens;

        if (
          item.detail.remove_condition &&
          item.detail.remove_condition.length
        ) {
          let removes = "";
          item.detail.remove_condition.forEach((remove_item, remove_index) => {
            removes += `${remove_index + 1}. ${remove_item}<br>`;
          });

          desc +=
            `<br>排除条件（${item.detail.remove_connect}）：<br>` + removes;
        }

        if (item.detail.operation) {
          desc += `<br>执行操作：<br>${item.detail.operation}`;
        }
        item.desc = desc;
      });

      return arr;
    },
    async get_task_info(id) {
      const url = "/ruletask/ruletaskdetail";
      const param = {
        id,
        team_id: this.active_team_id,
      };
      const res = await this.fetchCore(url, param, true);
      if (res) {
        this.level_list = [
          {
            label: this.level_map[res.level].label || "",
            value: res.level || "",
          },
        ];
        this.$nextTick(() => {
          this.checked_keys = res.ids;
          setTimeout(() => {
            this.tree_check_change();
          }, 1000);
        });
        this.set_form_value(res);
        this.drawer_title = `编辑规则任务 <span style="font-size: 12px;font-weight: 400;margin-left: 15px">任务ID：${res.rid}</span>`;
      }
    },
    // 编辑回填
    set_form_value(info) {
      this.taskForm.id = info.id;
      this.taskForm.name = info.name;
      this.taskForm.level = info.level;
      this.taskForm.range = info.range;
      this.taskForm.rule_id = info.rule_ids || [];
      this.taskForm.ids = info.ids;
      this.checkedrules = info.rule_ids || [];
    },
    // 改变影响层级
    level_change() {
      this.edit_task_level = this.taskForm.level;
      this.get_rule_data();
      this.taskForm.rule_id = [];
      if (this.taskForm.level == 2) {
        this.taskForm.range = 4;
      } else {
        this.taskForm.range = 1;
      }
      this.taskForm.advertiser_ids = [];
      this.taskForm.campaign_ids = [];
      this.taskForm.ids = [];
      this.checkedrules = [];
      this.is_all_campaign = false;
      this.is_all_ad = false;
      this.checkAll = false;
      this.isIndeterminate = false;

      if (
        !this.scope_tree_data[this.level_map[this.taskForm.level].key].length
      ) {
        this.tree_empty = true;
      } else {
        this.tree_empty = false;
      }

      this.$nextTick(() => {
        setTimeout(() => {
          this.tree_check_change();
        }, 1000);
      });
    },
    // 树形控件事件
    filterNode(value, data) {
      this.tree_empty = false;
      if (!value) return true;
      const state =
        data.name.indexOf(value) !== -1 ||
        String(data.media_id).indexOf(value) !== -1;

      this.$nextTick(() => {
        const empty_dom = document.querySelector(
          ".filter-tree .el-tree__empty-block"
        );
        if (empty_dom) {
          this.tree_empty = true;
        }
      });

      return state;
    },
    tree_check_change() {
      const check_nodes = this.$refs.tree.getCheckedNodes(false);
      let all_level_1_nodes = 0;
      let all_level_2_nodes = 0;
      let [result_1, result_2, result_3] = [[], [], []];
      check_nodes.forEach((node) => {
        switch (node.level) {
          case 1:
            all_level_1_nodes += node.total;
            result_1.push(node.value);
            break;
          case 2:
            if (this.taskForm.level == 2) {
              all_level_2_nodes += node.total;
            }
            result_2.push(node.value);
            break;
          case 3:
            result_3.push(node.value);
            break;
        }
      });

      if (this.taskForm.level == 1) {
        //campaign
        this.taskForm.advertiser_ids = result_1;
        this.taskForm.ids = result_2;

        // 是否选了所选账号下的所有campaign
        if (all_level_1_nodes != 0 && all_level_1_nodes == result_2.length) {
          this.is_all_campaign = true;
        } else {
          this.is_all_campaign = false;
          this.taskForm.range =
            this.taskForm.range == "2" ? "" : this.taskForm.range;
        }
      } else {
        this.taskForm.advertiser_ids = result_1;
        this.taskForm.campaign_ids = result_2;
        this.taskForm.ids = result_3;

        // 是否选了所选账号下的所有campaign
        if (all_level_1_nodes != 0 && all_level_1_nodes == result_2.length) {
          this.is_all_campaign = true;
        } else {
          this.is_all_campaign = false;
          this.taskForm.range =
            this.taskForm.range == "5" ? "" : this.taskForm.range;
        }
        // 是否选了所选campaign下的所有ad
        if (all_level_2_nodes != 0 && all_level_2_nodes == result_3.length) {
          this.is_all_ad = true;
        } else {
          this.is_all_ad = false;
          this.taskForm.range =
            this.taskForm.range == "7" ? "" : this.taskForm.range;
        }
      }
    },
    // 选择规则
    handleCheckAllChange(val) {
      this.checkedrules = val ? this.all_rules : [];
      this.isIndeterminate = false;
    },
    handleCheckedRulesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.rule_list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.rule_list.length;
    },

    handle_cancel() {
      this.close_drawer();
    },
    format_rules_param() {
      let result = [];
      if (this.checkedrules.length) {
        this.checkedrules.forEach((item) => {
          const index = this.rule_list.findIndex((obj) => {
            return obj.id == item && obj.status != 0;
          });
          if (index >= 0) {
            result.push(item);
          }
        });
      }
      return result;
    },
    handle_save(formName) {
      this.taskForm.rule_id = this.format_rules_param();
      this.taskForm.team_id = this.active_team_id;
      // 验证响应范围
      const valid_ids = () => {
        if (this.taskForm.ids.length == 0) {
          this.$message({
            message: "请选择响应范围！",
            duration: 5000,
            offset: 3,
          });
        }
        return this.taskForm.ids.length > 0;
      };
      // 验证规则
      const valid_rules = () => {
        if (this.taskForm.rule_id.length == 0) {
          this.$message({
            message: "请选择规则！",
            duration: 5000,
            offset: 3,
          });
        }
        return this.taskForm.rule_id.length > 0;
      };
      // 验证选择top3时campaign和ad的条目
      // const valid_range_ids = () => {
      //   let state = true;
      //   if (this.has_top_3) {
      //     if (this.taskForm.ids.length < 4) {
      //       state = false;
      //       this.$message({
      //         message: `一个账号下必须至少选中4条${
      //           this.level_map[this.taskForm.level].label
      //         }才可应用规则${this.top_3_rules.join()}。`,
      //         duration: 5000,
      //         offset: 3,
      //       });
      //     }
      //   }
      //   return state;
      // };

      this.$refs[formName].validate(async (valid) => {
        if (valid && valid_ids() && valid_rules()) {
          // 保存
          const url = "/ruletask/save";
          const data = await this.fetchCore(url, this.taskForm, true);
          if (data) {
            this.close_drawer();
            this.$emit("success", { level: this.taskForm.level, ids: data });
          }
        } else {
          return false;
        }
      });
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
.task-detail-drawer {
  .demo-taskForm {
    .el-form-item {
      margin-bottom: 8px;
      .el-form-item__label {
        .iconfont {
          font-size: 14px;
          margin-right: 10px;
        }
      }
      .el-form-item__content {
        .el-radio-group {
          height: 40px;
        }
        .el-row {
          .list-empty {
            i {
              font-size: 60px;
            }
            span {
              font-size: 12px !important;
            }
          }
          .scope-tree-box {
            .scope-tree {
              .el-tree {
                color: #333333;
                font-size: 12px;
              }
            }
          }
          .rule-list-box {
            .rule-list {
              .el-checkbox-group {
                line-height: 24px;
                .el-checkbox {
                  width: 100%;
                  height: 24px;
                  margin: 0;
                  display: flex;
                  align-items: center;
                  .el-checkbox__label {
                    width: calc(100% - 24px);
                    display: flex;
                    align-items: center;
                    .rule-label {
                      display: inline-block;
                      max-width: calc(100% - 28px);
                    }
                    .maps-icon-effect {
                      font-size: 12px;
                      color: #cccccc;
                      margin-left: 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.task-detail-drawer {
  .demo-taskForm {
    .el-form-item {
      .el-col {
        .col-title {
          border: 1px solid #dcdfe6;
          height: 36px;
          padding: 0 20px;
          background: #f1f1f1;
          line-height: 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .tree-days {
            display: flex;
            align-items: center;
            .maps-icon-info {
              color: #606266;
              font-size: 14px;
              margin-left: 5px;
            }
          }
        }
        main {
          height: 400px;
          padding: 10px 20px;
          border: 1px solid #dcdfe6;
          border-top-width: 0;
        }
      }

      .scope-tree-box {
        padding-right: 20px;
        main {
          position: relative;
        }
        .tree-filter {
          display: flex;
          align-items: center;
        }
        .scope-tree {
          height: calc(100% - 50px);
          overflow-y: auto;

          .custom-tree-node {
            .maps-icon-effect {
              margin-left: 5px;
              font-size: 14px;
              color: #ff6600;
            }
            .end_60 {
              background: #999999;
              margin-left: 5px;
              padding: 0 3px;
              font-size: 12px;
              line-height: 16px;
              color: #fefefe;
            }
          }
        }
      }
      .rule-list-box {
        main {
          position: relative;
        }
        .rule-list {
          max-height: calc(100% - 90px);
          overflow-y: auto;
        }
      }
    }
  }
}
</style>