/*
 * 用户登录
 */
import store from "@/store";

import LoginIndex from "@/views/login";
import Login from "@/views/login/login.vue"
import SignUp from "@/views/login/sign-up.vue"
import ForgotPass from '@/views/login/forgot-pass.vue'
import TeamIndex from '@/views/login/team.vue'

let isLogin = () => {
  return store.getters["user/isLogin"];
};

const routes = [{
    path: "/",
    redirect: "/user"
  },
  {
    path: '/user',
    component: LoginIndex,
    children: [{
        path: "",
        redirect: "login"
      },
      {
        path: "login",
        name: "Login",
        component: Login,
        meta: {
          title: "登录",
          nav: "/user"
        },
        beforeEnter: (to, from, next) => {
          next();
          let redirect = to.query.redirect;
          if (isLogin() && redirect) {
            next(redirect);
          } else if (isLogin()) {
            // next("/system");
            next("/user/team");
          } else {
            next();
          }
        }
      },
      {
        path: 'signup',
        name: 'SignUp',
        meta: {
          title: "注册",
          nav: "/user"
        },
        component: SignUp
      },
      {
        path: 'password_reset',
        name: 'ForgotPass',
        meta: {
          title: "修改密码",
          nav: "/user"
        },
        component: ForgotPass
      },
      {
        path: "logout",
        name: "Logout",
        beforeEnter(to, from, next) {
          store
            .dispatch("user/logout")
            .then(res => {
              next("/user/login");
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      {
        path: 'team',
        name: 'Team',
        meta: {
          title: "选择团队",
          nav: "/user"
        },
        component: TeamIndex
      }
    ]
  }
];

export default routes;
