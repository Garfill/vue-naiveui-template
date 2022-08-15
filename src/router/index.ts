import { getToken } from '@/utils/token';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Dashboard',
  component: () => import('@v/common/dashboard/index.vue')
}, {
  path: '/login',
  name: 'Login',
  component: () => import('@v/common/login/index.vue')
}, {
  path: '/404',
  name: 'NotFound',
  component: () => import('@v/common/404/index.vue')
}, {
  path: '/:pathMatch(.*)*',
  name: 'NotMatch',
  redirect: '/404',
}];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const whiteList = ['/404'];

router.beforeEach((to, from) => {
  if (whiteList.includes(to.path)) {
    return;
  }
  if (!getToken()) {
    if (to.path !==  '/login') {
      // 没有token自动重定向到 /login 页面
      return { path: '/login', replace: true };
    }
  } else {
    if (to.path === '/login') {
      return { path: '/', replace: true };
    }
    // 已经有token，视为登录态
    // 此处获取用户信息，校验是否过期
  }
});

export default router;