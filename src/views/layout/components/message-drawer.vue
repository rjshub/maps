<template>
  <el-drawer
    :visible.sync="drawer"
    v-loading="alarm_loading"
    direction="rtl"
    size="50%"
    custom-class="message-drawer-container"
    :close-on-press-escape="false"
    :show-close="false"
    :wrapperClosable="false"
    :destroy-on-close="true"
  >
    <section class="drawer-header">
      <div class="back" @click="close_drawer">
        <i class="iconfont maps-icon-right"></i>
      </div>

      <div class="right-btn">
        <span>{{ $t("lang.message_Notice_board_tittle") }}</span>
        <!-- {{$t('lang.message_subscribe_title')}} -->
        <maps-tooltip :text="$t('lang.layout_system_message_subscribe_nav')">
          <span @click="to_alert_setting" style="cursor: pointer">
            <i class="iconfont maps-icon-setting"></i
          ></span>
        </maps-tooltip>
      </div>
    </section>
    <section class="drawer-main">
      <header>
        <el-tabs
          v-model="alarm_active_name"
          style="background-color: #f6f6f6"
          @tab-click="handle_choose_alarm_type"
        >
          <el-tab-pane label="广告智投消息" name="3"></el-tab-pane>
          <el-tab-pane
            :label="$t('lang.message_System_Notifications')"
            name="1"
          ></el-tab-pane>
          <el-tab-pane
            :label="$t('lang.message_Application_Notifications')"
            name="2"
          ></el-tab-pane>
        </el-tabs>
        <!-- 智投和系统消息支持全部设置已读 -->
        <el-button
          type="text"
          v-if="alarm_active_name !== '2'"
          @click="handle_read_all"
        >
          <i class="iconfont maps-icon-bell-new" style="margin-right: 5px"></i
          >{{ $t("lang.message_Mark_All_as_Read") }}
        </el-button>
      </header>

      <main ref="scrollMain">
        <ul class="lmy_list" v-if="alarm_list.length">
          <!-- 智投和申请支持消息点击事件 -->
          <li
            v-for="(alarm_item, index) in alarm_list"
            :key="alarm_item.id"
            :class="set_log_class(index)"
            :style="alarm_active_name != '1' ? 'cursor: pointer' : ''"
            @click="handle_apply_message(alarm_item)"
          >
            <div class="alarm-icon">
              <maps-tooltip :text="status_map[alarm_item.status].text">
                <i class="iconfont maps-icon-bell"></i>
              </maps-tooltip>
            </div>
            <div class="alarm-message">
              <span v-html="alarm_item.msg"></span>
              <div class="alarm-handle">
                <div class="alarm-handle-box">
                  <!-- 智投和全部支持标为已读 -->
                  <el-button
                    type="text"
                    v-if="alarm_item.status == '0' && alarm_active_name != '2'"
                    @click.stop="handle_read_alarm(alarm_item.id)"
                    >{{ $t("lang.message_Mark_as_Read") }}</el-button
                  >
                </div>
                <span>{{ alarm_item.ctime }}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="list-empty" v-else>
          <i class="iconfont maps-icon-nodata"></i>
          <span>{{ $t("lang.public_no_data") }}</span>
        </div>
      </main>

      <footer>
        <el-button type="text" @click="to_all_alarm"
          >{{ $t("lang.public_See_All") }} >></el-button
        >
      </footer>
    </section>
    <PermissionApply
      ref="PermissionApply"
      @applyed="apply_finish"
    ></PermissionApply>
    <JoinTeamApply ref="JoinTeamApply" @applyed="apply_finish"></JoinTeamApply>
    <PushDetail ref="PushDetail"></PushDetail>
    <SynaFailDetail ref="SynaFailDetail"></SynaFailDetail>
  </el-drawer>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import fetch from "@/services/fetch";
import PermissionApply from "@/views/system/components/permission-apply";
import JoinTeamApply from "@/views/system/components/join-team-apply";
import PushDetail from "@/views/system/components/push-detail";
import SynaFailDetail from "@/views/system/components/sync-fail";

export default {
  components: { PermissionApply, JoinTeamApply, PushDetail, SynaFailDetail },
  data () {
    return {
      drawer: false,
      alarm_loading: false,
      alarm_active_name: "3", // 3->广告智投,1->系统,2->申请、审批
      alarm_list: [],
      status_map: {
        0: {
          // 未读
          color: "#0BB3B3",
          weight: "700",
          text: this.$t("lang.public_unread")
        },
        1: {
          color: "#999",
          weight: "400",
          text: this.$t("lang.public_read")
        }
      },
      page: 1,
      refScroll: null
    };
  },
  watch: {
    drawer (val) {
      if (!val) {
        this.alarm_active_name = "3";
      }
    }
  },
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("alarm", ["alarm_count"])
  },
  methods: {
    ...mapActions("alarm", ["update_alarm_count"]),
    show () {
      this.drawer = true;
      this.alarm_list = []
      this.get_alarm_list();
      this.$nextTick(() => {
        this.refScroll = this.$refs.scrollMain;
        this.refScroll.addEventListener("scroll", this.onScroll);
      });
    },
    close_drawer () {
      this.drawer = false;
      removeEventListener("scroll", this.onScroll);
    },
    // 跳转消息管理
    to_alert_setting () {
      this.drawer = false;
      this.$router.push({ path: "/system/message/subscribe" });
    },
    // 设置列表斑马纹
    set_log_class (index) {
      let read_status = "is-unread";
      if (this.alarm_list[index].status == "0") {
        read_status = "is-unread";
      } else {
        read_status = "is-read";
      }
      if (index === 0) {
        return `light-item ${read_status}`;
      } else if (index === 1) {
        return `dark-item ${read_status}`;
      } else {
        if (index % 2 === 0) {
          return `light-item ${read_status}`;
        } else {
          return `dark-item ${read_status}`;
        }
      }
    },
    // 获取消息列表
    async get_alarm_list () {
      const url = "/message/popList";
      const param = {
        team_id: this.active_team_id,
        msg_type: this.alarm_active_name,
        page: this.page
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.alarm_list = this.alarm_list.concat(data.list);
      }
    },
    handle_choose_alarm_type () {
      this.alarm_list = [];
      this.page = 1;
      this.get_alarm_list();
    },

    // 全部已读
    handle_read_all () {
      const param = {
        team_id: this.active_team_id,
        msg_type: this.alarm_active_name,
        ids: ""
      };
      this.update_alarm_status(param);
    },
    handle_read_alarm (id) {
      const param = {
        team_id: this.active_team_id,
        msg_type: this.alarm_active_name,
        ids: id
      };
      this.update_alarm_status(param);
    },
    async update_alarm_status (param) {
      const url = "/message/setRead";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.alarm_list = []
        this.update_alarm_count();
        this.get_alarm_list();
      }
    },
    // 处理申请类消息
    handle_apply_message (param) {
      if (this.alarm_active_name == "2") {
        this.drawer = false;
        if (param.type == "1") {
          this.$refs.JoinTeamApply.show(param);
        } else if (param.type == "4") {
          this.$refs.PermissionApply.show(param);
        }
      } else if (this.alarm_active_name == "1") {
        // 同步失败消息
        if (row.type == "6") {
          this.$refs.SynaFailDetail.show(param.id);
        }
      } else if (this.alarm_active_name == "3") {
        this.handle_read_alarm(param.id);

        if (param.type == "7") {
          // 查看推送详情
          this.$refs.PushDetail.show(param.id);
        } else {
          // 跳转广告智投-巨量
          const origin = window.origin;
          const url = origin + "/china/#/advertising/manage/jl";
          window.open(url);
        }
      }
    },
    apply_finish (id) {
      this.handle_read_alarm(id);
    },
    // 查看全部
    to_all_alarm () {
      this.drawer = false;
      // this.$router.push({ path: "/system/message/All", query: { type: this.alarm_active_name } });
      this.$router.push({
        name: "AllIndex",
        params: { type: this.alarm_active_name }
      });
    },
    async fetchCore (url, data, hasLoading = true) {
      hasLoading && (this.alarm_loading = true);
      try {
        const _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        return false;
      } finally {
        hasLoading && (this.alarm_loading = false);
      }
    },
    onScroll () {
      if (this.getScrollTop() + this.getClientHeight() === this.getScrollHeight() && this.getScrollTop() > 0) {
        this.page += 1;
        this.get_alarm_list()
      }
    },
    getScrollTop () {
      return this.refScroll.scrollTop;
    },
    getClientHeight () {
      return this.refScroll.clientHeight;
    },
    getScrollHeight () {
      return this.refScroll.scrollHeight;
    }
  },
  mounted () {}
};
</script>
<style lang="scss">
.message-drawer-container {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    // height: calc(100% - 40px);
    height: 100%;
    flex: unset;
    .drawer-main {
      header {
        .el-tabs {
          background: #fff !important;
          border-bottom: 1px solid #eeeeee;
          // .el-tabs__item {
          // font-weight: 700;
          // }
        }
      }
      main {
        ul {
          .el-button {
            padding: 0;
          }
          .is-read {
            .el-button {
              font-weight: 400;
            }
          }
          .is-unread {
            .el-button {
              font-weight: bold;
            }
          }
          .alarm-handle-box {
            .el-button {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.message-drawer-container {
  .drawer-header {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
        font-size: 12px;
      }
    }
    .back:hover {
      background-color: #0bb3b3;
      color: #fff;
    }
    .right-btn {
      flex: 1;
      padding-right: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .drawer-main {
    height: calc(100% - 44px);
    padding: 0 20px;
    header {
      height: 40px;
      position: relative;
      .el-button {
        position: absolute;
        right: 20px;
        top: 0;
      }
    }
    main {
      height: calc(100% - 100px);
      overflow-y: auto;
      ul {
        li {
          padding: 15px 20px;
          display: flex;
          justify-content: flex-start;
          color: #333;
          .alarm-icon {
            padding: 0 20px 0 0;
            display: flex;
            align-items: center;
            i {
              font-size: 24px;
            }
          }
          .alarm-message {
            width: calc(100% - 44px);
            span {
              color: #333;
              text-align: justify;
              text-overflow: ellipsis;
              text-overflow: -o-ellipsis-lastline;
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .alarm-handle {
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
              & > span {
                color: #333;
              }
            }
          }
        }
        .is-read {
          color: #999999;
          font-weight: 400;
        }
        .is-unread {
          color: #0bb3b3;
          font-weight: bold;
        }
        .light-item {
          background: #fff;
        }
        .dark-item {
          background: #f1f1f1;
        }
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
          color: #333;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    footer {
      height: 60px;
      border-top: 1px solid #dddddd;
      padding: 0 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>