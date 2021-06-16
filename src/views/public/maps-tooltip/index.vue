<template>
    <el-tooltip :disabled="set_abled"
        :open-delay="500"
        :visible-arrow="false"
        placement="bottom-start">
        <span class="content"
            slot="content"
            v-html="text"
            :style="`text-align: ${align}`"
            :class="align == 'left'? 'word-format':''"></span>
        <slot></slot>
    </el-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      default: "",
    },
    align: {
      type: String,
      default: "center",
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    set_abled() {
      if (this.text && this.text.length) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.content {
  display: inline-block;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}
.word-format {
  // word-break: break-all;
}
</style>