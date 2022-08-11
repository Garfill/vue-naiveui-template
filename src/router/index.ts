import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'dashboard',
  component: () => import('@v/common/dashboard/index.vue')
}, {
  path: '/login',
  name: 'login',
  component: () => import('@v/common/login/index.vue')
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;