<template>
    <el-menu :default-active="defaultActive"
        class="leftbar-nav-menu"
        :router="true"
        text-color="#09358A"
        active-text-color="#09358A">
        <slot></slot>
    </el-menu>
</template>
<script>
export default {
  name: "side-el-menu",
  components: {},
  props: {
    defaultActive: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
</style>
<style lang="scss">
.leftbar-nav-menu {
  background: transparent;
  border-right: 0;
  display: flex;
  flex-flow: column;
  .el-menu-item,
  .el-submenu__title {
    padding: 0 20px;
    font-size: 14px;
    height: 45px;
    color: #b6bdcf !important;
    line-height: 45px;
    i {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .el-submenu__icon-arrow {
    right: 10px;
  }

  .el-submenu__title,
  .el-menu-item{
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


