<template>
  <div class="alerts-list-container">
    <ListContainer  ref="list_container"></ListContainer>
  </div>
</template>

<script>
import ListContainer from "../component/alarm-table";

export default {
  components: { ListContainer },
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {
      this.$refs.list_container.update_alarm_type('1') // alerts
  }
};
</script>
<style lang='scss' scoped>
.alerts-list-container {}
</style>