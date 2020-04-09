import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/ruc',
    children: [
      {
        path: 'ruc',
        component: () => import('@/views/ruc/index'),
        name: '首页',
        meta: { title: '首页', icon: 'homepage', affix: true }
      }
    ]
  },
  {
    path: '/identified-manage',
    component: Layout,
    redirect: 'noRedirect',
    name: '认证管理',
    meta: {
      title: '认证管理',
      icon: 'auth'
    },
    children: [
      {
        path: 'tenant-manage',
        component: () => import('@/views/identified-manage/tenant-manage'),
        name: '租户管理',
        meta: { title: '租户管理', noCache: true, icon: 'tenant' }
      },
      {
        path: 'user-manage',
        component: () => import('@/views/identified-manage/user-manage'),
        name: '用户管理',
        meta: { title: '用户管理', noCache: true, icon: 'user-2' }
      },
      {
        path: 'organize-manage',
        component: () => import('@/views/identified-manage/organize-manage'),
        name: '组织架构管理',
        meta: { title: '组织架构管理', noCache: true, icon: 'org-structure' }
      }
    ]
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  {
    path: '/auth-manage',
    component: Layout,
    redirect: '/auth-manage/app-system-manage',
    name: '授权管理',
    meta: {
      title: '授权管理',
      icon: 'empower'
    },
    children: [
      {
        path: 'auth-manage',
        component: () => import('@/views/auth-manage/app-system-manage'),
        name: '应用系统管理',
        meta: { title: '应用系统管理', icon: 'appsys' }
      },
      {
        path: 'global-role',
        component: () => import('@/views/auth-manage/select-excel'),
        name: '全局角色管理',
        meta: { title: '全局角色管理', icon: 'global-role' }
      },
      {
        path: 'system-role',
        component: () => import('@/views/auth-manage/merge-header'),
        name: '系统角色管理',
        meta: { title: '系统角色管理', icon: 'sys-role' }
      }]
  },

  {
    path: '/log',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: '审计管理', icon: 'audit' },
    children: [
      {
        path: 'accesslog',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: '系统访问日志', icon: 'access-log' }
      },
      {
        path: 'exceptionlog',
        component: () => import('@/views/zip/index1'),
        name: 'ExportZip',
        meta: { title: '系统异常日志', icon: 'bug' }
      }
    ]
  },

  {
    path: '/dictionary',
    component: Layout,
    redirect: '/pdf/SysDictionary',
    children: [
      {
        path: 'SysDictionary',
        component: () => import('@/views/pdf/SysDictionary'),
        name: '系统字典',
        meta: { title: '系统字典', icon: 'dictionary' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  
  constantRoutes[5].children[1].hidden = false 
  constantRoutes[5].children[2].hidden = false
  // constantRoutes[4].children[0].hidden = false

  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
