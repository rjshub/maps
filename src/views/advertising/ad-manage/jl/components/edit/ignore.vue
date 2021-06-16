<template>
  <el-dialog
    title="忽略提醒"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="40%"
    @closed="dialog_closed"
  >
    <div>{{ point }}</div>
    <el-checkbox
      v-if="show_check"
      v-model="form.is_ignore_normal"
      :true-label="1"
      :false-label="0"
      style="margin-top: 10px"
    >同时忽略“正常触发规则”的自动修改</el-checkbox>
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
import fetch from "@/services/fetch";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      dialogVisible: false,
      form: {},
      point: "",
      show_check: false,
      row_id: "",
      media_ids: [],
    };
  },
  computed: {
    ...mapState("advertising", ["active_tab"]),
  },
  methods: {
    show(param) {
      this.dialogVisible = true;
      this.form = param.form;
      this.point = param.point;
      this.show_check = !param.single;
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
    },
    async fetchCore(url, data, hasLoading = true) {
      hasLoading && (this.isLoading = true);
      try {
        let _data = await fetch.post(url, data);
        return _data;
      } catch (err) {
        hasLoading && (this.isLoading = false);
      } finally {
        hasLoading && (this.isLoading = false);
      }
    },
  },
};
</script>

<style>
</style>