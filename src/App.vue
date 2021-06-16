<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
    <AccountFail ref="AccountFail"></AccountFail>
  </div>
</template>

<script>
import fetch from "@/services/fetch";
import { mapState, mapActions } from "vuex";
import $ from "jquery";
import AccountFail from "@/views/public/connect-fail/index";

export default {
  components: { AccountFail },
  name: "app",
  data() {
    return {
      special_route: ["Login", "SignUp", "ForgotPass"],
      heartBeatTime_sync: 1000 * 10, //10秒发一次同步状态的心跳
      timer_sync: null, //同步计时器的timer
      heartBeatTime_screen: 1000 * 3, //浏览器监测，5秒触发一次
      timer_screen: null, //
      timer_key_mouse: null,
      heartBeatTime_key_mouse: 0,
    };
  },
  computed: {
    ...mapState("user", ["token", "language"]),
    // ...mapGetters("user", ["isLogin"]),
    ...mapState("system", ["active_team_id", "connect_sync", "team_manager"]),
  },
  watch: {
    // token(n, o) {
    //   if (n) {
    //     this.init();
    //   } else {
    //     //如果退出登陆，则停止定时器
    //     clearInterval(this.timer_sync);
    //     clearInterval(this.timer_screen);
    //   }
    // },
    // connect_sync(val) {
    //   if (val && this.token) {
    //     this.init();
    //   }
    // },
  },

  methods: {
    ...mapActions("user", ["remove_login_info", "logout"]),
    init() {
      this.timer_sync = null;
      this.timer_screen = null;
      if (this.token) {
        this.hertBaetScreen(); //是否关闭浏览器
      }
      if (this.token && this.team_manager) {
        this.heartBeat();
      }
    },
    heartBeat() {
      this.timer_sync = setInterval(() => {
        if (this.special_route.includes(this.$route.name)) {
          this.remove_login_info().then(() => {
            clearInterval(this.timer_sync);
          });
        } else {
          this.fetch_heartBeat();
        }
      }, 1000 * 10);
    },
    // 查询同步状态
    async fetch_heartBeat() {
      if (this.active_team_id == "") {
        return false;
      }
      try {
        const data = await fetch.post("/account/getSyncResult");
        if (data) {
          if (!data.status) {
            clearInterval(this.timer_sync);
          }
          if (data.list.length) {
            this.$refs.AccountFail.show(data.list);
            // 这里需要清空一次list
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    // 判断浏览器是否账号未退出直接关闭
    hertBaetScreen() {
      this.timer_screen = setInterval(() => {
        // setTimeout(() => {
        if (this.special_route.includes(this.$route.name)) {
          this.remove_login_info().then(() => {
            clearInterval(this.timer_screen);
          });
        } else {
          this.fetch_heartBeat_screen();
        }
        // }, 3000);
      }, 3000);
    },
    async fetch_heartBeat_screen() {    
      const data = await fetch.post("/user/refresh");
      if (data) {
        // 没失效
        // this.hertBaetScreen();
      } else {
        // console.log("登录信息失效！");
        // clearInterval(this.timer_screen);
      }
    },
    // 判断系统内一小时无鼠标键盘响应操作
    heartBeat_key_mouse() {
      clearInterval(this.timer_key_mouse);
      this.heartBeatTime_key_mouse = 0;
      if (this.token) {
        this.timer_key_mouse = setInterval(() => {
          this.heartBeatTime_key_mouse += 1;
          // (60 * 60) / 5
          if (this.heartBeatTime_key_mouse > (2 * 60 * 60) / 5) {
            console.log("未操作，权限过期！");
            //过期了
            clearInterval(this.timer_key_mouse);

            this.remove_login_info().then(() => {
              localStorage.setItem("isExpires", "0");
            });
            this.$msgbox({
              title: this.$t("lang.public_point"),
              message: this.$t("lang.login_expired"),
              showCancelButton: false,
              confirmButtonText: this.$t("lang.public_button_Got_it"),
              type: "warning",
              callback: (action) => {
                this.logout().then(() => {
                  clearInterval(this.timer_key_mouse);
                  clearInterval(this.timer_screen);
                  clearInterval(this.timer_sync);
                  this.$router.push({
                    path: "/user/login",
                  });
                });
              },
            });
          }
        }, 5000);
      }
    },
    ScreenSaver() {
      this.heartBeat_key_mouse(); //一小时内是否有鼠标键盘事件
      const self = this;
      window.onload = function () {
        document.onkeydown = function (event) {
          var e = event || window.event || arguments.callee.caller.arguments[0];
          // e.preventDefault(); //阻止默认事件
          self.heartBeat_key_mouse();
        };
        document.onmousedown = function (event) {
          var e = event || window.event || arguments.callee.caller.arguments[0];
          // e.preventDefault(); //阻止默认事件
          self.heartBeat_key_mouse();
        };
      };
    },
  },
  mounted() {
    this.ScreenSaver();

    // this.init();
  },
  created() {
    // this.styleObj = {
    //   height: this.$getWindow().height + "px",
    // };
    document.documentElement.style.fontSize =
      20 * (this.$getWindow().height / 768) + "px"; //设置html根元素的font-size
  },
};
</script>

<style>
</style>
