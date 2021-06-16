import PrivacyIndex from '@/views/public/privacy-policy'
import Layout from "@/views/layout/Layout";

let routes = [
    {
        path: '/maps',
        component: Layout,
        children: [
            {
                path: "",
                redirect: "privacy"
            },
            {
                path: "privacy",
                meta: {
                    title: "privacy",
                    nav: "/privacy",
                },
                name: "Privacy",
                component: PrivacyIndex
            }
        ]
    }
]

export default routes