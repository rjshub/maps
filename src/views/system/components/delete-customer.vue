<template>
    <el-dialog :title="$t('lang.account_delete_customer_title')"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :before-close="handleClose"
        id="delete_customer"
        width="40%">
        <div class="point">
            <span v-html="$t('lang.account_delete_customer_accounts_confirm')"></span>
        </div>
        <div class="form">
            <el-form :model="delete_form"
                :rules="rules"
                ref="delete_form"
                class="demo-ruleForm">
                <el-form-item style="margin: 0"
                    prop="type">
                    <el-radio v-model="delete_form.type"
                        @change="change_type('new')"
                        label="0">{{$t('lang.account_Create_new_client')}}</el-radio>
                </el-form-item>
                <el-form-item :prop="delete_form.type === '0'? 'recieve_client_name':'mormal'"
                    :class="delete_form.type === '0'? '':'readonly-email'">
                    <el-input v-model="delete_form.recieve_client_name"
                        style="width: 60%"
                        maxlength="20"
                        show-word-limit
                        :readonly="delete_form.type == '1'"
                        :placeholder="$t('lang.public_new_customer_name')"></el-input>
                </el-form-item>
                <el-form-item :prop="delete_form.type === '0'? 'industry_id':'mormal'">
                    <el-select v-model="delete_form.industry_id"
                        style="width:60%"
                        filterable
                        :disabled="delete_form.type == '1'"
                        :placeholder="$t('lang.public_Choose_an_industry_category')">
                        <el-option v-for="item in industry"
                            :key="item.id"
                            :value="item.id"
                            :label="item[`name_${language}`]"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item style="margin: 0"
                    prop="type">
                    <el-radio v-model="delete_form.type"
                        :disabled="other_list.length == 0"
                        @change="change_type('old')"
                        label="1">{{$t('lang.account_Select_from_existing_clients')}}</el-radio>
                </el-form-item>
                <el-form-item :prop="delete_form.type === '1'? 'recieve_client_id':'mormal'"
                    style="margin-bottom: 10px">
                    <el-select v-model="delete_form.recieve_client_id"
                        filterable
                        style="width: 60%"
                        :disabled="delete_form.type == '0'"
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
        <span slot="footer"
            class="dialog-footer">
            <el-button @click="cancel_delete">{{$t('lang.public_button_cancel')}}</el-button>
            <el-button type="primary"
                @click="submit('delete_form')">{{$t('lang.public_button_confirm')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  props: {
    industry: Array
  },
  data() {
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("lang.reg_team_name_required")));
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
      dialogVisible: false,
      other_list: [],
      account_num: 0,
      delete_form: {
        team_id: "",
        type: "0",
        recieve_client_name: "",
        industry_id: "",
        id: "",
        recieve_client_id: "",
      },
      rules: {
        recieve_client_name: [
          {
            required: true,
            validator: validatename,
            trigger: "blur",
          },
        ],
        industry_id: [{ required: true, message: this.$t("lang.reg_customer_industry_required"), trigger: ["blur"] }],
        recieve_client_id: [{ required: true, message: this.$t("lang.account_Select_from_existing_clients"), trigger: ["blur"] }],
        mormal: [{ required: false }],
      },
      already_alient_industry: "",
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["active_team_id"]),
    ...mapState("user", ["language"]),
  },
  methods: {
    show(obj, list) {
      this.dialogVisible = true;
      this.other_list = list;
      this.account_num = obj.count;
      this.delete_form.id = obj.id;
    },
    handleClose(done) {
      this.refresh();
      done();
    },
    refresh() {
      this.already_alient_industry = ''
      this.delete_form = {
        team_id: this.active_team_id,
        type: "0",
        recieve_client_name: "",
        id: "",
        recieve_client_id: "",
        industry_id: ''
      };
      // this.$refs.delete_form.resetFields();
      this.$refs.delete_form.clearValidate();
    },
    change_type(param) {
      if (param === "new") {
        this.delete_form.recieve_client_id = "";
        this.already_alient_industry = "";
      } else {
        this.delete_form.recieve_client_name = "";
        this.delete_form.industry_id = "";
      }
      this.$refs.delete_form.clearValidate();
    },
    cancel_delete() {
      this.dialogVisible = false;
      this.refresh();
    },
    // 选择有存在的客户,获取对应的行业
    change_already_client() {
      this.other_list.forEach((obj) => {
        if (obj.id == this.delete_form.recieve_client_id) {
          this.already_alient_industry = obj.industry_name || ''; //待修改为行业
        }
      });
    },
    submit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.delete_form.team_id = this.active_team_id;
          const url = "/account/clientDel";
          const data = await this.fetchCore(url, this.delete_form, false);
          if (data) {
            this.dialogVisible = false;
            this.refresh();
            this.$emit("delete");
          }
        } else {
          return false;
        }
      });
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
#delete_customer {
  .point {
    & > span {
      font-size: 16px;
      color: #333;
      font-weight: 700;
      line-height: 24px;
    }
    p {
      font-size: 12px;
      color: #999999;
      line-height: 16px;
    }
  }
  .form {
    margin-top: 10px;
  }
}
</style>