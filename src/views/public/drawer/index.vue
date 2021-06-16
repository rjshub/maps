<template>
  <el-drawer
    :visible.sync="drawer"
    direction="rtl"
    :size="size"
    :custom-class="`public-drawer ${full ? 'fullscreen-drawer' : ''}`"
    :close-on-press-escape="false"
    :show-close="false"
    :wrapperClosable="false"
    :destroy-on-close="true"
    @opened="drawer_opened"
    @closed="drawer_closed"
    v-loading="loading"
  >
    <section class="drawer-header">
      <div class="left">
        <div class="back" @click="close_drawer">
          <i class="iconfont maps-icon-right"></i>
        </div>
        <span v-html="title"></span>
      </div>
      <slot name="drawerHeader"></slot>
    </section>
    <!-- 平台列表 -->
    <section class="drawer-body">
      <slot name="drawerBody"></slot>
    </section>
  </el-drawer>
</template>

<script>
export default {
  components: {},
  props: {
    title: String,
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      default: "55%",
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: false,
      //   dialog_row_loading: false,
    };
  },
  watch: {},
  methods: {
    drawer_opened() {
      this.$emit("opened");
    },
    drawer_closed() {
      this.$emit("closed");
    },
    show() {
      this.drawer = true;
    },
    close() {
      this.drawer = false;
    },
    close_drawer() {
      this.$emit("close");
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.public-drawer {
  box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.2);
  //   border-radius: 11px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 20px 0;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
  .el-drawer__body {
    height: 100%;
  }
}
</style>
<style lang='scss' scoped>
.public-drawer {
  .drawer-header {
    padding-right: 20px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .left {
      display: flex;
      align-items: center;
      .back {
        height: 24px;
        width: 35px;
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        margin-right: 20px;
        background: #f3f3f3;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        i {
          font-size: 12px;
        }
      }
      .back:hover {
        background-color: #0bb3b3;
        color: #fff;
      }
    }
  }
  .drawer-body {
    height: calc(100% - 54px);
    padding: 0 20px;
  }
}
</style>