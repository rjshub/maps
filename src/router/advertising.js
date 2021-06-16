import Layout from "@/views/layout/Layout";
import ManageIndex from '@/views/advertising/ad-manage'
import JlIndex from '@/views/advertising/ad-manage/jl'

const routes = [{
  path: '/advertising',
  component: Layout,
  children: [{
      path: "",
      redirect: 'manage'
    },
    {
      path: "manage",
      meta: {
        title: "广告管理",
        nav: "/advertising"
      },
      name: "ManageIndex",
      component: ManageIndex,
      children: [{
          path: '',
          redirect: 'jl'
        },
        {
          path: 'jl',
          meta: {
            title: '巨量引擎',
            nav: '/advertising'
          },
          name: 'JlIndex',
          component: JlIndex
        },
      ]
    },
  ]
}]

export default routes
