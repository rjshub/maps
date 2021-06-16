<template>
    <div style="height:100%"
        class="chart-wrap">

        <div ref="chart"
            class="histogram">
        </div>
    </div>
</template>

<script>
//柱状图
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import echarts from "echarts";
// import { saveAs } from "file-saver";
// import masTheme from "@/assets/chart/theme.json";
// import colors from "@/assets/chart/color-config";
// import waitGridItemLoaded from "../waitGridItemLoaded.js";
export default {
  name: "HistogramBar",
  components: {},

  props: {
    title: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      $chart: null,
      values: {
        xAxis: "x",
        unit: "Million",
        rows: [
          {
            x: "A&P",
            y1: 100,
            y2: 76,
            y3: 20,
            y4: 55,
            y5: 90,
          },
          {
            x: "Entry / Natural",
            y1: 83,
            y2: 26,
            y3: 10,
            y4: 78,
            y5: 112,
          },
          {
            x: "Fashion Couture",
            y1: 25,
            y2: 44,
            y3: 16,
            y4: 99,
            y5: 55,
          },
          {
            x: "Fragrance",
            y1: 57,
            y2: 52,
            y3: 90,
            y4: 20,
            y5: 35,
          },
          {
            x: "Luxury",
            y1: 26,
            y2: 88,
            y3: 36,
            y4: 19,
            y5: 55,
          },
        ],
      },
    };
  },

  computed: {
    ...mapState("dashboard", ["chartShowType"]),
  },

  mounted() {
    // waitGridItemLoaded(this, () => {
    this.$chart = echarts.init(this.$refs.chart);
    this.createChart();

    //监听chart div尺寸的变化
    // this.$detectDomResize(
    //   jquery(".chart-wrap"),
    //   _.debounce(() => {
    //     //增加防抖动
    //     this.$chart?.resize();
    //   }, 1000)
    // );
    // });
    const THIS = this
    window.addEventListener("resize", function () {
      this.setTimeout(() => {
        THIS.$chart.resize();
      }, 1000);
    });
  },

  methods: {
    getSeries(values) {
      let series = [];
      let encodes = Object.keys(this.values.rows[0]);

      for (let i = 0; i < encodes.length - 1; i++) {
        series.push({
          type: "bar",
          barGap: "20%",
          barWidth: 20,
          barMinHeight: 1,
          silent: true,
          encode: { x: encodes[0], y: encodes[i + 1] },
        });
      }

      return series;
    },

    createChart() {
      let option = {
        backgroundColor: "#ffffff", //默认无背景

        dataset: {
          source: this.values.rows,
        },

        tooltip: {
          show: false,
          trigger: "none",
          triggerOn: "none",
        },
        //上下左右的间隔
        grid: {
          top: 15,
          left: 15,
          right: 15,
          bottom: 15,
          containLabel: true,
        },
        xAxis: [
          {
            show: false,
            type: "category",
          },
        ],
        color: ["#e5e5e5", "#d9d9d9", "#d5d5d5", "#c9c9c9", "#c5c5c5"], //5色系颜色
        yAxis: [
          {
            axisLabel: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],

        series: this.getSeries(),
      };

      this.$chart.setOption(option, true); //设置true，重新绘制
    },

    handle_download_chart() {
      let canvasElement = jquery(this.$refs.chart).find("canvas")[0];
      let imgURL = canvasElement.toDataURL("image/png");
      saveAs(imgURL, this.title);
    },

    //下钻后，返回
    handle_back_chart() {
      this.$emit("back", this.values.back);
    },
    //下钻，前进
    handle_forward_chart() {
      this.$emit("forward", this.values.forward);
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;

  .tools {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }

  .histogram {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    filter: grayscale(1);
  }
}
</style>