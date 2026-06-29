import { createRouter, createWebHistory } from 'vue-router';
import { useAdminAuthStore } from '../stores/auth';
import AdminLayout from '../layouts/admin-layout.vue';
import LoginPage from '../pages/login-page.vue';
import DashboardPage from '../pages/dashboard-page.vue';
import MedalsPage from '../pages/medals-page.vue';
import UsersPage from '../pages/users-page.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/login', component: LoginPage, meta: { public: true } },
        {
            path: '/',
            component: AdminLayout,
            children: [
                { path: '', redirect: '/dashboard' },
                { path: 'dashboard', component: DashboardPage },
                { path: 'medals', component: MedalsPage },
                { path: 'users', component: UsersPage },
            ],
        },
    ],
});
router.beforeEach(async (to) => {
    const authStore = useAdminAuthStore();
    if (!authStore.ready) {
        await authStore.bootstrap();
    }
    if (to.path === '/login' && authStore.token) {
        return '/dashboard';
    }
    if (to.meta.public) {
        return true;
    }
    if (!authStore.token) {
        return '/login';
    }
    return true;
});
export default router;
