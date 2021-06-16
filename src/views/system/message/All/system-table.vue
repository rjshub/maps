<template>
    <div class="system-table-container">
        <MessageTable :tableData="data"
            :showSelect="true"
            type="system"
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
};
</script>
<style lang='scss' scoped>
</style>