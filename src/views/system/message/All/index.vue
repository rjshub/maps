<template>
  <div class="all-message-container" v-loading.fullscreen="isLoading">
    <header>
      <el-tabs v-model="activeName" @tab-click="handle_click_tab">
        <el-tab-pane label="广告智投消息" name="ad"></el-tab-pane>
        <el-tab-pane
          :label="$t('lang.message_System_Notifications')"
          name="system"
        ></el-tab-pane>
        <el-tab-pane
          :label="$t('lang.message_Application_Notifications')"
          name="apply"
        ></el-tab-pane>
      </el-tabs>
      <div class="select-container">
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
      <div class="table-filter">
        <div class="select-container">
          <el-button
            size="mini"
            v-if="activeName !== 'apply'"
            type="primary"
            class="maps-button-mini"
            @click="handle_batch_read"
          >
            <i class="iconfont maps-icon-bell-new" style="margin-right: 5px"></i
            >{{ $t("lang.message_Mark_as_Read") }}
          </el-button>
        </div>
        <div class="select-container">
          <el-select
            v-model="filter_form.type"
            placeholder="类型"
            size="mini"
            style="width: 120px; margin-right: 10px"
            filterable
            @change="filter_change"
          >
            <el-option :label="$t('lang.public_all_type')" value=""></el-option>
            <el-option
              v-for="item in type_list"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.platform"
            v-if="activeName === 'ad'"
            :placeholder="$t('lang.public_platform_placeholder')"
            size="mini"
            style="width: 120px; margin-right: 10px"
            filterable
            @change="filter_change"
          >
            <el-option
              :label="$t('lang.public_all_platform')"
              value=""
            ></el-option>
            <el-option
              v-for="item in platform_config"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="filter_form.status"
            :placeholder="$t('lang.public_status_placeholder')"
            size="mini"
            filterable
            style="width: 120px; margin-right: 10px"
            @change="filter_change"
          >
            <el-option
              :label="$t('lang.public_all_status')"
              value=""
            ></el-option>
            <el-option
              v-for="item in status_list"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-input
            size="mini"
            style="width: 180px"
            :placeholder="$t('lang.message_Search_by_keywords')"
            class="filter-input"
            @keyup.enter.native="filter_change"
            v-model="filter_form.word"
          >
            <div slot="prefix" style="cursor: pointer">
              <i class="iconfont maps-icon-search" @click="filter_change"></i>
            </div>
          </el-input>
        </div>
      </div>
      <component
        :is="activeNav"
        class="table-main"
        @updateList="updateList"
        @batchSelect="batchSelect"
        :data="message_list"
      ></component>
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
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import AdvertisingTable from "./advertising-table";
import ApplyTable from "./apply-table";
import SystemTable from "./system-table";
import moment from "moment";

export default {
  components: {
    AdvertisingTable,
    ApplyTable,
    SystemTable,
  },
  data() {
    return {
      isLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: this.$datePickerShortcuts_2,
      },
      date_list: [
        moment()
          .day(moment().day() - 3)
          .format("YYYY-MM-DD"),
        moment(new Date().getTime()).format("YYYY-MM-DD"),
      ],
      activeName: "ad",
      currentPage: 1,
      pagesize: 10,
      total: 0,
      filter_form: {
        msg_type: "3",
        type: "",
        platform: "",
        status: "",
        word: "",
        page_size: "10",
        page: "1",
        startdate: "",
        enddate: "",
      },
      type_list: [],
      type_config: [],
      status_list: [
        {
          id: "0",
          label: this.$t("lang.public_unread"),
        },
        {
          id: "1",
          label: this.$t("lang.public_read"),
        },
      ],
      message_list: [],
      select_ids: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["platform_config", "active_team_id"]),
    activeNav() {
      const maps = {
        ad: "AdvertisingTable",
        apply: "ApplyTable",
        system: "SystemTable",
      };

      return maps[this.activeName];
    },
  },
  methods: {
    ...mapActions("alarm", ["update_alarm_count"]),
    // 切换类型
    handle_click_tab() {
      this.currentPage = 1;
      this.pagesize = 10;
      this.filter_form.page = "1";
      this.filter_form.page_size = "10";
      this.filter_form.word = "";
      this.filter_form.status = "";
      this.filter_form.platform = "";
      this.init();
    },
    //   批量设置已读
    async handle_batch_read() {
      if (this.select_ids.length === 0) {
        this.$message({
          message: this.$t("lang.public_message_batch_before"),
          duration: 5000,
          offset: 3,
        });
        return false;
      } else {
        const maps = {
          ad: "3", //广告智投
          apply: "2",
          system: "1",
        };
        const url = "/message/setRead";
        const param = {
          team_id: this.active_team_id,
          ids: this.select_ids.join(),
          msg_type: maps[this.activeName]
        };
        const data = await this.fetchCore(url, param, false);
        if (data) {
          this.updateList();
        }
      }
    },
    // 获取类型options
    async get_option_list() {
      const url = "/message/enum";
      const data = await this.fetchCore(url, "", false);
      if (data) {
        this.type_config = data.data.type;
      }
    },

    // 查找列表
    async get_message_list() {
      const maps = {
        ad: "3", //广告智投
        apply: "2",
        system: "1",
      };
      const url = "/message/getList";
      this.filter_form.team_id = this.active_team_id;
      this.filter_form.msg_type = maps[this.activeName];
      this.filter_form.startdate = this.date_list[0];
      this.filter_form.enddate = this.date_list[1];
      const data = await this.fetchCore(url, this.filter_form, true);
      if (data) {
        this.total = data.total;
        this.message_list = this.format_message(data.list);
        this.type_list = this.format_type_list(data.type);
      }
    },
    format_message(arr) {
      if (arr.length) {
        arr.map((item) => {
          item.type_label = this.type_config[item.type];
        });
      }
      return arr;
    },
    format_type_list(arr) {
      let result = [];
      if (arr.length) {
        arr.forEach((item) => {
          result.push({
            id: item,
            label: this.type_config[item],
          });
        });
      }
      return result;
    },
    // 搜索时间
    date_change(param) {
      this.get_message_list();
    },
    filter_change(param, page = "1", page_size = "10") {
      this.filter_form.page = page;
      this.filter_form.page_size = page_size;
      this.get_message_list();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // this.filter_form.page_size = val;
      this.filter_change("", this.filter_form.page, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // this.filter_form.page = val;
      this.filter_change("", val, this.filter_form.page_size);
    },
    refresh_form() {
      this.filter_form = {
        msg_type: "3",
        type: "",
        platform: "",
        status: "",
        word: "",
        page_size: "10",
        page: "1",
      };
      this.select_ids = [];
    },
    updateList() {
      this.update_alarm_count();
      this.get_message_list();
    },
    batchSelect(ids) {
      this.select_ids = ids;
    },
    async init() {
      this.update_alarm_count();
      this.refresh_form();
      await this.get_option_list();
      await this.get_message_list();
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
    if (this.$route.params.type) {
      const type = this.$route.params.type;
      if (type == "1") {
        this.activeName = "system";
      } else if (type == "2") {
        this.activeName = "apply";
      } else if (type == "3") {
        this.activeName = "ad";
      }
    }

    this.init();
  },
};
</script>
<style lang='scss' scoped>
.all-message-container {
  padding: 0;
  margin: 20px 10px 0 10px;
  height: 100%;
  background: #fff;
  & > header {
    height: 40px;
    padding: 0 20px;
    border-bottom: 1px solid #dcdfe6;
    font-size: 16px;
    color: #666666;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & > main {
    height: calc(100% - 41px);
    padding: 0 20px;
    .table-filter {
      padding: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .table-main {
      height: calc(100% - 122px);
    }
    footer {
      text-align: right;
    }
  }
}
</style>