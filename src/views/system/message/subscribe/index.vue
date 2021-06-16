<template>
  <div
    class="subscribe-container"
    v-loading="isLoading"
  >
    <header>
      <span>{{$t('lang.message_subscribe_title')}}</span>
      <i
        v-if="!is_edit"
        class="iconfont maps-icon-edit"
        @click="handle_edit"
      ></i>
      <div
        v-else-if="is_edit"
        class="select-container"
      >
        <el-button
          size="mini"
          class="maps-button-mini"
          @click="handle_cancel"
        >
          {{$t('lang.public_button_cancel')}}
        </el-button>
        <el-button
          size="mini"
          type="primary"
          class="maps-button-mini"
          @click="handle_save"
        >
          {{$t('lang.public_button_save')}}
        </el-button>
      </div>
    </header>
    <main>
      <div class="message-setting">
        <header class="header">
          <el-row>
            <el-col :span="9">
              <div class="grid-content bg-purple">{{$t('lang.message_type')}}</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple-light">{{$t('lang.message_Notice_board')}}</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">{{$t('lang.message_email')}}</div>
            </el-col>
          </el-row>
        </header>
        <main>
          <!-- 系统通知 -->
          <div class="setting-item">
            <el-row>
              <el-col :span="9">
                <div class="grid-content bg-purple">
                  <i class="iconfont maps-icon-maps"></i>
                  <div class="type">
                    <span>{{$t('lang.message_System_Notifications')}}</span>
                    <span>{{$t('lang.message_System_Notifications_point')}}</span>
                  </div>
                </div>
              </el-col>
              <!-- 站内信 -->
              <el-col :span="9">
                <div class="grid-content bg-purple-light">
                  <!-- <el-switch v-model="form.system_letter"
                                        v-if="is_edit"
                                        active-value="1"
                                        inactive-value="0"
                                        active-color="#0BB3B3"
                                        inactive-color="#C4C4C4"
                                        @change="handle_change_type('system_letter', $event)"></el-switch> -->
                  <span :style="`margin-left: 5px;display: inline-block;color:${status_map[form.system_letter].color};`">{{status_map[form.system_letter].text}}</span>
                </div>
              </el-col>
              <!-- 邮箱 -->
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-switch
                    v-model="form.system_email"
                    v-if="is_edit"
                    active-value="1"
                    inactive-value="0"
                    active-color="#0BB3B3"
                    inactive-color="#C4C4C4"
                    @change="handle_change_type('system_email', $event)"
                  ></el-switch>
                  <span :style="`margin-left: 5px;display: inline-block;color:${status_map[form.system_email].color};`">{{status_map[form.system_email].text}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <!-- 智能监控 -->
          <div
            class="setting-item"
            v-if="team_manager"
          >
            <el-row>
              <el-col :span="9">
                <div class="grid-content bg-purple">
                  <i class="iconfont maps-icon-bell1"></i>
                  <div class="type">
                    <span>{{$t('lang.message_Automated_Rules')}}</span>
                    <span>系统根据智能规则自动监控并发送通知</span>
                  </div>
                </div>
              </el-col>
              <!-- 站内信 -->
              <el-col :span="9">
                <div class="grid-content bg-purple-light">
                  <el-switch
                    v-model="form.advertising_letter"
                    v-if="is_edit"
                    active-value="1"
                    inactive-value="0"
                    active-color="#0BB3B3"
                    inactive-color="#C4C4C4"
                    @change="handle_change_type('advertising_letter', $event)"
                  ></el-switch>
                  <span :style="`margin-left: 5px;display: inline-block;color:${status_map[form.advertising_letter].color};`">{{status_map[form.advertising_letter].text}}</span>
                </div>
              </el-col>
              <!-- 邮箱 -->
              <el-col :span="6">
                <div class="grid-content bg-purple-light">
                  <el-switch
                    v-model="form.advertising_email"
                    v-if="is_edit"
                    active-value="1"
                    inactive-value="0"
                    active-color="#0BB3B3"
                    inactive-color="#C4C4C4"
                    @change="handle_change_type('advertising_email', $event)"
                  ></el-switch>
                  <span :style="`margin-left: 5px;display: inline-block;color:${status_map[form.advertising_email].color};`">{{status_map[form.advertising_email].text}}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </main>
      </div>
      <div
        class="check-member"
        v-if="form.advertising_email == '1' && team_manager"
      >
        <header>
          <div v-if="is_edit">选择接收触发规则提醒的成员邮箱</div>
          <div v-else>接收触发规则提醒的成员邮箱:
            <span style="font-weight: 400">{{checkedMember.join(',')}}</span>
          </div>
        </header>
        <el-row
          v-if="is_edit"
          v-loading="member_loading"
        >
          <el-col :span="18">
            <div
              class="grid-content bg-purple"
              style="padding: 0;margin-left: 67px;"
            >
              <header class="title">
                <span>请选择成员邮箱</span>
                <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
                >{{$t('lang.public_check_all')}}</el-checkbox>
              </header>
              <main>
                <div class="member-filter select-container">
                  <el-input
                    size="mini"
                    style="width:300px"
                    :placeholder="$t('lang.message_search_members')"
                    @keyup.enter.native="connect_accounts_keywords_change"
                    class="filter-input"
                    v-model="member_key_word"
                  >
                    <div
                      slot="prefix"
                      style="cursor: pointer"
                    >
                      <i
                        class="iconfont maps-icon-search"
                        @click="connect_accounts_keywords_change"
                      ></i>
                    </div>
                  </el-input>
                </div>
                <div class="member-list">
                  <el-checkbox-group
                    v-model="form.emails"
                    @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox
                      v-for="member in set_member_list"
                      :disabled="user_email == member.email"
                      :label="member.email"
                      :key="member.email"
                    >{{member.email}}</el-checkbox>
                  </el-checkbox-group>
                </div>
              </main>
            </div>
          </el-col>
          <el-col :span="6">
            <div
              class="grid-content bg-purple-light"
              style="padding: 0;margin-left: 20px;"
            >
              <header class="title">已选成员
                <el-button
                  size="mini"
                  type="text"
                  @click="clear_all"
                >清空</el-button>
              </header>
              <main style="padding: 0 0 20px 0">
                <div class="result-list">
                  <div
                    class="list-item"
                    v-for="(item, index) in form.emails"
                    :class="set_stripe(index)"
                    :key="item"
                  >
                    <span>{{item}}</span>
                    <span
                      v-if="item != user_email"
                      @click="clear_result(item)"
                    >&times</span>
                  </div>
                </div>
              </main>
            </div>
          </el-col>
        </el-row>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import fetch from "@/services/fetch";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      member_loading: false,
      is_edit: false,
      form: {
        system_id: "",
        system_letter: "1", //站内信
        system_email: "1", // 邮箱
        advertising_id: "",
        advertising_letter: "1",
        advertising_email: "1",
        emails: [],
      },
      status_map: {
        1: {
          text: this.$t("lang.public_enable"),
          color: "#0BB3B3",
        },
        0: {
          text: this.$t("lang.public_disable"),
          color: "#333",
        },
      },
      member_key_word: "",
      isIndeterminate: false,
      checkAll: false,
      checkedMember: [],
      member_list: [],
      member_emails: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("user", ["user_email"]),
    ...mapState("system", ["active_team_id", "team_manager"]),
    set_member_list() {
      let groups = [];
      if (this.member_key_word) {
        this.member_list.forEach((item) => {
          if (
            item.username
              .toLowerCase()
              .includes(this.member_key_word.toLowerCase()) ||
            item.username.toLowerCase() == this.member_key_word.toLowerCase() ||
            item.email
              .toLowerCase()
              .includes(this.member_key_word.toLowerCase()) ||
            item.email.toLowerCase() == this.member_key_word.toLowerCase()
          ) {
            groups.push(item);
          }
        });
      } else {
        groups = this.member_list;
      }

      return groups;
    },
  },
  methods: {
    // 修改
    handle_edit() {
      this.is_edit = true;
      this.get_member_list();
    },
    async get_system_info() {
      const url = "/message/getMessageInfo";
      const res = await this.fetchCore(
        url,
        { team_id: this.active_team_id },
        true
      );
      if (res) {
        this.form.system_email = res[0].email_status.toString();
        this.form.system_id = res[0].id;
        if (res.length == 2) {
          this.form.advertising_id = res[1].id;
          this.form.advertising_letter = res[1].letter_status.toString();
          this.form.advertising_email = res[1].email_status.toString();
          this.checkedMember =
            res[1].content.indexOf(",") != -1
              ? res[1].content.split(",")
              : [res[1].content];
          if (!this.checkedMember.includes(this.user_email)) {
            this.checkedMember.unshift(this.user_email)
          }
          this.form.emails = this.checkedMember;
        } else {
          this.form.advertising_id = '';
          this.form.advertising_letter = '1';
          this.form.advertising_email = '1';
          this.checkedMember = [this.user_email];
          this.form.emails = this.checkedMember;
        }
      }
    },
    //   修改接受类型
    handle_change_type(type, status) {
      let text =
        "确定要启用站内信通知吗？当广告触发规则时，系统将会在MAPS系统内推送此类消息给所有团队成员。";
      let title = "";
      if (type == "advertising_letter") {
        if (status === "0") {
          text =
            "确定要禁用站内信通知吗？当广告触发规则时，系统将不会在MAPS系统内推送此类消息给所有团队成员。";
          title = this.$t("lang.public_disable");
        } else {
          text =
            "确定要启用站内信通知吗？当广告触发规则时，系统将会在MAPS系统内推送此类消息给所有团队成员。";
          title = this.$t("lang.public_enable");
        }
      } else if (type == "system_email") {
        if (status === "0") {
          text = this.$t("lang.message_email_close_point");
          title = this.$t("lang.public_disable");
        } else {
          text = this.$t("lang.message_email_open_point");
          title = this.$t("lang.public_enable");
        }
      } else if (type == "advertising_email") {
        if (status === "0") {
          text =
            "确定要禁用邮箱通知吗？当广告触发规则时，系统将不会推送此类邮件到您指定的成员邮箱。";
          title = this.$t("lang.public_disable");
        } else {
          text =
            "确定要启用邮箱通知吗？当广告触发规则时，系统将会推送此类邮件到您指定的成员邮箱。";
          title = this.$t("lang.public_enable");
        }
      }
      this.$confirm(text, title, {
        confirmButtonText: this.$t("lang.public_button_confirm"),
        cancelButtonText: this.$t("lang.public_button_cancel"),
        type: "warning",
      })
        .then(() => {
          this.form[type] = status;
          if (type == "advertising_email" && status == "0") {
            this.form.emails = [this.user_email];
            this.checkAll = false;
            this.isIndeterminate = false;
          }
        })
        .catch(() => {
          this.form[type] = status === "1" ? "0" : "1";
        });
    },
    // 选择成员
    async get_member_list() {
      this.member_loading = true;
      const url = "message/getEmailList";
      const data = await this.fetchCore(
        url,
        { team_id: this.active_team_id },
        false
      );
      if (data) {
        this.member_loading = false;
        this.member_list = data;
      } else {
        this.member_loading = false;
      }

      if (this.member_list.length) {
        this.format_member(this.member_list);
      }
    },
    format_member(arr) {
      arr.map((item) => {
        this.member_emails.push(item.email);
      });
      if (this.member_emails.length == this.form.emails.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      } else {
        this.isIndeterminate = false;
        this.checkAll = false;
      }
    },
    handleCheckAllChange(val) {
      this.form.emails = val ? this.member_emails : [this.user_email];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.member_list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.member_list.length;
    },
    // 成员列表
    connect_accounts_keywords_change() {
      // 搜索
    },
    // 复选结果展示、删除
    // 斑马纹
    set_stripe(index) {
      if (index === 0) {
        return "light-item";
      } else if (index === 1) {
        return "dark-item";
      } else {
        if (index % 2 === 0) {
          return "light-item";
        } else {
          return "dark-item";
        }
      }
    },
    clear_result(param) {
      const index = this.form.emails.findIndex((obj) => {
        return obj.email === param;
      });
      this.form.emails.splice(index, 1);
      if (this.form.emails.length === 0) {
        this.checkAll = false;
        this.isIndeterminate = false;
      }
    },
    // 清空
    clear_all() {
      this.checkAll = false;
      this.isIndeterminate = false;
      this.form.emails = [this.user_email];
    },
    handle_cancel() {
      this.is_edit = false;
      this.get_system_info();
    },
    async handle_save() {
      const url = "message/editMessageSetInfo";
      const param_syatem = {
        id: this.form.system_id,
        letter_status: 1,
        email_status: this.form.system_email,
      };
      const param_advertising = {
        id: this.form.advertising_id,
        letter_status: this.form.advertising_letter,
        email_status: this.form.advertising_email,
        content: this.form.emails.join(),
      };
      const param = { json: [param_syatem, param_advertising] };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.handle_cancel();
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
      this.get_system_info();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
.subscribe-container {
  & > main {
    .el-row {
      height: calc(100% - 30px);
      line-height: inherit;
      .el-col {
        height: 100%;
      }
      .grid-content {
        padding-left: 20px;
        height: inherit;
      }
    }
    .member-list {
      .el-checkbox {
        padding: 7px;
        background: #f1f1f1;
        margin: 0 20px 20px 0;
      }
    }
  }
}
</style>
<style lang='scss' scoped>
.subscribe-container {
  height: 100%;
  margin: 20px 10px 0 10px;
  background: #fff;
  & > header {
    height: 40px;
    padding: 0 20px;
    font-size: 16px;
    color: #666666;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      cursor: pointer;
    }
  }
  & > main {
    padding: 20px;
    height: calc(100% - 81px);
    
    .message-setting {
      & > header {
        height: 40px;
        background: #f1f1f1;
        font-size: 12px;
        color: #333;
        font-weight: 700;
        line-height: 40px;
      }
      & > main {
        .setting-item {
          padding: 20px 0;
          color: #333;
          .grid-content {
            height: 36px;
            display: flex;
            align-items: center;
            i {
              font-size: 32px;
              margin-right: 15px;
            }
            .type {
              font-size: 14px;
              line-height: 18px;
              display: flex;
              flex-flow: column;
              span:nth-child(1) {
                color: #333;
                font-weight: 700;
              }
              span:nth-child(2) {
                color: #999;
              }
            }
          }
        }
        .setting-item:nth-child(1) {
          border-bottom: 1px solid #f1f1f1;
        }
      }
    }
    .check-member {
      height: calc(100% - 193px);
      & > header {
        padding: 0 0 10px 67px;
        div {
          color: #333;
          font-size: 14px;
          font-weight: 700;
        }
      }
      .grid-content {
        border: 1px solid #dcdfe6;
        .title {
          height: 40px;
          padding: 0 20px;
          border-bottom: 1px solid #dcdfe6;
          background: #f1f1f1;
          font-size: 12px;
          color: #333;
          font-weight: 700;
          line-height: 40px;
          display: flex;
          justify-content: space-between;
        }
        main {
          height: calc(100% - 61px);
          padding: 0 20px 20px 20px;
          .member-filter {
            padding: 10px 0;
          }
          .member-list {
            height: calc(100% - 52px);
            overflow-y: auto;
          }
          .result-list {
            height: 100%;
            overflow-y: auto;
            .list-item {
              height: 32px;
              padding: 0 10px;
              font-size: 12px;
              line-height: 32px;
              color: #333333;
              display: flex;
              justify-content: space-between;
              span:nth-child(2) {
                color: #ff3333;
                cursor: pointer;
              }
            }
            .light-item {
              background: unset;
            }
            .dark-item {
              background: #f1f1f1;
            }
          }
        }
      }
    }
  }
}
</style>