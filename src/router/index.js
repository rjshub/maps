import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
// pd路由
// import privacyRoute from "./privacy";  //版权
// import alarmRoute from './alarm' // 告警中心
import helpRoute from './help' // 帮助中心
import userRoute from "./user";
import personalRoute from './personal'
import authRoute from './auth'
import elm from "element-ui";
import systemRoute from './system';
import reportRoute from './report'
import toolsRoute from './tools'
import advertisingRoute from './advertising'

/*import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)*/

Vue.use(Router);

let isLogin = () => {
  return store.getters["user/isLogin"];
};

let routes = [].concat(
  // privacyRoute,
  // alarmRoute,
  helpRoute, // 帮助中心
  userRoute, //用户登录
  personalRoute, //个人信息
  authRoute, //同步中转地址
  systemRoute, //系统管理
  reportRoute, //报表中心
  toolsRoute, //辅助工具
  advertisingRoute, //广告智投
);

const router = new Router({
  routes: routes
});
// 不需要登录的路径
const whiteList = ["/user/login","/user/signup","/user/password_reset", "/maps/privacy", "/404", "/test", "/foo"];
//未开发的路由
const unOpenedList = ["/history"];
//没有权限的路由
const noAuthList = ["/nosystem", "/noprojectcreate"];

router.beforeEach((to, from, next) => {
  if (unOpenedList.indexOf(to.path) >= 0) {
    next(false);
    elm.Message.info("敬请期待");
    return;
  }
  if (noAuthList.indexOf(to.path) >= 0) {
    next(false);
    elm.Message.info("暂无权限");
    return;
  }
  if (whiteList.indexOf(to.path) >= 0) {
    next();
  } else if (isLogin()) {
    next();
  } else {
    next({
      path: "/user/login",
      query: { redirect: to.fullPath }
    });
  }
});

export default router;
