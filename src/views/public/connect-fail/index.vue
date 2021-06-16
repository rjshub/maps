<template>
    <el-dialog :title="$t('lang.account_fail')"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        width="650px"
        custom-class="account-fail-container">
        <div class="connect-main">
            <span>{{$t('lang.account_sync_failed_point')}}</span>
            <el-table :data="account_list"
                stripe
                height="100%"
                style="width: 100%"
                :empty-text="$t('lang.public_no_data')"
                ref="auth_all_account"
                header-row-class-name="list-table-header"
                cell-class-name="list-table-tbody-cell">
                <el-table-column :label="$t('lang.public_platform_placeholder')" width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.platform">
                            <platform-icon :platform="scope.row.platform"></platform-icon>
                        </div>
                        <div v-else>--</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('lang.account_name')"
                    prop="media_advertiser_name"></el-table-column>
                <el-table-column :label="$t('lang.account_id')"
                    prop="media_advertiser_id"></el-table-column>
                <el-table-column :label="$t('lang.account_owner')">
                    <template slot-scope="scope">
                        <div>{{scope.row.username}} ({{scope.row.truename}})</div>
                        <div>{{scope.row.email}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer"
            class="dialog-footer">
            <el-button type="primary"
                @click="dialogVisible = false">{{$t('lang.public_button_Got_it')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      auth_loading: false,
      dialogVisible: false,
      account_list: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id", "team_info", "platform_config"]),
  },
  methods: {
    ...mapActions("system", ["update_fail_showed"]),
    show(list) {
      this.dialogVisible = true;
      this.account_list = list;
    },
    handleClose(done) {
      done();
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.account-fail-container {
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  .el-dialog__header {
    padding: 0 20px;
    height: 40px;
    background: #f6f6f6;
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    line-height: 40px;
  }
  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>
<style lang='scss' scoped>
.account-fail-container {
  .connect-main {
    span {
      display: inline-block;
      font-size: 14px;
      color: #333;
      line-height: 24px;
      margin: 5px 0;
    }
  }
}
</style>