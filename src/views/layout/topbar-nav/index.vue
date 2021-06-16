<template>
  <div
    class="topbar-nav"
    v-if="topbarNav"
  >
    <el-menu
      :default-active="topbarNav.default"
      :collapse="user_nav"
      class="leftbar-nav-menu"
      :router="true"
      text-color="#09358A"
      active-text-color="#09358A"
    >
      <div
        v-for="item in topbarNav.children"
        :key="item.path"
      >
        <el-menu-item
          v-if="!item.submenu && item.show"
          :index="item.path"
        >
          <i :class="item.icon"></i>
          <span
            slot="title"
            class="nav-title"
          >{{item.title}}</span>
        </el-menu-item>

        <el-submenu
          v-if="item.submenu && item.show"
          :index="item.path"
        >
          <template
            slot="title"
            v-if="user_nav"
          >
            <i :class="item.icon"></i>
          </template>
          <template
            slot="title"
            v-else
          >
            <i :class="item.icon"></i>
            <span
              slot="title"
              class="nav-title"
            >{{item.title}}</span>
          </template>
          <div
            v-for="child in item.children"
            :key="child.path"
          >
            <el-menu-item
              v-if="child.show"
              :disabled="child.disabled"
              :index="child.path"
            >
              <i :class="child.icon"></i>
              <!-- 暂时敬请期待 -->
              <maps-tooltip
                slot="title"
                :text="child.disabled? '敬请期待':''"
              >
                <span class="nav-title">{{child.title}}</span>
              </maps-tooltip>
            </el-menu-item>
          </div>

        </el-submenu>
      </div>
    </el-menu>
    <maps-tooltip :text="user_nav? $t('lang.public_expand'):$t('lang.public_collapse')">
      <div
        class="fold-nav"
        @click="handle_fold_nav"
      >
        <i
          v-if="user_nav"
          class="iconfont maps-icon-unfold"
        ></i>
        <i
          v-else
          class="iconfont maps-icon-fold"
        ></i>
      </div>
    </maps-tooltip>

  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import $ from "jquery";
import TopbarElMenu from "./public/topbar-el-menu";
import TopbarElMenuSubItem from "./public/topbar-el-menu-sub-item";
export default {
  name: "NavDataCenter",
  components: { TopbarElMenu, TopbarElMenuSubItem },
  data() {
    return {
      // isCollapse: false,
    };
  },
  watch: {},
  computed: {
    ...mapGetters("user", ["isRoot"]),
    ...mapState("user", ["user_id", "user_nav"]),
    ...mapState("permissions", [
      "client_Report_permission",
      "effect_Report_permission",
      "subscribe_Report_permission",
      "Account_permission",
      "AdSet_Manage_permission",
      "Rule_Intelligent_permission",
      "Rule_Task_permission",
    ]),
    topbarNav() {
      const topbar = {
        "/system": {
          default: this.isRoot ? "/system/root" : "/system/account",
          children: [
            {
              path: "/system/account",
              title: this.$t("lang.layout_system_account_nav"),
              icon: "iconfont maps-icon-user2",
              submenu: false,
              show: !this.isRoot,
            },
            {
              path: "/system/team",
              title: this.$t("lang.layout_system_team_nav"),
              icon: "iconfont maps-icon-user1",
              submenu: false,
              show: !this.isRoot,
            },
            {
              path: "/system/message",
              title: this.$t("lang.layout_system_message_nav"),
              icon: "iconfont maps-icon-bell-new",
              submenu: true,
              show: !this.isRoot,
              default: "/system/message/subscribe",
              children: [
                {
                  path: "/system/message/subscribe",
                  title: this.$t("lang.layout_system_message_subscribe_nav"),
                  icon: "",
                  submenu: false,
                  show: true,
                },
                {
                  path: "/system/message/All",
                  title: this.$t("lang.layout_system_message_all_nav"),
                  icon: "",
                  submenu: false,
                  show: true,
                },
              ],
            },
            {
              path: "/system/root",
              title: this.$t("lang.layout_system_root_nav"),
              icon: "iconfont maps-icon-mac",
              submenu: false,
              show: this.isRoot,
            },
          ],
        },
        "/report": {
          // default: "/report/custom",
          default:
            this.client_Report_permission != "0"
              ? "/report/custom"
              : this.effect_Report_permission != "0"
              ? "/report/effect"
              : "/report/subscribe",
          children: [
            {
              path: "/report/custom",
              title: this.$t("lang.layout_report_customer_nav"),
              icon: "iconfont maps-icon-pie",
              submenu: false,
              show: !this.isRoot && this.client_Report_permission != "0",
            },
            {
              path: "/report/effect",
              title: this.$t("lang.layout_report_effect_nav"),
              icon: "iconfont maps-icon-effect",
              submenu: false,
              show: !this.isRoot && this.effect_Report_permission != "0",
            },
            {
              path: "/report/subscribe",
              title: this.$t("lang.layout_report_subscribe_nav"),
              icon: "iconfont maps-icon-dingyue",
              submenu: false,
              show: !this.isRoot && this.subscribe_Report_permission == "2", //非root并且报表订阅是启用
              // show: !this.isRoot,  //非root并且报表订阅是启用
            },
          ],
        },
        "/tools": {
          default:
            this.Rule_Intelligent_permission != "0"
              ? "/tools/rule/intelligent"
              : "/tools/rule/task",
          children: [
            {
              path: "/tools/rule",
              title: this.$t("lang.layout_Rules_Management_nav"),
              icon: "iconfont maps-icon-effect",
              submenu: true,
              show:
                !this.isRoot &&
                (this.Rule_Intelligent_permission != "0" ||
                  this.Rule_Task_permission != "0"),
              default: "/tools/rule/intelligent",
              children: [
                {
                  path: "/tools/rule/intelligent",
                  title: this.$t("lang.layout_Automated_Rules_nav"),
                  icon: "",
                  submenu: false,
                  show: !this.isRoot && this.Rule_Intelligent_permission != "0",
                },
                {
                  path: "/tools/rule/task",
                  title: this.$t("lang.layout_Rule_Tasks_nav"),
                  icon: "",
                  submenu: false,
                  show: !this.isRoot && this.Rule_Task_permission != "0",
                },
              ],
            },
          ],
        },
        "/advertising": {
          default: "/advertising/manage/jl",
          children: [
            {
              path: "/advertising/manage/",
              title: "广告管理",
              icon: "iconfont maps-icon-ADkaobei",
              submenu: true,
              // show: !this.isRoot && this.AdSet_Manage_permission != "0",
              show: true,
              default: "/advertising/manage/jl",
              children: [
                {
                  path: "/advertising/manage/jl",
                  title: "巨量引擎",
                  icon: "",
                  submenu: false,
                  // show: !this.isRoot && this.AdSet_Manage_permission != "0",
                  show: true,
                },
                {
                  path: "/advertising/manage/tx",
                  title: "腾讯广告",
                  icon: "",
                  submenu: false,
                  // show: !this.isRoot && this.AdSet_Manage_permission != "0",
                  show: true,
                  disabled: true,
                },
                {
                  path: "/advertising/manage/wx",
                  title: "微信广告",
                  icon: "",
                  submenu: false,
                  // show: !this.isRoot && this.AdSet_Manage_permission != "0",
                  show: true,
                  disabled: true,
                },
              ],
            },
          ],
        },
      };
      if (topbar[this.$route.meta.nav]) {
        if (this.$route.fullPath !== topbar[this.$route.meta.nav].default) {
          topbar[this.$route.meta.nav].children.forEach(item => {
            if (item.path == this.$route.fullPath && item.show) {
              topbar[this.$route.meta.nav].default = this.$route.fullPath;
            }
            if (item.show && item.hasOwnProperty('children')) {
              item.children.forEach(child => {
                if (child.path == this.$route.fullPath) {
                  if (child.show) {
                    topbar[this.$route.meta.nav].default = this.$route.fullPath;
                  } else {
                    this.$router.replace(topbar[this.$route.meta.nav].default)
                  }
                } 
              })
            } 
          })
          // topbar[this.$route.meta.nav].default = this.$route.fullPath;
        }
        return topbar[this.$route.meta.nav];
      } else {
        return false;
      }
    },
    topbarIndex() {
      const index = Object.keys(this.topbar).findIndex((obj) => {
        return obj === this.$route.meta.nav;
      });
      return index;
    },
  },
  created() {},
  methods: {
    ...mapActions("user", ["update_user_nav"]),
    handle_fold_nav() {
      // this.isCollapse = !this.isCollapse;
      if (this.user_nav) {
        this.update_user_nav("1");
      } else {
        this.update_user_nav("0");
      }
      this.$nextTick(() => {
        if (this.user_nav) {
          $(".topbar-nav").css("width", "auto");
          $(".nav-title,.el-submenu__title .el-submenu__icon-arrow").css(
            "display",
            "none"
          );
        } else {
          $(".topbar-nav").css("width", "190px");
          $(".nav-title").css("display", "inline");
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.user_nav) {
        $(".topbar-nav").css("width", "auto");
        $(".nav-title,.el-submenu__title .el-submenu__icon-arrow").css(
          "display",
          "none"
        );
      } else {
        $(".topbar-nav").css("width", "190px");
        $(".nav-title").css("display", "inline");
      }
    });
  },
};
</script>
<style lang="scss">
.leftbar-nav-menu {
  // width: 160px;
  background: transparent;
  border-right: 0;
  // display: flex;
  // flex-flow: column;
  .el-menu-item,
  .el-submenu__title {
    // padding: 0 20px;
    // padding: 0 50px 0 20px;
    font-size: 14px;
    height: 45px;
    color: #b6bdcf !important;
    line-height: 45px;
    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  // .el-submenu__icon-arrow {
  //   right: 10px;
  // }

  .el-submenu__title,
  .el-menu-item {
    .icon {
      height: 16px;
      width: 16px;
      margin-left: 7px;
      margin-right: 2px;
      display: inline-block;
    }
    &.is-active {
      background-color: #343d55;
      color: #0bb3b3 !important;
      .el-submenu__title {
        color: #0bb3b3 !important;
      }
    }
    &:hover {
      background: #0bb3b3;
      i,
      span {
        color: #fff !important;
      }
    }
  }
  .el-submenu {
    .el-menu--inline {
      .el-menu-item {
        min-width: unset;
        background-color: #343d55;
        &.is-active {
          color: #0bb3b3 !important;
        }
        &:hover {
          background: #0bb3b3;
          color: #fff !important;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.topbar-nav {
  width: 190px;
  position: relative;
  .fold-nav {
    width: 28px;
    height: 60px;
    background: #000;
    opacity: 0.2;
    position: absolute;
    right: 0;
    top: 50%;
    bottom: 50%;
    transform: translateY(-50%);
    text-align: center;
    line-height: 60px;
    i {
      font-size: 18px;
      color: #b6bdcf;
    }
  }
}
</style>

