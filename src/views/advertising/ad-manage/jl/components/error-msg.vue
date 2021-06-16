<template>
  <div class="error-msg">
    <span class="column_"></span>
    <span v-if="set_number.number_1 != 0">
      <i class="iconfont maps-icon-rule"></i>
      触发规则{{label_map[active_tab]}}
      <span class="number">{{set_number.number_1}}</span>
      条
    </span>
    <span v-if="set_number.number_2 != 0">
      （异常
      <span class="number">{{set_number.number_2}}</span>
      条）
    </span>
    <span v-if="set_number.number_3 != 0">
      <i class="iconfont maps-icon-send"></i>
      修改未推送
      <span class="number">{{set_number.number_3}}</span>
      条
    </span>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ErrorMsg",
  props: {
    Number: {
      default: "0,0,0",
    },
  },
  components: {},
  data() {
    return {
      label_map: {
        campaign: "广告组",
        ad: "计划",
      },
    };
  },
  watch: {},
  computed: {
    ...mapState("advertising", ["active_tab"]),
    set_number() {
      const arr = this.Number.split(",");
      return {
        number_1: arr[0] || 0,
        number_2: arr[1] || 0,
        number_3: arr[2] || 0,
      };
    },
  },
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.error-msg {
  height: 32px;
  float: left;
  font-size: 12px;
  color: #333;
  display: flex;
  align-items: center;
  .column_ {
    display: inline-block;
    height: 100%;
    border-right: 1px solid #dddddd;
    margin: 0 5px 0 10px;
  }
  i {
    font-size: 16px;
    margin: 0 5px;
  }
  .number {
    color: #ff6600;
  }
}
</style>