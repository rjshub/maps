<template>
    <div class="icon-box"
        v-if="set_platform_icon().length"
        :style="`z-index:${icon_index}`"
        @mouseover.stop="icon_mouse_over"
        @mouseout.stop="icon_mouse_out">
        <div class="icon-item"
            v-for="(item, index) in set_platform_icon().splice(0, load_num)"
            :key="index">
            <maps-tooltip :text="item.title">
                <img :src="item.path"
                    alt="">
            </maps-tooltip>
        </div>
        <div class="mark"
            v-if="set_platform_icon().length > 1"></div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import platform_jl_path from "@/assets/image/platform/jl.svg";
import platform_tx_path from "@/assets/image/platform/tx.svg";
import platform_wx_path from "@/assets/image/platform/wx.svg";

export default {
  props: {
    icon: String,
  },
  components: {},
  data() {
    return {
      platform_jl_path: platform_jl_path,
      platform_tx_path: platform_tx_path,
      platform_wx_path: platform_wx_path,
      load_num: 1,
      icon_index: 1,
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["platform_config"]),
  },
  methods: {
    // 设置平台图标
    set_platform_icon() {
      const map = {
        jl: this.platform_jl_path,
        tx: this.platform_tx_path,
        wx: this.platform_wx_path,
      };
      let result = [];
      let icons = this.icon.split(",");
      icons.forEach((item) => {
        let code = "";
        let title = "";
        const index = this.platform_config.findIndex((obj) => {
          return obj.code == item;
        });

        if (index >= 0) {
          code = this.platform_config[index].code;
          title = this.platform_config[index].name + this.$t("lang.report_has_this_field");
          const param = { path: map[code], title: title };
          result.push(param);
        }
      });
      return result;
    },
    icon_mouse_over($event) {
      this.icon_index = 2;
      this.load_num = this.set_platform_icon().length;
    },
    icon_mouse_out() {
      this.icon_index = 1;
      this.load_num = 1;
    },
  },
  mounted() {
    this.set_platform_icon();
  },
};
</script>
<style lang='scss' scoped>
.icon-box {
  max-width: 44px;
  height: auto;
  border: 1px solid #dcdfe6;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  right: 20px;
  top: 3px;
  .icon-item {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
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
}
</style>