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
                    meta: {
                        requiresAuth: true ////user should be login
                    },
                    component: () => import('@/views/dashboard/Dashboard'),
                },

                ///employees
                {
                    name: 'کارمندان',
                    path: '/employees',
                    component: () => import('@/views/employee/Index'),
                },


                ///create-employee
                {
                    name: 'کارمند جدید',
                    path: '/create/employee',
                    component: () => import('@/views/employee/Create'),
                },


                ///edit-employee
                {
                    name: 'ویرایش کارمند',
                    path: '/edit/employee/:id',
                    component: () => import('@/views/employee/Edit'),
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
        next({name: 'Login'})
        return
    }

    // if logged in redirect to dashboard
    if (to.path === '/login' && store.state.isLoggedIn) {
        next({name: 'Dashboard'})
        return
    }

    next()
})
export default router;

