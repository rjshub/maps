import HelpIndex from '@/views/help'
import Layout from "@/views/layout/Layout";

let routes = [
    {
        path: '/maps',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "help"
            },
            {
                path: "help",
                meta: {
                    title: "帮助中心",
                    nav: "/help",
                },
                name: "help",
                component: HelpIndex
            }
        ]
    }
]

export default routes