<template>
  <el-menu-item :index="index">
    <span slot="title"
      class='text'>{{text}}</span>
  </el-menu-item>
</template>
<script>
export default {
  name: "topbar-el-menu-sub-item",
  components: {},
  props: {
    index: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    },
  },
  data() {
    return {
    };
  },
  watch: {

  },
  computed: {},
  created() {
  },
  methods: {}
};
</script>
<style scoped lang="scss">
</style>
<style lang="scss">

</style>


