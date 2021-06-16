<template>
    <div class="quite-box"
        @mouseover.stop="icon_mouse_over"
        @mouseout.stop="icon_mouse_out">
        <div class="active">
            <platform-icon :platform="active_platform_nav"></platform-icon>
        </div>
        <div class="more"
            ref='more_link'>
            <div class="item"
                @click="handleCommand('jl')">
                <platform-icon platform="1"></platform-icon>
            </div>
            <div class="item"
                style="cursor: no-drop;"
                @click="handleCommand('tx')">
                <maps-tooltip text='敬请期待'>
                    <!-- <platform-icon platform="2"></platform-icon> -->
                    <i style="font-size: 14px;color:#999" class="iconfont maps-icon-tx"></i>
                </maps-tooltip>
            </div>
            <div class="item"
                style="cursor: no-drop;"
                @click="handleCommand('wx')">
                <maps-tooltip text='敬请期待'>
                    <!-- <platform-icon platform="3"></platform-icon> -->
                    <i style="font-size: 14px;color:#999" class="iconfont maps-icon-wx"></i>
                </maps-tooltip>
            </div>
        </div>
        <div class="mark"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "QuiteRoute",
  components: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapState("advertising", ["active_platform_nav"]),
  },
  methods: {
    ...mapActions("advertising", ["update_active_platform_nav"]),
    handleCommand(param) {
      // const map = {
      //   jl: 1,
      //   tx: 2,
      //   wx: 3,
      // };
      // this.update_active_platform_nav(map[param]);
      // this.$router.push({ path: `/advertising/manage/${param}` });
    },
    icon_mouse_over() {
      const dom = this.$refs.more_link;
      dom.style.width = "90px";
      dom.style.borderWidth = "1px";
    },
    icon_mouse_out() {
      const dom = this.$refs.more_link;
      dom.style.width = "0px";
      dom.style.borderWidth = "0px";
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.quite-box {
  width: 30px;
  height: 30px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  .active {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .maps-icon-arrow-down {
      font-size: 10px;
    }
  }
  .mark {
    transform: rotate(135deg);
    position: absolute;
    bottom: -5px;
    right: -5px;
    width: 0px;
    height: 0px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #c6c6c6 transparent;
  }
  .more {
    width: 0px;
    height: 30px;
    background: #fff;
    border-width: 0px;
    border-style: solid;
    border-color: #dcdfe6;
    display: flex;
    position: absolute;
    top: -1px;
    left: 32px;
    transition: all 0.1s;
    overflow: hidden;
    z-index: 9999;
    .item {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style lang='scss' scoped>
</style>