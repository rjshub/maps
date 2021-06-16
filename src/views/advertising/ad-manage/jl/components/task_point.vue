<template>
  <el-dialog
    title="创建成功"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    width="600px"
    custom-class="sync_point_dialog"
  >
    <span>您已为{{level}}添加规则任务（任务ID：{{task_rid}}），您可前往【辅助工具】-【规则管理】-【<span
        style="color: rgb(11, 179, 179);cursor:pointer"
        @click="handle_to_tools"
      >规则任务</span>】编辑或查看。</span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        size="mini"
        class="maps-button-mini"
        type="primary"
        @click="dialogVisible = false"
      >知道了</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      task_id: "",
      task_rid: "",
      level: "Campaign",
    };
  },
  methods: {
    show(param) {
      if (param.level == 1) {
        this.level = "Campaign";
      } else {
        this.level = "Ad";
      }
      this.task_id = param.ids.id || "";
      this.task_rid = param.ids.rid || "";
      this.dialogVisible = true;
    },
    // 跳转规则任务-编辑
    handle_to_tools() {
      const map = {
        Campaign: 1,
        Ad: 2
      }
      const origin = window.origin;
      const url = origin + `/china/#/tools/rule/task?task_id=${this.task_id}&level=${map[this.level]}`;
      window.open(url);
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>