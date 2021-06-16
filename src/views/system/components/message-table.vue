<template>
  <div style="height: 100%">
    <el-table
      :data="tableData"
      stripe
      height="100%"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" v-if="showSelect" width="55">
      </el-table-column>
      <el-table-column
        prop="status"
        align="center"
        class-name="center-cell"
        :label="$t('lang.message_table_config.status')"
        width="80"
      >
        <template slot-scope="scope">
          <maps-tooltip :text="status_map[scope.row.status].text">
            <i
              class="iconfont maps-icon-bell1"
              :style="`color:${status_map[scope.row.status].color}`"
            ></i>
          </maps-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="platform"
        v-if="showPlatform"
        align="center"
        class-name="center-cell"
        :label="$t('lang.message_table_config.platform')"
        width="80"
      >
        <template slot-scope="scope">
          <platform-icon :platform="scope.row.platform" style="margin: 0 auto"></platform-icon>
        </template>
      </el-table-column>
      <el-table-column prop="msg" :label="$t('lang.message_table_config.msg')">
        <template slot-scope="scope">
          <span
            v-html="scope.row.msg"
            class="message-des"
            @click="handle_message(scope.row)"
            :style="`font-weight: ${status_map[scope.row.status].weight}`"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type_label"
        class-name="center-cell"
        :label="$t('lang.message_table_config.type_label')"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.type_label }}
        </template>
      </el-table-column>
      <el-table-column
        prop="ctime"
        class-name="center-cell"
        :label="$t('lang.message_table_config.ctime')"
        width="160"
      >
        <template slot-scope="scope">
          {{ scope.row.ctime }}
        </template>
      </el-table-column>
      <template slot="empty">
        <table-empty></table-empty>
      </template>
    </el-table>
    <PermissionApply
      ref="PermissionApply"
      @applyed="apply_finish"
    ></PermissionApply>
    <JoinTeamApply ref="JoinTeamApply" @applyed="apply_finish"></JoinTeamApply>
    <PushDetail ref="PushDetail"></PushDetail>
    <SyncFailDetail ref="SyncFailDetail"></SyncFailDetail>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import PermissionApply from "./permission-apply";
import JoinTeamApply from "./join-team-apply";
import PushDetail from "./push-detail";
import SyncFailDetail from "./sync-fail";

export default {
  components: { PermissionApply, JoinTeamApply, PushDetail, SyncFailDetail },
  props: {
    tableData: {
      type: Array,
    },
    showSelect: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    showPlatform: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status_map: {
        0: {
          // 未读
          color: "#0BB3B3",
          weight: "700",
          text: this.$t("lang.public_unread"),
        },
        1: {
          color: "#999",
          weight: "400",
          text: this.$t("lang.public_read"),
        },
      },
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id", "platform_config"]),
  },
  methods: {
    ...mapActions("alarm", ["update_alarm_count"]),
    handleSelectionChange(val) {
      let result = [];
      if (val.length) {
        val.forEach((item) => {
          result.push(item.id);
        });
      } else {
        result = [];
      }
      this.$emit("selectChange", result);
    },
    async handle_message(row) {
      if (this.type == "system") {
        if (row.status == "0") {
          this.handle_read(row.id);
        }
        // 同步失败消息
        if (row.type == "6") {
          this.$refs.SyncFailDetail.show(row);
        }
      } else if (this.type == "apply") {
        if (row.type == "1") {
          this.$refs.JoinTeamApply.show(row);
        } else if (row.type == "4") {
          this.$refs.PermissionApply.show(row);
        }
      } else if (this.type == "advertising") {
        if (row.status == "0") {
          this.handle_read(row.id);
        }
        if (row.type == "7") {
          // 查看推送详情
          this.$refs.PushDetail.show(row.id);
        } else {
          // 跳转广告智投-巨量
          const origin = window.origin;
          const url = origin + "/china/#/advertising/manage/jl";
          window.open(url);
        }
      }
    },
    async handle_read(id) {
      const maps = {
        advertising: "3", //广告智投
        apply: "2",
        system: "1",
      };
      const url = "/message/setRead";
      const param = {
        team_id: this.active_team_id,
        ids: id,
        msg_type: maps[this.type]
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.$emit("updateList");
      }
    },
    apply_finish(id) {
      this.handle_read(id);
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
.el-table {
  .center-cell {
    vertical-align: middle;
    i {
      font-size: 16px;
    }
  }
}
</style>
<style lang='scss' scoped>
.message-des {
  cursor: pointer;
}
</style>