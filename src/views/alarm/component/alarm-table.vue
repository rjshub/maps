<template>
  <div class="list-container" v-loading.fullscreen="isLoading">
    <div class="alarm-setting">
      <el-button plain size="mini" @click="to_alarm_setting">
        <i class="iconfont maps-icon-setting"></i>
      </el-button>
    </div>
    <div class="list-filter">
      <section class="filter-left select-container">
        <div class="alarm-total">
          <span>All</span>
          <span>{{all_alarm}}</span>
        </div>
        <div class="alarm-total">
          <span>Unread</span>
          <span>{{unread_alarm}}</span>
        </div>
        <!-- <maps-tooltip> -->
        <el-button plain size="mini" class="maps-button-mini" @click="handle_batch_read">
          <i class="iconfont maps-icon-bell-new" style="margin-right: 5px"></i>Mark as read
        </el-button>
        <!-- </maps-tooltip> -->
        <!-- <maps-tooltip> -->
        <el-button plain size="mini" class="maps-button-mini" @click="handle_batch_ignore">
          <i class="iconfont maps-icon-bell-dis1" style="margin-right: 5px"></i>Ignore
        </el-button>
        <!-- </maps-tooltip> -->
      </section>
      <section class="filter-right select-container">
        <el-select
          v-if="filter_form.type === '1'"
          v-model="filter_form.platform"
          placeholder="Platform"
          size="mini"
          filterable
          @change="filter_change"
        >
          <div slot="prefix">Platform:</div>
          <!-- <el-option label="All" value></el-option> -->
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in platform_list"
            :key="index"
          ></el-option>
        </el-select>

        <el-select
          v-model="filter_form.status"
          placeholder="Status"
          size="mini"
          filterable
          @change="filter_change"
        >
          <div slot="prefix">Status:</div>
          <el-option label="All" value></el-option>
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in status_list"
            :key="index"
          ></el-option>
        </el-select>

        <el-input
          size="mini"
          style="width:300px"
          placeholder="Search by Name or ID"
          @keyup.enter.native="filter_change"
          class="filter-input"
          v-model="filter_form.word"
        >
          <div slot="prefix" style="cursor: pointer">
            <i class="iconfont maps-icon-search" @click="filter_change"></i>
          </div>
        </el-input>
      </section>
    </div>
    <main>
      <el-table
        :data="alarm_list"
        stripe
        height="100%"
        style="width: 100%"
        empty-text="No Data"
        @selection-change="handle_alarm_selection_change"
        header-row-class-name="alarm-table-header"
        :row-style="alarm_row_class"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column width="50" class-name="alarm-status" align="center">
          <template slot-scope="scope">
            <i class="iconfont maps-icon-bell"></i>
          </template>
        </el-table-column>
        <el-table-column label="Details" class-name="alarm-detail">
          <template slot-scope="scope">
            <span class="detail" v-html="scope.row.msg"></span>
            <!-- <span class="ad_set_id">{{scope.row.level_datail}}</span> -->
            <div class="handle-box">
              <span
                v-if="scope.row.status === '1'"
                @click="handle_read_alarm(scope.row.id)"
              >Mark as read</span>
              <span @click="handle_ignore_alarm(scope.row.id)">Ignore</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label width="160" prop="ctime" class-name="alarm-time"></el-table-column>
      </el-table>
    </main>
    <footer class="pagination-footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="Number(alarm_total)"
      ></el-pagination>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {},
  data() {
    return {
      isLoading: false,
      // currentPage: 1,
      pagesize: 10,
      all_alarm: 0,
      unread_alarm: 0,
      alarm_total: 0,
      filter_form: {
        type: "1",
        platform: "1",
        status: "",
        word: "",
        page_size: 10,
        page: 1
      },
      platform_list: [{ label: "FaceBook", value: "1" }],
      status_list: [
        {
          label: "Unread",
          value: "1"
        },
        {
          label: "Read",
          value: "2"
        }
      ],
      alarm_list: [],
      alarm_multiple_selection: []
    };
  },
  computed: {
    ...mapState(["currentPage"])
  },
  methods: {
    ...mapActions(["update_currentPage"]),
    ...mapActions("alarm", ["update_alarm_count"]),
    to_alarm_setting() {
      this.$router.push({ path: "/setting/alert" });
    },
    // 切换alarm类型
    update_alarm_type(type) {
      this.filter_form.type = type;
      if (type === "2") {
        this.filter_form.platform = "";
      } else {
        this.filter_form.platform = "1";
      }
      this.get_alarm_list();
    },
    //   批量操作
    handle_alarm_selection_change(val) {
      this.alarm_multiple_selection = val;
    },
    forbidden_batch() {
      if (this.alarm_multiple_selection.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    check_batch(text) {
      if (!this.forbidden_batch()) {
        this.$message({
          message: `Please select items before ${text} in batches.`,
          duration: 5000,
          offset: 3
        });
        this.account_groups_type = "";
      }
      return this.forbidden_batch();
    },
    get_batch_ids(arr) {
      let data = [];
      arr.forEach(item => {
        data.push(item.id);
      });
      return data.toString();
    },
    handle_batch_read() {
      if (!this.check_batch("make as read")) {
        return false;
      }
      const param = {
        type: "",
        ids: this.get_batch_ids(this.alarm_multiple_selection),
        status: "2"
      };
      this.update_alarm_status(param);
    },
    handle_batch_ignore() {
      if (!this.check_batch("ignore")) {
        return false;
      }
      const param = {
        type: "",
        ids: this.get_batch_ids(this.alarm_multiple_selection),
        status: "0"
      };
      this.update_alarm_status(param);
    },
    // 过滤搜索
    filter_change() {
      this.filter_form.page = 1;
      this.get_alarm_list();
    },
    handleSizeChange(val) {
      this.filter_form.page_size = val;
      this.get_alarm_list();
    },
    handleCurrentChange(val) {
      this.update_currentPage(val);
      this.filter_form.page = val;
      this.get_alarm_list();
    },
    async get_alarm_list() {
      const url = "/alerts/lists";
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        if (data.sum) {
          this.all_alarm = data.sum.all || 0;
          this.unread_alarm = data.sum.unread || 0;
        } else {
          this.all_alarm = 0;
          this.unread_alarm = 0;
        }
        this.alarm_total = data.total || 0;
        // data.list.forEach(item => {
        //   item.detail = '<p>这是一段告警内容<font color="#ff0000">这是告警高亮字段</font></p>'
        // })
        this.alarm_list = data.list || [];
      }
    },
    // table操作
    alarm_row_class(row, rowIndex) {
      const status = row.row.status;
      let style = {
        color: "#333",
        "font-weight": 400
      };
      if (status === "1") {
        style = {
          color: "#0bb3b3",
          "font-weight": "bold"
        };
      } else {
        style = {
          color: "#333",
          "font-weight": 400
        };
      }
      return style;
    },
    handle_read_alarm(id) {
      const param = {
        type: "",
        ids: id,
        status: "2"
      };
      this.update_alarm_status(param);
    },
    handle_ignore_alarm(id) {
      const param = {
        type: "",
        ids: id,
        status: "0"
      };
      this.update_alarm_status(param);
    },
    async update_alarm_status(param) {
      const url = "/alerts/mark";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.update_alarm_count();
        this.get_alarm_list();
      }
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        return false;
      } finally {
        hasLoading && (this.isLoading = false);
      }
    }
  },
  destroyed() {
    this.update_currentPage(1);
  },
  mounted() {
    this.filter_form.page = this.currentPage;
  }
};
</script>
<style lang="scss">
.list-container {
  main {
    .alarm-status,.alarm-time {
      vertical-align: middle;
      i {
        font-size: 24px;
      }
    }
    .alarm-detail {
      .detail,.ad_set_id {
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
      .handle-box {
        span {
          color: #0bb3b3;
          display: inline-block;
          padding-top: 8px;
          margin-right: 15px;
          cursor: pointer;
        }
      }
    }
    .alarm-time {
      color: #333;
    }
  }
}
</style>
<style lang='scss' scoped>
.list-container {
  height: 100%;
  position: relative;
  .alarm-setting {
    position: absolute;
    right: -20px;
    top: -60px;
  }
  .list-filter {
    height: 36px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filter-left {
      display: flex;
      align-items: center;
      .alarm-total {
        height: 32px;
        padding: 0 30px;
        border-right: 1px solid #ddd;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        span:nth-child(1) {
          // font-size: 14px;
          font-size: 1vw;
          color: #666;
          line-height: 24px;
        }
        span:nth-child(2) {
          // font-size: 16px;
          font-size: 1.5vw;
          color: #333;
          font-weight: bold;
          line-height: 24px;
        }
      }
      .alarm-total:nth-child(2) {
        margin-right: 20px;
      }
    }
  }
  main {
    height: calc(100% - 117px);
  }
  footer {
    height: 36px;
    .el-pagination {
      float: right;
    }
  }
}
</style>