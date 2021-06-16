<template>
  <el-dialog
    v-loading.fullscreen='isLoading'
    element-loading-text="MAPS拼命同步中，请稍等..."
    title="手动同步提醒"
    :visible="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="600px"
    custom-class="sync_point_dialog"
  >
    <span
      class="content"
      v-if="!is_hand"
    >
      <div style="line-height: 20px">
        <span v-if="!has_push_fail">MAPS温馨提示：您可<span style="color:#ff0000">先手动同步</span>巨量引擎平台最新的广告配置，再在MAPS中进行批量修改。此次手动同步将覆盖当前列表的所有数据。</span>
        <span v-if="has_push_fail">MAPS温馨提示：您可<span style="color:#ff0000">先手动同步</span>巨量引擎平台最新的广告配置，再在MAPS中进行批量修改。当前列表中存在<span style="color:#ff0000">“推送失败”</span>的广告。由于此次手动同步将覆盖当前列表的所有数据，您也可先处理这些推送失败的数据，再进行手动同步。</span>
      </div>
      <div style="line-height: 20px;margin-top: 10px">
        <span style="color: #ff0000;font-weight:700">*注意: </span>
        <span>如您在过去25分钟内<span style="color:#ff0000">没有</span>在巨量引擎修改过任何广告配置，则无需手动同步，您可点击“取消”或直接关闭弹框。</span>
      </div>
    </span>
    <span
      class="content"
      v-if="is_hand"
    >
      <div style="line-height: 20px">
        <span v-if="has_push_fail">确定要从巨量引擎同步最新的广告数据吗？当前列表中<span style="color:#ff0000">存在“推送失败”</span>的广告，此次同步将覆盖当前列表的所有数据，请仔细确认！</span>
        <span v-if="!has_push_fail">确定要从巨量引擎同步最新的广告数据吗？此次同步将覆盖当前列表的所有数据，请仔细确认！"点击【覆盖】，则系统开始同步并更新数据。</span>
      </div>
    </span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        class="maps-button-mini"
        @click="dialogVisible = false"
      >取 消</el-button>
      <el-button
        size="mini"
        class="maps-button-mini"
        type="primary"
        @click="handle_sync_now"
      >{{is_hand? '覆 盖':'开始同步'}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  props: {
    is_hand: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      message: "",
      has_push_fail: false,
    };
  },
  computed: {
    ...mapState("user", ["user_name"]),
    ...mapState("system", ["active_team_id"]),
    ...mapState("advertising", ["active_tab"]),
  },
  methods: {
    ...mapActions("advertising", [
      "update_campaign_syncing",
      "update_ad_syncing",
      "update_syncing",
    ]),
    show(res) {
      if (!this.is_hand) {
        document.cookie = `${this.user_name}_sync_point=true`;
      }
      this.dialogVisible = true;
      this.has_push_fail = !res.pushfail_status;
    },
    async handle_sync_now() {
      this.dialogVisible = false;
      this.isLoading = true;
      const url = "/adpush/jl/campaignedit/pullData";
      const res = await this.fetchCore(
        url,
        { team_id: this.active_team_id },
        false
      );
      this.update_syncing(true);
      

      if (res) {
        this.isLoading = false;
        this.update_syncing(false);

        if (res.status == 1) {
          this.$message({
            message: "系统同步成功!",
            duration: 5000,
            offset: 3,
            type: "success",
          });
          // 没有失败，关闭遮罩并直接刷新
          this.$eventHub.$emit("handle_hand_sync");
        } else if (res.status == 0) {
          if (res.list.length) {
            this.$emit("syncFail", res.list);
          } else {
            this.$message({
              message: "系统同步失败!",
              duration: 5000,
              offset: 3,
              type: "error",
            });
          }
        }
      } else {
        this.update_syncing(false);
        this.isLoading = false;
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
};
</script>

<style scoped lang="scss">
.edit_point_dialog {
  .content {
    div {
      span {
        line-height: 24px;
      }
    }
  }
}
</style>