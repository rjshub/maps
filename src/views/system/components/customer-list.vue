<template>
    <div class="customer-list">
        <div style="padding: 10px"
            v-if="list.length">
            <el-input size="mini"
                :placeholder="$t('lang.public_customer_name_placeholder')"
                class="filter-input"
                @keyup.enter.native="filter_change"
                v-model="word">
                <div slot="prefix"
                    style="cursor: pointer">
                    <i class="iconfont maps-icon-search"
                        @click="filter_change"></i>
                </div>
            </el-input>
        </div>
        <main>
            <el-table :data="set_customer_list"
                v-if="list.length"
                height="100%"
                style="width: 100%"
                @selection-change="handle_selection_change"
                @cell-mouse-enter="handle_row_hover_enter"
                @cell-mouse-leave="handle_row_hover_leave"
                header-row-class-name="group-table-header"
                cell-class-name="group-table-tbody-cell">
                <el-table-column type="selection"
                    align="right"
                    width="29"></el-table-column>
                <el-table-column :label="$t('lang.public_all_customer')"
                    :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <i class="iconfont maps-icon-user3"
                            style="margin-right: 5px"></i>
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column :label="total"
                    prop="cnt"
                    width="70"
                    align="right">
                    <template slot-scope="scope">
                        <div class="handle_group"
                            v-if="active_customer_id === scope.row.id && account_manage">
                            <el-button size="mini"
                                type="text"
                                @click="handle_edit_customer(scope.row)">
                                <i class="iconfont maps-icon-edit"></i>
                            </el-button>
                            <el-button size="mini"
                                style="margin-left: unset"
                                type="text"
                                @click="handle_delete_customer(scope.row)">
                                <i class="iconfont maps-icon-trash"></i>
                            </el-button>
                        </div>
                        <span v-else>{{scope.row.num}}</span>
                    </template>
                </el-table-column>
                <template slot="empty">
                    <table-empty></table-empty>
                </template>
            </el-table>
            <!-- 添加客户 -->
            <div class="group_add_dialog"
                v-show="add_dialog">
                <header class="title">{{set_title}}
                    <span @click="cancel_create_group">&times</span>
                </header>
                <main>
                    <el-form :model="customer_form"
                        :rules="rules"
                        ref="customer_form">
                        <el-form-item prop="name">
                            <el-input v-model="customer_form.name"
                                maxlength="20"
                                show-word-limit
                                :placeholder="$t('lang.public_Enter_client_name')"
                                @keyup.enter.native="submit_customer_form('customer_form')"></el-input>
                        </el-form-item>
                        <el-form-item prop="industry_id">
                            <el-select v-model="customer_form.industry_id"
                                style="width:100%"
                                filterable
                                :placeholder="$t('lang.public_Choose_an_industry_category')">
                                <el-option v-for="item in industry"
                                    :key="item.id"
                                    :value="item.id"
                                    :label="item[`name_${language}`]"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary"
                                size="mini"
                                @click="submit_customer_form('customer_form')"
                                style="float: right">{{$t('lang.public_button_save')}}</el-button>

                            <el-button @click="cancel_create_group"
                                size="mini"
                                style="float: right;margin-right:10px">{{$t('lang.public_button_cancel')}}</el-button>
                        </el-form-item>
                    </el-form>
                </main>
            </div>
            <!-- 删除客户 -->
            <DeleteCustomerDialog ref="DeleteCustomerDialog"
                :industry="industry"
                @delete="delete_success"></DeleteCustomerDialog>
            <!-- 空 -->
            <div v-if="list.length == 0"
                class="list-empty"
                style="width: 140px">
                <i class="iconfont maps-icon-nodata"></i>
                <span>{{$t('lang.public_no_data')}}</span>
                <span>{{$t('lang.account_try_add_new_customer')}}</span>
            </div>
        </main>
    </div>

</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";
import DeleteCustomerDialog from "./delete-customer";

export default {
  components: { DeleteCustomerDialog },
  props: {
    list: {
      type: Array,
    },
    total: {
      type: [Number, String],
    },
    industry: {
      type: Array,
    },
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
      range_Number: 10,
      word: "",
      active_customer_id: "",
      multiple_customer: [],
      handle_customer: "clientAdd",
      add_dialog: false,
      customer_form: {
        team_id: "",
        name: "",
        industry_id: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: validatename,
            trigger: "blur",
          },
        ],
        industry_id: [
          {
            required: true,
            message: this.$t("lang.reg_customer_industry_required"),
            trigger: "blur",
          },
        ],
      },
      is_remove: false, // 新建移动账号
      // title_style:
    };
  },
  computed: {
    ...mapState("system", ["account_manage", "active_team_id"]),
    ...mapState("user", ["language"]),
    set_title() {
      let title = this.$t("lang.account_add_customer_title");
      if (this.handle_customer === "clientAdd") {
        title = this.$t("lang.account_add_customer_title");
      } else {
        title = this.$t("lang.account_edit_customer_title");
      }
      return title;
    },
    set_customer_list() {
      let groups = [];
      if (this.word) {
        this.list.forEach((item) => {
          if (item.name.toLowerCase().includes(this.word.toLowerCase()) || item.name.toLowerCase() == this.word.toLowerCase()) {
            groups.push(item);
          }
        });
      } else {
        groups = this.list;
      }
      return groups;
    },
  },
  watch: {},
  methods: {
    loadMore(n) {
      return () => (this.range_Number += 5); //每次滚动到底部可以新增条数  可自定义
    },
    filter_change(param) {},
    // 复选
    handle_selection_change(val) {
      this.multiple_customer = this.format_ids(val);
      this.$emit("change_customer_ids", this.multiple_customer);
    },
    format_ids(arr) {
      const result = [];
      arr.forEach((item) => {
        result.push(item.id);
      });
      return result;
    },
    handle_row_hover_enter(row, column, cell, event) {
      if (row.id !== "0") {
        this.active_customer_id = row.id;
      } else {
        this.active_customer_id = "";
      }
    },
    handle_row_hover_leave() {
      this.active_customer_id = "";
    },
    // 客户操作
    handle_edit_customer(row) {
      this.handle_customer = "clientEdit";
      this.add_dialog = true;
      this.customer_form.name = row.name;
      this.customer_form.industry_id = row.industry_id
      this.$set(this.customer_form, "id", row.id);
    },
    handle_delete_customer(row) {
      const other = [];
      this.list.forEach((item) => {
        if (item.id !== row.id) {
          other.push(item);
        }
      });
      if (row.num > 0) {
        this.$refs.DeleteCustomerDialog.show(row, other);
      } else {
        this.$confirm(this.$t("lang.account_delete_customer_confirm"), this.$t("lang.account_delete_customer_title"), {
          confirmButtonText: this.$t("lang.public_button_confirm"),
          cancelButtonText: this.$t("lang.public_button_cancel"),
          type: "warning",
        })
          .then(async () => {
            const url = "/account/clientDel";
            const param = {
              team_id: this.active_team_id,
              id: row.id,
            };
            const data = await this.fetchCore(url, param, false);
            if (data) {
              this.$emit("handleSuccess", { remove: false });
            }
          })
          .catch(() => {
            return false;
          });
      }
    },
    // 有账号的客户删除成功
    delete_success() {
      this.$emit("handleSuccess", { remove: false });
    },
    handle_add_customer(type) {
      this.handle_customer = "clientAdd";
      this.add_dialog = true;
      if (type === "remove_account") {
        this.is_remove = true;
      } else {
        this.is_remove = false;
      }
    },
    submit_customer_form(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.customer_form.team_id = this.active_team_id;
          const url = `/account/${this.handle_customer}`;
          const data = await this.fetchCore(url, this.customer_form, true);
          if (data) {
            this.$refs[formName].resetFields();
            this.add_dialog = false;
            this.$emit("handleSuccess", { remove: this.is_remove, id: data.id });
          }
        } else {
          return false;
        }
      });
    },
    cancel_create_group() {
      this.add_dialog = false;
      this.customer_form.name = "";
      this.customer_form.industry_id = "";
      this.$refs.customer_form.clearValidate();
      this.$refs.customer_form.resetFields();
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
<style lang="scss">
.customer-list {
  .el-table {
    background: #fafafa;
  }

  .el-table-column--selection,
  .group-table-tbody-cell {
    background: #fafafa;
    .el-checkbox {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .group-table-header {
    .el-table-column--selection {
      .cell {
        position: unset;
      }
    }
  }

  .group-table-header {
    th {
      background: #fafafa !important;
      color: #333;
      font-weight: 500;
    }
  }
  .el-table td,
  .el-table th {
    padding: 6px 0;
    border-bottom: 0px;
  }
  .handle_group {
    .el-button--mini {
      padding: 0;
    }
  }
}
</style>
<style lang='scss' scoped>
.customer-list {
  height: 100%;
  background: #fafafa;
  overflow-y: auto;
  & > main {
    height: calc(100% - 52px);
    overflow-y: auto;

    .group_add_dialog {
      height: 230px;
      width: 300px;
      background: #fff;
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      z-index: 99;
      .title {
        height: 40px;
        background: #f6f6f6;
        padding: 0 20px;
        color: #333;
        font-weight: bold;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 18px;
          cursor: pointer;
        }
      }
      main {
        padding: 20px 20px 0 20px;
      }
    }

    .list-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      color: #999999;
      font-size: 14px;
      text-align: center;
      & > i {
        font-size: 70px;
      }
      span {
        margin-top: 20px;
      }
      & > span:nth-of-type(1) {
        color: #333;
        font-size: 16px;
        font-weight: bold;
      }
      & > span:nth-of-type(2) {
        color: #666;
      }
    }
  }
}
</style>