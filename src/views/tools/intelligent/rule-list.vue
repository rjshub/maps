<template>
  <div class="rule-list-container" v-loading.funllscreen="isLoading">
    <header v-if="!is_empty">
      <div class="btn">
        <el-button
          size="mini"
          type="primary"
          :disabled="just_show"
          class="maps-button-mini"
          @click="create_rule"
        >
          <i class="iconfont maps-icon-add"></i>
          {{ $t("lang.intelligent_rule_create_new") }}
        </el-button>
        <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
          <el-button
            size="mini"
            plain
            :disabled="just_show"
            class="maps-button-mini"
            @click="handle_batch_delete"
          >
            <i class="iconfont maps-icon-trash"></i>
          </el-button>
        </maps-tooltip>
        <maps-tooltip :text="$t('lang.public_enable')">
          <el-button
            size="mini"
            plain
            :disabled="just_show"
            class="maps-button-mini"
            @click="allow_account"
          >
            <i class="iconfont maps-icon-open"></i>
          </el-button>
        </maps-tooltip>
        <maps-tooltip :text="$t('lang.public_disable')">
          <el-button
            size="mini"
            plain
            :disabled="just_show"
            class="maps-button-mini"
            @click="forbidden_account"
          >
            <i class="iconfont maps-icon-pause"></i>
          </el-button>
        </maps-tooltip>
      </div>
      <div class="select-container">
        <el-select
          v-model="filter_form.platform"
          :placeholder="$t('lang.public_select_platform_placeholder')"
          size="mini"
          style="width: 180px"
          filterable
          @change="filter_change"
        >
          <!-- <el-option :label="$t('lang.public_all_platform')"
                        value=""></el-option> -->
          <el-option
            v-for="item in platform_config"
            :key="item.id"
            :label="item[`name_${language}`]"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="filter_form.status"
          :placeholder="$t('lang.public_status_placeholder')"
          size="mini"
          filterable
          style="width: 120px; margin: 0 10px"
          @change="filter_change"
        >
          <el-option :label="$t('lang.public_all_status')" value=""></el-option>
          <el-option
            v-for="item in status_list"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          size="mini"
          style="width: 205px"
          :placeholder="$t('lang.intelligent_rule_search')"
          class="filter-input"
          @keyup.enter.native="filter_change"
          v-model="filter_form.word"
        >
          <div slot="prefix" style="cursor: pointer">
            <i class="iconfont maps-icon-search" @click="filter_change"></i>
          </div>
        </el-input>
      </div>
    </header>
    <main v-if="!is_empty">
      <el-table
        ref="multipleTable"
        :data="rule_list"
        tooltip-effect="dark"
        style="width: 100%"
        height="100%"
        stripe
        border
        @selection-change="handleSelectionChange"
        @sort-change="rule_sort_change"
      >
        <el-table-column type="selection" :selectable="set_select" width="55">
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.status')"
          width="100"
          class-name="operate"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              :disabled="just_show || !scope.row.operation_flag"
              active-color="#0BB3B3"
              inactive-color="#C4C4C4"
              @change="handle_status(scope.row, $event)"
            ></el-switch>
            <span
              :style="`display: inline-block;color:${
                status_map[scope.row.status].color
              };`"
              >{{ status_map[scope.row.status].text }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.action')"
          width="140"
          class-name="operate"
        >
          <template slot-scope="scope">
            <maps-tooltip :text="$t('lang.public_edit_tooltip')">
              <el-button
                size="mini"
                type="text"
                :disabled="just_show || !scope.row.operation_flag"
                @click="handle_edit(scope.row)"
              >
                <maps-tooltip
                  :text="!scope.row.operation_flag ? forbidden_edit_text : ''"
                  align="left"
                >
                  <i class="iconfont maps-icon-edit"></i>
                </maps-tooltip>
              </el-button>
            </maps-tooltip>
            <maps-tooltip :text="$t('lang.public_copy_tooltip')">
              <el-button
                size="mini"
                type="text"
                :disabled="just_show"
                @click="handle_copy(scope.row)"
              >
                <i class="iconfont maps-icon-copy1"></i>
              </el-button>
            </maps-tooltip>
            <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
              <el-button
                size="mini"
                type="text"
                :disabled="just_show || !scope.row.operation_flag"
                @click="handle_delete(scope.row)"
              >
                <maps-tooltip
                  :text="!scope.row.operation_flag ? forbidden_delete_text : ''"
                  align="left"
                >
                  <i class="iconfont maps-icon-trash"></i>
                </maps-tooltip>
              </el-button>
            </maps-tooltip>
            <maps-tooltip :text="$t('lang.public_show_log_tooltip')">
              <el-button size="mini" type="text" @click="handle_log(scope.row)">
                <i class="iconfont maps-icon-Book"></i>
              </el-button>
            </maps-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="rid" label="ID" width="50"> </el-table-column>
        <el-table-column
          prop="name"
          :label="$t('lang.intelligent_rule_table_config.rule_name')"
          resizable
          show-overflow-tooltip
          min-width="250"
        >
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.detail')"
          min-width="95"
        >
          <template slot-scope="scope">
            <span
              style="color: #0bb3b3; cursor: pointer"
              @click="show_detail(scope.row.id)"
              >{{ $t("lang.public_show_tooltip") }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.creator')"
          resizable
          show-overflow-tooltip
          sortable
          prop="ctime"
          min-width="240"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.username }} </span>
            <span>{{ scope.row.ctime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.effective')"
          resizable
          min-width="200"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.enddate"
              >{{ scope.row.startdate }}
              {{ $t("lang.intelligent_rule_effective") }}
              {{ scope.row.enddate || "" }}</span
            >
            <span v-else>{{ scope.row.startdate }} ——</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('lang.intelligent_rule_table_config.Last_Edited')"
          resizable
          sortable
          show-overflow-tooltip
          prop="utime"
          min-width="240"
        >
          <template slot-scope="scope">
            <maps-tooltip :text="set_log(scope.row.log)">
              <span>{{ scope.row.edit }}</span>
            </maps-tooltip>
          </template>
        </el-table-column>

        <template slot="empty">
          <table-empty></table-empty>
        </template>
      </el-table>
    </main>
    <footer class="pagination-footer" v-if="!is_empty">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </footer>
    <div class="list-empty" v-else>
      <i class="iconfont maps-icon-nodata"></i>
      <span>{{ $t("lang.intelligent_rule_list_empty") }}</span>
      <el-button type="primary" @click="create_rule" size="mini">
        <i class="iconfont maps-icon-add">
          {{ $t("lang.intelligent_rule_create_new") }}</i
        >
      </el-button>
    </div>
    <RuleCreateEdit
      ref="RuleCreateEdit"
      @success="update_list"
    ></RuleCreateEdit>
    <RuleDetail ref="RuleDetail"></RuleDetail>
    <!-- 编辑提醒 -->
    <EditPoint ref="EditPoint"></EditPoint>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import RuleCreateEdit from "../components/rule-create-edit";
import RuleDetail from "../components/rule-detail";
import EditPoint from "../components/edit_point"; // 编辑提醒

export default {
  components: { RuleCreateEdit, RuleDetail, EditPoint },
  data() {
    return {
      isLoading: false,
      is_empty: false,
      forbidden_edit_text:
        "该智能规则正在被应用，不允许编辑！如需编辑，请您前往【辅助工具】-【规则管理】-【规则任务】页面，将该规则从所有启用的任务中删除，或将已应用该规则的所有任务禁用。",
      forbidden_delete_text:
        "该智能规则正在被应用，不允许删除！如需删除，请您前往【辅助工具】-【规则管理】-【规则任务】页面，将该规则从所有启用的任务中删除，或将已应用该规则的所有任务禁用。",
      currentPage: 1,
      pagesize: 10,
      total: 0,
      rule_list: [],
      multipleSelection: [],
      filter_form: {
        team_id: "",
        platform: "1",
        status: "",
        word: "",
        order: "",
        order_by: "",
        page: "1",
        page_size: "10",
      },
      platform_config: [
        {
          name_zh: "应用于巨量引擎",
          name_en: "Apply to Ocean Engine",
          id: "1",
        },
      ],
      status_list: [
        {
          id: "1",
          label: this.$t("lang.public_enable"),
        },
        {
          id: "0",
          label: this.$t("lang.public_disable"),
        },
      ],
      status_map: {
        1: {
          text: this.$t("lang.public_enable"),
          color: "#0BB3B3",
        },
        0: {
          text: this.$t("lang.public_disable"),
          color: "#333",
        },
      },
    };
  },
  watch: {},
  computed: {
    ...mapState("permissions", ["Rule_Intelligent_permission"]),
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id"]),
    just_show() {
      return this.Rule_Intelligent_permission == "1";
    },
  },
  methods: {
    ...mapActions("tools", ["update_rule_handle_type"]),
    // 设置是否可以选择
    set_select(param) {
      return param.operation_flag || false;
    },
    // 新建编辑成功
    update_list(param) {
      this.get_rule_list();

      if (param.is_tip) {
        this.$refs.EditPoint.show(param.list);
      }
    },
    // 查询是否有数据
    async get_rules_count() {
      const url = "/rule/list";
      const param = {
        team_id: this.active_team_id,
        platform: "1",
        status: "",
        word: "",
        order: "",
        order_by: "",
        page: "1",
        page_size: "10",
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        if (data.list.length > 0) {
          this.is_empty = false;
          this.get_rule_list();
        } else {
          this.is_empty = true;
        }
      } else {
        this.is_empty = true;
      }
    },
    // 查询list
    async get_rule_list() {
      const url = "/rule/list";

      this.filter_form.team_id = this.active_team_id;
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.is_empty = false;
        this.rule_list = data.list;
        this.total = data.total;
      }
    },
    // 重写log
    set_log(logs) {
      let result = "";
      if (logs && logs.length) {
        logs.forEach((item) => {
          result += item + "<br/>";
        });
      }
      return result;
    },
    //   批量操作
    forbidden_batch() {
      if (this.multipleSelection.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectionChange(val) {
      if (val.length) {
        let result = [];
        val.forEach((item) => {
          result.push(item.id);
        });
        this.multipleSelection = result;
      } else {
        this.multipleSelection = [];
      }
      this.$emit("update_tab", { tab: "", id: this.multipleSelection.join() });
    },
    create_rule() {
      this.update_rule_handle_type("create");
      this.$refs.RuleCreateEdit.show();
    },
    handle_batch_delete() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_rule_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip_x"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_rule_delete_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_rule_delete_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/rule/delete";
          const param = {
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (
              this.rule_list.length == this.multipleSelection.length &&
              this.filter_form.page != 1
            ) {
              this.filter_form.page -= 1;
            }
            this.get_rules_count();
          }
        })
        .catch(() => {
          return false;
        });
    },
    allow_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_rule_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_enable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_rule_open_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_rule_open_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "1",
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const url = "/rule/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_rule_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    forbidden_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_rule_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_disable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_rule_close_${self}.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_rule_close_${self}.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "0",
            team_id: this.active_team_id,
            ids: this.multipleSelection.join(","),
          };
          const url = "/rule/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_rule_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 表格操作
    // 表格排序
    rule_sort_change(param) {
      const map = {
        // ASC，DESC
        descending: "DESC",
        ascending: "ASC",
      };
      if (param.order) {
        this.filter_form.order = map[param.order];
        this.filter_form.order_by = param.prop;
      } else {
        this.filter_form.order = "";
        this.filter_form.order_by = "";
      }

      this.get_rule_list();
    },
    async handle_status(row, status) {
      const h = this.$createElement;
      const self = status == "0" ? "close" : "open";
      this.$msgbox({
        title:
          status == "0"
            ? this.$t("lang.public_disable")
            : this.$t("lang.public_enable"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_rule_${self}_this.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_rule_${self}_this.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/rule/updateStatus";
          const param = {
            team_id: this.active_team_id,
            ids: row.id,
            status: status,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_rule_list();
          }
        })
        .catch(() => {
          row.status = status == "1" ? 0 : 1;
        });
    },
    handle_edit(row) {
      this.update_rule_handle_type("edit");
      this.$refs.RuleCreateEdit.show(row.id);
    },
    handle_copy(row) {
      this.update_rule_handle_type("copy");
      this.$refs.RuleCreateEdit.show(row.id);
    },
    async handle_delete(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip_x"),
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            this.$t(`lang.intelligent_rule_delete_this.confirm`)
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            this.$t(`lang.intelligent_rule_delete_this.point`)
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/rule/delete";
          const param = {
            team_id: this.active_team_id,
            ids: row.id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (this.rule_list.length == 1 && this.filter_form.page != 1) {
              this.filter_form.page -= 1;
            }
            this.get_rules_count();
          }
        })
        .catch(() => {
          return false;
        });
    },
    handle_log(row) {
      this.$emit("update_tab", { tab: "log", id: row.rid });
    },
    // 查看详情
    show_detail(id) {
      this.$refs.RuleDetail.show(id);
    },
    // 过滤
    filter_change(param, page = "1") {
      this.filter_form.page = page;
      this.get_rule_list();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.filter_change("", this.filter_form.page);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.filter_form.page = val;
      this.filter_change("", val);
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
    this.get_rules_count();
  },
};
</script>
<style lang="scss">
.rule-list-container {
  & > main {
    .el-table {
      .operate {
        .el-button--text {
          padding: 0;
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.rule-list-container {
  width: 100%;
  height: 100%;
  position: relative;
  & > header {
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
  }
  & > main {
    padding: 0 20px;
    height: calc(100% - 112px);
    position: relative;
  }
  .list-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: #999999;
    font-size: 14px;
    text-align: center;
    & > i {
      font-size: 70px;
    }
    & > span {
      margin: 20px 0;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>