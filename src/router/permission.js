import router, { resetRouter } from '@/router'
import asyncRoutes from '@/router/asyncRouter'
import store from '@/store'
import config from "@/config"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

//设置可访问路由
const setAccessRouter = async () => {
  const { roles } = await store.dispatch('user/getInfo')
  console.log(roles,'2222')
  const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
  resetRouter()
  router.addRoutes(accessRoutes)
}

//是否为权限路由
const isRequireAuth = route => route.matched.every(r => r.meta.requiresAuth !== false)

//防止刷新丢失addRoutes
router.onReady(async () => {
  if(store.getters.token){
    console.log('今入')
    setAccessRouter()
  }
})

//路由前置守卫
router.beforeEach(async (to, from, next) => {
  const pathArr = asyncRoutes.map(r => r.path)
  //仅业务中心启动进度条
  if(from.matched.some(r => pathArr.includes(r.path))){ 
    NProgress.start()
  }

  //修改title
  document.title = to.meta.title || config.APP.title

  //权限校验
  if (store.getters.token) {
    //有token时跳过登录页
    if(to.path === '/login'){
      next('/')
      NProgress.done()
    }else{
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if(hasRoles){ 
        next()
      }else{
        try{
          await setAccessRouter()
          next({ ...to, replace: true })
        }catch(err){
          next('/login')
          NProgress.done()
        }
      }
    }

  }else{
    console.log('no token')
    //无token
    if(isRequireAuth(to)){
      next('/login')
      NProgress.done()
    }else{
      next()
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})
