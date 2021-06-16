<template>
    <div class="chart-wrap">
        <div ref="chart"
            class="pie">
        </div>
    </div>
</template>

<script>
//饼图
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import echarts from "echarts";

export default {
  name: "DoughnutPie",
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
      radius: ["30%", "65%"],
      center: ["50%", "58%"],
      values: {
        name1: 15,
        name2: 10,
        name3: 25,
        name4: 40,
        name5: 10,
      },
    };
  },

  computed: {
    ...mapState("dashboard", ["chartShowType"]),
  },

  mounted() {
    this.$chart = echarts.init(this.$refs.chart);
    this.createChart();
    const THIS = this
    window.addEventListener("resize", function () {
      this.setTimeout(() => {
        THIS.$chart.resize();
      }, 1000);
    });
  },

  methods: {
    getSeries() {
      let series = [];

      series.push({
        type: "pie",
        radius: this.radius,
        center: ["50%", "50%"], //圆心
        label: {
          show: false,
        },
        silent: true,
        //通过dataset设置encode
        encode: { itemName: "pieName", value: "pieValue" },
      });

      return series;
    },

    createChart() {
      let option = {
        title: {
          text: this.$t("lang.public_no_data"),
          subtext: "",
          left: "center",
          top: "top",
          // textStyle: {
          //   fontSize: 24,
          //   lineHeight: 40,
          // },
          // subtextStyle: {
          //   fontSize: 20,
          // },
        },
        backgroundColor: "#fff",

        dataset: {
          source: [["pieName", "pieValue"]].concat(Object.entries(this.values)),
        },

        tooltip: {
          show: false,
          trigger: "none",
          triggerOn: "none",
        },

        color: ["#d9d9d9", "#d5d5d5", "#c9c9c9", "#c5c5c5", "#e5e5e5"], //5色系颜色

        series: this.getSeries(),
      };
      this.$chart.setOption(option, true);
    },

    handle_download_chart() {
      let canvasElement = jquery(this.$refs.chart).find("canvas")[0];
      let imgURL = canvasElement.toDataURL("image/png");
      saveAs(imgURL, this.title);
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .tools {
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
  }

  .pie {
    width: 100%;
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    filter: grayscale(1);
  }
}
</style>