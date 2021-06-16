import Layout from "@/views/layout/Layout";
import CustomIndex from '@/views/report/custom';
import EffectIndex from '@/views/report/effect';
import SubscribeIndex from '@/views/report/subscribe'

const routes = [
    {
        path: '/report',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "custom"    
            },
            {
                path: "custom",
                meta: {
                    title: "客户报表",
                    nav: "/report"
                },
                name: "CustomIndex",
                component: CustomIndex
            },
            {
                path: "effect",
                meta: {
                    title: "效果报表",
                    nav: "/report"
                },
                name: "EffectIndex",
                component: EffectIndex
            },
            {
                path: "subscribe",
                meta: {
                    title: "报表订阅",
                    nav: "/report"
                },
                name: "SubscribeIndex",
                component: SubscribeIndex
            },
        ]
    }

]

export default routes