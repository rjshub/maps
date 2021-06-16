<template>
  <div class="expect">
    <div class="ico"></div>
    <div class="text">敬请期待</div>
  </div>
  <!-- <div class="mayue"></div> -->
</template>

<script>
import _ from "lodash";

export default {
  name: "unopened",
  componentName: "unopened",
  components: {},
  props: {},
  data() {
    return {

    };
  },

  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
    },

  }
};
</script>
<style scoped>
.expect {
  width: 124px;
  margin: 0 auto;
  margin-top: 200px;
  margin-bottom: 250px;
}
.expect .ico {
  width: 124px;
  height: 96px;
  background: url("~@/assets/image/unopened.png");
  background-repeat: no-repeat;
  color: #b6bdc7;
}
.expect .text {
  color: #b6bdc7;
  text-align: center;
  font-size: 17px;
  margin-top: 10px;
}
</style>
<style>
</style>