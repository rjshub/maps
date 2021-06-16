<template>
    <el-dialog :title="title"
        v-loading="isLoading"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        width="45%"
        custom-class="connect-account-container">
        <main>
            <!-- 第一步 -->
            <div class="form"
                v-if="active_step === 1">
                <el-form :model="customer_form"
                    :rules="rules"
                    ref="customer_form"
                    class="demo-ruleForm">
                    <el-form-item style="margin: 0"
                        prop="type">
                        <el-radio v-model="customer_form.type"
                            @change="change_type('new')"
                            label="0">{{$t('lang.account_Create_new_client')}}</el-radio>
                    </el-form-item>
                    <el-form-item :prop="customer_form.type === '0'? 'name':'mormal'"
                        :class="customer_form.type === '0'? '':'readonly-email'">
                        <el-input v-model="customer_form.name"
                            style="width: 60%"
                            maxlength="20"
                            show-word-limit
                            :readonly="customer_form.type == '1'"
                            :placeholder="$t('lang.public_new_customer_name')"></el-input>
                    </el-form-item>
                    <el-form-item :prop="customer_form.type === '0'? 'industry_id':'mormal'">
                        <el-select v-model="customer_form.industry_id"
                            :disabled="customer_form.type == '1'"
                            style="width:60%"
                            filterable
                            :placeholder="$t('lang.public_Choose_an_industry_category')">
                            <el-option v-for="item in industry"
                                :key="item.id"
                                :value="item.id"
                                :label="item[`name_${language}`]"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="margin: 0"
                        prop="type">
                        <el-radio v-model="customer_form.type"
                            :disabled="other_list.length == 0"
                            @change="change_type('old')"
                            label="1">{{$t('lang.account_Select_from_existing_clients')}}</el-radio>
                    </el-form-item>
                    <el-form-item :prop="customer_form.type === '1'? 'client_id':'mormal'"
                        style="margin-bottom: 10px">
                        <el-select v-model="customer_form.client_id"
                            filterable
                            style="width: 60%"
                            :disabled="customer_form.type == '0'"
                            @change="change_already_client"
                            :placeholder="$t('lang.account_Select_from_existing_clients')">
                            <el-option v-for="item in other_list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <div v-if="already_alient_industry"
                        style="font-size: 12px; color: #999;padding-left: 2px">{{$t('lang.account_industry')}}：{{already_alient_industry}}</div>
                </el-form>
            </div>
            <!-- 第二步 -->
            <div v-else-if="active_step === 2"
                class="app-list">
                <el-tabs v-model="activeName">
                    <!-- @tab-click="handle_click_tab" -->
                    <el-tab-pane :name="item.code"
                        v-for="item in platform_list"
                        :key="item.id">
                        <template slot="label">
                            <div style="display: flex;flex-flow:column;align-items: center">
                                <!-- platform_jl_path :class="`maps-icon-${item.code}`"-->
                                <div class="platform-logo"
                                    v-if="activeName == item.code">
                                    <img :src="set_platform_logo(item.code)"
                                        alt="">
                                </div>
                                <i class="iconfont"
                                    v-else
                                    :class="`maps-icon-${item.code}`">
                                </i>
                                <span>{{item.name}}</span>
                            </div>
                        </template>
                    </el-tab-pane>
                </el-tabs>
                <div v-if="set_account_list.length">
                    <el-table :data="set_account_list"
                        style="width: 100%"
                        stripe
                        max-height="200px">
                        <el-table-column prop="media_advertiser_name"
                            :label="$t('lang.account_connected')+$t('lang.account_name')">
                        </el-table-column>
                        <el-table-column prop="media_advertiser_id"
                            :label="$t('lang.account_connected')+$t('lang.account_id')">
                        </el-table-column>
                    </el-table>
                </div>
                <div v-else
                    class="list_empty">
                    <i class="iconfont maps-icon-links"></i>
                    <span>{{$t('lang.account_connect_new_1')+set_platform_name+$t('lang.account_connect_new_2')}}</span>
                </div>
                <p v-if="activeName == 'jl'"
                    v-html="$t('lang.account_note')"></p>
            </div>
        </main>
        <span slot="footer"
            class="dialog-footer">
            <el-button @click="cancel_connect">{{$t('lang.public_button_cancel')}}</el-button>
            <el-button type="primary"
                @click="submit(active_step)">{{button_text}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import platform_jl_path from "@/assets/image/platform/jl.svg";
import platform_tx_path from "@/assets/image/platform/tx.svg";
import platform_wx_path from "@/assets/image/platform/wx.svg";

export default {
  components: {},
  props: {
    industry: Array,
  },
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_customer_name_required")));
      } else {
        value = value.replace(/[^\'\"\’\‘\“\”]/g, "");
        const reg = this.$constReg.input_word; //除了引号都允许
        if (reg.test(value)) {
          callback(new Error(this.$t("lang.reg_not_quotes")));
        } else {
          callback();
        }
      }
    };
    return {
      platform_jl_path: platform_jl_path,
      platform_tx_path: platform_tx_path,
      platform_wx_path: platform_wx_path,
      dialogVisible: false,
      isLoading: false,
      other_list: [],
      title: this.$t("lang.account_create_choose_customer"),
      active_step: 1,
      button_text: this.$t("lang.public_button_next"),
      customer_form: {
        type: "0",
        name: "",
        industry_id: "",
        delete_id: "",
        client_id: "",
        team_id: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: validatename,
            trigger: "blur",
          },
        ],
        industry_id: [{ required: true, message: this.$t("lang.reg_customer_industry_required"), trigger: ["blur"] }],
        client_id: [{ required: true, message: this.$t("lang.account_Select_from_existing_clients"), trigger: ["blur"] }],
        mormal: [{ required: false }],
      },
      already_alient_industry: "",
      //   选择平台账户
      activeName: "jl",
      platform_list: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("user", ["language"]),
    set_account_list() {
      let result = [];
      const index = this.platform_list.findIndex((obj) => {
        return this.activeName === obj.code;
      });
      if (index >= 0) {
        result = this.platform_list[index].list;
      } else {
        result = [];
      }
      return result;
    },
    set_platform_name() {
      let title = "";
      const index = this.platform_list.findIndex((obj) => {
        return this.activeName === obj.code;
      });
      if (index >= 0) {
        title = this.platform_list[index].name;
      } else {
        title = [];
      }
      return title;
    },
  },
  methods: {
    show(list) {
      this.dialogVisible = true;
      this.other_list = list;
    },
    handleClose(done) {
      this.refresh();
      done();
    },
    change_type(type) {
      if (type === "old") {
        this.customer_form.name = "";
        this.customer_form.industry_id = "";
      } else {
        this.customer_form.client_id = "";
        this.already_alient_industry = "";
      }
      // this.$refs.customer_form.resetFields();
      this.$refs.customer_form.clearValidate();
    },
    // 设置logo
    set_platform_logo(code) {
      const map = {
        jl: this.platform_jl_path,
        tx: this.platform_tx_path,
        wx: this.platform_wx_path,
      };
      return map[code];
    },
    // 选择有存在的客户,获取对应的行业
    change_already_client() {
      this.other_list.forEach((obj) => {
        if (obj.id == this.customer_form.client_id) {
          this.already_alient_industry = obj.industry_name || ""; //待修改为行业
        }
      });
    },
    handle_click_tab() {},
    // 获取对应平台下的关联账号
    async get_platform_list() {
      const url = "/account/authorizedList";
      const param = {
        team_id: this.active_team_id,
        client_id: this.customer_form.client_id,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.platform_list = data;
        this.activeName = data[0].code;
      }
    },
    refresh() {
      this.dialogVisible = false;
      this.already_alient_industry = "";
      this.active_step = 1;
      this.button_text = this.$t("lang.public_button_next");
      this.customer_form = {
        type: "0",
        name: "",
        delete_id: "",
        client_id: "",
        team_id: "",
        industry_id: "",
      };
      this.$refs.customer_form.clearValidate();
    },
    cancel_connect() {
      this.dialogVisible = false;
      this.refresh();
    },
    submit(active) {
      if (active === 1) {
        this.$refs.customer_form.validate(async (valid) => {
          if (valid) {
            if (this.customer_form.type === "0") {
              const url = "/account/clientAdd";
              const param = {
                team_id: this.active_team_id,
                name: this.customer_form.name,
                industry_id: this.customer_form.industry_id,
              };
              const data = await this.fetchCore(url, param, false);
              if (data) {
                this.customer_form.client_id = data.id;
                this.$emit("firstEnd", this.customer_form);
                this.active_step = 2;
                this.title = this.$t("lang.account_Select_ad_platform");
                this.button_text = this.$t("lang.account_connect");
                this.get_platform_list();
              }
            } else {
              this.$emit("firstEnd", this.customer_form);
              this.active_step = 2;
              this.title = this.$t("lang.account_Select_ad_platform");
              this.button_text = this.$t("lang.account_connect");
              this.get_platform_list();
            }
          } else {
            return false;
          }
        });
      } else if (active === 2) {
        let target = "";
        const index = this.platform_list.findIndex((obj) => {
          return this.activeName === obj.code;
        });
        if (index >= 0) {
          target = this.platform_list[index].target;
          // target = 'http://localhost:8082/#/maps/auth?type=success&id=9';
          window.open(
            target,
            "newwindow",
            "height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no"
          );
          this.dialogVisible = false;
          this.refresh();
        }
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
  mounted() {
    this.active_step = 1;
  },
};
</script>
<style lang='scss'>
.connect-account-container {
  main {
    .app-list {
      .el-tabs {
        border-bottom: 1px solid #eeeeee;
        .el-tabs__nav-scroll {
          .el-tabs__nav {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            .el-tabs__active-bar {
              height: 0px;
            }
            .el-tabs__item {
              height: auto;
              display: flex;
              flex-flow: column;
              align-items: center;
              color: #b1b1b1;
              border: none;
              i {
                font-size: 38px;
              }
              .maps-icon-tx {
                font-size: 22.5px;
              }
              .maps-icon-wx {
                font-size: 28.5px;
              }
              .platform-logo {
                height: 38px;
                width: 38px;
                display: flex;
                align-items: center;
                img {
                  display: block;
                  width: 100%;
                }
              }
              span {
                font-size: 12px;
              }
            }
            .el-tabs__item.is-active {
              i {
                // color: #0099ff;
              }
              span {
                color: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.connect-account-container {
  main {
    .app-list {
      p {
        font-size: 12px;
        line-height: 16px;
        color: #333;
        margin-top: 15px;
        word-break: break-word;
      }
      .list_empty {
        color: #cccccc;
        height: 200px;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        i {
          font-size: 64px;
        }
        span {
          font-size: 24px;
        }
      }
    }
  }
}
</style>