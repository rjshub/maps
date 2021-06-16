<template>
    <div class="team-manage-container"
        v-loading.fullscreen="isLoading">
        <header>
            <span>{{`${$t('lang.team_member_list')} (${total}/100)`}}</span>
            <el-button class="maps-button-mini"
                v-if="!is_manager"
                @click="exit_team">{{$t('lang.team_leave')}}</el-button>
        </header>
        <main>
            <div class="table-filter">
                <div class="select-container"
                    v-if="is_manager">
                    <el-button size="mini"
                        type="primary"
                        class="maps-button-mini"
                        @click="invite_member">
                        <i class="iconfont maps-icon-add"></i> {{$t('lang.team_Add_Members')}}
                    </el-button>
                    <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="delete_member">
                            <i class="iconfont maps-icon-trash"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip :text="$t('lang.public_enable')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="allow_member">
                            <i class="iconfont maps-icon-open"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip :text="$t('lang.public_disable')">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="forbidden_member">
                            <i class="iconfont maps-icon-pause"></i>
                        </el-button>
                    </maps-tooltip>

                </div>
                <div class="select-container">
                    <el-select v-model="filter_form.auth"
                        v-if="is_manager"
                        :placeholder="$t('lang.public_team_member_permission_placeholder')"
                        size="mini"
                        filterable
                        @change="filter_change">
                        <el-option :label="$t('lang.team_all_member')"
                            value=""></el-option>
                        <el-option :label="$t('lang.public_Assigned')"
                            value="1"></el-option>
                        <el-option :label="$t('lang.public_Awaiting_assignment')"
                            value="0"></el-option>
                        <el-option :label="$t('lang.public_Expired')"
                            value="2"></el-option>
                    </el-select>
                    <el-select v-model="filter_form.status"
                        v-if="is_manager"
                        :placeholder="$t('lang.team_member_status')"
                        size="mini"
                        filterable
                        style="margin: 0 10px"
                        @change="filter_change">
                        <el-option :label="$t('lang.public_all_status')"
                            value=""></el-option>
                        <el-option :label="$t('lang.public_enable')"
                            value="1"></el-option>
                        <el-option :label="$t('lang.public_disable')"
                            value="0"></el-option>
                    </el-select>
                    <el-input size="mini"
                        style="width:250px"
                        :placeholder="$t('lang.team_search_by_name')"
                        class="filter-input"
                        @keyup.enter.native="filter_change"
                        v-model="filter_form.word">
                        <div slot="prefix"
                            style="cursor: pointer">
                            <i class="iconfont maps-icon-search"
                                @click="filter_change"></i>
                        </div>
                    </el-input>
                </div>
            </div>
            <div class="team-table">
                <el-table ref="multipleTable"
                    :data="member_list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="100%"
                    stripe
                    @selection-change="handleSelectionChange">
                    <el-table-column v-if="is_manager"
                        :selectable="set_column_select"
                        type="selection"
                        width="55">
                    </el-table-column>

                    <el-table-column v-if="is_manager"
                        :label="$t('lang.team_member_table_config.operate')"
                        width="80"
                        class-name="operate">
                        <template slot-scope="scope"
                            v-if="scope.row.is_manager !== '1'">
                            <maps-tooltip :text="$t('lang.public_edit_tooltip')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_edit(scope.row)">
                                    <i class="iconfont maps-icon-edit"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip :text="$t('lang.public_delete_tooltip_x')">
                                <el-button size="mini"
                                    type="text"
                                    @click="handle_delete(scope.row.user_id)">
                                    <i class="iconfont maps-icon-trash"></i>
                                </el-button>
                            </maps-tooltip>
                        </template>
                    </el-table-column>

                    <el-table-column v-if="is_manager"
                        :label="$t('lang.team_member_table_config.status')"
                        width="100"
                        class-name="operate">
                        <template slot-scope="scope"
                            v-if="scope.row.is_manager !== '1'">
                            <el-switch v-model="scope.row.status"
                                active-value="1"
                                inactive-value="0"
                                active-color="#0BB3B3"
                                inactive-color="#C4C4C4"
                                @change="handle_status(scope.row, $event)"></el-switch>
                            <span :style="`display: inline-block;color:${status_map[scope.row.status].color};`">{{status_map[scope.row.status].text}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column prop="username"
                        :label="$t('lang.team_member_table_config.username')"
                        min-width="150">
                    </el-table-column>
                    <el-table-column prop="truename"
                        :label="$t('lang.team_member_table_config.truename')"
                        min-width="150">
                    </el-table-column>
                    <el-table-column prop="email"
                        :label="$t('lang.team_member_table_config.email')"
                        min-width="200">
                    </el-table-column>
                    <el-table-column v-if="is_manager"
                        :label="$t('lang.team_member_table_config.permission')"
                        width="120">
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_manager === '1'">{{$t('lang.team_Administrator')}}</span>
                            <span v-else-if="scope.row.datestatus === '0'"
                                @click="show_permission_detail(scope.row)"
                                style="color: #ff0000;cursor: pointer">{{$t('lang.public_Expired')}}</span>
                            <span v-else-if="scope.row.is_auth === '1' && scope.row.datestatus === '1'"
                                style="color: #0BB3B3;cursor: pointer"
                                @click="show_permission_detail(scope.row)">
                                <i class="iconfont maps-icon-permission"></i> {{$t('lang.public_Assigned')}}
                            </span>
                            <span v-else-if="scope.row.is_auth === '0' && scope.row.datestatus === '1'">
                                <i class="iconfont maps-icon-permission"></i> {{$t('lang.public_Awaiting_assignment')}}
                            </span>

                        </template>
                    </el-table-column>
                    <el-table-column prop="logintime"
                        :label="$t('lang.team_member_table_config.logintime')"
                        min-width="160">
                        <template slot-scope="scope">
                            <span>{{scope.row.logintime || '--'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120" :label="$t('lang.team_member_table_config.identity')">
                      <template slot-scope="scope">
                        {{scope.row.is_manager == '1'? $t('lang.team_Administrator'):$t('lang.message_member')}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark"
                        show-overflow-tooltip
                        min-width="250"
                        :label="$t('lang.team_member_table_config.remark')">
                        <template slot-scope="scope">
                            <span>{{scope.row.remark || '--'}}</span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <table-empty></table-empty>
                    </template>
                </el-table>
            </div>
            <footer class="pagination-footer">
                <div class="team-data">
                    <span>{{team_info.name}}</span>
                    <i v-if="is_manager"
                        class="iconfont maps-icon-edit"
                        @click="edit_team_label(team_info)"></i>
                    <span class="team-id">ID: {{team_info.teamid}}</span>
                </div>
                <el-pagination background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[10, 20, 50, 100, 200, 500]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </footer>
        </main>

        <PermissionDetail ref="PermissionDetail"></PermissionDetail>
        <InviteMemberDrawer ref="InviteMemberDrawer"
            @handle_success="handle_success"></InviteMemberDrawer>
        <EditTeamDialog ref="EditTeamDialog"
            @updatename_success="updatename_success"></EditTeamDialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import PermissionDetail from "../components/permiassion-detail";
import InviteMemberDrawer from "../components/invite-member-drawer";
import EditTeamDialog from "../components/edit-team";
import _ from "lodash";

export default {
  components: {
    PermissionDetail,
    InviteMemberDrawer,
    EditTeamDialog,
  },
  data() {
    return {
      isLoading: false,
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
      //   搜索
      currentPage: 0,
      pagesize: 10,
      total: 0,
      filter_form: {
        join_status: "2",
        team_id: "",
        auth: "",
        status: "",
        word: "",
        page: "1",
        page_size: "10",
      },
      member_list: [],
      multipleSelection: [],
    };
  },
  computed: {
    ...mapState("system", ["team_manager", "team_info", "active_team_id"]),
    is_manager() {
      return this.team_manager;
    },
  },
  methods: {
    ...mapActions("system", ["update_team_manager", "update_team_id", "update_team_info", "update_member_handle_type"]),
    set_column_select(row, index) {
      let state = true;
      if (row.is_manager === "1") {
        state = false;
      }
      return state;
    },
    // 申请退出团队
    exit_team() {
      this.$confirm(this.$t("lang.team_leave_confirm"), this.$t("lang.team_leave"), {
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/team/exitteam";
          const param = {
            team_id: this.active_team_id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            // this.get_member_list();
            const info = {
              id: "",
              name: "",
              is_manager: "0",
            };
            this.update_team_info(info);
            this.$router.replace("/user/team");
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 团队管理员操作
    async invite_member() {
      const param = {
        team_id: this.active_team_id,
      };
      const url = "/account/adminAccountsTotal";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        if (data.total != 0) {
          this.update_member_handle_type("invite");
          this.$refs.InviteMemberDrawer.show("invite");
        } else {
          this.$message({
            message: this.$t("lang.team_can_not_invite"),
            duration: 5000,
            offset: 3,
          });
        }
      }
    },
    delete_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_member_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.team_delete_member"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.team_delate_member_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.team_delate_member_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/team/removeuser";
          const param = {
            team_id: this.active_team_id,
            user_id: this.get_user_ids(),
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_member_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    allow_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_member_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.public_enable"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.team_open_member_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.team_open_member_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            team_id: this.active_team_id,
            status: "1",
            user_id: this.get_user_ids(),
          };
          const url = "/team/changeuserstatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_member_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    forbidden_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_member_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      this.$msgbox({
        title: this.$t("lang.public_disable"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.team_close_member_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.team_close_member_${self}.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const param = {
            team_id: this.active_team_id,
            status: "0",
            user_id: this.get_user_ids(),
          };
          const url = "/team/changeuserstatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_member_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 搜索
    filter_change(param, page = "1", page_size = "10") {
      this.filter_form.page = page;
      this.filter_form.page_size = page_size;
      this.get_member_list();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // this.filter_form.page_size = val;
      this.filter_change("", this.filter_form.page, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.filter_form.page = val;
      this.filter_change("", val, this.filter_form.page_size);
    },
    // 查询团队列表
    async get_member_list() {
      const url = "/team/userlists";
      this.filter_form.team_id = this.active_team_id;
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.member_list = data.teamuserlist.list;
        this.total = Number(data.teamuserlist.total);
      }
    },
    // 表格操作
    async handle_edit(row) {
      this.update_member_handle_type("edit");
      this.$refs.InviteMemberDrawer.show("edit", row);
    },
    async handle_delete(id) {
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.team_delete_member"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.team_delate_member_this.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.team_delate_member_this.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/team/removeuser";
          const param = {
            team_id: this.active_team_id,
            user_id: id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_member_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    async handle_status(row, status) {
      const h = this.$createElement;
      const self = status == "0" ? "close" : "open";
      this.$msgbox({
        title: status == "0" ? this.$t("lang.public_disable") : this.$t("lang.public_enable"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.team_${self}_member_this.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.team_${self}_member_this.point`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/team/changeuserstatus";
          const param = {
            team_id: this.active_team_id,
            user_id: row.user_id,
            status: status,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_member_list();
          }
        })
        .catch(() => {
          row.status = status === "1" ? "0" : "1";
        });
    },
    show_permission_detail(row) {
      this.$refs.PermissionDetail.show(row);
    },
    // 批量
    get_user_ids() {
      let data = [];
      this.multipleSelection.forEach((item) => {
        data.push(item.user_id);
      });
      return data.toString();
    },
    forbidden_batch() {
      if (this.multipleSelection.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑团队
    edit_team_label(team) {
      this.update_team_id(team.id);
      this.$refs.EditTeamDialog.show(team);
    },
    updatename_success(name) {
      const data = _.cloneDeep(this.team_info);
      data.name = name;
      this.update_team_info(data);
    },
    // 成功邀请或编辑成员
    handle_success() {
      this.get_member_list();
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
    this.get_member_list();
    this.$eventHub.$on("agree_apply", this.get_member_list);
  },
};
</script>
<style lang='scss' scoped>
.team-manage-container {
  padding: 0;
  margin: 20px 10px 0 10px;
  background: #fff;
  position: relative;
  header {
    padding: 0 20px;
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
    font-size: 16px;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  main {
    height: calc(100% - 61px);
    padding: 20px 20px 0 20px;
    .table-filter {
      padding-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .team-table {
      height: calc(100% - 106px);
    }
    footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #333;
      .team-data {
        font-size: 14px;
        i {
          color: #0bb3b3;
          visibility: hidden;
          margin: 0 5px;
          cursor: pointer;
        }
        .team-id {
          color: #666;
        }
      }
      .team-data:hover {
        i {
          visibility: visible;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.team-manage-container {
  .el-select {
    .el-input__inner {
      padding-left: 15px;
    }
  }
}
</style>