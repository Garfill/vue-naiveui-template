import { getToken } from '@/utils/token';
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

router.beforeEach((to, from) => {
  if (!getToken()) {
    if (to.path !==  '/login') {
      // 没有token自动重定向到 /login 页面
      return { path: '/login', replace: true };
    }
  } else {
    // 已经有token，视为登录态
    // 此处获取用户信息，校验是否过期
  }
});

export default router;