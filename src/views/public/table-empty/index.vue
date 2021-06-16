<template>
    <div class="list-empty">
        <i class="iconfont maps-icon-nodata"></i>
        <span>{{text}}</span>
    </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  },
  components: {},
  data() {
    return {};
  },
  watch: {},
  methods: {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.list-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: #999999;
  font-size: 14px;
  text-align: center;
  & > i {
    font-size: 70px;
  }
  span {
    margin-top: 20px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>