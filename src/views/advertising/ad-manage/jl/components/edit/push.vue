<template>
  <el-dialog
    title="推送提醒"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="50%"
    @closed="dialog_closed"
  >
    <span v-html="point"></span>

    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handle_cancel">取 消</el-button>
      <el-button
        type="primary"
        @click="handle_save"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      dialogVisible: false,
      row_id: "",
      point: "",
      form: {},
      media_ids: [],
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
    ...mapState("system",['active_team_id'])
  },
  methods: {
    show(param) {
      this.dialogVisible = true;
      // this.form = param.form;
      this.form = {
        team_id: this.active_team_id,
        ...param.form
      }
      this.point = param.point;
      this.row_id = param.row_id;
      this.media_ids = param.form[`media_${this.active_tab}_ids`];
    },
    // 关闭
    close() {
      this.dialogVisible = false;
      this.form = {};
    },
    // 关闭之后更新编辑状态
    dialog_closed() {
      this.$emit("closed", this.media_ids.join());
    },
    handle_cancel() {
      this.dialogVisible = false;
      this.form = {};
    },
    handle_save() {
      this.$emit("save", this.form);
      this.$message({
        message: "系统正在推送，请稍后...",
        duration: 5000,
        offset: 3,
        type: "success",
      });
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>