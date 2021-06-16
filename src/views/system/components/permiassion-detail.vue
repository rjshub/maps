<template>
    <el-drawer :visible.sync="drawer"
        direction="rtl"
        size="50%"
        custom-class="permission-drawer-container"
        :close-on-press-escape="false"
        :show-close="false"
        :wrapperClosable="false"
        :destroy-on-close="true"
        v-loading="dialog_row_loading">
        <section class="drawer-header">
            <div class="back"
                @click="close_drawer">
                <i class="iconfont maps-icon-right"></i>
            </div>
            <span>{{$t('lang.account_permission_title')}}</span>
        </section>
        <section class="drawer-main">
            <span class="drawer-point"
                v-if="!team_manager">
                <i class="iconfont maps-icon-permission"></i>
                {{$t('lang.team_permission_point')}}</span>
            <!-- 平台列表 -->
            <section class="user-apps">
                <div v-for="item in app_list"
                    :key="item.id"
                    class="app-item">
                    <span>
                        <platform-icon :platform="item.platform" :tooltip="false"></platform-icon> {{item.name}}
                    </span>
                    <div v-for="child in item.list"
                        :key="child.id"
                        class="ad-item">
                        {{child.media_advertiser_name}}(ID: {{child.media_advertiser_id}})
                    </div>
                </div>
            </section>
            <!-- 模块列表 -->
            <section class="module_table">
                <div class="module-title">
                    <span>{{$t('lang.public_parent_module')}}</span>
                    <span :style="`width: ${language == 'zh'? '170px':'220px'}`">{{$t('lang.public_child_module')}}</span>
                    <span>{{$t('lang.public_permission')}}</span>
                </div>
                <div class="module-item"
                    v-for="(item, index) in module_list"
                    :key="index">
                    <div class="parent">{{item.name}}</div>
                    <div class="child">
                        <div class="child-item"
                            v-for="child in item.children"
                            :key="child.id">
                            <span class="child-title"
                                :style="`width: ${language == 'zh'? '170px':'220px'}`">{{child.name}}</span>
                            <span class="child-permission">{{child.handle}}
                                <maps-tooltip :text="child.explain"
                                    align="left"
                                    v-if="child.permission === '2'">
                                    <i class="iconfont maps-icon-info"></i>
                                </maps-tooltip>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="expire">
                <span>{{expire_time}}</span>
                <span v-if="Custom"
                    style="color: #ff0000">{{$t('lang.account_limit_expired')}}</span>
            </section>
        </section>

    </el-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      drawer: false,
      dialog_row_loading: false,
      user_id: "",
      app_list: [],
      module_list: [],
      Custom: false,
      expire_time: "",
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id", "platform_config", "team_manager"]),
    ...mapState("user", ["language"]),
  },
  methods: {
    async show(row, type = "team") {
      this.drawer = true;
      await this.get_auth_config();
      if (type === "team") {
        this.user_id = row.user_id;
        await this.get_team_permission_info();
      } else {
        this.format_module_list(row.auth);
      }

      if (row.datestatus === "0") {
        this.Custom = true;
        this.expire_time = `${this.$t("lang.account_Accessible_time")}：${row.startdate + this.$t("lang.public_range_separator") + row.enddate}`;
      } else {
        if (row.startdate && row.enddate) {
          this.Custom = true;
          this.expire_time = `${this.$t("lang.account_Accessible_time")}：${row.startdate + this.$t("lang.public_range_separator") + row.enddate}`;
        } else {
          this.Custom = false;
        }
      }
    },
    close_drawer() {
      this.drawer = false;
      this.Custom = false;
      this.expire_time = "";
    },
    // 斑马纹
    set_stripe(index) {
      if (index === 0) {
        return "light-item";
      } else if (index === 1) {
        return "dark-item";
      } else {
        if (index % 2 === 0) {
          return "light-item";
        } else {
          return "dark-item";
        }
      }
    },
    // 获取权限配置
    async get_auth_config() {
      const url = "/team/menuselectedlist";
      const data = await this.fetchCore(url, "", false);

      if (data) {
        if (data.hasOwnProperty("menulist") && data.menulist.length) {
          let module = [];
          data.menulist.forEach((item) => {
            const param = {
              name: item[`name_${this.language}`],
              children: [],
            };
            item.children.forEach((child) => {
              const tmp_child = {
                id: child.id,
                name: child[`name_${this.language}`],
                explain: child[`explain_${this.language}`],
                parent_id: child.parent_id,
                permission: "1",
                handle: this.$t("lang.public_show_permission"),
              };
              // 报表订阅，id为6
              if (child.id == "6") {
                tmp_child.handle = this.$t("lang.public_Invisible");
              }
              param.children.push(tmp_child);
            });
            module.push(param);
          });
          this.module_list = module;
        }
      }
    },
    async get_team_permission_info() {
      const url = "/team/teamuserauth";
      const param = {
        team_id: this.active_team_id,
        user_id: this.user_id,
      };
      const data = await this.fetchCore(url, param, true);

      if (data) {
        this.format_app_list(data.advertiserlist || []);
        this.format_module_list(data.auth || []);
      }
    },
    format_app_list(arr) {
      const tmp = {
        jl: 1,
        tx: 2,
        wx: 3,
      };
      if (arr.length) {
        arr.map((item) => {
          item.platform = tmp[item.name_code];
        });
        this.app_list = arr;
      } else {
        this.app_list = [];
      }
    },
    format_module_list(arr) {
      if (arr.length) {
        arr.map((item) => {
          const ID = Object.keys(item)[0];
          this.module_list.forEach((parent) => {
            parent.children.forEach((child) => {
              if (child.id == ID) {
                if (item[ID] == "1") {
                  child.permission = "1";
                  if (child.id == "6") {
                    child.handle = this.$t("lang.public_disable");
                  } else {
                    child.handle = this.$t("lang.public_show_permission");
                  }
                } else if (item[ID] == "2") {
                  child.permission = "2";
                  if (child.id == "6") {
                    child.handle = this.$t("lang.public_enable");
                  } else {
                    child.handle = this.$t("lang.public_edit_permission");
                  }
                } else if (item[ID] == "0") {
                  child.handle = this.$t("lang.public_disable");
                }
              }
            });
          });
        });
      }
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
.permission-drawer-container {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    height: calc(100% - 40px);
  }
  .module_table {
    .el-table {
      .el-table__body-wrapper {
        .module_name {
          font-weight: 700;
        }
      }
    }
  }
  //
}
</style>
<style lang='scss' scoped>
.permission-drawer-container {
  .drawer-header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .back {
      height: 24px;
      width: 35px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      margin-right: 20px;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 14px;
      }
    }
    .back:hover {
      background-color: #0bb3b3;
      color: #fff;
    }
  }
  .drawer-main {
    height: calc(100% - 54px);
    overflow-y: auto;
  }

  .drawer-point {
    display: inline-block;
    padding: 0 20px;
    margin-bottom: 15px;
    font-size: 14px;
    color: #333;
    line-height: 24px;
  }
  .user-apps {
    padding: 0 20px;
    .app-item {
      margin-bottom: 20px;
      & > span {
        display: inline-block;
        margin-bottom: 15px;
        font-size: 14px;
        color: #666666;
        img {
          float: left;
          margin-right: 15px;
        }
      }
    }
    .ad-item {
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;
    }
  }
  .module_table {
    border: 1px solid #e4e4e4;
    margin: 0 20px;
    margin-top: 40px;
    .module-title {
      height: 40px;
      border-bottom: 1px solid #e4e4e4;
      background: #f1f1f1;
      font-size: 14px;
      color: #333;
      font-weight: 700;
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        height: 100%;
        border-right: 1px solid #e4e4e4;
        line-height: 40px;
        text-align: center;
        width: 120px;
      }
      span:nth-child(3) {
        padding-left: 20px;
        text-align: left;
        border-right-width: 0;
      }
    }
    .dark-item {
      width: 100%;
      background: #f1f1f1;
    }
    .light-item {
      width: 100%;
      background: #fff;
    }
    .module-item {
      display: flex;
      // border-bottom: 1px solid #ccc;
      .parent {
        height: auto;
        width: 120px;
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        font-size: 12px;
        font-weight: 700;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .child {
        flex: 1;
        .child-item {
          height: 40px;
          border-bottom: 1px solid #e4e4e4;
          display: flex;
          align-items: center;
          font-size: 12px;
          line-height: 40px;
          color: #333;
          .child-title {
            display: inline-block;
            width: 120px;
            height: 100%;
            border-right: 1px solid #e4e4e4;
            font-weight: 700;
            text-align: center;
          }
          .child-permission {
            flex: 1;
            // border-bottom: 1px solid #e4e4e4;
            height: 100%;
            padding-left: 20px;
          }
        }
        i {
          font-size: 14px;
          color: #999;
          margin-left: 10px;
        }
      }
    }
    .module-item:last-child {
      .parent {
        border-bottom-width: 0;
      }
      .child {
        .child-item {
          border-bottom-width: 0;
        }
      }
    }
  }
  .expire {
    padding: 0 20px;
    margin-top: 15px;
    span {
      display: inline-block;
      width: 100%;
      font-size: 14px;
      color: #333;
      line-height: 24px;
    }
  }
}
</style>