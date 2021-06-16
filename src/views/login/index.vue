<template>
  <div class="login-container">
    <div class="system-logo" v-if="route_name !== 'Login'">
    </div>
    <router-view></router-view>
    <LoginFooter class="login-footer"></LoginFooter>
  </div>
</template>

<script>
import LoginFooter from "../layout/LayoutFooter";

export default {
  components: { LoginFooter },
  data() {
    return {};
  },
  computed: {
    route_name() {
      return this.$route.name;
    }
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss">
.login-container {
  .system-logo {
    width: 250px;
    // height: 100px;
    height: 60px;
    margin-bottom: 10px;
    background: url("~@/assets/image/maps.svg") no-repeat center;
    background-size: cover;
  }
  .eqiure-handle {
    font-size: 14px;
    color: #97b4d7;
    display: inline-block;
    width: 100%;
    text-align: center;
    span {
      color: #0bb3b3;
      // font-weight: 700;
      cursor: pointer;
    }
  }
  .el-button {
    width: 100%;
    height: 40px;
    background: #0bb3b3;
    border: none;
    font-size: 14px;
    font-weight: 400;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
    span {
      text-align: center;
      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-left: 20px;
      }
    }
    &.is-loading {
      background: #9c9c9c;
    }
  }
  .el-button:hover {
    background-color: #33cccc;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 40px;
      // input::-webkit-input-placeholder {
      //   text-align: center;
      // }
      .el-input {
        display: flex;
        .el-input__inner {
          height: 40px;
          // height: 1.64rem;
          background-color: #fff !important;
          padding-left: 40px;
          box-shadow: 0px 9px 9px 0px rgba(0, 0, 0, 0.2);
        }
        .el-input__prefix {
          left: 10px;
        }
      }
      .vcode-input {
        .el-input__inner {
          padding: 0 15px;
        }
        .el-input__suffix {
          right: 0;
          text-align: left;
        }
        .el-input-group__append {
          padding: 0 50px;
          height: 38px;
          // height: 1.62rem;
        }
      }

      .login-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
      }
    }
  }
  .login-footer {
    color: #fff;
    position: absolute;
    bottom: 0;
  }
}
</style>
<style lang='scss' scoped>
</style>