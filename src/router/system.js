import store from "@/store";

import Layout from "@/views/layout/Layout";
import AccountIndex from '@/views/system/account';
import MessageIndex from '@/views/system/message';
import TeamIndex from '@/views/system/team';
import RootIndex from '@/views/system/root';
import SubscribeIndex from '@/views/system/message/subscribe';
import AllIndex from '@/views/system/message/All';

let isRoot = () => {
  return store.getters["user/isRoot"];
};

const routes = [{
    path: '/system',
    component: Layout,
    children: [{
        path: "",
        redirect: isRoot()? "root":"account"
      },
      {
        path: "account",
        meta: {
          title: "账号管理",
          nav: "/system"
        },
        name: "AccountIndex",
        component: AccountIndex
      },
      {
        path: "message",
        meta: {
          title: "消息中心",
          nav: "/system"
        },
        name: "MessageIndex",
        component: MessageIndex,
        children: [{
            path: '',
            redirect: 'All'
          },
          {
            path: 'subscribe',
            meta: {
              title: '订阅消息',
              nav: '/system'
            },
            name: 'SubscribeIndex',
            component: SubscribeIndex
          },
          {
            path: 'All',
            meta: {
              title: '全部消息',
              nav: '/system'
            },
            name: 'AllIndex',
            component: AllIndex
          },
        ]
      },
      {
        path: "team",
        meta: {
          title: "团队管理",
          nav: "/system"
        },
        name: "TeamIndex",
        component: TeamIndex
      },
      {
        path: "root",
        meta: {
          title: "系统账号",
          nav: "/system"
        },
        name: "RootIndex",
        component: RootIndex
      },
    ]
  }

]

export default routes
