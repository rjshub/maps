<template>
  <div
    class="ad-empty"
    v-if="is_empty"
  >
    <div class="list-empty">
      <i class="iconfont maps-icon-nodata"></i>
      <span>暂无广告智投数据</span>
      <span>{{empty_text}}</span>
    </div>
  </div>
  <div
    class="ad-jl-container"
    v-else
  >
    <header>
      <el-tabs
        :key="jl_tab"
        v-model="activeName"
        :stretch="true"
        @tab-click="handle_click_tab"
      >
        <el-tab-pane
          name="account"
          :lazy="true"
        >
          <template slot="label">
            <span>账号</span>
            <el-tag
              size="mini"
              v-if="checked_account.length"
              @close="close_tag('account')"
              :closable="true"
            >选中{{ checked_account.length }}项</el-tag>
          </template>
        </el-tab-pane>
        <el-tab-pane
          name="campaign"
          :lazy="true"
        >
          <template slot="label">
            <span>广告组</span>
            <el-tag
              size="mini"
              v-if="checked_campaign.length"
              @close="close_tag('campaign')"
              :closable="true"
            >选中{{ checked_campaign.length }}项</el-tag>
          </template>
        </el-tab-pane>
        <el-tab-pane name="ad">
          <template slot="label">
            <span>计划</span>
            <el-tag
              size="mini"
              v-if="checked_ad.length"
              @close="close_tag('ad')"
              :closable="true"
            >选中{{ checked_ad.length }}项</el-tag>
          </template>
        </el-tab-pane>
        <el-tab-pane name="creative">
          <template slot="label">
            <span>创意</span>
            <el-tag
              size="mini"
              v-if="checked_creative.length"
              @close="close_tag('creative')"
              :closable="true"
            >选中{{ checked_creative.length }}项</el-tag>
          </template>
        </el-tab-pane>
      </el-tabs>

      <div class="select-container">
        <maps-tooltip
          text="手动同步按钮。请您尽量在MAPS系统修改广告配置。如果您先在巨量引擎中修改了内容，请点击手动同步。同步完成后再在MAPS中修改。"
          align="left"
          v-if="
              (active_tab == 'campaign' && manage_campaign_handle == 'edit') ||
              (active_tab == 'ad' && manage_ad_handle == 'edit')
            "
        >
          <el-button
            size="mini"
            :disabled="is_syncing || check_permission.state"
            style="margin-right: 10px"
            @click="handle_sync_data"
          >
            <!-- <maps-tooltip :text="is_syncing? '系统正在同步最新的广告数据，请稍后':''"> -->
            <maps-tooltip :text="check_permission.state? check_permission.text:is_syncing? '系统正在同步最新的广告数据，请稍后':''">
              <i
                class="iconfont maps-icon-sync"
                :class="is_syncing? 'sync_active':''"
              ></i>
            </maps-tooltip>
          </el-button>
        </maps-tooltip>
        <el-date-picker
          v-model="date_list"
          size="mini"
          type="daterange"
          align="right"
          :clearable="false"
          unlink-panels
          :range-separator="$t('lang.public_range_separator')"
          :start-placeholder="$t('lang.public_start_time')"
          :end-placeholder="$t('lang.public_end_time')"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="date_change"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </div>
    </header>
    <main>
      <component
        :is="activeNav"
        :date="date_list"
        ref="jl_manage"
        @isEmpty="adversiting_is_empty"
      ></component>
    </main>
    <SyncPoint
      ref="SyncPoint"
      @syncFail="has_sync_fail"
      :is_hand="true"
    ></SyncPoint>
    <SyncFailPoint ref="SyncFailPoint"></SyncFailPoint>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import moment from "moment";
import AccountIndex from "./account";
import CampaignIndex from "./campaign";
import AdIndex from "./ad";
import CreativeIndex from "./creative";
import SyncPoint from "./components/sync-point";
import SyncFailPoint from "./components/sync-fail-table";

export default {
  components: {
    AccountIndex,
    CampaignIndex,
    AdIndex,
    CreativeIndex,
    SyncPoint,
    SyncFailPoint,
  },
  data() {
    return {
      jl_tab: 0,
      activeName: "account",
      date_list: [
        moment(new Date().getTime()).format("YYYY-MM-DD"),
        moment(new Date().getTime()).format("YYYY-MM-DD"),
      ],
      pickerMinDate: null,
      pickerOptions: {
        shortcuts: this.$datePickerShortcuts_2,
        onPick: (obj) => {
          if (!obj.maxDate) {
            this.pickerMinDate = new Date(obj.minDate).getTime();
          }
        },
        disabledDate: (time) => {
          if (this.pickerMinDate) {
            const day1 = 365 * 24 * 3600 * 1000;
            let maxTime = this.pickerMinDate + day1;
            let minTime = this.pickerMinDate - day1;
            return time.getTime() > Date.now() || time.getTime() > maxTime || time.getTime() < minTime;
          } else {
            return time.getTime() > Date.now();
          }
        },
      },
      is_empty: false,
      empty_text: "",
    };
  },
  watch: {
    checked_account() {
      if (this.active_tab == "account") {
        this.jl_tab++;
      }
    },
    checked_campaign() {
      if (this.active_tab == "campaign") {
        this.jl_tab++;
      }
    },
    checked_ad() {
      if (this.active_tab == "ad") {
        this.jl_tab++;
      }
    },
    checked_creative() {
      if (this.active_tab == "creative") {
        this.jl_tab++;
      }
    },
  },
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "checked_account",
      "checked_campaign",
      "checked_ad",
      "checked_creative",
      "manage_campaign_handle",
      "manage_ad_handle",
      "is_syncing",
    ]),
    ...mapState("system", ["active_team_id"]),
    ...mapState("permissions", ["AdSet_Manage_permission"]),
    activeNav() {
      const maps = {
        account: "AccountIndex",
        campaign: "CampaignIndex",
        ad: "AdIndex",
        creative: "CreativeIndex",
      };

      return maps[this.activeName];
    },
    check_permission() {
      let param = {
        state: false,
        text: "",
      };
      if (this.AdSet_Manage_permission != 2) {
        param.state = true;
        param.text = "无权限操作，请联系团队管理员！";
      }
      return param;
    },
  },
  // beforeDestroy() {
  //   this.remove_edit();
  // },
  beforeRouteLeave(to, from, next) {
    if (to.name == "Login" || to.name == "Logout") {
      // this.remove_edit();
      next();
    } else {
      this.remove_edit();
      next();
    }
  },
  methods: {
    ...mapActions("advertising", [
      "update_active_tab",
      "update_manage_ad_handle",
    ]),
    async remove_edit() {
      // 清空编辑
      if (
        this.manage_campaign_handle == "edit" ||
        this.manage_ad_handle == "edit"
      ) {
        const url = "/user/removestatus";
        const param = {
          team_id: this.active_team_id,
        };
        await this.fetchCore(url, param, false);
      }
    },
    handle_click_tab() {
      this.update_active_tab(this.activeName);
      if (this.activeName == "ad") {
        if (this.manage_campaign_handle == "edit") {
          this.update_manage_ad_handle("edit");
        }
      }
      this.remove_edit();
    },
    adversiting_is_empty(param) {
      this.is_empty = true;
      if (param == 1) {
        // 同步失败
        this.empty_text =
          "您可前往【系统管理】-【账号管理】查看账号同步状态。如有异常，可联系管理员处理。";
      } else if (param == 2) {
        // 没有账号
        this.empty_text = "您需要先申请巨量引擎账号的权限，才能看到数据。";
      }
    },
    // 清空选中
    close_tag(param) {
      this.$refs.jl_manage.update_selected([], param);
      // this.activeName = param;
      this.refresh_tab();
      this.$refs.jl_manage.clear_select();
    },
    refresh_tab() {
      setTimeout(() => {
        let num = 1;
        if (this.active_tab == "campaign" || this.active_tab == "ad") {
          num = 2;
        }

        const active_dom = document.querySelector(
          ".ad-jl-container header .el-tabs__item.is-top.is-active"
        );
        const target = document.querySelector(
          ".ad-jl-container header .el-tabs__active-bar.is-top"
        );
        target.style.width = `${active_dom.clientWidth - 20 * num}px`;
      }, 500);
      this.jl_tab++;
    },
    // 同步数据
    async handle_sync_data() {
      // 先请求接口，后判断时间
      const url = "/adpush/jl/campaignedit/checkAdvertiserStatus";
      const param = {
        team_id: this.active_team_id,
      };
      const res = await this.fetchCore(url, param, false);
      if (res) {
        // 有人在编辑
        if (!res.edit_status) {
          this.$message({
            message:
              "暂不允许手动同步！团队中用户正在修改广告配置，请您稍后尝试。",
            duration: 5000,
            offset: 3,
            type: "error",
          });
        }
        // 有在推送中
        setTimeout(() => {
          if (!res.pushing_status) {
            this.$message({
              message:
                "当前存在正在被推送的Campaign或Ad，请先等待系统推送完成，才能进行手动同步。",
              duration: 5000,
              offset: 3,
              type: "error",
            });
          }
        }, 100);

        // 有触发规则的
        setTimeout(() => {
          if (!res.rule_status) {
            this.$message({
              message:
                "当前存在触发规则的Campaign或Ad，请先处理，才能进行手动同步。",
              duration: 5000,
              offset: 3,
              type: "error",
            });
          }
        }, 200);

        // 都没有,判断满足条件
        if (res.rule_status && res.edit_status && res.pushing_status) {
          this.$refs.SyncPoint.show(res);
        }
      }
    },
    // 存在同步失败
    has_sync_fail(list) {
      this.$refs.SyncFailPoint.show(list);
    },
    // 全局时间筛选
    date_change(date) {
      this.$refs.jl_manage.date_change(date);
    },
    // 点击名称下钻
    deep_into_next() {
      const tmp_active = this.activeName;
      const map = {
        account: "campaign", //账号-》广告组
        campaign: "ad", //广告组-》计划
        ad: "creative", //计划-》创意
      };
      this.activeName = map[tmp_active];
      this.update_active_tab(this.activeName);
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
    // change_list_type
  },
  created() {
    this.$eventHub.$on("deepIntoNext", this.deep_into_next);
    this.$eventHub.$on("changeListType", this.refresh_tab);
  },
};
</script>
<style lang="scss">
.ad-jl-container {
  header {
    .el-tabs {
      .el-tabs__nav {
        display: flex;
        .el-tabs__item {
          display: flex;
          align-items: center;
          .el-tag--mini {
            margin-left: 10px;
            border: 0;
            background: #999999;
            color: #fff;
            line-height: 20px;
            .el-tag__close {
              color: #fff;
            }
          }
        }
        .el-tabs__item.is-active {
          .el-tag--mini {
            background: #0bb3b3;
          }
        }
      }
    }
  }
}
</style>
<style lang='scss'>
.ad-empty {
  height: 100%;
  position: relative;
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
      font-size: 90px;
    }
    span {
      margin-top: 20px;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
    span:nth-of-type(2) {
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
.ad-jl-container {
  height: 100%;
  margin: 0 10px;
  background: #fff;
  header {
    height: 39px;
    padding: 0 20px;
    border-bottom: 1px solid #f1f2f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sync_active {
      display: inline-block;
      animation: sync_active 5s infinite;
      animation-delay: 1s;
      -webkit-animation: sync_active 5s infinite;
      -webkit-animation-delay: 1s;
    }
    @keyframes sync_active {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes sync_active {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
  main {
    height: calc(100% - 40px);
    .to-top {
      position: fixed;
      right: 20px;
      bottom: 15px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #9c9ea1;
      z-index: 1;
      text-align: center;
      line-height: 32px;
      color: #fff;
      cursor: pointer;
    }
    .manage-account-container,
    .manage-campaign-container,
    .manage-ad-container,
    .manage-creative-container {
      height: 100%;
      overflow-y: auto;

      section {
        .list_filter {
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          .right {
            display: flex;
            align-items: center;
          }
        }
      }
      section.list-table {
        height: 100%;
        main {
          height: calc(100% - 60px);
          padding: 10px 20px 0 20px;
        }
      }
    }
  }
}
</style>