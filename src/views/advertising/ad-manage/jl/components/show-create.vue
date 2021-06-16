<template>
  <el-radio-group
    v-model="active"
    class="show-create-radio"
    @change="change_handle"
    size="mini"
  >
    <el-radio-button label="show">查看</el-radio-button>
    <el-badge
      :is-dot="error && is_show"
      class="item"
    >
      <el-radio-button label="edit">编辑</el-radio-button>
    </el-badge>
    <SyncPoint ref="SyncPoint"></SyncPoint>
  </el-radio-group>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment";
import SyncPoint from "./sync-point";
import fetch from "@/services/fetch";

export default {
  name: "ShowCreate",
  props: {
    activeHandle: {
      default: "show",
    },
    error: {
      default: false,
    },
  },
  components: { SyncPoint },
  data() {
    const self = this;
    return {
      active: self.activeHandle,
    };
  },
  watch: {},
  computed: {
    ...mapState("advertising", [
      "active_tab",
      "manage_campaign_handle",
      "manage_ad_handle",
      "show_sync_point",
      "",
    ]),
    ...mapState("system", ["active_team_id"]),
    is_show() {
      if (
        this.active_tab == "campaign" &&
        this.manage_campaign_handle == "show"
      ) {
        return true;
      }
      if (this.active_tab == "ad" && this.manage_ad_handle == "show") {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("advertising", [
      "update_manage_campaign_handle",
      "update_manage_ad_handle",
      "update_show_sync_point",
    ]),
    async remove_edit() {
      // 清空编辑
      const url = "/user/removestatus";
      const param = {
        team_id: this.active_team_id,
      };
      await this.fetchCore(url, param, false);
    },
    async change_handle(param) {
      this.$eventHub.$emit("changeListType");
      if (this.active_tab == "campaign") {
        //campaign
        this.update_manage_campaign_handle(param);
      } else if (this.active_tab == "ad") {
        this.update_manage_ad_handle(param);
      }
      this.$emit("updateHandle", param);
      if (param == "edit") {
        await this.check_sync();
      } else {
        await this.remove_edit()
      }
    },
    // 检查手动同步状态
    async check_sync() {
      if (this.show_sync_point) {
        return false;
      }

      if (
        (this.active_tab == "campaign" &&
          this.manage_campaign_handle == "edit") ||
        (this.active_tab == "ad" && this.manage_ad_handle == "edit")
      ) {
        // 先请求接口，后判断时间
        const url = "/adpush/jl/campaignedit/checkAdvertiserStatus";
        const res = await this.fetchCore(
          url,
          { team_id: this.active_team_id },
          false
        );
        if (res) {
          // 判断满足条件
          if (res.rule_status && res.edit_status && res.pushing_status) {
            const time = Number(moment(new Date()).format("mm"));
            if (time % 30 > 4 || time % 30 < 25) {
              this.$refs.SyncPoint.show(res);
              this.update_show_sync_point(true);
            }
          }
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
  mounted() {
    this.check_sync();
  },
};
</script>
<style lang='scss'>
.show-create-radio {
  margin: 0 0 0 10px;
  float: left;
  .el-radio-button {
    .el-radio-button__inner {
      padding: 9px;
    }
  }
  .el-badge {
    .el-radio-button {
      .el-radio-button__inner {
        border-radius: 0 4px 4px 0;
      }
    }
    .el-badge__content {
      width: 6px;
      height: 6px;
      line-height: 6px;
      padding: 0;
      right: 3px;
    }
  }
}
</style>