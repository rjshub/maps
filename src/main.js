// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from "element-ui/lib/locale/lang/en";
import Animate from 'animate.css'
import '@/assets/css/index.css'

// 国际化
import VueI18n from 'vue-i18n'
import messages from './VueI18n'

import './mock'

import ECharts from "echarts";
// import chinaMap from "@/services/map/china.json";
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/axis";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/title";
// import "echarts/lib/chart/map";
// import "echarts/lib/component/visualMap";
// import "echarts/lib/chart/pie";
// import "echarts/lib/chart/treemap";
// import "echarts/lib/component/graphic";
// import "echarts/lib/component/toolbox";
// import "echarts/lib/component/dataZoom";
// import "echarts/lib/component/grid";
// import "echarts/theme/dark";
// ECharts.registerMap("china", chinaMap);
Vue.component("maps-chart", ECharts);
Vue.prototype.$echarts = ECharts

// Vue.use(ElementUI, { locale })
Vue.use(Animate)
// import '@/mock'
import math from "mathjs";
math.config({
  number: "BigNumber", // Default type of number:
  precision: 14 // Number of significant digits for BigNumbers
});

// 分割组件
import splitPane from 'vue-splitpane'
Vue.component('split-pane', splitPane);
// tooltip
import MapsTooltip from "@/views/public/maps-tooltip";
Vue.component("maps-tooltip", MapsTooltip);
// 上传
import MapsUpload from '@/views/public/upload'
Vue.component("maps-upload", MapsUpload);
// 复选+搜索下拉框
import FilterSelect from '@/views/public/filter-select'
Vue.component("filter-select", FilterSelect);
// 右侧滑入抽屉
import MapsDrawer from '@/views/public/drawer'
Vue.component("maps-drawer", MapsDrawer);
// 表格自定义空态
import TableEmpty from '@/views/public/table-empty'
Vue.component("table-empty", TableEmpty);
// 平台图标
import PlatformIcon from '@/views/public/platform-icon'
Vue.component("platform-icon", PlatformIcon);
// 下载Excel
import DownloadFile from '@/views/public/download'
Vue.component("download-file", DownloadFile);

import App from './App'

import router from './router'
import store from './store'
import Util from '@/services/util'
Vue.use(Util)

sync(store, router)

// 自适应
// import '@/services/flexible.js'

// 为了能正常显示图片
if (process.env.NODE_ENV == 'production') {
  Vue.host = Vue.prototype.$host = '/';
}
else {
  Vue.host = Vue.prototype.$host = 'http://192.168.80.11:8004/';
}

// 国际化
// store.state.user.language
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.user.language, // 语言标识 //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages
})
// Vue.config.productionTip = false
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  watch: {
    // 监测路径改变相应的 title
    $route: {
      handler: function (route) {
        let title = route.meta && route.meta.title || ''
        document.title = "华扬多广告平台管理系统 - " + title;
      },
      immediate: true
    }
  },
  render(h) {
    return (
      <App />
    )
  }
})
