<template>
    <el-dialog :visible.sync="dialogVisible"
        :title="$t('lang.public_Attention')"
        width="45%"
        :show-close='false'
        custom-class="report-point">
        <main>
            <div>
                <span>{{$t('lang.report_search_point_1')}}</span>
                <span style="color: #ff0000">{{$t('lang.report_search_point_2')}}</span>
            </div>
            <div>{{$t('lang.report_search_point_3')}}</div>
        </main>
        <span slot="footer"
            class="dialog-footer">
            <el-button type="primary"
                @click="submit">{{$t('lang.public_button_Got_it')}}</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    submit() {
      this.$emit("close");
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
.report-point {
  main {
    div {
      font-size: 14px;
      color: #333;
      line-height: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>