<template>
    <div class="tools-intelligent-container">
        <header>
            <el-tabs @tab-click="handle_click_tab"
                v-model="activeName">
                <el-tab-pane :label="$t('lang.intelligent_rule_list')"
                    name="rule"></el-tab-pane>
                <el-tab-pane :label="$t('lang.intelligent_rule_log_list')"
                    name="log"></el-tab-pane>
            </el-tabs>
        </header>
        <main>
            <component :is="set_active_module"
                :rules_ids="active_ids"
                @update_tab="update_tab"></component>
        </main>
    </div>
</template>

<script>
import RuleList from "./rule-list";
import LogList from "./log-list";

export default {
  components: { RuleList, LogList },
  data() {
    return {
      activeName: "rule",
      active_ids: "",
    };
  },
  watch: {},
  computed: {
    set_active_module() {
      const map = {
        rule: "RuleList",
        log: "LogList",
      };
      return map[this.activeName];
    },
  },
  methods: {
    //   切换tab
    handle_click_tab() {
      if (this.activeName == "rule") {
        this.active_ids = "";
      }
    },
    update_tab(param) {
      if (param.tab) {
        this.activeName = param.tab;
      }
      this.active_ids = param.id;
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.tools-intelligent-container {
  height: 100%;
  background: #fff;
  & > header {
    height: 39px;
    padding: 0 20px;
    border-bottom: 1px solid #f1f2f8;
  }
  & > main {
    height: calc(100% - 40px);
  }
}
</style>