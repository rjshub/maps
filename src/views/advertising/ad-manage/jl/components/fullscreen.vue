<template>
    <el-dialog :visible.sync="dialogVisible"
        :show-close="false"
        fullscreen
        custom-class="fullscreen-dialog">
        <div slot="title"
            class="header">
            <div>
                <span class="title">{{title}}</span>
                <span class="filter-time">{{time}}</span>
            </div>
            <maps-tooltip :text="$t('lang.public_Full_Exit_screen_Mode')">
                <el-button size="mini"
                    @click="dialogVisible = false">
                    <i class="iconfont maps-icon-window"></i>
                </el-button>
            </maps-tooltip>
        </div>
        <div class="content-body">
            <slot name="table-box">
            </slot>
        </div>
    </el-dialog>
</template>

<script>
export default {
  name: "FullScreen",
  props: {
    title: {
      type: String,
      default: "报表标题",
    },
    time: {
      type: String,
      default: "--",
    },
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
    };
  },
  watch: {},
  methods: {
    show() {
      this.dialogVisible = true;
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.fullscreen-dialog {
  .el-dialog__header {
    background: #fff;
    border-bottom: 1px solid #cccccc;
  }
  .el-dialog__body {
    padding: 10px 20px 0 20px;
    height: calc(100% - 61px);
  }
  .el-dialog__footer {
    height: 0;
    padding: 0;
  }
}
</style>
<style lang='scss' scoped>
.fullscreen-dialog {
  .header {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 20px;
    .title {
      font-size: 16px !important;
      font-weight: 700;
      color: #333;
    }
    .filter-time {
      font-size: 12px;
      color: #999;
      margin-left: 20px;
    }
  }
  .content-body {
    width: 100%;
    height: 100%;
  }
}
</style>