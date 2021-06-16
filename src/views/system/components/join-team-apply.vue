<template>
    <el-drawer :visible.sync="drawer"
        direction="rtl"
        size="50%"
        custom-class="join-team-apply-container"
        :close-on-press-escape="false"
        :show-close="false"
        :wrapperClosable="false"
        :destroy-on-close="true"
        v-loading="dialog_row_loading">
        <section class="drawer-header">
            <div>
                <div class="back"
                    @click="close_drawer">
                    <i class="iconfont maps-icon-right"></i>
                </div>
                <span>{{$t('lang.message_Request_to_join_your_team')}}</span>
            </div>
            <div class="btn"
                v-if="!is_read">
                <el-button size="mini"
                    class="maps-button-mini"
                    @click="refuse_apply"
                    plain>{{$t('lang.public_button_Reject')}}</el-button>
                <el-button size="mini"
                    class="maps-button-mini"
                    @click="agree_apply"
                    type="primary">{{$t('lang.public_button_Approve')}}</el-button>
            </div>
            <div class="btn"
                v-else>
                <el-button size="mini"
                    @click="drawer = false"
                    class="maps-button-mini"
                    type="primary">{{$t('lang.public_button_Got_it')}}</el-button>
            </div>
        </section>
        <section class="drawer-main">
            <span v-if="!is_read">{{apply_text}}{{$t('lang.message_join_team_applying')}}</span>
            <span v-else-if="is_read && agree"
                v-html="$t('lang.message_join_team_agreed')"></span>
            <span v-else-if="is_read && !agree"
                v-html="$t('lang.message_join_team_Rejected')"></span>
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
      apply_text: "",
      msg_id: "",
      is_read: false,
      agree: true,
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
  },
  methods: {
    show(param) {
      this.drawer = true;
      let text = "";
      if (this.language === "zh") {
        text = param.msg.split("，")[0];
      } else {
        text = param.msg.split(",")[0];
      }
      this.apply_text = text;
      this.msg_id = param.id;
      if (param.status == 0) {
        this.is_read = false;
      } else {
        this.is_read = true;
        if (param.deal_status == 1) {
          this.agree = true;
        } else if (param.deal_status == 2) {
          this.agree = false;
        } else {
          this.is_read = false;
        }
      }
    },
    close_drawer() {
      this.drawer = false;
    },
    // 拒绝申请
    refuse_apply() {
      const param = {
        message_id: this.msg_id,
        action: "0",
      };
      this.apply(param);
    },
    // 同意申请
    agree_apply() {
      const param = {
        message_id: this.msg_id,
        action: "1",
      };
      this.apply(param);
    },
    async apply(param) {
      const url = "/team/processjointeam";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.drawer = false;
        this.$emit("applyed", param.message_id);
        if (param.action == "1") {
          this.$eventHub.$emit("agree_apply");
        }
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
.join-team-apply-container {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
}
</style>
<style lang='scss' scoped>
.join-team-apply-container {
  .drawer-header {
    padding-right: 20px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    div:nth-child(1) {
      display: flex;
      align-items: center;
    }
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
  }

  .drawer-main {
    padding: 0 20px;
    span {
      color: #333;
      font-size: 14px;
      line-height: 24px;
      // font-weight: 700;
    }
  }
}
</style>