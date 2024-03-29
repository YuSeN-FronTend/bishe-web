import { createRouter, createWebHistory } from 'vue-router';
import { useCar } from '../store'
const routes:any = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../view/dashboard/index.vue')
    },
    // {
    //     path: '/login',
    //     name: 'Login',
    //     component: () => import('../view/login.vue')
    // },
    // {
    //     path: '/layout',
    //     name: 'Layout',
    //     redirect: '/group',
    //     component: () => import('../view/layout.vue'),
    //     children:[
    //         {
    //             path:'/group',
    //             name: '/group',
    //             redirect: '/dashboard',
    //             meta: {
    //                 type: 'first',
    //                 name: '导航一',
    //                 icon: 'Menu'
    //             },
    //             children:[
    //                 {
    //                     path: '/dashboard',
    //                     name: 'Dashboard',
    //                     component: () => import('../view/group/asidefirst/dashboard.vue'),
    //                     meta: {
    //                         type: 'second',
    //                         name: '首页',
    //                         icon: 'House'
    //                     }
    //                 },
    //             ]
    //         },
    //         {
    //             path: '/adminCenter',
    //             name: 'adminCenter',
    //             component: () => import('../view/group/adminCenter.vue'),
    //             meta: {
    //                 type: 'first',
    //                 name: '配置中心',
    //                 icon: 'Setting'
    //             }
    //         },
    //         {
    //             path: '/personCenter',
    //             name: 'PersonCenter',
    //             component: () => import('../view/group/asidefirst/personCenter.vue'),
    //             meta: {
    //                 type: 'first',
    //                 name: '个人中心',
    //                 icon: 'UserFilled'
    //             }
    //         }
    //     ]
    // },
    {
        path: '/404',
        name: '404',
        component: () => import('../view/404.vue')
    },
    {
        path: "/:pathMatch(.*)*", //vue2 * vue3 改为正则
        redirect: "/404",
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// function getRoute(routes:any) {
//     let route: any = [];
//     routes.forEach((item:any) => {
//         if(item.children) {
//             route.push(...getRoute(item.children))
//         } else {
//             if(!item.redirect) {
//                 route.push(item.path)
//             }
//         }
//     })
//     return route;
// }
// let route: any = getRoute(routes);

router.beforeEach((to, from, next) => {

        if (to.name === 'dashboard') {
            // if (sessionStorage.getItem('routePath')) {
            //     sessionStorage.removeItem('routePath')
            // }
            // if (sessionStorage.getItem('tabRoutes')) {
            //     sessionStorage.removeItem('tabRoutes')
            // }
            // useCar().$reset()
            // sessionStorage.removeItem('userInfo')
            next()
        } else if (from.name === 'dashboard' || from.path === '/') {
            if (JSON.parse(String(sessionStorage.getItem('userInfo')))?.token) {
                if (!sessionStorage.getItem('tabRoutes')) {
                    useCar().addTabRoutes({
                        name: to.fullPath,
                        title: to.meta.name,
                        icon: to.meta.icon
                    })
                }
                if (to.name !== useCar().routePath) {
                    useCar().handleRoutePath(to.fullPath)
                }
                next()
            } else {
                next('/dashboard')
            }
        } else {
            let handleRoutes = JSON.parse(String(sessionStorage.getItem('tabRoutes')))
            let result = handleRoutes.some((item: any) => to.fullPath === item.name);
            if (!result) {
                useCar().addTabRoutes({
                    name: to.fullPath,
                    title: to.meta.name,
                    icon: to.meta.icon
                })
            }
            // tabs键高亮不跟随显示问题
            if (to.name !== useCar().routePath) {
                useCar().handleRoutePath(to.fullPath)
            }
            next();
        }     
})


export default router;