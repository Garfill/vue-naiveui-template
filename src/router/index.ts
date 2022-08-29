import { useUserStoreOutside } from '@/store/modules/user';
import { getToken } from '@/utils/token';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@v/common/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    }
  }, {
    path: '/404',
    name: 'NotFound',
    component: () => import('@v/common/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    }
  }
];

const asyncRoutes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Dashboard',
  component: () => import('@v/layout/dashboard/index.vue'),
  redirect: '/home',
  meta: {
    title: '控制台'
  },
  children: [{
    path: 'home',
    component: () => import('@v/dashboard/index.vue'),
    name: 'Home',
    meta: {
      title: '首页'
    }
  }, {
    path: 'icon',
    name: 'Icon',
    component: () => import('@v/Icon/index.vue'),
    meta: {
      title: '图标'
    }
  }]
}, {
  path: '/outlink',
  component: null,
  name: 'Outlink',
  meta: {
    title: '外链'
  },
  children: [{
    path: 'https://www.baidu.com',
    name: 'OutLink',
    component: () => null,
    meta: {
      title: '百度(外链)'
    },
  },]
}];

const NotMatchRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotMatch',
  redirect: '/404',
  meta: {
    hidden: true
  }
};

const router = createRouter({
  history: createWebHistory(),
  routes: commonRoutes,
});

const whiteList = ['/404'];

router.beforeEach((to, from, next) => {
  if (whiteList.includes(to.path)) {
    next();
    return;
  }
  if (!getToken()) {
    if (to.path !==  '/login') {
      // 没有token自动重定向到 /login 页面
      next({ path: '/login', replace: true });
    } else {
      next();
    }
  } else {
    if (to.path === '/login') {
      next({ path: '/', replace: true });
      return;
    }
    // 已经有token，视为登录态
    // 此处获取用户信息，校验是否过期
    setTimeout(() => {
      const userInfo = useUserStoreOutside();
      if (!userInfo.isLogin) {
        genUserRoute(userInfo);
        next({path: to.path, replace: true });
      } else {
        next();
      }
    }, 100);
  }
});

function genUserRoute(userInfo: any) {
  addRoute([...asyncRoutes, NotMatchRoute]);
  userInfo.setMenu([
    ...commonRoutes,
    ...asyncRoutes,
    NotMatchRoute
  ]);
  userInfo.setLogin(true);
}

export function addRoute(routes: RouteRecordRaw[]) {
  routes.forEach(item => {
    router.addRoute(item);
  });
}

export default router;