import Layout from '@l/backstage/index'

/**
 * @CONFIG_RULE
 * @配置规则
 * 按层级关系映射出菜单
 * 当前最高级路由对应菜单最高级
 * 最高级需配置：
 * {@param component} Layout: 基础外部布局
 * {@param redirect} '/page1/sub1-1/list': 重定向至默认子路由
 * {@param icon} 最高层级路由需指定的icon图标名（与antd icon对应）
 * {@param roles} 路由权限: 会根据用户权限匹配过滤可访问页面(不配置则当前路由无需权限限制)
 * 
 * @warn 所有路由均需配置children项！父路由均直接引入Layout 仅一个子菜单项时也需要配置！！！
 * @warn 若只有单个子路由时 meta属性均配置于父路由对象上
 */
const asyncRoutes = [
  //根路由重定向至业务中心
  {
    path: '/page1',
    component: Layout,
    redirect: '/page1/sub1-1/list',
    meta: {
      title: 'page1',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'sub1-1/list',
        name: 'page1_sub1_list',
        component: () => import('@/views/backstage/page1/sub1/list'),
        meta: {
          title: 'sub1-1',
          roles: ['admin', 'basic']
        }
      },
      {
        path: 'sub1-2/list',
        name: 'page1_sub2_list',
        component: () => import('@/views/backstage/page1/sub2/list'),
        meta: {
          title: 'sub1-2',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/page2',
    component: Layout,
    redirect: '/page2/sub2-1/list',
    meta: {
      title: 'page2',
      icon: 'security-scan',
    },
    children: [{
      path: 'sub2-1/list',
      name: 'page2_sub1_list',
      component: () => import('@/views/backstage/page2/sub1/list'),
      meta: {
        title: 'sub2-1'
      }
    },
    {
      path: 'sub2-2/list',
      name: 'page2_sub2_list',
      component: () => import('@/views/backstage/page2/sub2/list'),
      meta: {
        title: 'sub2-2'
      }
    },
    {
      path: 'sub2-3/list',
      name: 'page2_sub3_list',
      component: () => import('@/views/backstage/page2/sub3/list'),
      meta: {
        title: 'sub2-3',
        roles: ['admin']
      }
    }
    ]
  },
  {
    path: '/page3',
    component: Layout,
    redirect: '/page3/sub3-1/list',
    meta: {
      title: 'page3',
      icon: 'mail'
    },
    children: [{
      path: 'sub3-1/list',
      name: 'page3_sub1_list',
      component: () => import('@/views/backstage/page3/list')
    }]
  },
  {
    path: '/page4',
    component: Layout,
    redirect: '/page4/sub1/list',
    meta: {
      title: 'page4',
      icon: 'carry-out'
    },
    children: [{
      path: 'sub4-1/list',
      name: 'page4_sub1_list',
      component: () => import('@/views/backstage/page4/sub1/list'),
      meta: {
        title: 'sub4-1'
      }
    },
    {
      path: 'sub4-2/list',
      name: 'page4_sub2_list',
      component: () => import('@/views/backstage/page4/sub2/list'),
      meta: {
        title: 'sub4-2'
      }
    }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/error/404'),
    meta: {
      title: '404'
    },
    hidden: true
  }
]

export default asyncRoutes