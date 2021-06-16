<template>
  <div class="alarm-container" style="height: calc(100% - 69px)">
    <div class="container-main">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="Alerts" name="1"></el-tab-pane>
        <el-tab-pane label="System Notifications" name="2"></el-tab-pane>
      </el-tabs>
      <component class="alarm-main" :is="activeNav"></component>
    </div>
  </div>
</template>

<script>
import AlertsList from "./alerts-list";
import SystemList from "./system-list";

export default {
  components: { AlertsList, SystemList },
  data() {
    return {
      activeName: "1"
    };
  },
  computed: {
    activeNav() {
      const map = {
        '1': "AlertsList",
        '2': "SystemList"
      };
      return map[this.activeName];
    }
  },
  methods: {},
  mounted() {
    if (this.$route.params.type) {
      this.activeName = this.$route.params.type
    }
  }
};
</script>
<style lang='scss' scoped>
.alarm-container {
  height: 100%;
  padding: 20px 20px 0 20px;
  .container-main {
    height: 100%;
  }
  .alarm-main {
    padding: 20px 20px 0 20px;
    background: #fff;
    height: calc(100% - 60px);
  }
}
</style>