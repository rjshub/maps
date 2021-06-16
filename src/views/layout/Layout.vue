<template>
    <div class="g__wrap">
        <layout-header v-if="isLogin" />
        <div class="g__scroll"
            ref="toTop"
            @scroll="onScroll($event)">
            <div class="g__main clearfix"
                :class="{'no-nav':hasnoNav}">
                <topbar-nav />

                <div class="g__box">
                    <router-view v-if="is_update"
                        class="g__content" />
                    <layout-footer />
                </div>
            </div>

            <div class="to-top"
                :title="$t('lang.public_back_top')"
                v-if='showToTop'
                @click="toTop($event)">
                <i class="iconfont icon-xiangshang icon"></i>
            </div>
        </div>
        <div class="g__other"></div>

    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";
import TopbarNav from "./topbar-nav";
import _ from "lodash";
export default {
  name: "Layout",
  components: {
    LayoutHeader,
    LayoutFooter,
    TopbarNav,
  },
  data() {
    return {
      showToTop: false,
      throttleTimer: null, //节流时间句柄
      is_update: true,
    };
  },
  computed: {
    ...mapGetters("user", ["isLogin"]),
    ...mapState("user", ["language"]),
    ...mapState("system", ["active_team_id"]),
    hasnoNav() {
      return this.$route.meta.hasNotNav;
    },
  },
  watch: {
    // language() {
    //   this.is_update = false;
    //   this.$nextTick(() => {
    //     this.is_update = true;
    //   });
    // },
    active_team_id() {
      this.is_update = false;
      this.$nextTick(() => {
        this.is_update = true;
      });
    },
  },
  created() {},
  methods: {
    ...mapActions(["updata_scrolltop"]),

    toTop(event) {
      this.$refs.toTop.scrollTop = 0;
    },
    onScroll(event) {
      let top = event.srcElement.scrollTop;
      clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => {
        this.updata_scrolltop(top);
      }, 500);

      this.showToTop = top > 0;
      if (event.srcElement.scrollHeight - (event.srcElement.scrollTop + event.srcElement.clientHeight) == 0) {
      }
    },
  },
};
</script>
<style scoped lang="scss">
.to-top {
  position: fixed;
  right: 20px;
  bottom: 15px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #07090c;
  z-index: 1;
  cursor: pointer;
}
.icon {
  color: #9c9ea1;
  height: 32px;
  line-height: 32px;
  text-align: center;
  display: block;
}
.topbar-nav {
  background-color: #343d55;
  width: auto;
  height: 100%;
  border-bottom: 1px solid #343d55;
  box-sizing: border-box;
  overflow: hidden;
}
</style>



