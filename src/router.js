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


//////////////////////////////////////////////////////////////////////////

                /// dashboard
                {
                    name: 'داشبورد',
                    path: '',
                    meta: {
                        requiresAuth: true ////user should be login
                    },
                    component: () => import('@/views/dashboard/Dashboard'),
                },

 //////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////

                ///suppliers
                {
                    name: 'تامین کنندگان',
                    path: '/suppliers',
                    component: () => import('@/views/supplier/Index'),
                },
                ///create-supplier
                {
                    name: 'تامین کننده جدید',
                    path: '/create/supplier',
                    component: () => import('@/views/supplier/Create'),
                },
                ///edit-supplier
                {
                    name: 'ویرایش تامین کننده',
                    path: '/edit/supplier/:id',
                    component: () => import('@/views/supplier/Edit'),
                },


 //////////////////////////////////////////////////////////////////////////

                ///categories
                {
                    name: 'دسته بندی ها',
                    path: '/categories',
                    component: () => import('@/views/category/Index'),
                },
                ///create-category
                {
                    name: 'دسته بندی جدید',
                    path: '/create/category',
                    component: () => import('@/views/category/Create'),
                },
                ///edit-category
                {
                    name: 'ویرایش دسته بندی',
                    path: '/edit/category/:id',
                    component: () => import('@/views/category/Edit'),
                },


 //////////////////////////////////////////////////////////////////////////

                ///products
                {
                    name: 'محصولات',
                    path: '/products',
                    component: () => import('@/views/product/Index'),
                },
                ///create-product
                {
                    name: 'محصول جدید',
                    path: '/create/product',
                    component: () => import('@/views/product/Create'),
                },
                ///edit-category
                {
                    name: 'ویرایش محصول',
                    path: '/edit/product/:id',
                    component: () => import('@/views/product/Edit'),
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

