import AuthIndex from '@/views/auth'
// import Layout from "@/views/layout/Layout";

let routes = [
    {
        path: "/maps/auth",
        meta: {
            title: "auth",
            nav: "/auth",
        },
        name: "auth",
        component: AuthIndex
    }
]

export default routes