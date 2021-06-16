<template>
    <div class="root-container"
        v-loading.fullscreen="isLoading">
        <header>
            <span>系统注册用户</span>
        </header>
        <main>
            <div class="table-filter">
                <div class="select-container">
                    <maps-tooltip text="删除">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="delete_member">
                            <i class="iconfont maps-icon-trash"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip text="启用">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="allow_member">
                            <i class="iconfont maps-icon-open"></i>
                        </el-button>
                    </maps-tooltip>
                    <maps-tooltip text="禁用">
                        <el-button size="mini"
                            plain
                            class="maps-button-mini"
                            @click="forbidden_member">
                            <i class="iconfont maps-icon-pause"></i>
                        </el-button>
                    </maps-tooltip>

                </div>
                <div class="select-container">
                    <el-select v-model="filter_form.status"
                        placeholder="成员状态"
                        size="mini"
                        filterable
                        style="margin: 0 10px"
                        @change="filter_change">
                        <el-option label="全部状态"
                            value="-1"></el-option>
                        <el-option label="启用"
                            value="1"></el-option>
                        <el-option label="禁用"
                            value="0"></el-option>
                    </el-select>
                    <el-input size="mini"
                        style="width:250px"
                        placeholder="搜索账号名称/ID"
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
                    :data="account_list"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection"
                        :selectable="set_column_select"
                        width="55">
                    </el-table-column>

                    <el-table-column label="状态"
                        width="100"
                        class-name="operate">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.status"
                                :disabled="is_root(scope.row) || Boolean(scope.row.teamname && scope.row.teamid)"
                                active-value="1"
                                inactive-value="0"
                                active-color="#0BB3B3"
                                inactive-color="#C4C4C4"
                                @change="handle_status(scope.row, $event)"></el-switch>
                            <span :style="`display: inline-block;color:${status_map[scope.row.status].color};`">{{status_map[scope.row.status].text}}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作"
                        width="120"
                        class-name="operate">
                        <template slot-scope="scope">
                            <maps-tooltip text="快速登录">
                                <el-button size="mini"
                                    :disabled="is_root(scope.row) || is_forbidden(scope.row)"
                                    type="text"
                                    @click="handle_fast_access(scope.row)">
                                    <i class="iconfont maps-icon-fastAccess"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip text="删除">
                                <el-button size="mini"
                                    :disabled="is_root(scope.row)"
                                    type="text"
                                    @click="handle_delete(scope.row)">
                                    <i class="iconfont maps-icon-trash"></i>
                                </el-button>
                            </maps-tooltip>

                            <maps-tooltip text="团队管理员">
                                <el-button size="mini"
                                    :disabled="Boolean(scope.row.teamname && scope.row.teamid) || is_root(scope.row)  || is_forbidden(scope.row)"
                                    type="text"
                                    @click="handle_team_manager(scope.row)">
                                    <i :style="scope.row.teamname && scope.row.teamid? 'color: #0BB3B3':''"
                                        class="iconfont maps-icon-permission-user"></i>
                                </el-button>
                            </maps-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column class-name="operate"
                        label="用户ID"
                        prop="userid"
                        width="170"></el-table-column>
                    <el-table-column class-name="operate"
                        label="用户名"
                        prop="username"
                        width="150"></el-table-column>
                    <el-table-column class-name="operate"
                        label="真实姓名"
                        prop="truename"
                        width="200"></el-table-column>
                    <el-table-column class-name="operate"
                        label="登录邮箱"
                        prop="email"
                        width="200"></el-table-column>
                    <el-table-column class-name="operate"
                        label="最近一次登录时间"
                        prop="last_logintime"
                        width="160">
                        <template slot-scope="scope">{{scope.row.last_logintime || '--'}}</template>
                    </el-table-column>
                    <el-table-column class-name="operate"
                        label="创建团队"
                        width="180">
                        <template slot-scope="scope">
                            <div class="creare-team"
                                v-if="scope.row.teamname && scope.row.teamid">
                                <span>{{scope.row.teamname}}</span>
                                <span>ID: {{scope.row.teamid}}</span>
                            </div>
                            <div v-else>--</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="已加入团队"
                        width="320"
                        class-name="operate">
                        <template slot-scope="scope">
                            <maps-tooltip :text="scope.row.teamuser"
                                v-if="scope.row.teamuser">
                                <span class="ellipsis-cell"
                                    v-html="scope.row.teamuser"></span>
                            </maps-tooltip>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <!-- 巨量 -->
                    <el-table-column class-name="operate"
                        label="关联巨量引擎账号"
                        width="180">
                        <template slot-scope="scope">
                            <maps-tooltip :text="scope.row.jl"
                                v-if="scope.row.jl">
                                <span class="ellipsis-cell"
                                    v-html="scope.row.jl"></span>
                            </maps-tooltip>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <!-- 微信 -->
                    <el-table-column class-name="operate"
                        label="关联微信广告账号"
                        width="180">
                        <template slot-scope="scope">
                            <maps-tooltip :text="scope.row.wx"
                                v-if="scope.row.wx">
                                <span class="ellipsis-cell"
                                    v-html="scope.row.wx"></span>
                            </maps-tooltip>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <!-- 腾讯 -->
                    <el-table-column class-name="operate"
                        label="关联腾讯广告账号"
                        width="180">
                        <template slot-scope="scope">
                            <maps-tooltip :text="scope.row.tx"
                                v-if="scope.row.tx">
                                <span class="ellipsis-cell"
                                    v-html="scope.row.tx"></span>
                            </maps-tooltip>
                            <span v-else>--</span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <table-empty></table-empty>
                    </template>
                </el-table>
            </div>
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
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "@/services/fetch";
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      status_map: {
        1: {
          text: "启用",
          color: "#0BB3B3",
        },
        0: {
          text: "禁用",
          color: "#333",
        },
      },
      account_ids: "",
      account_list: [],
      multipleSelection: [],
      currentPage: 0,
      pagesize: 10,
      total: 0,
      filter_form: {
        status: "-1",
        word: "",
        page: "1",
        page_size: "10",
      },
      // 快速登录
      team_list: [],
      user_id: "",
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
  },
  methods: {
    ...mapActions("user", ["update_user_message"]),
    ...mapActions("system", ["update_team_info"]),
    ...mapActions("permissions", ["fetch_permission"]),
    ...mapActions("alarm", ["update_alarm_count"]),
    set_column_select(row, index) {
      let state = true;
      if (row.id == 1) {
        state = false;
      }
      return state;
    },
    is_root(row) {
      return row.id == 1;
    },
    is_forbidden(row) {
      return row.status == 0;
    },
    //   获取列表
    async get_account_list() {
      const url = "/user/list";
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.account_list = data.list;
        this.total = data.total;
      }
    },
    filter_change(param, page = "1", page_size = "10") {
      this.filter_form.page = page;
      this.filter_form.page_size = page_size;
      this.get_account_list();
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
    //   批量操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    get_user_ids() {
      let data = [];
      this.multipleSelection.forEach((item) => {
        data.push(item.id);
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
    delete_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: "请先选择用户再进行批量删除操作.",
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      const h = this.$createElement;
      this.$msgbox({
        title: "删除",
        message: h("div", null, [
          h(
            "div",
            { style: "font-size: 16px;color: #333;font-weight: 700" },
            `您确定要删除${this.multipleSelection.length === 1 ? "该用户" : "这些用户"}吗？`
          ),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            "删除后，该用户将无法再登录MAPS系统，但该用户仍可重新注册。如该用户是团队管理员，将删除该用户创建的团队和团队内所有的广告账号数据。"
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const url = "/user/delete";
          const param = {
            ids: this.get_user_ids(),
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    allow_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: "请先选择用户再进行批量启用操作.",
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      this.$confirm(`您确定要启用${this.multipleSelection.length === 1 ? "该用户" : "这些用户"}吗？`, "启用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "1",
            ids: this.get_user_ids(),
          };
          const url = "/user/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    forbidden_member() {
      if (!this.forbidden_batch()) {
        this.$message({
          message: "请先选择团队用户再进行批量禁用操作.",
          duration: 5000,
          offset: 3,
        });
        return false;
      }
      this.$confirm(`您确定要禁用${this.multipleSelection.length === 1 ? "该用户" : "这些用户"}吗？`, "禁用", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const param = {
            status: "0",
            ids: this.get_user_ids(),
          };
          const url = "/user/updateStatus";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    // 表格操作
    async handle_status(row, status) {
      this.$confirm(`您确定要${status === "0" ? "禁用" : "启用"}该成员吗？`, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const url = "/user/updateStatus";
          const param = {
            ids: row.id,
            status: status,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          row.status = status === "1" ? "0" : "1";
        });
    },
    // 一键登录
    handle_fast_access(row) {
      this.$confirm("是否以该用户身份登录MAPS系统？", "快速登录", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.user_id = row.id;
          const url = "/user/quickLogin";
          const param = {
            id: row.id,
          };
          const data = await this.fetchCore(url, param, true);
          if (data) {
            axios.defaults.headers.common.Authorization = data.token;
            axios.defaults.headers.common.lang = this.language;
            this.update_user_message(data);

            this.$router.replace("/user/team");
            // window.location.reload();
          }
        })
        .catch(() => {
          return false;
        });
    },
    async handle_delete(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: "删除",
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, "您确定要删除该用户吗？"),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            `删除后，该用户将无法再以${
              row.email || "--"
            }登录MAPS系统，但该用户仍可重新注册。如该用户是团队管理员，将删除该用户创建的团队和团队内所有的广告账号数据。`
          ),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: "warning",
      })
        .then(async () => {
          const url = "/user/delete";
          const param = {
            ids: row.id,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    async handle_team_manager(row) {
      const h = this.$createElement;
      this.$msgbox({
        title: "设置团队管理员",
        message: h("div", null, [
          h("div", { style: "font-size: 16px;color: #333;font-weight: 700" }, "确认将此用户设置为团队管理员吗？"),
          h(
            "div",
            { style: "font-size: 12px;color: #999" },
            "设置成功后，该用户将可以组建团队，添加成员到团队中，在团队内共享自己绑定的账号数据和智能规则。"
          ),
          h("div", { style: "font-size: 12px;color: #FF3333" }, "当该用户创建团队后，将不可取消其团队管理员身份。"),
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async () => {
          const url = "/team/addmanager";
          const param = {
            user_id: row.id,
            username: row.username,
          };
          const data = await this.fetchCore(url, param, false);
          if (data) {
            this.get_account_list();
          }
        })
        .catch(() => {
          return false;
        });
    },
    init() {
      this.get_account_list();
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
  beforeRouteLeave(to, from, next) {
    if (to.path == "/user/logout" || to.path == "/user/login" || to.path == "/maps/profile") {
      next();
    } else if (to.path == "/user/team") {
      next();
    } else {
      next(false);
    }
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
.root-container {
  .team-table {
    .ellipsis-cell {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
<style lang='scss' scoped>
.root-container {
  padding: 0;
  margin: 20px 10px 0 10px;
  background: #fff;
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
      height: calc(100% - 102px);
      .creare-team {
        display: flex;
        flex-flow: column;
      }
      .app-item {
        float: left;
      }
      .app-item:nth-child(2) {
        margin: 0 10px;
      }
      .team-list {
        max-height: 120px;
      }
    }
    footer {
      text-align: right;
    }
  }
}
</style>