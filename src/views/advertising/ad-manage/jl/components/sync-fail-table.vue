<template>
  <el-dialog
    title="手动同步失败提醒"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    :before-close="handleClose"
    width="60%"
    custom-class="sync_fail_point_dialog"
  >
    <span class="point">以下账号广告数据同步失败，请联系管理员处理！</span>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      max-height="350"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
      >
      </el-table-column>
      <el-table-column
        property="failtime"
        label="同步失败时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        property="platform"
        label="平台"
        width="80"
      >
        <template slot-scope="scope">
          {{platform_map[scope.row.platform]}}
        </template>
      </el-table-column>
      <el-table-column
        property="media_advertiser_name"
        label="广告账号名称"
      >
      </el-table-column>
      <el-table-column
        property="media_advertiser_id"
        label="广告账号ID"
        width="160"
      >
      </el-table-column>
      <el-table-column
        label="广告账号所属人"
        min-width="150"
      >
        <template slot-scope="scope">
          <div style="line-height: 16px">
            <span>{{scope.row.username}}</span>
            （{{scope.row.truename}}）
          </div>
          <div style="line-height: 16px">{{scope.row.email}}</div>
        </template>
      </el-table-column>
    </el-table>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        class="maps-button-mini"
        type="primary"
        @click="get_it"
      >知道了</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      platform_map: {
        1: "巨量引擎",
        2: "腾讯广告",
        3: "微信广告",
      },
    };
  },
  methods: {
    show(list) {
      this.dialogVisible = true;
        this.tableData = list;
    },
    get_it() {
      this.dialogVisible = false;
      this.$eventHub.$emit("handle_hand_sync");
    },
    handleClose(done) {
      this.$eventHub.$emit("handle_hand_sync");
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
.sync_fail_point_dialog {
  .point {
    display: inline-block;
    color: #333;
    font-size: 12px;
    margin-bottom: 10px;
  }
}
</style>