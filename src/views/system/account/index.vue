<template>
    <div class="account-container">
        <section class="container-aside">
            <header>
                <span>{{$t('lang.account_customer_list')}}</span>
                <i class="iconfont maps-icon-add"
                    v-if="account_manage"
                    style="cursor: pointer"
                    @click="add_customer"></i>
            </header>
            <main>
                <CustomerList ref="CustomerList"
                    :list="customer_list"
                    :total="customer_total"
                    :industry="industry"
                    @change_customer_ids="change_customer_ids"
                    @handleSuccess="handle_customer_success"></CustomerList>

            </main>
        </section>
        <section class="container-main">

            <header>
                <span v-if="account_manage">{{$t('lang.account_all_ad_account')}}</span>
                <el-tabs v-else
                    @tab-click="handle_click_tab"
                    v-model="activeName">
                    <el-tab-pane :label="$t('lang.account_Assigned')"
                        name="distribute"></el-tab-pane>
                    <el-tab-pane :label="$t('lang.account_not_Assigned')"
                        name="undistributed"></el-tab-pane>
                </el-tabs>
            </header>
            <main v-if="!no_data">
                <div class="table-filter">
                    <!-- 管理者 -->
                    <div class="select-container"
                        v-if="account_manage">
                        <el-button size="mini"
                            type="primary"
                            :disabled="just_show"
                            class="maps-button-mini"
                            @click="connect_account">
                            <i class="iconfont maps-icon-links"></i> {{$t('lang.account_connect')}}
                        </el-button>
                        <maps-tooltip :text="$t('lang.public_delete_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="delete_account">
                                <i class="iconfont maps-icon-trash"></i>
                            </el-button>
                        </maps-tooltip>
                        <maps-tooltip :text="$t('lang.public_open_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="allow_account">
                                <i class="iconfont maps-icon-open"></i>
                            </el-button>
                        </maps-tooltip>
                        <maps-tooltip :text="$t('lang.public_forbidden_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="forbidden_account">
                                <i class="iconfont maps-icon-pause"></i>
                            </el-button>
                        </maps-tooltip>

                        <el-select v-model="add_customer_type"
                            :placeholder="$t('lang.public_add_to_customer')"
                            filterable
                            size="mini"
                            style="margin-left: 10px"
                            @change="handle_account_customer_change"
                            @visible-change="handle_account_customer_blur">
                            <span slot="prefix">
                                <i class="iconfont maps-icon-folderadd"></i>
                            </span>
                            <!-- <el-option label="添加到客户"
                        value=""></el-option> -->
                            <el-option :label="$t('lang.account_add_to_new_customer')"
                                :disabled="just_show"
                                value="add to new customer"></el-option>
                            <el-option v-for="item in add_customer_option()"
                                :key="item.id"
                                :disabled="just_show"
                                :label="item.label"
                                :value="item.value"></el-option>
                        </el-select>
                    </div>
                    <!-- 已分配 -->
                    <div class="select-container"
                        v-else-if="activeName === 'distribute'">
                        <maps-tooltip :text="$t('lang.public_delete_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="delete_account">
                                <i class="iconfont maps-icon-trash"></i>
                            </el-button>
                        </maps-tooltip>
                        <maps-tooltip :text="$t('lang.public_open_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="allow_account">
                                <i class="iconfont maps-icon-open"></i>
                            </el-button>
                        </maps-tooltip>
                        <maps-tooltip :text="$t('lang.public_forbidden_tooltip')">
                            <el-button size="mini"
                                plain
                                :disabled="just_show"
                                class="maps-button-mini"
                                @click="forbidden_account">
                                <i class="iconfont maps-icon-pause"></i>
                            </el-button>
                        </maps-tooltip>
                        <maps-tooltip :text="$t('lang.public_show_permission_tooltip')">
                            <el-button size="mini"
                                plain
                                class="maps-button-mini"
                                @click="show_account_permission">
                                <i class="iconfont maps-icon-permission-check"></i>
                            </el-button>
                        </maps-tooltip>

                    </div>
                    <!-- 未分配 -->
                    <div v-else-if="activeName === 'undistributed'"
                        class="select-container">
                        <maps-tooltip :text="$t('lang.public_apply_permission_tooltip')">
                            <el-button size="mini"
                                plain
                                class="maps-button-mini"
                                @click="apply_permission">
                                <i class="iconfont maps-icon-permission"></i>
                            </el-button>
                        </maps-tooltip>

                    </div>
                    <!-- 完 -->
                    <div class="select-container">
                        <el-select v-model="filter_form.platform"
                            :placeholder="$t('lang.public_platform_placeholder')"
                            size="mini"
                            style="width: 120px"
                            filterable
                            @change="filter_change">
                            <el-option :label="$t('lang.public_all_platform')"
                                value=""></el-option>
                            <el-option v-for="item in platform_config"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="filter_form.status"
                            :placeholder="$t('lang.public_status_placeholder')"
                            size="mini"
                            filterable
                            style="width: 120px;margin: 0 10px"
                            @change="filter_change">
                            <el-option :label="$t('lang.public_all_status')"
                                value=""></el-option>
                            <el-option v-for="item in set_status_list"
                                :key="item.id"
                                :label="item.label"
                                :value="item.id"></el-option>
                        </el-select>
                        <el-input size="mini"
                            :style="`width: ${language == 'zh'? '180px':'320px'}`"
                            :placeholder="$t('lang.public_account_client_owner_placeholder')"
                            class="filter-input"
                            @keyup.enter.native="filter_change"
                            v-model="filter_form.keyword">
                            <div slot="prefix"
                                style="cursor: pointer">
                                <i class="iconfont maps-icon-search"
                                    @click="filter_change"></i>
                            </div>
                        </el-input>
                    </div>
                </div>
                <component :ref="activeNav"
                    class="table-main"
                    :is="activeNav"
                    :tableData="tableData"
                    @updateSortList="updateSortList"
                    @updateAccountIds="updateAccountIds"
                    @updateList="updateList"></component>
                <footer class="pagination-footer">
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

            <div class="list-empty"
                v-if="distribute_empty && activeName === 'distribute'">
                <i class="iconfont maps-icon-nodata"></i>
                <span>{{$t('lang.account_no_ad_account')}}</span>
                <span>{{$t('lang.account_no_ad_account_point')}}</span>
            </div>
            <div class="list-empty"
                v-if="undistributed_empty && activeName === 'undistributed'">
                <i class="iconfont maps-icon-nodata"></i>
                <span>{{$t('lang.account_no_apply_account')}}</span>
                <span>{{$t('lang.account_no_apply_account_point')}}</span>
            </div>
            <div class="list-empty"
                v-if="manager_empty">
                <i class="iconfont maps-icon-nodata"></i>
                <span>{{$t('lang.account_no_connect_account')}}</span>
                <span style="margin: 20px 0">{{$t('lang.account_no_connect_account_point')}}</span>
                <el-button type="primary"
                    @click="connect_account"
                    size="mini">
                    <i class="iconfont maps-icon-links"> {{$t('lang.account_connect')}}</i>
                </el-button>
            </div>
        </section>
        <!-- 查看权限 -->
        <PermissionDetail ref="PermissionDetail"></PermissionDetail>
        <!-- 申请权限 -->
        <ApplyPermission ref="ApplyPermission"
            :title="$t('lang.account_batch_apply_permission')"
            @applySuccess="updateList"></ApplyPermission>
        <!-- 关联账号 -->
        <ConnectAccount ref="ConnectAccount"
            :industry="industry"
            @firstEnd="connect_first_step"></ConnectAccount>
        <!-- 账号读取，确认关联 -->
        <AccountAuth ref="AccountAuth"
            @conectSuccess="connect_success"></AccountAuth>
        <!-- 确认关联后返回的已被关联过的账号 -->
        <AccountAuthed ref="AccountAuthed"></AccountAuthed>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import CustomerList from "../components/customer-list";
import AllTable from "./all-table";
import DistributeTable from "./distribute-table";
import undistributedTable from "./undistribute-table";
import PermissionDetail from "../components/permiassion-detail";
import ApplyPermission from "../components/apply-permission";
import ConnectAccount from "../components/connect-account";
import AccountAuth from "../components/account-auth";
import AccountAuthed from "../components/account-authed";

export default {
  components: {
    CustomerList,
    AllTable,
    DistributeTable,
    undistributedTable,
    PermissionDetail,
    ApplyPermission,
    ConnectAccount,
    AccountAuth,
    AccountAuthed,
  },
  data() {
    return {
      isLoading: false,
      customer_list: [],
      customer_total: "",
      activeName: "distribute",
      // 表格过滤和操作
      tableData: [],
      multipleSelection: [],
      add_customer_type: "",
      customer_ids: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      filter_form: {
        team_id: "",
        client_id: [],
        platform: "",
        status: "",
        keyword: "",
        order: "",
        page: "1",
        page_size: "10",
      },
      select_list: [],
      no_data: false,
      manager_empty: false,
      distribute_empty: false,
      undistributed_empty: false,
      customer_empty: false,
      // 同步关联
      connect_client_id: "",
      // 行业信息
      industry: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["account_manage", "team_manager", "team_info", "active_team_id", "platform_config"]),
    ...mapState("user", ["user_token", "language"]),
    ...mapState("permissions", ["Account_permission"]),
    activeNav() {
      const map = {
        distribute: "DistributeTable",
        undistributed: "undistributedTable",
      };
      if (this.account_manage) {
        return "AllTable";
      } else {
        return map[this.activeName];
      }
    },
    set_status_list() {
      let list = [];
      if (this.activeName === "undistributed") {
        list = [
          {
            id: "1",
            label: this.$t("lang.public_Stateless"),
          },
          {
            id: "2",
            label: this.$t("lang.public_Awaiting_response"),
          },
          {
            id: "3",
            label: this.$t("lang.public_Rejected"),
          },
          {
            id: "4",
            label: this.$t("lang.public_Expired"),
          },
        ];
      } else {
        list = [
          {
            id: "1",
            label: this.$t("lang.public_Visible"),
          },
          {
            id: "0",
            label: this.$t("lang.public_Invisible"),
          },
        ];
      }
      return list;
    },
    // 用户权限，查看和编辑
    just_show() {
      let state = false;
      if (!this.account_manage) {
        // 如果不是管理员则开始判断权限
        if (this.Account_permission == "1") {
          state = true;
        } else if (this.Account_permission == "2") {
          state = false;
        }
      }

      return state;
    },
  },
  methods: {
    ...mapActions("system", ["update_account_manager"]),
    // 获取行业信息列表
    async get_industry_list() {
      const url = "/industry/lists";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.industry = data;
      }
    },
    // 生成客户-账号下拉框
    add_customer_option() {
      let result = [];
      if (this.customer_list.length) {
        this.customer_list.forEach((item) => {
          const param = {
            id: item.id,
            label: `${this.$t("lang.account_add_to_")}${item.name}`,
            value: item.id,
          };
          result.push(param);
        });
      }
      return result;
    },
    // 查询账户列表是否有数据
    async get_list_total() {
      const param = {
        team_id: this.active_team_id,
      };
      if (this.account_manage) {
        const url = "/account/adminAccountsTotal";
        const data = await this.fetchCore(url, param, false);
        if (data) {
          if (data.total) {
            this.manager_empty = false;
            this.no_data = false;
            this.get_account_list();
          } else {
            this.manager_empty = true;
            this.no_data = true;
          }
        }
      } else {
        this.no_data = false;
        this.distribute_empty = false;
        this.undistributed_empty = false;
        if (this.activeName === "distribute") {
          const url = "/account/memeberManageAccountsTotal";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (data.total) {
              this.distribute_empty = false;
              this.no_data = false;
              this.get_account_list();
            } else {
              this.distribute_empty = true;
              this.no_data = true;
            }
          }
        } else if (this.activeName === "undistributed") {
          const url = "/account/memeberNotManageAccountsTotal";

          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (data.total) {
              this.undistributed_empty = false;
              this.no_data = false;
              this.get_account_list();
            } else {
              this.undistributed_empty = true;
              this.no_data = true;
            }
          }
        }
      }
    },
    //   查找客户列表
    async get_customer_list(type = "1") {
      const url = "/account/clientList";
      let param = {
        type: type, // 已分配或者未分配
        team_id: this.active_team_id,
      };
      if (this.account_manage) {
        param.type = "0";
      }
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.customer_list = data;
        let total = 0;
        if (data.length) {
          data.forEach((item) => {
            if (item.num) {
              total += Number(item.num);
            }
          });
        }
        this.customer_total = total.toString();
        this.add_customer_option();
      }
    },
    add_customer(type = "") {
      this.$refs.CustomerList.handle_add_customer(type);
    },
    change_customer_ids(param) {
      this.filter_form.client_id = param;
      if (!this.no_data) {
        this.filter_change();
      }
    },
    handle_customer_success(param) {
      if (param.remove) {
        this.add_to_customer(param.id);
      } else {
        this.init();
      }
    },
    // 切换类型,重新查找客户列表和账号
    handle_click_tab() {
      const map = {
        distribute: "1",
        undistributed: "2",
      };
      this.select_list = [];
      this.multipleSelection = [];
      this.currentPage = 1;
      this.pagesize = 10;
      this.filter_form.page = "1";
      this.filter_form.page_size = "10";
      this.filter_form.keyword = "";
      this.filter_form.status = "";
      this.filter_form.platform = "";

      this.get_customer_list(map[this.activeName]);
      this.get_list_total();
    },
    // 账号列表
    async get_account_list() {
      let url = "";
      if (this.account_manage) {
        url = "/account/adminAccounts";
      } else {
        if (this.activeName === "distribute") {
          url = "/account/memeberManageAccounts";
        } else {
          url = "/account/memeberNotManageAccounts";
        }
      }
      this.filter_form.team_id = this.active_team_id;
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.tableData = data.list;
        this.total = data.total;
      }
    },
    filter_change(param, page = "1") {
      this.filter_form.page = page;
      // this.filter_form.page_size = page_size;
      this.get_account_list();
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
    // 批量操作
    delete_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_account_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_delete_tooltip"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.account_delete_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_delete_${self}.point_1`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_delete_${self}.point_2`)),
        ]),
        showCancelButton: true,
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(async () => {
          const url = "/account/del";
          const param = {
            team_id: this.active_team_id,
            advertiser_id: this.multipleSelection,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_list_total();
          }
        })
        .catch(() => {
          return false;
        });
    },
    allow_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_account_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_open_tooltip"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.account_open_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_open_${self}.point_1`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_open_${self}.point_2`)),
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
            advertiser_id: this.multipleSelection,
          };
          const url = "/account/statusEdit";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    forbidden_account() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_account_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const self = this.multipleSelection.length === 1 ? "this" : "these";
      const h = this.$createElement;
      this.$msgbox({
        title: this.$t("lang.public_forbidden_tooltip"),
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, this.$t(`lang.account_close_${self}.confirm`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_close_${self}.point_1`)),
          h("div", { style: "font-size: 12px;color: #999" }, this.$t(`lang.account_close_${self}.point_2`)),
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
            advertiser_id: this.multipleSelection,
          };
          const url = "/account/statusEdit";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 查看权限
    async show_account_permission() {
      const url = "/account/memeberAuth";
      const param = {
        team_id: this.active_team_id,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        if (data.enddate) {
          const end = new Date(data.enddate).getTime();
          if (new Date().getTime() > end) {
            data.datestatus = "0";
          } else {
            data.datestatus = "1";
          }
        }
        this.$refs.PermissionDetail.show(data, "account");
      }
    },
    // 申请权限
    apply_permission() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_account_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      this.$refs.ApplyPermission.show(this.multipleSelection, this.select_list);
    },
    handle_account_customer_blur() {
      this.add_customer_type = "";
    },
    handle_account_customer_change(param) {
      if (!this.forbidden_batch()) {
        this.$message({
          message: this.$t("lang.public_account_batch_before"),
          duration: 5000,
          offset: 3,
        });
        this.add_customer_type = "";
        return false;
      }
      if (param) {
        switch (param) {
          case "add to new customer": // 新建分组并添加用户
            this.add_customer("remove_account");
            break;
          default:
            this.add_to_customer(param);
            break;
        }
      }
    },
    async add_to_customer(id) {
      const url = "/account/ownerEdit";
      const param = {
        team_id: this.active_team_id,
        client_id: id,
        advertiser_id: this.multipleSelection,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.init();
      }
    },
    format_ids(arr) {
      const result = [];
      arr.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    forbidden_batch() {
      if (this.multipleSelection.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // 表格操作
    updateList() {
      this.get_account_list();
    },
    updateSortList(param) {
      this.filter_form.order = param.order || "";
      this.get_account_list();
    },
    updateAccountIds(param) {
      this.select_list = param.list;
      this.multipleSelection = param.result;
    },
    // 关联
    connect_account() {
      this.$refs.ConnectAccount.show(this.customer_list);
    },
    // 关联弹框返回
    connect_first_step(param) {
      this.connect_client_id = param.client_id;
    },
    connect_success(param) {
      this.currentPage = 1;
      this.filter_form.page = "1";
      this.init();
      if (param && param.length) {
        this.$refs.AccountAuthed.show(param);
      }
    },
    init() {
      this.get_customer_list();
      this.get_list_total();
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
    // this.update_account_manager(0);
    this.get_industry_list();
    this.init();
    const THIS = this;
    window.addEventListener(
      "message",
      function (e) {
        const message = e.data;
        if (message.type === "success") {
          const param = {
            team_id: THIS.active_team_id,
            client_id: THIS.connect_client_id,
            authorize_id: message.id,
          };
          THIS.$refs.AccountAuth.show(param);
        }
      },
      false
    );
  },
};
</script>
<style lang='scss' scoped>
.account-container {
  padding: 0;
  margin: 20px 10px 0 10px;
  background: #fff;
  position: relative;
  display: flex;
  & > section {
    header {
      height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #dcdfe6;
      font-size: 16px;
      color: #666666;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    main {
      height: calc(100% - 41px);
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
      span {
        margin-top: 20px;
      }
      & > span:nth-of-type(1) {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      & > span:nth-of-type(2) {
        color: #666;
      }
    }
  }
  .container-aside {
    width: 20%;
    height: 100%;
    background: #fafafa;
    border-right: 1px solid #dcdfe6;
    position: relative;
  }
  .container-main {
    width: 80%;
    height: 100%;
    position: relative;
    & > main {
      height: calc(100% - 61px);
      padding: 20px 10px 0 10px;
      footer {
        text-align: right;
      }
      .table-filter {
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .table-main {
        height: calc(100% - 102px);
      }
    }
  }
}
</style>