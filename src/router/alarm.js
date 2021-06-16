import AlarmIndex from '@/views/alarm'
import Layout from "@/views/layout/Layout";

let routes = [
    {
        path: '/maps',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "alarm"
            },
            {
                path: "alarm",
                meta: {
                    title: "alarm",
                    nav: "/alarm",
                },
                name: "alarm",
                component: AlarmIndex
            }
        ]
    }
]

export default routes