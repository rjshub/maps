<template>
  <maps-drawer
    title="同步失败详情"
    :loading="isLoading"
    @close="close_drawer"
    size="50%"
    class="push-detail-drawer variety-drawer"
    ref='mpasDrawer_log'
  >
    <section
      slot="drawerBody"
      style="height: 100%"
    >
      <header>以下账号广告数据同步失败，请联系管理员处理！</header>
      <div class="table">
        <el-table
          :data="sync_list"
          height="100%"
          style="width: 100%"
          stripe
          :border="true"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="同步失败时间"
            width="170"
            prop="synctime"
          >
          </el-table-column>
          <el-table-column
            label="平台"
            width="90"
            prop="platform"
          >
            <template slot-scope="scope">
              {{platform_map[scope.row.platform]}}
            </template>
          </el-table-column>
          <el-table-column
            label="广告账号名称"
            show-overflow-tooltip
            prop="media_advertiser_name"
          >
          </el-table-column>
          <el-table-column
            label="广告账号ID"
            show-overflow-tooltip
            width="100"
            prop="media_advertiser_id"
          >
          </el-table-column>
          <el-table-column label="广告账号所属人">
            <template slot-scope="scope">
              <div>{{scope.row.username}} ({{scope.row.truename}})</div>
              <maps-tooltip :text="scope.row.email">
                <div class="ellipsis-label">{{scope.row.email}}</div>
              </maps-tooltip>
            </template>
          </el-table-column>

          <template slot="empty">
            <table-empty></table-empty>
          </template>
        </el-table>
      </div>
    </section>
  </maps-drawer>
</template>

<script>
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      sync_list: [],
      platform_map: {
        1: "巨量引擎",
        2: "腾讯广告",
        3: "微信广告",
      },
    };
  },
  watch: {},
  methods: {
    show(id = "") {
      this.$refs.mpasDrawer_log.show();
      this.get_sync_list(id);
    },
    close_drawer() {
      this.$refs.mpasDrawer_log.close();
    },
    async get_sync_list(id) {
      const url = "message/getSyncLog";
      const res = await this.fetchCore(url, { id }, false);
      if (res) {
        this.sync_list = res;
      } else {
        this.sync_list = [];
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
<style lang='scss' scoped>
.push-detail-drawer {
  section {
    & > header {
      color: #333;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .table {
      height: calc(100% - 34px);
      .ellipsis-label {
        text-align: justify;
        text-overflow: ellipsis;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>