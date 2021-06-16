<template>
  <el-drawer
    :visible.sync="drawer"
    direction="rtl"
    size="50%"
    custom-class="permission-apply-container"
    :close-on-press-escape="false"
    :show-close="false"
    :wrapperClosable="false"
    :destroy-on-close="true"
    v-loading="dialog_row_loading"
  >
    <section class="drawer-header">
      <div>
        <div
          class="back"
          @click="close_drawer"
        >
          <i class="iconfont maps-icon-right"></i>
        </div>
        <span>{{$t('lang.message_Account_permission_request')}}</span>
      </div>
      <div
        class="btn"
        v-if="!is_read"
      >
        <el-button
          size="mini"
          class="maps-button-mini"
          @click="refuse_apply"
          plain
        >{{$t('lang.public_button_Reject_apply')}}</el-button>
        <el-button
          size="mini"
          class="maps-button-mini"
          @click="agree_apply"
          type="primary"
        >{{$t('lang.public_button_Approve_apply')}}</el-button>
      </div>
      <div
        class="btn"
        v-else
      >
        <el-button
          size="mini"
          class="maps-button-mini"
          @click="drawer = false"
          type="primary"
        >{{$t('lang.public_button_Got_it')}}</el-button>
      </div>
    </section>
    <!-- 平台列表 -->
    <section class="apply-accounts">
      <div
        class="applyer"
        v-if="!is_read"
      >
        <span v-html="apply_text"></span>
      </div>
      <span
        class="applyer"
        v-else-if="is_read && agree"
      >
        <span v-html="$t('lang.message_permission_agreed')"></span>
      </span>
      <div
        class="applyer"
        v-else-if="is_read && !agree"
      >
        <span v-html="$t('lang.message_permission_Rejected')"></span>
      </div>
    </section>
    <!-- 模块列表 -->
    <section class="module_table">
      <PermissionSetting
        :key="time_key"
        ref="PermissionSetting"
        @change="permission_change"
        :disabled="is_read || already_auth"
      ></PermissionSetting>
    </section>
  </el-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import PermissionSetting from "./permission-setting";

export default {
  components: { PermissionSetting },
  data() {
    return {
      time_key: new Date().getTime(),
      drawer: false,
      dialog_row_loading: false,
      apply_text: "",
      permission_form: {},
      is_read: false,
      agree: true,
      message_id: "",
      already_auth: false, //已有权限
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["language"]),
  },
  methods: {
    show(row) {
      this.message_id = row.id;
      let text = "";
      if (this.language === "zh") {
        text = row.msg.split("，")[0];
      } else {
        text = row.msg.split(",")[0];
      }
      this.apply_text =
        text +
        this.$t("lang.message_permission_applying") +
        row.msg.split("<br/>")[1];

      this.init();
      this.drawer = true;
      if (row.status == 0) {
        this.is_read = false;
      } else {
        this.is_read = true;
        if (row.deal_status == 1) {
          this.agree = true;
        } else if (row.deal_status == 2) {
          this.agree = false;
        }
      }
      // this.$nextTick(async () => {
      //   await this.get_permission_info(row.id);
      // });
    },
    close_drawer() {
      this.drawer = false;
    },
    get_module_list() {
      this.$nextTick(async () => {
        await this.$refs.PermissionSetting.get_auth_config();
        await this.get_permission_info(this.message_id);
      });
    },
    async get_permission_info(id) {
      const url = "/message/applyPermissionRead";
      const param = {
        id,
      };
      const data = await this.fetchCore(url, param, false);
      if (data) {
        if (data.data && data.data.length) {
          const list = data.data;
          let keys = Object.keys(this.permission_form);
          keys.forEach((item) => {
            const index = list.findIndex((obj) => {
              let obj_key = Object.keys(obj);
              return obj_key[0] === item;
            });
            if (index >= 0) {
              this.permission_form[item] = list[index][item];
            } else {
              this.permission_form[item] = "1";
            }
          });
          this.already_auth = true;
        } else {
          let keys = Object.keys(this.permission_form);
          keys.forEach((item) => {
            this.permission_form[item] = "1";
          });
          this.already_auth = false;
        }
        this.$nextTick(() => {
          this.$refs.PermissionSetting.update_permission(this.permission_form);
        });
      }
    },
    // 修改权限
    permission_change(param) {
      this.permission_form = param;
    },
    refuse_apply() {
      const param = {
        message_id: this.message_id,
        status: 2,
        auth: [],
      };
      this.apply(param);
    },
    agree_apply() {
      const fonrmat_auth = () => {
        let result = [];
        const keys = Object.keys(this.permission_form);
        keys.forEach((item) => {
          let param = {};
          this.$set(param, item, this.permission_form[item]);
          result.push(param);
        });
        return result;
      };
      const param = {
        message_id: this.message_id,
        status: 1,
        auth: fonrmat_auth(),
      };
      this.apply(param);
    },
    async apply(param) {
      const url = "/account/setApply";
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.drawer = false;
        this.$emit("applyed", param.message_id);
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
    init() {
      this.get_module_list();
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.permission-apply-container {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .handle-permission {
    .el-radio-group {
      display: unset;
    }
  }
}
</style>
<style lang='scss' scoped>
.permission-apply-container {
  .drawer-header {
    padding-right: 20px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
    div:nth-child(1) {
      display: flex;
      align-items: center;
    }
    .back {
      height: 24px;
      width: 35px;
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
      margin-right: 20px;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      i {
        font-size: 12px;
      }
    }
    .back:hover {
      background-color: #0bb3b3;
      color: #fff;
    }
  }
  .apply-accounts {
    padding: 0 20px;
    .applyer {
      span {
        display: block;
        line-height: 24px;
        color: #333;
      }
      span:nth-child(1) {
        font-size: 14px;
        font-weight: 700;
      }
      span:nth-child(2) {
        font-size: 12px;
        margin: 5px 0;
      }
    }
  }
  .module_table {
    padding: 0 20px;
    margin-top: 40px;
  }
}
</style>