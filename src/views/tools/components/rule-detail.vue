<template>
  <maps-drawer
    :title="$t('lang.intelligent_rule_detail_title')"
    :loading="isLoading"
    @close="close_drawer"
    class="rule-detail-drawer"
    ref="mpasDrawer_log"
  >
    <main slot="drawerBody">
      <section>
        <header>
          1 {{ $t("lang.intelligent_rule_detail_config.Basic_Settings") }}
        </header>
        <main>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.rule_name") }}
            </div>
            ：
            <div class="content">{{ rule_info.rule_name }}</div>
          </div>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.platform") }}
            </div>
            ：
            <div class="content">{{ rule_info.platform }}</div>
          </div>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.range") }}
            </div>
            ：
            <div class="content">{{ rule_info.range }}</div>
          </div>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.check_time") }}
            </div>
            ：
            <div class="content">
              <span v-html="rule_info.check_time"></span>
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.open_condition") }}
            </div>
            ：
            <div class="content">
              {{
                `(${rule_info.open_connect || "--"}) ${
                  rule_info.open_condition
                }`
              }}
            </div>
          </div>
          <div
            class="info-item"
            v-if="
              rule_info.remove_condition && rule_info.remove_condition.length
            "
          >
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.remove_condition") }}
            </div>
            ：
            <div class="content">
              {{
                `(${rule_info.remove_connect || "--"}) ${
                  rule_info.remove_condition
                }`
              }}
            </div>
          </div>
          <div class="info-item">
            <div class="title">
              {{ $t("lang.intelligent_rule_detail_config.operation") }}
            </div>
            ：
            <div class="content">{{ rule_info.operation }}</div>
          </div>
        </main>
      </section>
      <section>
        <header>2 规则运行对象</header>
        <main>
          <el-table
            ref="multipleTable"
            :data="running_list"
            tooltip-effect="dark"
            style="width: 100%; margin: 5px 0"
            max-height="500px"
          >
            <el-table-column
              label="序号"
              type="index"
              width="50"
            >
            </el-table-column>
            <el-table-column
              label="任务名称"
              min-width="140"
              prop="task_name"
            >
              <tamplate slot-scope="scope">
                {{scope.row.task_name || '--'}}
              </tamplate>
            </el-table-column>
            <el-table-column
              label="任务ID"
              width="80"
              prop="task_rid"
            >
            </el-table-column>
            <el-table-column
              label="所属平台"
              width="90"
              prop="platform"
            >
              <template slot-scope="scope">
                <platform-icon :platform="scope.row.platform"></platform-icon>
              </template>
            </el-table-column>
            <el-table-column
              :label="`${rule_info.range} ID`"
              width="150"
              prop="ad_id"
            >
              <template slot-scope="scope">
                {{ scope.row[`media_${range_map[rule_info.range]}_id`] }}
              </template>
            </el-table-column>
            <el-table-column
              :label="`${rule_info.range} 名称`"
              show-overflow-tooltip
              min-width="150"
              prop="ad_name"
            >
              <template slot-scope="scope">
                {{ scope.row[`${range_map[rule_info.range]}_name`] }}
              </template>
            </el-table-column>
          </el-table>
        </main>
      </section>
    </main>
  </maps-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      rule_info: {},
      running_list: [],
      range_map: {
        Campaign: "campaign",
        Ad: "ad",
      },
    };
  },
  watch: {},
  methods: {
    show(id) {
      this.$refs.mpasDrawer_log.show();
      this.get_rule_info(id);
    },
    async get_rule_info(id) {
      const url = "/rule/listdetail";
      const res = await this.fetchCore(url, { id }, true);
      if (res) {
        this.rule_info = this.format_info(res.detail);
        this.running_list = res.list;
      }
    },
    format_info(info) {
      // 条件
      info.open_condition =
        info.open_condition.length > 1
          ? info.open_condition.join("、")
          : info.open_condition[0];
      info.remove_condition =
        info.remove_condition.length > 1
          ? info.remove_condition.join("、")
          : info.remove_condition[0] || "";

      //   频率
      const week = {
        0: this.$t("lang.public_Monday"),
        1: this.$t("lang.public_Tuesday"),
        2: this.$t("lang.public_Wednesday"),
        3: this.$t("lang.public_Thursday"),
        4: this.$t("lang.public_Friday"),
        5: this.$t("lang.public_Saturday"),
        6: this.$t("lang.public_Sunday"),
      };

      if (info.period == "1") {
        info.check_time = `${this.$t("lang.public_all_day")}（${
          info.interval
        }）`;
      } else if (info.period == "2") {
        let result = `${this.$t("lang.public_Custom")}（${
          info.interval
        }）<br/>`;
        info.timeline.forEach((item, index) => {
          if (item) {
            result += `${week[index]}：${item}<br/>`;
          }
        });
        info.check_time = result;
      } else {
        info.check_time = "-";
      }

      //   操作
      info.operation =
        info.operation.length > 1
          ? info.operation.join("、")
          : info.operation[0];

      return info;
    },
    close_drawer() {
      this.$refs.mpasDrawer_log.close();
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
.rule-detail-drawer {
  .drawer-body {
    & > main {
      height: 100%;
      overflow-y: auto;
      section {
        header {
          height: 40px;
          padding: 0 10px;
          background: #ebebeb;
          border-radius: 3px;
          font-size: 14px;
          color: #333;
          line-height: 40px;
          font-weight: 700;
        }
        & > main {
          padding: 10px;
          .info-item {
            font-size: 12px;
            color: #666;
            line-height: 30px;
            display: flex;
            .title {
              font-weight: 700;
              word-break: keep-all;
            }
            .content {
              flex: 1;
            }
          }
        }
      }
    }
  }
}
</style>