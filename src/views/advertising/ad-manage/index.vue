<template>
    <div class="">
        <router-view />
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    ...mapActions("advertising", ["reset_all_param"]),
  },
  created() {
    this.reset_all_param();
  },
};
</script>
<style lang='scss' scoped>
</style>