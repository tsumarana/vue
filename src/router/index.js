import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

const routes = [{
        path: '/login',
        name: "login",
        component: () =>
            import ('../pages/account/login.vue')
    },
    {
        path: '/register',
        name: "register",
        component: () =>
            import ('../pages/account/register.vue')
    },
    {
        path: '/404',
        name: "404",
        component: () =>
            import ('../router/views/404.vue')
    },
    {
        path: '/401',
        name: "401",
        component: () =>
            import ('../router/views/401.vue')
    },
    {
        pats: '/',
        component: () =>
            import ('../pages/index.vue'),
        redirect: '/login',
        children: [{
                path: '/showbrand',
                name: "showBrand",
                component: () =>
                    import ('../pages/dashbord/showbrand.vue')
            },
            {
                path: '/sell',
                name: "sell",
                component: () =>
                    import ('../pages/dashbord/sell.vue')
            },
            {
                path: '/binfo',
                name: "brandInfo",
                component: () =>
                    import ('../pages/dashbord/binfo.vue')
            },
            {
                path: '/pinfo',
                name: "personInfo",
                component: () =>
                    import ('../pages/dashbord/pinfo.vue')
            },
            {
                path: '/btrolley',
                name: "brandTrolley",
                component: () =>
                    import ('../pages/dashbord/btrolley.vue')
            },
            {
                path: '/order',
                name: "order",
                component: () =>
                    import ('../pages/dashbord/order.vue')
            },
            {
                path: '/pay',
                name: "pay",
                component: () =>
                    import ('../pages/dashbord/pay.vue')
            },
            {
                path: '/manager',
                name: "manager",
                component: () =>
                    import ('../pages/dashbord/manager.vue')
            },
            {
                path: '/chat',
                name: "chat",
                component: () =>
                    import ('../pages/dashbord/chat.vue')
            },
            {
                path: '/border',
                name: "border",
                component: () =>
                    import ('../pages/dashbord/border.vue')
            },
        ]
    }


]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem("token")
//     if (to.name !== "login" && to.name !== "register" && !token && to.name !== "showBrand" && to.name !== "404" && to.name !== "401") {
//         next({ name: "401" })
//     } else {
//         next()
//     }
// })
export default router