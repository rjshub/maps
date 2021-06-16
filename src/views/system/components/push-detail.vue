<template>
  <maps-drawer
    title="推送详情"
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
      <div class="push-msg">
        <div class="detail">
          <span>推送时间：{{push_info.push_time || '--'}}</span>
          <span>推送平台：{{push_info.platform_name || '--'}}</span>
          <span>推送层级：{{push_info.push_level || '--'}}</span>
        </div>
      </div>
      <div class="push-list">
        <div class="push-filter select-container">
          <el-input
            size="mini"
            style="width:220px"
            placeholder="搜索列表任意关键词"
            class="filter-input"
            v-model="keywords"
          >
            <div
              slot="prefix"
              style="cursor: pointer"
            >
              <i class="iconfont maps-icon-search"></i>
            </div>
          </el-input>
          <span>前往【广告智投】-【广告管理】-<span @click="open_window">【巨量引擎】</span>查看推送详情</span>
        </div>
        <!-- 推送表格 -->
        <div class="push-table">
          <el-table
            :data="filter_list"
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
              label="推送状态"
              width="100"
            >
              <template slot-scope="scope">
                <span :style="status_map[scope.row.push_status].style">{{status_map[scope.row.push_status].label}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="Ad名称/ID"
              v-if="push_info.push_level == 'Ad'"
              width="200"
            >
              <template slot-scope="scope">
                <maps-tooltip :text="scope.row.ad_name">
                  <div class="ellipsis-label">{{scope.row.ad_name}}</div>
                </maps-tooltip>

                <div>ID：{{scope.row.media_ad_id}}</div>
              </template>
            </el-table-column>

            <el-table-column>
              <template
                slot="header"
                slot-scope="scope"
              >
                {{campaign_label[push_info.push_level]}}
              </template>
              <template slot-scope="scope">
                <maps-tooltip :text="scope.row.campaign_name">
                  <div class="ellipsis-label">{{scope.row.campaign_name}}</div>
                </maps-tooltip>
                <div>ID：{{scope.row.media_campaign_id}}</div>
              </template>
            </el-table-column>

            <el-table-column width="200">
              <template
                slot="header"
                slot-scope="scope"
              >
                {{account_label[push_info.push_level]}}
              </template>
              <template slot-scope="scope">
                <maps-tooltip :text="scope.row.media_advertiser_name">
                  <div class="ellipsis-label">{{scope.row.media_advertiser_name}}</div>
                </maps-tooltip>

                <div>ID：{{scope.row.media_advertiser_id}}</div>
              </template>
            </el-table-column>
            <template slot="empty">
              <table-empty></table-empty>
            </template>
          </el-table>
        </div>

      </div>
    </section>
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
      push_info: {},
      keywords: "",
      status_map: {
        0: {
          label: "推送失败",
          style: "color: #FF3333",
        },
        1: {
          label: "推送成功",
          style: "color: #333",
        },
      },
      campaign_label: {
        Campaign: "Campaign名称/ID",
        Ad: "Ad所属Campaign名称/ID",
      },
      account_label: {
        Campaign: "Campaign所属账号名称/ID",
        Ad: "Ad所属账号名称/ID",
      },
      push_list: [],
    };
  },
  watch: {},
  computed: {
    set_campaign_label() {
      return this.campaign_label[this.push_info.push_level];
    },
    filter_list() {
      if (this.keywords && this.push_list.length) {
        let result = [];
        if (this.push_info.level == 1) {
          result = this.push_list.filter((item) => {
            return (
              item.campaign_name.indexOf(this.keywords.toLowerCase()) != -1 ||
              item.media_campaign_id
                .toString()
                .indexOf(this.keywords.toLowerCase()) != -1 ||
              item.media_advertiser_name.indexOf(this.keywords.toLowerCase()) !=
                -1 ||
              item.media_advertiser_id
                .toString()
                .indexOf(this.keywords.toLowerCase()) != -1
            );
          });
        } else {
          result = this.push_list.filter((item) => {
            return (
              item.ad_name.indexOf(this.keywords.toLowerCase()) != -1 ||
              item.media_ad_id
                .toString()
                .indexOf(this.keywords.toLowerCase()) != -1 ||
              item.campaign_name.indexOf(this.keywords.toLowerCase()) != -1 ||
              item.media_campaign_id
                .toString()
                .indexOf(this.keywords.toLowerCase()) != -1 ||
              item.media_advertiser_name.indexOf(this.keywords.toLowerCase()) !=
                -1 ||
              item.media_advertiser_id
                .toString()
                .indexOf(this.keywords.toLowerCase()) != -1
            );
          });
        }
        return result;
      } else {
        return this.push_list;
      }
    },
  },
  methods: {
    show(id = "") {
      this.$refs.mpasDrawer_log.show();
      this.get_push_info(id);
    },
    close_drawer() {
      this.$refs.mpasDrawer_log.close();
    },
    async get_push_info(id) {
      const url = "/message/pushMessageDetail";
      const res = await this.fetchCore(url, { message_id: id }, true);
      const platform_map = {
        1: "巨量引擎",
        2: "腾讯广告",
        3: "微信广告",
      };
      const level_map = {
        1: "Campaign",
        2: "Ad",
      };
      if (res) {
        res.platform_name = platform_map[res.platform];
        res.push_level = level_map[res.level];
        this.push_info = res;
        this.push_list = res.list || [];
      } else {
        this.isLoading = false;
        this.push_info = {
          platform: "",
          platform_name: "",
          push_time: "",
          push_level: "",
        };
        this.push_list = [];
      }
    },

    // keywords_change() {
    //   const param = {
    //     word: this.keywords,
    //   };
    // },
    // 打开新的窗口，后期需判断是哪个平台
    open_window() {
      const origin = window.origin;
      // 跳转广告智投-巨量
      const url = origin + "/china/#/advertising/manage/jl";
      window.open(url);
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
  .push-msg {
    display: flex;
    margin-bottom: 15px;
    & > .detail {
      span {
        display: inline-block;
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        color: #333;
      }
    }
  }
  .push-list {
    height: calc(100% - 102px);
    .push-filter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      span {
        font-size: 12px;
        color: #999;
        line-height: 18px;
      }
      & > span {
        span {
          color: #0bb3b3;
          cursor: pointer;
        }
      }
    }

    .push-table {
      height: calc(100% - 42px);
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