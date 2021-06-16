import store from "@/store";

import Layout from "@/views/layout/Layout";
import ToolsIndex from '@/views/tools/index.vue'
import RuleIntelligentIndex from '@/views/tools/intelligent'
import RuleTaskIndex from '@/views/tools/task'

const routes = {
  path: '/tools',
  component: Layout,
  children: [{
      path: '',
      redirect: 'rule'
    },
    {
      path: 'rule',
      meta: {
        title: "规则管理",
        nav: "/tools"
      },
      name: 'ToolsIndex',
      component: ToolsIndex,
      children: [{
          path: '',
          redirect: 'intelligent'
        },
        {
          path: "intelligent",
          meta: {
            title: "智能规则",
            nav: "/tools"
          },
          name: "RuleIntelligentIndex",
          component: RuleIntelligentIndex
        },
        {
          path: "task",
          meta: {
            title: "规则任务",
            nav: "/tools"
          },
          name: "RuleTaskIndex",
          component: RuleTaskIndex
        },
      ]
    },

  ]
}

export default routes
