<template>
    <div class="team-item">
        <div style="z-index: 2">
            <div class="label">{{config.name}}</div>
            <span class="id">{{config.teamid}}</span>
        </div>
        <div class="leader">
            <div>
                <i class="iconfont maps-icon-material"></i>{{config.username}}
            </div>
            <el-button type="primary"
                size="mini"
                v-if="type === 'check'"
                class="join-team-btn"
                @click="select_team(config)">{{btn_text}}</el-button>
            <div v-else-if="type === 'join'">
                <el-button type="primary"
                    size="mini"
                    class="join-team-btn"
                    v-if="config.status === '0'"
                    @click="select_team(config)">{{$t('lang.team_apply_join')}}</el-button>
                <span v-else-if="config.status === '1'">{{$t('lang.team_applying')}}</span>
                <span v-else-if="config.status === '2'"
                    style="color: #0bb3b3">
                    <i class="iconfont maps-icon-tick"></i>{{$t('lang.team_joined')}}
                </span>
            </div>
        </div>
        <i class="let-buttom iconfont maps-icon-user1"></i>
        <i v-if="config.is_manager && config.is_manager === '1'"
            class="right-top iconfont maps-icon-favourite"></i>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  // type join->申请加入，check->选择进入团队
  props: ["config", "btn_text", "type"],
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("user", ["user_id"]),
  },
  methods: {
    select_team(param) {
      this.$emit("select_one_team", param);
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.team-item {
  width: 196px;
  // height: 80px;
  height: 96px;
  background: #fff;
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  margin: 0 15px 20px 0;
  padding: 10px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  line-height: 24px;
  position: relative;
  .label {
    word-break: break-word;
    line-height: 20px;
    font-size: 14px;
    color: #333;
  }
  .leader {
    display: flex;
    justify-content: space-between;
    & > div {
      line-height: 30px;
      i {
        color: #0bb3b3;
        font-size: 16px;
        margin-right: 6px;
      }
    }
    & > .join-team-btn {
      display: none;
    }
  }
  .id,
  .label,
  .leader {
    z-index: 3;
  }
  & > i.let-buttom {
    position: absolute;
    left: 2px;
    bottom: 22px;
    font-size: 80px;
    z-index: 1;
    color: #f1f1f1;
  }
  & > i.right-top {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;
    color: #0bb3b3;
  }
}
.team-item:hover {
  .leader {
    .join-team-btn {
      display: block;
    }
  }
}
</style>