<template>
    <div :class="className"
        :id="echarts"
        ref="chart"
        autoresize
        :style="`height: ${height};width: ${width};background: #fff`">
    </div>
</template>

<script>
import echarts from 'echarts'
// import { saveAs } from "file-saver";
import jquery from "jquery";

export default {
  props: {
    config: {
      type: Object,
    },
    className: {
      type: String,
      default: "echarts-container",
    },
    height: {
      type: String,
      default: "100%",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      option: {},
      $chart: null,
    };
  },
  watch: {},
  computed: {
    echarts() {
      return `echarts${Math.random() * 10000}`;
    },
  },
  methods: {
    // 下载图片
    download(title = "") {
      let canvasElement = jquery(this.$refs.chart).find("canvas")[0];
      let imgURL = canvasElement.toDataURL("image/png");
      return imgURL;
      // saveAs(imgURL, title);
    },
    setOption(option) {
      const THIS = this;
      this.$chart.clear();
      this.$chart.resize();
      this.$chart.setOption(option, true);
      this.$chart.on("click", function (params) {
        if (params.componentType === "series") {
          THIS.$emit("click_event", params.data);
        }
      });
    },
  },
  mounted() {
    this.$chart = echarts.init(this.$refs.chart, null, {renderer: 'canvas'});
    const THIS = this;
    window.addEventListener("resize", function () {
      this.setTimeout(() => {
        THIS.$chart.resize();
      }, 1000);
    });
  },
};
</script>
<style lang='scss' scoped>
#chartBox {
  //   background: #999;
}
</style>