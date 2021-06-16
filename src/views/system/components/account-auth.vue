<template>
  <el-dialog
    :title="$t('lang.account_confirm_want_connect')"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    width="600px"
    custom-class="account-auth-container"
  >
    <div class="connect-main" v-loading="auth_loading">
      <div class="connect-filter select-container">
        <el-input
          size="mini"
          style="width: 100%"
          :placeholder="$t('lang.account_search_name_id')"
          @keyup.enter.native="connect_accounts_keywords_change"
          class="filter-input"
          v-model="connect_accounts_word"
        >
          <div slot="prefix" style="cursor: pointer">
            <i
              class="iconfont maps-icon-search"
              @click="connect_accounts_keywords_change"
            ></i>
          </div>
        </el-input>
        <!-- <span style="color: #666">{{`${connect_account_multiple_selection.length} of ${connect_account_list.length} Accounts`}}</span> -->
      </div>
      <div class="connect-list">
        <el-table
          :data="set_auth_account_list"
          stripe
          height="100%"
          style="width: 100%"
          :empty-text="$t('lang.public_no_data')"
          ref="auth_all_account"
          @selection-change="handle_connect_account_selection_change"
          header-row-class-name="list-table-header"
          cell-class-name="list-table-tbody-cell"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column
            :label="$t('lang.account_name')"
            prop="advertiser_name"
          >
            <template slot-scope="scope">{{
              scope.row.advertiser_name || "--"
            }}</template>
          </el-table-column>
          <el-table-column
            :label="$t('lang.account_id')"
            prop="advertiser_id"
          ></el-table-column>
        </el-table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handle_cancel_connect_account">{{
        $t("lang.public_button_cancel")
      }}</el-button>
      <el-button
        type="primary"
        :disabled="!connect_account_multiple_selection.length"
        @click="handle_save_connect_account"
        >{{ $t("lang.public_button_connect") }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      auth_loading: false,
      dialogVisible: false,
      connect_account_list: [],
      connect_accounts_word: "",
      connect_account_multiple_selection: [],
      request_param: {},
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id"]),
    set_auth_account_list() {
      let groups = [];
      if (this.connect_accounts_word) {
        this.connect_account_list.forEach((item) => {
          item.advertiser_name = item.advertiser_name || "";
          if (
            item.advertiser_name
              .toLowerCase()
              .includes(this.connect_accounts_word.toLowerCase()) ||
            item.advertiser_name.toLowerCase() ==
              this.connect_accounts_word.toLowerCase() ||
            item.advertiser_id
              .toString()
              .includes(this.connect_accounts_word.toLowerCase()) ||
            item.advertiser_id == this.connect_accounts_word.toLowerCase()
          ) {
            groups.push(item);
          }
        });
      } else {
        groups = this.connect_account_list;
      }

      return groups;
    },
  },
  methods: {
    ...mapActions("system", ["update_connect_sync"]),
    show(param) {
      this.dialogVisible = true;
      this.request_param = param;
      this.get_auth_account_list(param);
    },
    handleClose(done) {
      this.connect_account_list = [];
      this.connect_accounts_word = "";
      this.connect_account_multiple_selection = [];
      this.request_param = {};
      this.update_connect_sync(false);
      done();
    },
    async get_auth_account_list(param) {
      this.auth_loading = true;
      const url = "/account/relateConfirm";
      const data = await this.fetchCore(url, param, false);
      if (data) {
        this.connect_account_list = data;
        this.auth_loading = false;
        this.$refs.auth_all_account.toggleAllSelection();
      } else {
        this.auth_loading = false;
      }
    },
    connect_accounts_keywords_change() {
      // 前端设置关键词筛选
    },
    handle_connect_account_selection_change(val) {
      this.connect_account_multiple_selection = val;
    },
    handle_cancel_connect_account() {
      this.dialogVisible = false;
      this.connect_account_multiple_selection = [];
    },
    async handle_save_connect_account() {
      this.auth_loading = true;

      // let ids = [];
      // this.connect_account_multiple_selection.forEach((item) => {
      //   ids.push(item.advertiser_id);
      // });
      let ids = this.connect_account_multiple_selection;

      const url = "/account/relateAccount";

      this.$set(this.request_param, "accounts", ids);
      const data = await this.fetchCore(url, this.request_param, false);
      if (data) {
        this.update_connect_sync(true).then(() => {
          this.auth_loading = false;
          this.dialogVisible = false;
        });

        if (data.no_relate && data.no_relate.length) {
          this.$emit("conectSuccess", data.no_relate);
          if (data.no_relate.length < ids.length) {
            this.$message({
              message: this.$t("lang.account_auth_point"),
              duration: 5000,
              type: "error",
              offset: 3,
            });
          }
        } else {
          this.$emit("conectSuccess");
          this.$message({
            message: this.$t("lang.account_auth_point"),
            duration: 5000,
            type: "error",
            offset: 3,
          });
        }
      } else {
        this.auth_loading = false;
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
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.account-auth-container {
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
.account-auth-container {
  .connect-main {
    .connect-filter {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .connect-list {
      height: 340px;
    }
  }
}
</style>