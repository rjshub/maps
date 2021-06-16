<template>
        <el-dialog :title="$t('lang.team_apply_join_title')"
            :visible.sync="dialogVisible"
            @closed="close"
            custom-class="join-team-dialog"
            width="60%">
            <main v-loading="joinLoading">
                <el-input :placeholder="$t('lang.public_team_search_placeholder')"
                    @change="change_keyWord"
                    v-model="key_word"
                    clearable>
                    <template slot="prefix">
                        <i class="iconfont maps-icon-search"></i>
                    </template>
                </el-input>
                <div class="list-box">
                    <TeamItem ref="TeamItem"
                        v-for="item in team_list"
                        :key="item.id"
                        :config="item"
                        type="join"
                        btn_text="申请加入"
                        @select_one_team="select_one_team"></TeamItem>
                </div>

            </main>
            <span slot="footer"
                class="dialog-footer">
                <el-button @click="close">{{$t('lang.public_button_close')}}</el-button>
            </span>
        </el-dialog>
</template>

<script>
import fetch from "@/services/fetch";
import TeamItem from "@/views/public/team-item";

export default {
  components: { TeamItem },
  data() {
    return {
      joinLoading: false,
      dialogVisible: false,
      team_list: [],
      key_word: "",
    };
  },
  watch: {},
  methods: {
    show() {
      this.dialogVisible = true;
      this.get_all_team();
    },
    close() {
      this.team_list = []
      this.key_word = ""
      this.dialogVisible = false
    },
    //   查询所有团队
    async get_all_team() {
      const url = "/team/searchlist";
      const param = {
        word: this.key_word,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.team_list = data;
      }
    },
    // 关键搜索
    change_keyWord() {
      this.get_all_team();
    },
    // 选择加入某一个团队
    async select_one_team(team) {
      const url = "/team/applyjointeam";
      const param = {
        team_id: team.id,
        manager_user_id: team.manager_user_id,
      };
      const data = await this.fetchCore(url, param, true);
      if (data) {
        this.get_all_team()
        // this.dialogVisible = false;
      }
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.joinLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        hasLoading && (this.joinLoading = false);
      } finally {
        hasLoading && (this.joinLoading = false);
      }
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.join-team-dialog {
  .list-box {
    display: flex;
    flex-wrap: wrap;
    max-height: 370px;
    overflow-y: auto;
  }
}
</style>
<style lang="scss">
.join-team-dialog {
    display: flex;
    flex-flow: column;
    .el-dialog__header {
      height: 40px;
      padding: 0 20px;
      background: #f6f6f6;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-dialog__headerbtn {
        position: unset;
      }
    }
    .el-dialog__body {
      .el-input {
        margin-bottom: 15px;
        .el-input__inner {
          padding-left: 40px;
        }
        .el-input__prefix {
          left: 15px;
          display: flex;
          align-items: center;
        }
      }
    }
    .el-dialog__footer {
      .el-button--default:hover {
        color: #fff;
        background: #33cccc;
        border-color: #33cccc;
      }
      .el-button--default:focus {
        background: #33cccc;
        border-color: #33cccc;
      }
      .el-button--default {
        width: unset;
        color: #333;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: unset;
      }
    }
}
</style>