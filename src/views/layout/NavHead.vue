<template>
  <el-menu
    :default-active="defaultActive"
    :router="true"
    class="menu-header"
    mode="horizontal"
    text-color="#FFF"
    active-text-color="#FFF"
  >
    <!-- 暂时 && language == 'zh' -->
    <el-menu-item
      index="/advertising"
      v-if="!isRoot && !not_advertising && language == 'zh'"
    >
      <i class="iconfont maps-icon-AD"></i>
      <span slot="title">广告智投</span>
    </el-menu-item>
    <el-menu-item
      index="/report"
      v-if="!isRoot && !not_report"
    >
      <i class="iconfont maps-icon-report"></i>
      <span slot="title">{{$t('lang.layout_report_nav')}}</span>
    </el-menu-item>
    <el-menu-item
      index="/tools"
      v-if="!isRoot && !not_tools"
    >
      <i class="iconfont maps-icon-tools"></i>
      <span slot="title">{{$t('lang.layout_setting_nav')}}</span>
    </el-menu-item>
    <el-menu-item index="/system">
      <i class="iconfont maps-icon-setting"></i>
      <span slot="title">{{$t('lang.layout_system_nav')}}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "NavHead",
  components: {},
  data() {
    return {
      flag: true, //这个默认值不能改
    };
  },

  watch: {},
  computed: {
    ...mapState("user", ["user_id", "language"]),
    ...mapGetters("user", ["isRoot"]),
    ...mapState("permissions", [
      "Rule_Intelligent_permission",
      "Rule_Task_permission",
      "client_Report_permission",
      "effect_Report_permission",
      "subscribe_Report_permission",
      "AdSet_Manage_permission",
    ]),
    defaultActive() {
      let nav = this.$route.meta.nav;
      // let nav = '/tools'
      return nav;
    },
    not_report() {
      return (
        this.client_Report_permission == "0" &&
        this.effect_Report_permission == "0" &&
        this.subscribe_Report_permission == "1"
      );
    },
    not_tools() {
      return (
        this.Rule_Intelligent_permission == "0" &&
        this.Rule_Task_permission == "0"
      );
    },
    not_advertising() {
      return this.AdSet_Manage_permission == "0";
    },
  },
  created() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.menu-header {
  height: 100%;
  float: left;
  // margin-left: 44px;
  // margin-left: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
</style>
<style lang="scss">
.menu-header {
  .el-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      color: inherit;
    }
    span {
      padding-left: 9px;
    }
  }
  &.el-menu.el-menu--horizontal {
    border-bottom: 0px;
    .el-menu-item {
      height: 100%;
    }
  }
}
</style>


