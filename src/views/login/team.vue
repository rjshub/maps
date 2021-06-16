<template>
  <div
    class="team-container"
    v-loading="isLoading"
    element-loading-background="rgba(58,83,147,0.8)"
  >
    <header>
      {{ $t("lang.login_choose_team") }}
      <span
        class="eqiure-handle"
        style="margin-top: 15px"
      >
        {{ $t("lang.public_not_select") }},
        <span @click="to_logout">{{ $t("lang.login_button_logout") }}</span>
      </span>
    </header>
    <main>
      <div
        class="team-list"
        v-if="team_list.length"
      >
        <TeamItem
          v-for="(item, index) in team_list"
          :key="item.id"
          :config="item"
          :style="set_team_margin(index)"
          type="check"
          btn_text="进入"
          @select_one_team="select_one_team"
        ></TeamItem>
        <div
          class="team-item join-other"
          @click="join_other_team"
        >
          <i class="iconfont maps-icon-add"></i>
          <span>{{ $t("lang.login_apply_join_team") }}</span>
        </div>
      </div>
      <div
        class="empty_team"
        @click="join_other_team"
        v-else
      >
        <i class="iconfont maps-icon-add"></i>
        <span>{{ $t("lang.login_apply_join_team") }}</span>
      </div>
    </main>

    <TeamDialog ref="TeamDialog"></TeamDialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import fetch from "@/services/fetch";
import TeamItem from "@/views/public/team-item";
import TeamDialog from "@/views/public/join-team";

export default {
  components: { TeamItem, TeamDialog },
  data() {
    return {
      isLoading: false,
      team_list: [],
    };
  },
  computed: {
    ...mapGetters("user", ["isRoot"]),
    ...mapState("system", ["team_manager", "active_team_id"]),
    ...mapState("user", ["user_id"]),
    ...mapState("permissions", [
      "client_Report_permission",
      "AdSet_Manage_permission",
    ]),
  },
  methods: {
    ...mapActions("system", [
      "update_team_manager",
      "update_team_info",
      "update_active_team_id",
      "update_platform_config",
    ]),
    ...mapActions("permissions", ["fetch_permission"]),
    ...mapActions("alarm", ["update_alarm_count"]),
    ...mapActions("user", ["logout"]),
    // 设置margin
    set_team_margin(index) {
      if ((index + 1) % 3 == 0) {
        return "margin-right: 0";
      } else {
        return "";
      }
    },
    // 退出登录
    to_logout() {
      this.$confirm(
        this.$t("lang.personal_logout_text"),
        this.$t("lang.login_button_logout"),
        {
          confirmButtonText: this.$t("lang.public_button_confirm"),
          cancelButtonText: this.$t("lang.public_button_cancel"),
          type: "warning",
        }
      ).then(() => {
        this.$router.push({
          path: "/user/logout",
        });
      });
    },
    async get_option_list() {
      const url = "/message/enum";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.update_platform_config(data.data.platform);
      }
    },
    async get_team_list() {
      const url = "/team/userteamlist";
      const data = await this.fetchCore(url, "", true);
      if (data) {
        this.team_list = data;
      }
    },
    async get_account_total() {
      const param = {
        team_id: this.active_team_id,
      };
      if (this.team_manager) {
        const url = "/account/getCheckRelationAdvertiser";
        const data = await this.fetchCore(url, param, false);
        if (data) {
          if (data.msg_type == 0) {
            //有数据
            this.$router.replace("/advertising");
          } else {
            this.$router.replace("/system");
          }
        }
      } else {
        if (this.AdSet_Manage_permission != "0") {
          const url = "/account/getCheckRelationAdvertiser";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (data.msg_type == 0) {
              this.$router.replace("/advertising");
            } else {
              this.$router.replace("/system");
            }
          }
        } else {
          const url = "/account/getCheckRelationAdvertiser";
          const data = await this.fetchCore(url, param, false);
          if (data) {
            if (data.msg_type == 0 && this.client_Report_permission != "0") {
              this.$router.replace("/report");
            } else {
              this.$router.replace("/system");
            }
          }
        }
      }
    },
    select_one_team(info) {
      if (info.status == "1") {
        this.update_team_info(info).then(() => {
          const param = {
            team_id: info.id,
            user_id: this.user_id,
          };
          this.update_alarm_count();
          this.fetch_permission(param).then(() => {
            this.get_account_total();
          });
        });
      } else {
        this.$message({
          message: `${this.$t("lang.login_can_not_select_team")}${
            info.truename
          }！`,
          duration: 5000,
          offset: 3,
        });
      }
    },
    join_other_team() {
      this.$refs.TeamDialog.show();
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
    if (this.active_team_id == "") {
      if (to.path == "/user/login") {
        next();
      } else if (to.path == "/user/logout") {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  mounted() {
    this.get_team_list(); // 用户已经在的团队
    this.get_option_list();
  },
};
</script>
<style lang="scss">
.team-container {
  .join-team-btn {
    width: unset;
    height: unset;
    padding: 8px 10px;
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
</style>
<style lang='scss' scoped>
.team-container {
  // max-width: 55%;
  // max-width: 684px;
  // max-width: 720px;
  // height: 58%;
  header {
    color: #ffffff;
    font-size: 30px;
    text-align: center;
    // margin-bottom: 35px;
    margin-bottom: 1.4rem;
  }
  main {
    width: 710px;
    // max-height: 414px;
    height: 16.97rem;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  .team-list {
    max-width: 684px;
    min-height: 140px;
    display: flex;
    flex-wrap: wrap;
    .join-other {
      width: 196px;
      height: 96px;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
      margin: 0 0 20px 0;
      padding: 10px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;
      color: #97b4d7;
      cursor: pointer;
      i {
        font-size: 28px;
      }
      span {
        font-size: 12px;
        line-height: 24px;
        margin-top: 5px;
      }
    }
  }
  .empty_team {
    width: 374px;
    height: 200px;
    background: rgba(11, 179, 179, 0.1);
    border: 1px dashed #0bb3b3;
    border-radius: 3px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: rgba(11, 179, 179, 1);
    font-size: 12px;
    line-height: 24px;
    i {
      font-size: 28px;
    }
  }
}
</style>