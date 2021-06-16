<template>
    <div class="advertising-table-container">
        <MessageTable :tableData="data"
            :showPlatform="true"
            :showSelect="true"
            type="advertising"
            @selectChange="selectChange"
            @updateList="updateList"></MessageTable>
    </div>
</template>

<script>
import MessageTable from "@/views/system/components/message-table";

export default {
  props: {
    data: {
      type: Array,
    },
  },
  components: { MessageTable },
  data() {
    return {};
  },
  watch: {},
  methods: {
    selectChange(param) {
      this.$emit("batchSelect", param);
    },
    updateList() {
      this.$emit("updateList");
    },
  },
  mounted() {},
};
</script>
<style lang='scss' scoped>
</style>