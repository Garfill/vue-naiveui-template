import { getUserProfile } from '@/api/user'
import { useUserStoreOutside } from '@/store/modules/user'
import { getToken } from '@/utils/token'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

let loadingBarRef: any
export function registerLoading(ref: any) {
  loadingBarRef = ref
}


const commonRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/layout/dashboard/index.vue'),
    meta: {
      title: '首页',
      hidden: true,
    },
    redirect: '/dashboard',
    children: [],
  },
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
]

const asyncRoutes: RouteRecordRaw[] = [{
  path: '/dashboard',
  component: () => import('@v/dashboard/index.vue'),
  name: 'Home',
  meta: {
    title: '控制台'
  }
}, {
  path: '/icon',
  name: 'Icon',
  component: () => import('@v/icon/index.vue'),
  meta: {
    title: '图标'
  }
}, {
  path: '/clipboard',
  name: 'Clipboard',
  component: () => import('@v/clipboard/index.vue'),
  meta: {
    title: '剪切板'
  }
}, {
  path: '/driver',
  name: 'Driver',
  component: () => import('@v/driver/index.vue'),
  meta: {
    title: '引导页'
  }
}, {
  path: '/point',
  name: 'Point',
  component: () => import('@v/point/index.vue'),
  meta: {
    title: '光标跟踪'
  }
}, {
  path: '/richtext',
  name: 'Richtext',
  meta: {
    title: '富文本'
  },
  component: () => import('@v/richtext/index.vue')
}, {
  path: '/outlink',
  component: null,
  name: 'Outlink',
  meta: {
    title: '外链'
  },
  children: [{
    path: 'https://www.baidu.com',
    name: 'Baidu',
    component: () => null,
    meta: {
      title: '百度'
    },
  }]
}
]

const NotMatchRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotMatch',
  redirect: '/404',
  meta: {
    hidden: true
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: commonRoutes,
})

const whiteList = ['/404']

router.beforeEach(async (to, from, next) => {
  if (whiteList.includes(to.path)) {
    return next()
  }
  if (loadingBarRef) {
    loadingBarRef.start()
  }
  if (!getToken()) {
    if (to.path !== '/login') {
      // 没有token自动重定向到 /login 页面
      next({ path: '/login', replace: true })
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next({ path: '/', replace: true })
      return
    }
    // 已经有token，视为登录态
    // 获取用户信息，校验是否过期
    const userInfo = useUserStoreOutside()
    if (!userInfo.isLogin) {
      await getUserRoute(userInfo)
      next({ path: to.path, replace: true })
    } else {
      next()
    }
    return
  }
})

router.afterEach((to, from) => {
  loadingBarRef && loadingBarRef.finish()
})

async function getUserRoute(userInfo: any) {
  const userProfile = await getUserProfile()
  const data = userProfile?.data

  addRoute([...asyncRoutes, NotMatchRoute], 'Index') // 添加到根路径下
  userInfo.setMenu([
    ...commonRoutes,
    ...asyncRoutes,
    NotMatchRoute
  ])

  userInfo.setUserInfo(data)
  userInfo.setLogin(true)
}

export function addRoute(routes: RouteRecordRaw[], parentName = '') {
  routes.forEach(item => {
    router.addRoute(parentName, item)
  })
}

export default router