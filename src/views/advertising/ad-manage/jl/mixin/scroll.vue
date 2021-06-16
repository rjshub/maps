<template>
    <div class=""></div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      showToTop: false,
      throttleTimer: null,
      table_height: 600,
    };
  },
  watch: {},
  methods: {
    ...mapActions(["updata_scrolltop"]),
    toTop(event) {
      this.$refs.toTop.scrollTop = 0;
    },
    // 滚动隐藏筛选条件
    set_height() {
      if (this.$refs.table_main.offsetHeight > 600) {
        this.table_height = this.$refs.table_main.offsetHeight;
      } else {
        this.table_height = 600;
      }
    },
    scrolltop_change(scrollTop) {
      const header = this.$refs.list_filter;
      const body = this.$refs.list_table;
      if (scrollTop > 0) {
        header.style.height = 0;
        header.style.overflow = "hidden";
        body.style.paddingTop = "30px";
      } else {
        header.style.height = "auto";
        header.style.overflow = "unset";
        body.style.paddingTop = "0px";
      }
      this.set_height();
    },
    onScroll(event) {
      let top = event.srcElement.scrollTop;
      this.scrolltop_change(top);
      clearTimeout(this.throttleTimer);
      this.throttleTimer = setTimeout(() => {
        this.updata_scrolltop(top);
      }, 500);
      this.showToTop = top > 0;
    },
  },
  mounted() {
    this.set_height();
  },
};
</script>
<style lang='scss' scoped>
</style>