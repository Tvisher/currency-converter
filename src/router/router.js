import { createRouter, createWebHashHistory, } from "vue-router";
import MainPage from '@/pages/MainPage.vue';
import Conversion from '@/pages/Conversion.vue';

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage,
    },
    {
        path: '/conversion',
        name: 'Conversion',
        component: Conversion,
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
})

export default router;
