<template>
  <maps-drawer
    title="规则检测详情"
    :loading="isLoading"
    @close="close_drawer"
    size="50%"
    class="push-detail-drawer"
    ref="mpasDrawer_log"
  >
    <div
      slot="drawerBody"
      style="height: 100%; overflow-y: auto"
    >
      <section>
        <header>
          1 触发规则详情
        </header>
        <main>
          <div class="msg-item">
            <div class="title">任务名称：</div>
            {{ check_info.rule_task_name || '--' }} ({{ check_info.rule_task_rid }})
          </div>
          <div class="msg-item">
            <div class="title">规则名称：</div>
            {{ check_info.rule_name }} ({{ check_info.rule_rid }})
          </div>
          <div class="msg-item">
            <div class="title">执行对象：</div>
            <div>
              <span style="color: #0bb3b3">
                {{level_map[check_info.level]}}: {{ check_info.object_name }} ({{ check_info.object_id }})
              </span>
              <span v-if="check_info.level == '2'">
                所属Campaign：{{ check_info.campaign_name }} ({{
              check_info.media_campaign_id
            }})
              </span>
              <span>
                所属账号：{{ check_info.media_advertiser_name }} ({{
              check_info.media_advertiser_id
            }})
              </span>
            </div>
          </div>
          <!-- <div style="clear: both"></div> -->

          <div class="msg-item">
            <div class="title">触发详情：</div>
            <div>
              <span>触发规则时，运行对象满足规则的条件如下</span>
              <el-table
                ref="multipleTable"
                :data="table_list"
                tooltip-effect="dark"
                style="width: 100%; margin: 15px 0;font-size: 12px"
                max-height="500px"
              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50"
                >
                </el-table-column>
                <el-table-column
                  :label="`条件检测详情（满足以下${check_info.open_connect == 1? '所有':'任一'}条件）`"
                  prop="result"
                > </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- <div style="clear: both"></div> -->

          <div class="msg-item">
            <div class="title">计算范围：</div>
            {{ range_map[check_info.range] || "--" }}
          </div>
        </main>
      </section>
      <section>
        <header>
          2 执行操作与处理详情
        </header>
        <main>
          <div class="msg-item">
            <div class="title">系统执行操作：</div>
            {{ check_info.operations || "--" }}
          </div>
          <div class="msg-item">
            <div class="title">最终处理：</div>
            {{ check_info.final_operation_str || "--" }}
          </div>
        </main>
      </section>

    </div>
  </maps-drawer>
</template>

<script>
export default {
  components: {},
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isLoading: false,
      table_list: [],
      check_info: {},
      range_map: {
        1: "单个Campaign",
        2: "1个账号下全部Campaign（总是包括新建Campaign）",
        3: "1个账号下选中的Campaign",
        4: "单个Ad",
        5: "1个账号下全部Ad（总是包括新建Ad）",
        6: "1个账号下选中的Ad",
        7: "1个Campaign下全部Ad（总是包括新建Ad）",
        8: "1个Campaign下选中的Ad",
      },
      level_map: {
        1: "Campaign",
        2: "Ad",
      },
    };
  },
  watch: {},
  methods: {
    show(param) {
      this.$refs.mpasDrawer_log.show();
      this.get_check_info(param);
    },
    close_drawer() {
      this.$refs.mpasDrawer_log.close();
    },
    get_check_info(config) {
      this.check_info = config;
      this.table_list = this.format_table(
        JSON.parse(this.check_info.open_condition) || []
      );
    },
    format_table(arr) {
      let result = [];
      if (arr.length) {
        arr.forEach((item) => {
          const row = {
            result: item,
          };
          result.push(row);
        });
      }
      return result;
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.push-detail-drawer {
  header {
    height: 40px;
    padding: 0 10px;
    margin-bottom: 10px;
    background: #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    font-weight: 700;
  }
  main {
    margin-bottom: 10px;
    .msg-item {
      width: 100%;
      font-size: 12px;
      color: #666;
      line-height: 26px;
      display: flex;
      .title {
        // float: left;
        word-break: keep-all;
      }
      & > div:not(.title) {
        // float: left;
        flex: 1;
        display: flex;
        flex-flow: column;
        span {
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
}
</style>