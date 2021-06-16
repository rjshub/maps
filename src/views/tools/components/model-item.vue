<template>
    <div class="model-item">
        <maps-tooltip :text="config[`name_${language}`]"
            align="left">
            <span class="title">{{config[`name_${language}`]}}</span>
        </maps-tooltip>

        <maps-tooltip :text="config[`desc_${language}`]"
            align="left">
            <span class="desc">{{config[`desc_${language}`]}}</span>
        </maps-tooltip>

        <div class="platform">
            <div v-for="(item,index) in set_platform_list(config.platform)"
                :key="index">
                <platform-icon :platform="item"></platform-icon>
            </div>
            <el-button type="primary"
                class='apply-model'
                @click="check_model(config)">{{$t('lang.public_button_apply_to')}}</el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import platform_jl_path from "@/assets/image/platform/jl.svg";
import platform_tx_path from "@/assets/image/platform/tx.svg";
import platform_wx_path from "@/assets/image/platform/wx.svg";

export default {
  components: {},
  props: {
    config: {},
  },
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
    ...mapState("user", ["language"]),
  },
  methods: {
    // 设置平台图标
    set_platform_list(platform) {
      let platforms = platform ? platform.split(",") : [];
      return platforms;
    },
    // 选中模板
    check_model(id) {
      this.$emit("update_model", id);
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.model-item {
  .platform {
    .el-button.apply-model {
      padding: 3px 7px;
      font-size: 10px;
      border-radius: 3px;
    }
  }
}
</style>
<style lang='scss' scoped>
.model-item {
  // width: 150px;
  width: calc(100% - 20px);
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  span {
    display: inline-block;
    width: 100%;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .title {
    height: 24px;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 24px;
    color: #333;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }
  .desc {
    height: 36px;
    font-size: 12px;
    line-height: 18px;
    color: #999999;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }
  .platform {
    height: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    position: relative;
    & > div {
      margin-right: 5px;
      img {
        display: block;
        width: 15px;
        height: 15px;
      }
    }
    .apply-model {
      position: absolute;
      right: 0;
      display: none;
    }
  }
}
.model-item:hover {
  border-color: #0bb3b3;
  .title {
    color: #0bb3b3;
  }
  .platform {
    .apply-model {
      display: block;
    }
  }
}
.is-actived {
  border-color: #0bb3b3;
  .title {
    color: #0bb3b3;
  }
}
</style>