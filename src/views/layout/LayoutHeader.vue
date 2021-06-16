<template>
  <div
    class="g__header_wrap"
    v-loading.fullscreen="isLoading"
    :element-loading-text="loading_text"
  >
    <div class="g__header">
      <div class="logo-zone">
        <div class="logo-zone__item">
          <img :src="logo_path" />
        </div>
      </div>
      <nav-head />
      <div class="alarm-help-zone">
        <div
          class="zone-item"
          v-if="!isRoot"
        >
          <maps-tooltip :text="$t('lang.personal_Notice_board')">
            <el-badge
              :value="alarm_count"
              :max="99"
              :hidden="!Boolean(Number(alarm_count))"
            >
              <i
                class="iconfont maps-icon-bell"
                @click="handle_alarm"
              ></i>
            </el-badge>
          </maps-tooltip>
        </div>

        <div class="zone-item">
          <maps-tooltip :text="$t('lang.personal_Help_Center')">
            <i
              class="iconfont maps-icon-help"
              @click="handle_help"
            ></i>
          </maps-tooltip>
        </div>
      </div>

      <div class="info-zone">
        <div class="info-zone__item">
          <el-dropdown
            trigger="click"
            @visible-change="info_dropdown_visible"
          >
            <div class="el-dropdown-link">

              <div class="capsule">
                <span class="user_name">Hi,{{user_name}}</span>
                <maps-tooltip :text="$t('lang.personal_Personal')">
                  <div class="user-img-box">
                    <i class="iconfont maps-icon-material"></i>
                  </div>
                </maps-tooltip>

              </div>

            </div>
            <el-dropdown-menu
              slot="dropdown"
              class="profile-dropdown"
            >
              <el-dropdown-item style="cursor: default">
                <div class="user-profile">
                  <div class="left">
                    <div>{{user_fullName}}
                      <span> (ID:{{user_show_id}})</span>
                    </div>
                    <span>{{user_email}}</span>
                  </div>
                  <div
                    class="right"
                    @click="personInfo"
                  >
                    <i class="iconfont maps-icon-arrow-circle-right"></i>
                  </div>
                </div>
              </el-dropdown-item>
              <div class="join_in_team">
                <span style="color:#EEEEEE">—— </span>{{$t('lang.personal_your_team')}}<span style="color:#EEEEEE"> ——————————</span>
                <span @click="apply_join_team"> + {{$t('lang.public_button_join_team')}}</span>
              </div>
              <div
                v-if="!team_list.length"
                style="height: 80px"
                v-loading="team_list_loading"
              ></div>
              <el-dropdown-item
                v-for="item in team_list"
                :key="item.id"
              >
                <div
                  class="user-team"
                  :class="item.id === active_team_id? 'team-active':''"
                  @click="check_other_team(item)"
                >
                  <div class="left">
                    <div>
                      <i
                        v-if="item.is_manager === '1'"
                        class="iconfont maps-icon-favourite"
                      ></i>
                      <i
                        v-else
                        style="display: inline-block;width: 16px"
                      ></i>
                      <span>{{item.name}}</span>
                    </div>
                    <span style="padding-left: 21px">{{item.teamid}}</span>
                  </div>
                  <div class="right">
                    <i class="iconfont maps-icon-tick"></i>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handle_logout"
                style="text-align: center;border-top: 1px solid #EEEEEE"
              >{{$t('lang.login_button_logout')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <TeamDialog ref="TeamDialog"></TeamDialog>
    <MessageDrawer ref="MessageDrawer"></MessageDrawer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import fetch from "@/services/fetch";
import navHead from "./NavHead";
import TeamDialog from "@/views/public/join-team";
import MessageDrawer from "./components/message-drawer";
import logo from "@/assets/image/maps.svg";

export default {
  name: "LayoutHeader",
  components: {
    navHead,
    TeamDialog,
    MessageDrawer,
  },
  data() {
    return {
      logo_path: logo,
      isLoading: false,
      team_list_loading: false,
      loading_text: "",
      localAgent: "",
      localAgent_tem: "",
      path: "",
      isShowHelpDialog: false,
      // 团队列表
      team_list: [],
    };
  },
  created() {
    this.path = this.$route.path;
  },
  mounted() {},
  watch: {},
  computed: {
    ...mapState("user", [
      "user_name",
      "user_fullName",
      "user_id",
      "user_email",
      "user_show_id",
    ]),
    ...mapState("alarm", ["alarm_count"]),
    ...mapState("system", ["active_team_id", "team_manager"]),
    ...mapGetters("user", ["isRoot"]),
    ...mapState("permissions", [
      "AdSet_Manage_permission",
      "client_Report_permission",
    ]),
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
    ]),
  },
  methods: {
    ...mapActions("user", ["logout"]),
    ...mapActions("alarm", ["update_alarm_count"]),
    ...mapActions("system", ["update_team_info"]),
    ...mapActions("permissions", ["fetch_permission"]),
    personInfo() {
      this.$router.replace("/maps/profile");
    },
    handle_logout() {
      this.$confirm(
        this.$t("lang.personal_logout_text"),
        this.$t("lang.login_button_logout"),
        {
          confirmButtonText: this.$t("lang.public_button_confirm"),
          cancelButtonText: this.$t("lang.public_button_cancel"),
          type: "warning",
        }
      ).then(() => {
        this.remove_edit();
        this.logout().then((res) => {
          this.$router.push({
            path: "/user/logout",
          });
          localStorage.setItem("isExpires", "0");
        });
      });
    },
    async remove_edit() {
      // 清空编辑
      if (
        this.$route.meta.nav == "/advertising" &&
        (this.manage_campaign_handle == "edit" ||
          this.manage_ad_handle == "edit")
      ) {
        const url = "/user/removestatus";
        const param = {
          team_id: this.active_team_id,
        };
        await this.fetchCore(url, param, false);
      }
    },
    handle_help() {
      // const url = "/china/download/video/MAPS操作说明视频.zip";
      // this.$downloadFile(url);
      this.$router.push({ path: "/maps/help" });
    },
    // 告警
    handle_alarm() {
      this.update_alarm_count();
      this.$refs.MessageDrawer.show();
    },
    // 个人信息，团队
    info_dropdown_visible(visible) {
      if (visible) {
        this.get_team_list();
      }
    },
    // 获取已加入的团队
    async get_team_list() {
      this.team_list_loading = true;

      const url = "/team/userteamlist";
      const data = await this.fetchCore(url, "", true);
      if (data) {
        this.team_list = data;
        this.team_list_loading = false;
      } else {
        this.team_list_loading = false;
      }
    },
    // 申请加入团队
    apply_join_team() {
      this.$refs.TeamDialog.show();
    },
    // 切换团队
    check_other_team(info) {
      const self = this;
      this.update_team_info(info).then(() => {
        const param = {
          team_id: info.id,
          user_id: this.user_id,
        };
        this.loading_text =
          this.$t("lang.personal_check_team") +
          info.name +
          this.$t("lang.personal_check_team_point");
        this.isLoading = true;
        this.update_alarm_count();
        this.fetch_permission(param).then(async () => {
          // if (this.AdSet_Manage_permission != 0) {
          //   this.$router.replace("/advertising/manage/jl");
          // } else {
          //   this.$router.replace("/system/account");
          // }
          if (this.team_manager) {
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
          this.isLoading = false;
        });
      });
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        return false;
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },

  mounted() {},
};
</script>
<style lang="scss">
.profile-dropdown {
  max-height: 450px;
  overflow-y: auto;
  .el-dropdown-menu__item {
    width: 270px;
    .user-profile,
    .user-team {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .left {
        line-height: 18px;
        font-size: 14px;
        color: #333;
        display: flex;
        flex-flow: column;
        & > div {
          display: flex;

          i {
            color: #0bb3b3;
          }
          span {
            display: inline-block;
            flex: 1;
            word-break: break-word;
          }
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #666;
          // padding-left: 21px;
        }
      }
      .right {
        cursor: pointer;
        i {
          font-size: 16px;
          display: none;
        }
      }
    }
    .user-profile {
      .right {
        i {
          color: #d4d4d4;
          font-size: 24px;
          display: block;
        }
        i:hover {
          color: #0bb3b3;
        }
      }
    }
    .team-active {
      .left {
        span {
          color: #0bb3b3;
        }
        span:nth-child(2) {
          color: #0bb3b3;
        }
      }
      .right {
        i {
          display: inline-block;
          color: #0bb3b3;
        }
      }
    }
  }
  /* popover弹框 */
  .el-dropdown-menu__item:hover {
    background: #f2f2f2;
  }
  .join_in_team {
    font-size: 12px;
    color: #666666;
    span {
      color: #0bb3b3;
      cursor: pointer;
    }
  }
}
</style>
<style scoped lang="scss">
.logo-zone {
  width: 190px;
  height: 100%;
  float: left;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .logo-zone__item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 80%;
      // height: 100%;
    }
  }
}

.info-zone {
  height: 100%;
  float: right;
  display: flex;
  align-items: center;
  .info-zone__item {
    height: 24px;
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;
    padding: 0 15px;

    .capsule {
      color: #97b4d7;
      font-size: 20px;
      height: 24px;
      position: relative;
      line-height: 24px;
      padding-left: 9px;
      padding-right: 26px;
      text-align: center;
      .user-img-box {
        width: 32px;
        height: 32px;
        margin-left: -13px;
        position: absolute;
        top: 0;
        right: 0;
        i {
          font-size: 24px;
        }
      }
      .user_name {
        font-size: 18px;
        padding: 0 10px;
        max-width: 100px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .capsule:hover .user-img-box i {
      opacity: 0.8;
    }
  }
}
.alarm-help-zone {
  height: 100%;
  float: right;
  margin-right: 5px;
  display: flex;
  align-items: center;
  .zone-item {
    height: 24px;
    padding: 0 15px;
    border-left: 1px solid rgba(0, 0, 0, 0.3);
    i {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      color: #97b4d7;
      font-size: 24px;
      cursor: pointer;
      opacity: 0.8;
    }
  }
}
.alarm-help-zone i:hover {
  opacity: 1;
}
</style>
