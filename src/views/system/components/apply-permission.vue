<template>
    <el-dialog :title="title"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        width="40%"
        custom-class="apply-permission-container">
        <main>
            <header>
                <span>{{$t('lang.account_apply_permission_confirm')}}</span>
                <span>{{$t('lang.account_apply_permission_point')}}</span>
            </header>
            <el-table :data="select_list"
                style="width: 100%">
                <el-table-column prop="platform"
                    :label="$t('lang.public_platform_placeholder')"
                    width="80">
                    <template slot-scope="scope">
                        <platform-icon :platform="scope.row.platform"></platform-icon>
                    </template>
                </el-table-column>
                <el-table-column prop="media_advertiser_name"
                    :label="$t('lang.account_name')">
                </el-table-column>
                <el-table-column prop="media_advertiser_id"
                    :label="$t('lang.account_id')">
                </el-table-column>
            </el-table>
        </main>
        <span slot="footer"
            class="dialog-footer">
            <el-button @click="dialogVisible = false">{{$t('lang.public_button_cancel')}}</el-button>
            <el-button type="primary"
                :loading="isLoading"
                @click="submit">{{$t('lang.public_button_apply')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "申请账号权限",
    },
  },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      select_ids: "",
      select_list: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id", "platform_config"]),
  },
  methods: {
    show(ids, list) {
      this.dialogVisible = true;
      this.select_ids = ids;
      this.select_list = list;
    },
    handleClose(done) {
      done();
    },
    async submit() {
      const url = "/account/memeberApplyAccount";
      const param = {
        team_id: this.active_team_id,
        advertiser_id: this.select_ids,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.$emit("applySuccess");
        this.dialogVisible = false;
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
.apply-permission-container {
  main {
    header {
      color: #333;
      line-height: 24px;
      span {
        display: inline-block;
        width: 100%;
        line-height: 24px;
      }
      span:nth-child(1) {
        font-size: 16px;
        font-weight: 700;
      }
      span:nth-child(2) {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>