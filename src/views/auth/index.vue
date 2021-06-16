<template>
    <div class="auth-container">
        Authorization successful!
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {
    post_message_to_opener(id, type) {
      window.opener.postMessage({ id, type }, "*");
      window.close();
    },
  },
  mounted() {
    const type = this.$route.query.type;
    const id = this.$route.query.id;
    if (type && id) {
      this.post_message_to_opener(id, type);
    }
  },
};
</script>
<style lang='scss' scoped>
.auth-container {
  padding: 100px;
  font-size: 26px;
  color: #333;
}
</style>