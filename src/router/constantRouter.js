import DataLayout from '@l/screen/index'

/**
 * 
 * 静态路由
 * 无需权限校验
 * 
 **/
const constantRoutes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    name: 'screen',
    component: DataLayout,
    redirect: '/screen/master',
    meta: {
      title: '数据大屏'
    },
    children: [
      {
        path: 'master',
        name: 'master',
        component: () => import('@/views/screen/master'),
        meta: {
          title: '主屏'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
        title: '登陆',
        requiresAuth: false
    }
  },
]

export default constantRoutes