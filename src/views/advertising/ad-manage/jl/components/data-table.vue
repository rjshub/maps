<template>
  <el-table
    :data="set_data"
    :max-height="maxHeight"
    height="100%"
    class="advertising-data-table"
    ref="advertising_table"
    style="width: 100%"
    stripe
    :border="true"
    :default-sort="{prop: 'cost', order: 'descending'}"
    @header-dragend="table_drag_change"
    @sort-change="table_sort_change"
    @select="handleSelectionChange"
    @select-all="handleSelectionAll"
  >
    <el-table-column
      type="selection"
      :selectable="set_select"
      v-if="showSelect"
      width="55"
    ></el-table-column>

    <el-table-column
      class-name="model-cell"
      width="1"
    > </el-table-column>

    <el-table-column
      label="操作"
      :fixed="true"
      width="120"
      class-name="operate"
      v-if="is_edit"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.is_total">{{ scope.row.operate }}</span>

        <div
          v-if="!scope.row.is_total && scope.row.status != 0"
          class="operate-box"
        >
          <StatusIcon
            :config="scope.row"
            v-if="show_status_icon"
          ></StatusIcon>

          <el-button
            size="mini"
            style="margin-right: 8px"
            :disabled="forbidden_push(scope.row).state"
            v-if="show_push_btn(scope.row)"
            type="text"
            @click="handle_push(scope.row)"
          >
            <maps-tooltip
              :text="forbidden_push(scope.row).text || ''"
              align="left"
            >
              <i class="iconfont maps-icon-send"></i>
            </maps-tooltip>
          </el-button>
          <maps-tooltip
            :text="forbidden_opt_status(scope.row).text"
            v-if="show_opt_status(scope.row)"
            align="left"
          >
            <el-switch
              v-model="scope.row.opt_status"
              style="margin-right: 5px"
              :active-value="1"
              :inactive-value="0"
              :disabled="forbidden_opt_status(scope.row).state"
              active-color="#0BB3B3"
              inactive-color="#C4C4C4"
              @change="handle_open(scope.row, $event)"
            ></el-switch>
          </maps-tooltip>

          <el-popover
            :key="scope.row.id"
            placement="bottom"
            width="60"
            popper-class="advertising-table-operate-popover black-popover"
            trigger="click"
          >
            <el-button
              size="mini"
              :key="scope.row.id"
              type="text"
              v-if="show_more_btn(scope.row)"
              slot="reference"
              @click="show_popover"
              :disabled="scope.row.sync_status == '1' || AdSet_Manage_permission != 2"
            >
              <i class="iconfont maps-icon-more"></i>
            </el-button>
            <div class="content">
              <div
                class="more-handle-item"
                @click="handle_ignore(scope.row)"
              >
                <i class="iconfont maps-icon-back"></i> 忽略
              </div>
            </div>
          </el-popover>

          <maps-tooltip text="忽略">
            <el-button
              size="mini"
              style="margin-right: 8px"
              :disabled="scope.row.sync_status == '1' || AdSet_Manage_permission != 2"
              v-if="show_ignore_btn(scope.row) && !show_more_btn(scope.row)"
              type="text"
              @click="handle_ignore(scope.row)"
            >
              <i class="iconfont maps-icon-back"></i>
            </el-button>
          </maps-tooltip>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="推送状态"
      :fixed="true"
      width="100"
      v-if="is_edit"
    >
      <template slot-scope="scope">
        <div
          class="item-cell"
          v-if="scope.row.push_status"
          :style="push_status_map[scope.row.push_status].style"
        >
          <maps-tooltip :text="scope.row.push_status == 2? scope.row.push_error_reason:''">
            <div class="cell-content wrap-cell">
              {{ push_status_map[scope.row.push_status].text }}
            </div>
          </maps-tooltip>
        </div>
      </template>
    </el-table-column>

    <div
      v-for="(item, index) in config"
      :key="index + ''"
    >
      <el-table-column
        v-if="item.show"
        :min-width="item.width"
        :fixed="item.fixed"
        :resizable="true"
        :align="item.align"
        :sortable="item.sort"
        :prop="item.prop"
      >
        <template
          slot="header"
          slot-scope="scope"
        >
          <maps-tooltip
            :text="item.desc"
            align="left"
          >
            <span>{{ item.label }}</span>
          </maps-tooltip>
        </template>

        <template slot-scope="scope">
          <!-- 最后编辑时间 -->
          <div
            class="item-cell"
            v-if="item.prop == 'utime'"
          >
            <el-popover
              placement="right"
              width="280"
              trigger="click"
              :key="scope.row.id"
              popper-class="utime-popover"
            >
              <div
                slot="reference"
                class="cell-content wrap-cell"
                :style="set_special_style(item.prop, scope.row)"
                @click="get_utime_list(scope.row)"
              >
                {{ set_cell_tooltip(scope.row, item).label }}
              </div>
              <div
                class="utime-list"
                v-loading="utime_loading"
                element-loading-background="rgba(58,83,147,0.8)"
              >
                <div
                  class="utime-item"
                  v-for="(utime, index) in utime_list"
                  :key="index"
                >{{utime.truename + ' '+ utime.operation + ' ' + utime.ctime}}</div>
              </div>
            </el-popover>
          </div>
          <!-- 缩略图 -->
          <div
            class="preview"
            v-else-if="
              active_tab == 'creative' &&
              item.prop == 'preview' &&
              !scope.row.is_total
            "
          >
            <!-- 程序化创意包 -->
            <maps-tooltip
              :text="set_STATIC_ASSEMBLE_text(scope.row)"
              align="left"
              v-if="
                  scope.row.creative_material_mode == 'STATIC_ASSEMBLE' &&
                  (scope.row.hasOwnProperty('procedural_package_id') &&
                  scope.row.procedural_package_id != null)
                "
            >
              <span class="static-assemble-id">
                <i class="right-top iconfont maps-icon-setting"></i>
                <i class="left-bottom iconfont maps-icon-setting"></i>
                程序化<br>创意包
              </span>
            </maps-tooltip>
            <!-- 程序化创意、自定义上传素材 -->
            <Preview
              :config="scope.row"
              v-if="
                (scope.row.creative_material_mode == 'STATIC_ASSEMBLE' &&
                (!scope.row.hasOwnProperty('procedural_package_id') ||
                  !scope.row.procedural_package_id)) && scope.row.preview.length
              "
              :model="true"
            ></Preview>
            <!-- 程序化为空 -->
            <maps-tooltip
              text="暂无法预览素材。如需预览素材，您需要重新关联广告账户，并在同意授权时勾选“敏感物料授权”。"
              align="left"
              v-if="
                (scope.row.creative_material_mode == 'STATIC_ASSEMBLE' &&
                (!scope.row.hasOwnProperty('procedural_package_id') ||
                  !scope.row.procedural_package_id)) && !scope.row.preview.length
              "
            >
              <span class="not-priview">无法预览</span>
            </maps-tooltip>

            <!-- 正常展示 -->
            <Preview
              :config="scope.row"
              v-if="scope.row.creative_material_mode != 'STATIC_ASSEMBLE' && scope.row.preview.length"
            ></Preview>
            <!-- 无法预览、没有素材 -->
            <maps-tooltip
              text="暂无法预览素材。如需预览素材，您需要重新关联广告账户，并在同意授权时勾选“敏感物料授权”。"
              v-if="
                scope.row.creative_material_mode != 'STATIC_ASSEMBLE' &&
                !scope.row.preview.length
              "
              align="left"
            >
              <span class="not-priview">无法预览</span>
            </maps-tooltip>
          </div>
          <!-- 其他 -->
          <div
            class="item-cell"
            v-else
          >
            <div
              :style="`${set_deep_cell(scope.row, item)};text-align:${item.align}`"
              class="cell-content"
            >
              <StatusIcon
                v-if="set_show(item, scope.row) && !is_edit"
                :config="scope.row"
              ></StatusIcon>
              <div></div>
              <maps-tooltip
                :text="set_cell_tooltip(scope.row, item).desc"
                align="left"
              >
                <!-- 两行展示 -->
                <div
                  v-if="item.hasOwnProperty('relation') && item.relation"
                  style="line-height: 18px;width: 100%"
                >
                  <div v-if="item.prop == 'budget'">
                    {{scope.row.budget? $formatNumber(scope.row.budget, 2, '', ",", "."):"--"}}
                  </div>
                  <div v-else-if="item.prop == 'bid'">
                    {{scope.row.smart_bid_type == 'SMART_BID_CONSERVATIVE'? '自动':scope.row.bid? $formatNumber(scope.row.bid, 2, '', ",", "."):"--"}}
                  </div>
                  <div v-else>{{ scope.row[item.prop] || "--" }}</div>
                  <div style="color: #999999">{{ set_cell_tooltip(scope.row, item).label }}</div>
                </div>
                <!-- 一行展示 -->
                <div
                  :class="item.wrap? 'wrap-cell':'cell-label'"
                  :style="set_special_style(item.prop, scope.row)"
                  @click="deep_into_next(item, scope.row)"
                  v-else
                >
                  {{ set_cell_tooltip(scope.row, item).label }}
                </div>
              </maps-tooltip>
            </div>
            <!-- 编辑 -->
            <div
              class="operate"
              v-if="show_edit_btn(item, scope.row) && is_edit"
            >
              <EditPopover
                :ref="`edit_${item.prop}_${item.fixed ? 'fixed' : 'normal'}_${
                  scope.row[`media_${active_tab}_id`]
                }`"
                :key="scope.row.id+'_'+item.prop"
                :disabled="forbidden_edit(scope.row, item.prop).state"
                @afterLeave="check_leave(scope.row[`media_${active_tab}_id`])"
                @save="save_edit($event, item, scope.row)"
              >
                <el-button
                  size="mini"
                  slot="reference"
                  :disabled="forbidden_edit(scope.row, item.prop).state"
                  @click.stop="edit_item(item, scope.row[`media_${active_tab}_id`], scope.row)"
                  type="text"
                >
                  <maps-tooltip
                    :text="forbidden_edit(scope.row, item.prop).text"
                    align="left"
                  >
                    <i class="iconfont maps-icon-edit"></i>
                  </maps-tooltip>
                </el-button>

                <!-- <main slot="popover_main">
                  <div class="title">{{ item.label }}</div>
                  <component
                    :is="active_model"
                    :config="scope.row"
                    :key="scope.row.id+'_'+item.prop"
                    @cancel="cancel_edit(item, scope.row[`media_${active_tab}_id`])"
                    @save="save_edit($event, item, scope.row)"
                    ref="edit_item"
                  ></component>
                </main> -->
              </EditPopover>
            </div>
          </div>
        </template>
      </el-table-column>
    </div>

    <template slot="empty">
      <table-empty></table-empty>
    </template>
  </el-table>
</template>

<script>
import fetch from "@/services/fetch";
import Math from "mathjs";
import _ from "lodash";
import { mapState, mapGetters, mapActions } from "vuex";
import PreviewItem from "./preview-item";
import EditPopover from "./edit/edit-popover";
import StatusIcon from "./status-icon";
import EditName from "./edit/name";
import EditBudGet from "./edit/budget";
import EditBid from "./edit/bid";
import EditFlowControlMode from "./edit/flow_control_mode";
import EditDeliveryDate from "./edit/delivery_date";
import EditAutomaticTargeting from "./edit/automatic_targeting";

import Preview from "./preview";

export default {
  name: "DataTable",
  components: {
    StatusIcon,
    PreviewItem,
    EditPopover,
    EditName,
    EditBudGet,
    EditBid,
    EditFlowControlMode,
    EditDeliveryDate,
    EditAutomaticTargeting,
    Preview,
  },
  props: {
    config: Array,
    data: Array,
    total_data: Array,
    total: [Number, String],
    is_total: Boolean,
    maxHeight: {
      type: [Number, String],
      default: "100%",
    },
    showSelect: {
      default: false,
    },
    deepIntoKeys: {
      default: () => {
        return [];
      },
    },
    canEditKeys: {
      default: () => {
        return [];
      },
    },
    is_edit: {
      default: false,
    },
    checked: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      multipleSelection: [],
      // 推送状态
      push_status_map: {
        3: {
          text: "未推送",
          style: "color:#FF6600",
        },
        2: {
          text: "推送失败",
          style: "color:#FF3333",
        },
        1: {
          text: "推送成功",
          style: "color:#333",
        },
        4: {
          text: "未修改",
          style: "color:#333",
        },
        5: {
          text: "推送中",
          style: "color:#333",
        },
        0: {
          text: "不限",
          style: "color:#333",
        },
      },
      // 投放状态
      status_map: {
        0: "删除",
        1: "暂停",
        2: "开启",
      },
      active_model: "",
      has_edit: false,
      sync_timer: null,
      text_map: {
        campaign: "广告组",
        ad: "计划",
      },
      utime_list: [],
      active_edit_id: "",
      utime_loading: false,
    };
  },
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
      "is_syncing",
    ]),
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id"]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
    set_data() {
      let data = [];
      if (this.is_total && this.data.length) {
        data = this.total_data.concat(this.data);
      } else {
        data = this.data;
      }
      return data;
    },
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          // clearInterval(this.sync_timer);
          // 设置选中
          this.set_checked();
        });
      },
      deep: true,
      immediate: true,
    },
    // is_syncing: {
    //   handler() {
    //     this.$nextTick(() => {
    //       clearInterval(this.sync_timer);
    //       // 判断campaign和ad在编辑时的同步状态
    //       if (
    //         (this.active_tab == "campaign" &&
    //           this.manage_campaign_handle == "edit") ||
    //         (this.active_tab == "ad" && this.manage_ad_handle == "edit")
    //       ) {
    //         if (this.is_syncing) {
    //           this.sync_timer = setInterval(() => {
    //             this.check_sync_status();
    //           }, 10 * 1000);
    //         }
    //       }
    //     });
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    active_tab: {
      handler() {
        if (this.active_tab == "account" || this.active_tab == "creative") {
          clearInterval(this.sync_timer);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.sync_timer);
    // // 清空编辑
    // const url = "/user/removestatus";
    // const param = {
    //   team_id: this.active_team_id,
    // };
    // this.fetchCore(url, param, false);
  },
  methods: {
    ...mapActions("advertising", ["update_syncing", "update_manage_ad_handle"]),
    show_popover() {},
    // 设置特殊单元格样式
    set_special_style(key, row) {
      if (key == "utime") {
        return "cursor: pointer";
      }
      if (key == "external_url" && row.external_url) {
        return "color: #0BB3B3;cursor:pointer";
      }
    },
    // 设置同步动态行
    // syncing_row_class(obj) {
    //   if (obj.row.is_total) {
    //     return "total-tr";
    //   } else {
    //     if (
    //       (this.active_tab == "campaign" &&
    //         this.manage_campaign_handle == "edit") ||
    //       (this.active_tab == "ed" && this.manage_ad_handle == "edit")
    //     ) {
    //       if (obj.row.sync_status == 1) {
    //         return "syncing-row";
    //       }
    //     }
    //   }
    // },
    async check_sync_status() {
      let ids = [];
      if (this.data.length) {
        this.data.forEach((item) => {
          ids.push(item.id);
        });
      }

      const url = `/adpush/jl/${this.active_tab}edit/getSyncCompleteStatus`;
      const param = {
        ids: ids.join(),
        team_id: this.active_team_id,
      };
      const res = await this.fetchCore(url, param, false);
      if (res) {
        if (res.length) {
          res.forEach((item) => {
            const index = this.data.findIndex((obj) => {
              return obj.id == item;
            });
            if (index >= 0) {
              this.data[index].sync_status = 1;
            }
          });

          if (this.data.length == res.length) {
            clearInterval(this.sync_timer);
            this.update_syncing(false);
            this.$eventHub.$emit("handle_hand_sync");
          }
        }
      }
    },
    refresh_table() {
      this.$refs.advertising_table.doLayout();
    },
    set_select(param) {
      let state = true;
      //  || param.sync_status == 1
      if (param.is_total) {
        state = false;
      }

      return state;
    },
    set_checked() {
      if (this.checked.length && this.data.length) {
        this.checked.forEach((item) => {
          const index = this.data.findIndex((obj) => {
            if (this.active_tab == "account") {
              return obj.id == item;
            } else {
              return obj[`media_${this.active_tab}_id`] == item;
            }
          });
          if (index >= 0) {
            this.$refs.advertising_table.toggleRowSelection(this.data[index]);
          }
        });
      } else {
        this.$refs.advertising_table.clearSelection();
      }
    },
    set_cell_tooltip(row, config) {
      if (config.prop == "priview" || (row.is_total && config.relation != "")) {
        return false;
      }

      const map = {
        label: "",
        desc: "",
      };
      if (config.hasOwnProperty("relation") && config.relation) {
        const tmp_key = `${config.relation}_lang`;
        if (row.hasOwnProperty(tmp_key)) {
          map.label = row[tmp_key] || "--";
          map.desc = `${row[config.prop] || "--"}<br>${row[tmp_key] || "--"}`;
        } else {
          map.label = row[config.relation] || "--";
          map.desc = `${row[config.prop] || "--"}<br>${
            row[config.relation] || "--"
          }`;
        }
      } else {
        const tmp_key = `${config.prop}_lang`;
        if (row.hasOwnProperty(tmp_key)) {
          map.label = row[tmp_key] || "--";
          map.desc = row[tmp_key] || "--";
        } else {
          map.label = row[config.prop] || "--";
          map.desc = `${row[config.prop] || ""}`;
        }
      }

      return map;
    },
    // 获取编辑时间20条
    async get_utime_list(row) {
      // this.utime_list = [];
      this.utime_loading = true;
      const url = `/adpush/jl/${this.active_tab}edit/getEditLog`;
      let param = {
        advertiser_id: row.advertiser_id,
      };
      this.$set(
        param,
        `media_${this.active_tab}_id`,
        row[`media_${this.active_tab}_id`]
      );
      const res = await this.fetchCore(url, param, false);
      if (res) {
        this.utime_loading = false;
        this.utime_list = res;
      } else {
        this.utime_loading = false;
      }
    },
    // 程序化创意包tooltip
    set_STATIC_ASSEMBLE_text(row) {
      return `程序化创意包名称：${
        row.procedural_package_name || "--"
      }<br>程序化创意包ID：${
        row.procedural_package_id || "--"
      }<br><br>巨量引擎API暂不支持MAPS获取程序化创意包内包含的素材信息。`;
    },
    // 排序
    table_sort_change(column) {
      const map = {
        ascending: "ASC",
        descending: "DESC",
      };
      const param = {
        order: map[column.order],
        order_by: column.prop,
      };
      this.$emit("update_list", param);
    },
    // 拖动列宽
    table_drag_change() {
      this.$refs.advertising_table.doLayout();
    },
    update() {
      this.$refs.advertising_table.doLayout();
    },
    // 复选
    handleSelectionChange(val) {
      let result = [];
      if (val.length) {
        val.forEach((item) => {
          result.push(item);
        });
      } else {
        result = [];
      }
      this.multipleSelection = result;
      this.$emit("selected", result);
    },
    handleSelectionAll(val) {
      let result = [];
      if (val.length) {
        val.forEach((item) => {
          result.push(item);
        });
      } else {
        result = [];
      }
      this.multipleSelection = result;
      this.$emit("selected", result);
    },
    // 可以下钻的单元格
    set_deep_cell(row, info) {
      let style = "color: #333;cursor:unset";
      if (this.deepIntoKeys.includes(info.prop) && !row.is_total) {
        style = "color: #0BB3B3;cursor:pointer";
      }
      return (
        style +
        ";" +
        `text-align:${info.align}` +
        ";" +
        this.set_edit_cell(info.prop)
      );
    },
    set_edit_cell(prop) {
      let style = "width: 100%";
      if (this.canEditKeys.includes(prop) && this.is_edit) {
        style = "width: calc(100% - 12px)";
      }
      return style;
    },
    // 查看显示规则触发状态
    set_show(info, row) {
      let state = false;
      //广告组合计划在展示的时候名称单元格内展示状态
      if (this.deepIntoKeys.includes(info.prop) && !row.is_total) {
        if (
          (this.active_tab == "campaign" &&
            this.manage_campaign_handle == "show") ||
          (this.active_tab == "ad" && this.manage_ad_handle == "show")
        ) {
          state = true;
        } else {
          state = false;
        }
      }

      return state;
    },
    // 下钻
    deep_into_next(info, row) {
      if (row.is_total) {
        return false;
      }
      if (this.deepIntoKeys.includes(info.prop)) {
        if (this.active_tab == "campaign") {
          if (this.manage_campaign_handle == "edit") {
            this.update_manage_ad_handle("edit");
          }
        }
        let result = [row];
        this.$emit("selected", result);
        this.$eventHub.$emit("deepIntoNext");
      }
      if (info.prop == "external_url" && row.external_url) {
        window.open(row.external_url);
      }
    },
    // 设置表格操作显示
    // 是否显示状态icon
    show_status_icon(info) {
      let state = true;
      if (this.active_tab == "campaign") {
        if (info.status == "CAMPAIGN_STATUS_DELETE") {
          state = false;
        }
      }
      if (this.active_tab == "ad") {
        if (info.status == "AD_STATUS_DELETE") {
          state = false;
        }
      }
      return state;
    },
    // 是否显示推送
    show_push_btn(info) {
      let state = true;
      if (this.active_tab == "campaign") {
        if (info.status == "CAMPAIGN_STATUS_DELETE") {
          state = false;
        }
      }
      if (this.active_tab == "ad") {
        if (info.status == "AD_STATUS_DELETE") {
          state = false;
        }
      }
      return state;
    },
    // 是否禁用推送
    forbidden_push(info) {
      let state = false;
      let text = "";
      if (this.AdSet_Manage_permission != 2) {
        state = true;
        text = "无权限操作，请联系团队管理员！";
      } else {
        if (info.rule_detail_status == "3") {
          state = true;
          text = `${
            this.text_map[this.active_tab]
          }触发规则异常，请先操作“忽略”，才能进行推送。`;
        }
        // if (info.sync_status == "1") {
        //   state = true;
        //   text = "数据正在同步，暂无法操作！";
        // }
        if (info.push_status == "5") {
          state = true;
          text = `系统正在推送当前${
            this.text_map[this.active_tab]
          }，暂无法操作！推送完成后，您才可操作。`;
        }
        if (info.push_status == "4") {
          state = true;
          text = "当前没有可推送的内容，请修改后再推送。";
        }
        if (info.push_status == "1") {
          state = true;
          text = "当前没有可推送的内容。";
        }
      }

      return {
        state,
        text,
      };
    },
    // 是否显示开关
    show_opt_status(info) {
      let state = true;
      if (this.active_tab == "campaign") {
        if (info.status == "CAMPAIGN_STATUS_DELETE") {
          state = false;
        }
      }
      if (this.active_tab == "ad") {
        if (info.status == "AD_STATUS_DELETE") {
          state = false;
        }
      }
      return state;
    },
    // 是否禁用开关
    forbidden_opt_status(info) {
      let state = false;
      let text = "";
      if (this.AdSet_Manage_permission != 2) {
        state = true;
        text = "无权限操作，请联系团队管理员！";
      } else {
        // if (info.sync_status == "1") {
        //   state = true;
        //   text = "数据正在同步，暂无法操作！";
        // }
        if (info.push_status == 5) {
          state = true;
          text = `系统正在推送当前${
            this.text_map[this.active_tab]
          }，暂无法操作！推送完成后，您才可操作。`;
        }
        if (info.rule_detail_status == 2) {
          state = true;
          text = `${
            this.text_map[this.active_tab]
          }已触发规则，请先处理，才能修改。`;
        }
        if (info.rule_detail_status == 3) {
          state = true;
          text = `${
            this.text_map[this.active_tab]
          }触发规则异常，请先操作“忽略”，才能进行推送。`;
        }
      }
      return {
        state,
        text,
      };
    },
    // 是否显示忽略
    show_ignore_btn(info) {
      let state = false;
      if (info.rule_detail_status == "2" || info.rule_detail_status == "3") {
        state = true;
      }
      return state;
    },
    // 编辑
    forbidden_edit(info, key) {
      let state = false;
      let text = "";
      if (this.AdSet_Manage_permission != 2) {
        state = true;
        text = "无权限操作，请联系团队管理员！";
      }
      // if (info.sync_status == "1") {
      //   state = true;
      //   text = "数据正在同步，暂无法操作！";
      // }
      if (info.rule_detail_status == "2") {
        state = true;
        text = `${
          this.text_map[this.active_tab]
        }已触发规则，请先处理，才能修改。`;
      }
      if (info.rule_detail_status == "3") {
        state = true;
        text = `${
          this.text_map[this.active_tab]
        }触发规则异常，请先操作“忽略”，才能进行修改。`;
      }
      if (info.push_status == "5") {
        state = true;
        text = `系统正在推送当前${
          this.text_map[this.active_tab]
        }，暂无法操作！推送完成后，您才可操作。`;
      }

      if (key == "bid" && info.smart_bid_type == "SMART_BID_CONSERVATIVE") {
        // 自动出价，不能修改
        state = true;
        text = "不支持修改！";
      }
      if (
        key == "flow_control_mode" &&
        info.smart_bid_type != "SMART_BID_CUSTOM"
      ) {
        state = true;
        text = "暂不支持修改！";
      }
      if (
        key == "auto_extend_targets" &&
        info.hasOwnProperty("audience_package_id") &&
        info.audience_package_id
      ) {
        state = true;
        text =
          "当前计划使用了定向包，系统暂不支持修改定向包内的设置，以免影响其他计划。";
      }
      return {
        state,
        text,
      };
    },
    show_edit_btn(param, info) {
      let state = false;
      if (
        this.canEditKeys.includes(param.prop) &&
        this.is_edit &&
        !info.is_total
      ) {
        state = true;
        if (this.active_tab == "campaign") {
          if (info.status == "CAMPAIGN_STATUS_DELETE") {
            state = false;
          }
        }
        if (this.active_tab == "ad") {
          if (info.status == "AD_STATUS_DELETE") {
            state = false;
          }
        }
      }
      return state;
    },
    // 更多
    show_more_btn(info) {
      let state = false;
      //除了已删除的广告组
      if (
        (this.active_tab == "campaign" &&
          info.status != "CAMPAIGN_STATUS_DELETE") ||
        (this.active_tab == "ad" && info.status != "AD_STATUS_DELETE")
      ) {
        if (info.rule_detail_status == "2" || info.rule_detail_status == "3") {
          state = true;
        }
      }
      return state;
    },
    // 表格操作
    handle_push(row) {
      // this.check_open(row[`media_${this.active_tab}_id`]).then(() => {
      //   if (this.has_edit) {
      //     return false;
      //   }
      this.$emit("pushData", row);
      // });
    },
    handle_open(row, status) {
      this.check_open(row[`media_${this.active_tab}_id`])
        .then(() => {
          if (this.has_edit) {
            return false;
          }
          this.$emit(
            "changeStatus",
            {
              // ids: row[`media_${this.active_tab}_id`],
              ids: row.id,
              opt_status: status,
            },
            (val) => {
              if (val) {
                this.check_leave(row[`media_${this.active_tab}_id`]);
              } else {
                row.opt_status = status == 1 ? 0 : 1;
              }
            }
          );
        })
        .catch(() => {
          row.opt_status = status == 1 ? 0 : 1;
        });
    },
    handle_ignore(row) {
      this.check_open(row[`media_${this.active_tab}_id`]).then(() => {
        if (this.has_edit) {
          return false;
        }
        this.$emit("ignoreChange", row);
      });
    },
    // 查看字段编辑状态
    async check_open(id) {
      const url = `/adpush/jl/${this.active_tab}edit/open`;
      let param = {};
      this.$set(param, `media_${this.active_tab}_ids`, id);

      return new Promise(async (resolve, reject) => {
        await this.fetchCore(url, param, false)
          .then((data) => {
            if (data) {
              resolve(true); //可以编辑
            } else {
              reject(false); //正在被其他用户编辑，当前不可操作
            }
          })
          .catch((err) => {
            reject(false);
          });
      });
    },
    async check_leave(id) {
      const url = `/adpush/jl/${this.active_tab}edit/close`;
      let param = {};

      if (this.active_edit_id && this.active_edit_id != id) {
        this.$set(param, `media_${this.active_tab}_ids`, this.active_edit_id);
      } else {
        this.$set(param, `media_${this.active_tab}_ids`, id);
      }
      this.has_edit = false;

      const res = await this.fetchCore(url, param, false);
    },
    // 单个编辑
    edit_item(info, id, row) {
      // this.check_leave(id)
      // return false
      if (this.has_edit) {
        return false
      }
      this.active_edit_id = "";
      this.check_open(id)
        .then(() => {
          if (this.has_edit) {
            return false;
          }

          const dom = `edit_${info.prop}_${
            info.fixed ? "fixed" : "normal"
          }_${id}`;
          const dom_list = this.$refs[dom];
          let target_index = 0;
          if (dom_list.length) {
            dom_list.forEach((item, index) => {
              if (
                item.$el.offsetParent.offsetParent.className.indexOf(
                  "is-hidden"
                ) < 0
              ) {
                target_index = index;
              }
            });

            const map = {
              budget: "EditBudGet",
              bid: "EditBid",
              flow_control_mode: "EditFlowControlMode",
              delivery_date: "EditDeliveryDate",
              auto_extend_targets: "EditAutomaticTargeting",
            };
            if (info.prop == "campaign_name" || info.prop == "ad_name") {
              this.active_model = "EditName";
            } else {
              this.active_model = map[info.prop];
            }

            this.has_edit = true;
            this.$refs[dom][target_index].show(info, row, this.active_model);
          }
        })
        .catch(() => {});
    },
    cancel_edit(info, id) {
      // 设置关闭
      const dom = `edit_${info.prop}_${info.fixed ? "fixed" : "normal"}_${id}`;
      const dom_list = this.$refs[dom];
      let target_index = 0;
      if (dom_list.length) {
        dom_list.forEach((item, index) => {
          if (
            item.$el.offsetParent.offsetParent.className.indexOf("is-hidden") <
            0
          ) {
            target_index = index;
          }
        });

        this.$refs[dom][target_index].close();
        this.active_model = "";
      }

      this.has_edit = false;
    },
    save_edit(param, info, row) {
      const obj = {
        ids: row.id,
        params: param,
      };
      const tmp_row = _.cloneDeep(row);
      this.$emit("saveOneEdit", obj, (val, id) => {
        this.active_edit_id = id;
        if (val) this.cancel_edit(info, id);
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
.advertising-data-table {
  .cell {
    line-height: 20px;
  }
  .syncing-row {
    color: #c0c4cc;
    .cell {
      opacity: 0.5;
    }
  }
  td.is-hidden .cell {
    visibility: unset;
  }
  .cell.el-tooltip {
    width: auto !important;
  }
  .el-table__row.total-tr {
    .el-table-column--selection {
      border-right-color: #fff;
    }
    .el-checkbox {
      display: none;
    }
  }
  .el-switch {
    .el-switch__core {
      height: 16px;
      width: 28px !important;
      border-radius: 8px;
    }
    .el-switch__core:after {
      // top: 0.5px;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
      width: 14px;
      height: 14px;
      margin-left: -15px;
    }
  }
  .el-switch.is-checked {
    .el-switch__core:after {
      left: 100%;
    }
  }
  .operate-box {
    .maps-icon-rule {
      margin-right: 9px !important;
    }
    .maps-icon-rule-error {
      margin-right: 5px !important;
    }
    .el-button--mini {
      padding: 2px;
    }
  }

  .model-cell {
    padding: 0 !important;
    width: 0 !important;
    // display: none;
    // visibility: hidden;
    .cell {
      width: 0;
      padding: 0;
    }
  }
}
.advertising-table-operate-popover {
  min-width: unset;
  .content {
    .more-handle-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
    }
    .more-handle-item:hover {
      color: #0bb3b3;
    }
  }
}
.utime-popover {
  height: auto;
  opacity: 0.9;
  background: rgba(58, 83, 147, 1);
  border-color: rgba(58, 83, 147, 1);
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  transform-origin: center bottom;
  .el-popper[x-placement^="right"],
  .popper__arrow,
  .popper__arrow::after {
    border-right-color: rgba(58, 83, 147, 1) !important;
  }
  .utime-list {
    min-height: 54px;
    line-height: 18px;
    max-width: 350px;
    max-height: 280px;
    overflow-y: auto;
    .utime-item {
      color: #fff;
    }
    .el-loading-spinner {
      background: url(~@/assets/image/loading.gif) no-repeat center;
      background-size: 58px 58px;
      width: 100%;
      height: 58px;
      position: relative;
      top: 50%;
    }
  }
}
</style>
<style lang='scss' scoped>
.advertising-data-table {
  .item-cell {
    display: flex;
    width: 100%;
    position: relative;

    .cell-content {
      display: flex;
      align-items: center;
      // white-space: normal;
      // text-overflow: ellipsis;
      // text-overflow: -o-ellipsis-lastline;
      // overflow: hidden;
      // display: -webkit-box;
      // -webkit-line-clamp: 2;
      // line-clamp: 2;
      // -webkit-box-orient: vertical;
      .cell-label {
        flex: 1;
        // text-align: justify;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .wrap-cell {
      flex: 1;
      // text-align: justify;
      text-overflow: ellipsis;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .maps-icon-edit {
      font-size: 14px;
      position: absolute;
      right: -5px;
      top: 50%;
      transform: translateY(-50%);
      display: none;
    }
  }
  .item-cell:hover {
    .maps-icon-edit {
      display: inline-block;
    }
  }

  .operate-box {
    display: flex;
    align-items: center;
    .maps-icon-rule,
    .maps-icon-rule-error {
      margin: 0 !important;
    }
  }

  .preview {
    width: 80px;
    height: 45px;
    background: #383838;
    border-radius: 2px;
    // position: relative;
    .static-assemble-id {
      display: block;
      padding-top: 3px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      position: relative;
      overflow: hidden;
      .right-top {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.2);
        position: absolute;
        top: 3px;
        right: 3px;
      }
      .left-bottom {
        font-size: 24px;
        color: rgba(255, 255, 255, 0.2);
        position: absolute;
        left: -4px;
        bottom: -6px;
      }
    }
    .not-priview {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>