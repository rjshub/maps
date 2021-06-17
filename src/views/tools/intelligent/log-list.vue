<template>
  <div
    class="log-list-container"
    v-loading.fullscreen="isLoading"
  >
    <section v-if="!is_empty">
      <header>
        <div class="select-container">
          <el-input
            :placeholder="set_search_placeholder"
            v-model="filter_form.word"
            @keyup.enter.native="filter_change"
            size="mini"
            style="width: 300px"
            class="input-with-select"
          >
            <el-select
              v-model="filter_form.search_type"
              style="width: 120px;"
              slot="prepend"
              @change="filter_change"
              placeholder="请选择"
            >
              <el-option
                v-for="item in word_type"
                :key="item.id"
                :label="item[`name_${language}`]"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <div slot="append"
                        style="cursor: pointer">
                        <i class="iconfont maps-icon-search"
                            @click="filter_change"></i>
                    </div> -->
          </el-input>
        </div>
        <div class="select-container">
          <el-select
            v-model="filter_form.platform"
            placeholder="选择平台"
            size="mini"
            style="width: 120px; margin-right: 10px"
            filterable
            @change="filter_change"
          >
            <!-- <el-option :label="$t('lang.public_all_platform')"
                        value=""></el-option> -->
            <el-option
              v-for="item in platform_config"
              :key="item.id"
              :label="item[`name_${language}`]"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.system_operation"
            placeholder="系统执行操作"
            size="mini"
            style="width: 150px; margin-right: 10px"
            filterable
            @change="filter_change"
          >
            <!-- <el-option label="全部"
                        value=""></el-option> -->
            <el-option
              v-for="item in system_operation_config"
              :key="item.id"
              :label="item[`name_${language}`]"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.final_operation"
            placeholder="最终处理"
            size="mini"
            style="width: 130px; margin-right: 10px"
            filterable
            @change="filter_change"
          >
            <!-- <el-option label="全部"
                        value=""></el-option> -->
            <el-option
              v-for="item in final_operation_config"
              :key="item.id"
              :label="item[`name_${language}`]"
              :value="item.id"
            ></el-option>
          </el-select>
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
          >
          </el-date-picker>
        </div>
      </header>
      <main>
        <el-table
          ref="multipleTable"
          :data="log_list"
          tooltip-effect="dark"
          style="width: 100%"
          height="100%"
          stripe
          border
          @sort-change="log_sort_change"
        >
          <el-table-column
            label="运行时间"
            resizable
            sortable
            prop="ctime"
            min-width="160"
          >
          </el-table-column>
          <el-table-column
            label="任务ID"
            prop="rule_task_rid"
            width="80"
          >
          </el-table-column>
          <el-table-column
            label="任务名称"
            resizable
            show-overflow-tooltip
            prop="rule_task_name"
            min-width="150"
          >
            <template slot-scope="scope">{{scope.row.rule_task_name || '--'}}</template>
          </el-table-column>
          <el-table-column
            label="规则ID"
            prop="rule_rid"
            width="80"
          >
          </el-table-column>
          <el-table-column
            label="规则名称"
            resizable
            prop="rule_name"
            show-overflow-tooltip
            min-width="150"
          >
          </el-table-column>
          <el-table-column
            label="检测详情"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="show_check_result(scope.row)"
              >
                <span style="font-size: 14px">查看</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="平台"
            width="80"
          >
            <template slot-scope="scope">
              <platform-icon :platform="scope.row.platform"></platform-icon>
            </template>
          </el-table-column>
          <el-table-column
            label="应用维度"
            width="100"
            prop="level"
          >
            <template slot-scope="scope">
              {{ level_map[scope.row.level] || "--" }}
            </template>
          </el-table-column>
          <el-table-column
            label="运行对象"
            min-width="240"
          >
            <template slot-scope="scope">
              <maps-tooltip
                :text="`${scope.row.object_name}<br>ID: ${scope.row.object_id}`"
                align="left"
              >
                <div
                  class="ellipsis-label"
                  style="line-height: 18px"
                >
                  {{ scope.row.object_name }}
                </div>
              </maps-tooltip>
              <div style="line-height: 18px">ID: {{ scope.row.object_id }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="系统执行操作"
            width="150"
            show-overflow-tooltip
            prop="operations"
          >
          </el-table-column>
          <el-table-column
            label="最终处理"
            width="150"
            show-overflow-tooltip
            prop="final_operation_str"
          >
          </el-table-column>
          <el-table-column
            label="发送站内信"
            width="120"
            show-overflow-tooltip
            prop="notice_users"
          >
          </el-table-column>
          <el-table-column
            label="处理人"
            width="160"
            prop="username"
          >
            <template slot-scope="scope">
              <div style="line-height: 18px">
                {{ scope.row.username || "--" }}
              </div>
              <div style="line-height: 18px">
                {{ scope.row.operation_time }}
              </div>
            </template>
          </el-table-column>

          <template slot="empty">
            <table-empty></table-empty>
          </template>
        </el-table>
      </main>
      <footer class="pagination-footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          :page-sizes="[10, 20, 50, 100, 200, 500]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </footer>
    </section>
    <div
      class="list-empty"
      v-else
    >
      <i class="iconfont maps-icon-nodata"></i>
      <span>暂无日志</span>
    </div>
    <checkDetail ref="checkDetail"></checkDetail>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import moment from "moment";
import checkDetail from "../components/check-detail";

export default {
  components: { checkDetail },
  props: {
    rules_ids: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      isLoading: false,
      is_empty: false,
      currentPage: 1,
      pagesize: 10,
      total: 0,
      filter_form: {
        team_id: "",
        word: "",
        search_type: "1",
        platform: "1",
        system_operation: "",
        final_operation: "",
        start_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        end_date: moment(new Date().getTime()).format("YYYY-MM-DD"),
        page_size: "10",
        page: "1",
        order: "",
        order_by: "",
      },
      date_list: [
        moment(new Date().getTime()).format("YYYY-MM-DD"),
        moment(new Date().getTime()).format("YYYY-MM-DD"),
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: this.$datePickerShortcuts,
      },
      level_map: {
        1: "Campaign",
        2: "Ad",
      },
      word_type: [
        {
          id: "1",
          name_zh: "按规则",
          name_en: "By Rules",
        },
        {
          id: "2",
          name_zh: "按AD",
          name_en: "By AD",
        },
        {
          id: "3",
          name_zh: "按Campaign",
          name_en: "By Campaign",
        },
        {
          id: "4",
          name_zh: "按任务",
          name_en: "By Task",
        },
      ],
      platform_config: [
        {
          name_zh: "巨量引擎",
          name_en: "Ocean Engine",
          id: "1",
        },
      ],
      system_operation_config: [
        {
          id: "",
          name_zh: "全部系统执行操作",
          name_en: "all",
        },
        {
          id: "1",
          name_zh: "开启",
          name_en: "Enable",
        },
        {
          id: "2",
          name_zh: "暂停",
          name_en: "Pause",
        },
        {
          id: "3",
          name_zh: "更新Ad预算",
          name_en: "Update Ad Budget",
        },
        {
          id: "4",
          name_zh: "更新Campaign预算",
          name_en: "Update Campaign Budget",
        },
        {
          id: "5",
          name_zh: "仅通知",
          name_en: "Just send alert",
        },
        {
          id: "6",
          name_zh: "异常触发(无法执行)",
          name_en: "",
        },
      ],
      final_operation_config: [
        {
          id: "",
          name_zh: "全部最终处理",
          name_en: "all",
        },
        {
          id: "1",
          name_zh: "未处理",
          name_en: "",
        },
        {
          id: "2",
          name_zh: "推送",
          name_en: "",
        },
        {
          id: "3",
          name_zh: "忽略",
          name_en: "",
        },
        {
          id: "4",
          name_zh: "被新触发规则覆盖",
          name_en: "",
        },
      ],
      log_list: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("permissions", ["Rule_Intelligent_permission"]),
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id"]),
    set_search_placeholder() {
      const map = {
        1: "搜索规则名称/ID",
        2: "搜索AD名称/ID",
        3: "搜索Campaign名称/ID",
        4: "搜索任务名称/ID",
      };
      return map[this.filter_form.search_type];
    },
  },
  methods: {
    // 查询是否有数据
    async get_log_count() {
      const url = "/rule/crontabloglist";
      const param = {
        team_id: this.active_team_id,
        word: "",
        search_type: "",
        platform: "",
        system_operation: "",
        final_operation: "",
        start_date: "",
        end_date: "",
        page_size: "10",
        page: "1",
        order: "",
        order_by: "",
      };

      const data = await this.fetchCore(url, param, false);
      if (data) {
        if (data.list.length > 0) {
          this.is_empty = false;
          this.get_log_list();
        } else {
          this.is_empty = true;
        }
      } else {
        this.is_empty = true;
      }
    },
    //   过滤
    filter_change(param = "", page = 1) {
      this.filter_form.page = page;
      this.get_log_list();
    },
    date_change(param) {
      this.filter_form.start_date = param[0];
      this.filter_form.end_date = param[1];
      this.filter_change();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.filter_form.page_size = val;
      this.filter_change("", this.filter_form.page);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.filter_form.page = val;
      this.filter_change("", val);
    },
    // 表格排序
    log_sort_change(param) {
      const map = {
        // ASC，DESC
        descending: "DESC",
        ascending: "ASC",
      };
      if (param.order) {
        this.filter_form.order = map[param.order];
        this.filter_form.order_by = param.prop;
      } else {
        this.filter_form.order = "";
        this.filter_form.order_by = "";
      }

      this.get_log_list();
    },
    // 获取日志列表
    async get_log_list() {
      const url = "/rule/crontabloglist";
      this.filter_form.team_id = this.active_team_id;
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.log_list = data.list;
        this.total = data.total;
      } else {
        this.log_list = [];
        this.total = 0;
      }
    },
    // 查看检测详情
    show_check_result(param) {
      this.$refs.checkDetail.show(param);
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
    if (this.rules_ids) {
      this.filter_form.word = this.rules_ids;
    }
    this.get_log_count();
  },
};
</script>
<style lang='scss' scoped>
.log-list-container {
  height: 100%;
  position: relative;
  section {
    height: 100%;
    & > header {
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
    }
    & > main {
      height: calc(100% - 112px);
      padding: 0 20px;
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
    & > span {
      margin: 20px 0;
      color: #333;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
<style lang="scss">
.log-list-container {
  .el-input-group__prepend {
    background: #fff;
  }
}
</style>