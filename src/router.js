import Vue from 'vue';
import Router from 'vue-router';
import store from "@/store";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'Home',
            path: '/',
            component: () => import('@/views/dashboard/Index'),
            children: [

                /// login
                {
                    name: 'Login',
                    path: '/login',
                    component: () => import('@/views/auth/Login'),
                },

                ///register
                {
                    name: 'Register',
                    path: '/register',
                    component: () => import('@/views/auth/Register'),
                },

                ///ForgetPassword
                {
                    name: 'ForgetPassword',
                    path: '/Forget-Password',
                    component: () => import('@/views/auth/ForgetPassword'),
                },

                ///logout
                {
                    name: 'Logout',
                    path: '/logout',
                    component: () => import('@/views/auth/Logout'),
                },

                /// dashboard
                {
                    name: 'داشبورد',
                    path: '',
                    meta:{
                        requiresAuth:true ////user should be login
                    },
                    component: () => import('@/views/dashboard/Dashboard'),
                },
                {
                    name: 'Typography',
                    path: 'components/typography',
                    component: () => import('@/views/dashboard/component/Typography'),
                },
                // Tables
                {
                    name: 'Regular Tables',
                    path: 'tables/regular-tables',
                    component: () => import('@/views/dashboard/tables/RegularTables'),
                },
                // Maps
                {
                    name: 'Google Maps',
                    path: 'maps/google-maps',
                    component: () => import('@/views/dashboard/maps/GoogleMaps'),
                },
                // Upgrade
                {
                    name: 'Upgrade',
                    path: 'upgrade',
                    component: () => import('@/views/dashboard/Upgrade'),
                },
            ],
        },
    ],
});
router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'Login' })
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/login' && store.state.isLoggedIn) {
        next({ name: 'Dashboard' })
        return
    }

    next()
})
export default router;

