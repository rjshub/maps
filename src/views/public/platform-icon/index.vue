<template>
    <maps-tooltip :text="tooltip? set_platform_icon(platform).title:''">
        <img v-if="set_platform_icon(platform).path"
            style="display:block;width:16px;height:16px"
            :src="set_platform_icon(platform).path">
    </maps-tooltip>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import platform_jl_path from "@/assets/image/platform/jl.svg";
import platform_tx_path from "@/assets/image/platform/tx.svg";
import platform_wx_path from "@/assets/image/platform/wx.svg";

export default {
  props: {
    platform: {
      required: true,
    },
    tooltip: {
      default: true,
    },
  },
  components: {},
  data() {
    return {
      platform_jl_path: platform_jl_path,
      platform_tx_path: platform_tx_path,
      platform_wx_path: platform_wx_path,
    };
  },
  watch: {},
  computed: {
    ...mapState("system", ["platform_config"]),
  },
  methods: {
    set_platform_icon(id) {
      let code = "";
      let title = "";
      const index = this.platform_config.findIndex((obj) => {
        return obj.id == id;
      });
      if (index >= 0) {
        code = this.platform_config[index].code;
        title = this.platform_config[index].name;
      }
      const map = {
        jl: this.platform_jl_path,
        tx: this.platform_tx_path,
        wx: this.platform_wx_path,
      };

      // return map[code];
      return { path: map[code], title: title };
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>