import PersonalIndex from '@/views/personal-center'
import Layout from "@/views/layout/Layout";

let routes = [
    {
        path: '/maps',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "profile"
            },
            {
                path: "profile",
                meta: {
                    title: "个人中心",
                    nav: "/profile",
                },
                name: "profile",
                component: PersonalIndex
            }
        ]
    }
]

export default routes