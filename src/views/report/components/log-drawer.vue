<template>
    <maps-drawer :title="`${$t('lang.report_subscribe_log_title')}：${active_title}`"
        :loading="isLoading"
        @close="close_drawer"
        ref='mpasDrawer_log'>
        <div slot="drawerBody"
            class="log-mian">
            <section class="select-container">
                <el-select v-model="filter_form.status"
                    style="margin-right: 10px"
                    :placeholder="$t('lang.report_subscribe_Results.title')"
                    size="mini"
                    filterable
                    @change="filter_change">
                    <el-option :label="$t('lang.report_subscribe_Results.all')"
                        value=""></el-option>
                    <el-option :label="$t('lang.report_subscribe_Results.success')"
                        :value="1"></el-option>
                    <el-option :label="$t('lang.report_subscribe_Results.fail')"
                        :value="0"></el-option>
                </el-select>
            </section>
            <section class="log-table">
                <el-table ref="multipleTable"
                    :data="log_list.slice(0,load_range)"
                    tooltip-effect="dark"
                    style="width: 100%"
                    height="100%"
                    stripe>
                    <el-table-column :label="$t('lang.report_subscribe_log_table.time')"
                        show-overflow-tooltip
                        width="140"
                        prop="send_time">
                    </el-table-column>
                    <el-table-column :label="$t('lang.report_subscribe_log_table.result')"
                        :prop="`msg_${language}`">
                        <template slot-scope="scope">
                            <span v-html="scope.row[`msg_${language}`]"></span>
                        </template>
                    </el-table-column>
                    <template slot="empty">
                        <table-empty></table-empty>
                    </template>
                </el-table>
            </section>
            <section class="load-more"
                v-if="log_list.length && log_list.length > load_range">
                <span @click="load_more_log">{{$t('lang.public_load_more')}}</span>
            </section>
            <section class="no-data"
                v-if="log_list.length && log_list.length <= load_range">
                <span>{{$t('lang.report_task_only_month')}}</span>
            </section>
        </div>
    </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      active_title: '',
      isLoading: false,
      filter_form: {
        status: "",
      },
      log_list: [],
      load_range: 15,
      task_id: "",
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("user", ["language"]),
  },
  methods: {
    show(task) {
      this.active_title = task.title
      this.task_id = task.id;
      this.get_log_list();
      this.$refs.mpasDrawer_log.show();
    },
    close_drawer() {
      this.$refs.mpasDrawer_log.close();
      this.filter_form.status = ''
    },
    // 获取列表
    async get_log_list() {
      const url = "/emailtask/tasklog";
      const param = {
        team_id: this.active_team_id,
        email_task_id: this.task_id,
        status: this.filter_form.status,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.log_list = data;
      }
    },
    filter_change() {
      this.load_range = 15;
      this.get_log_list();
    },
    // 加载更多
    load_more_log() {
      this.load_range += 15;
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
.log-mian {
  .el-table .cell span {
    word-break: break-all;
  }
}
</style>
<style lang='scss' scoped>
.log-mian {
  height: 100%;
  .select-container {
    margin-bottom: 20px;
  }
  .log-table {
    height: calc(100% - 90px);
  }
  .load-more,
  .no-data {
    // padding: 20px 0 10px 0;
    padding-top: 20px;
    text-align: center;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #0bb3b3;
      line-height: 18px;
      cursor: pointer;
    }
  }
  .no-data {
    span {
      color: #999;
      cursor: default;
    }
  }
}
</style>