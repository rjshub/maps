<template>
  <el-dialog
    title="修改提醒"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="600px"
    custom-class="edit_point_dialog"
  >
    <span class="content">
      您为该规则新增了范围条件，由于当前规则已被应用到以下任务：{{
        message
      }}，请您前往【辅助工具】-【规则管理】-【
      <span class="link" @click="link_to_tools">规则任务</span>
      】页面<span style="color: #ff0000">修改任务的计算范围！</span>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">{{
        $t("lang.public_button_Got_it")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      dialogVisible: false,
      message: "",
    };
  },
  methods: {
    show(list) {
      this.dialogVisible = true;
      let result = [];
      list.forEach((item) => {
        result.push(`${item.task_name} (ID: ${item.task_rid})`);
      });
      this.message = result.join("、");
    },
    link_to_tools() {
      this.$router.push({ path: "/tools/rule/task" });
    },
  },
};
</script>

<style scoped lang="scss">
.edit_point_dialog {
  .content {
    .link {
      cursor: pointer;
      color: #0bb3b3;
    }
  }
}
</style>