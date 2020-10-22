import store from "@/store"

//示例
export const log = () => ({
  bind(el, binding, vnode, oldVnode){
    console.log(el, binding, vnode, oldVnode)
    console.log('---bind---')
  },
  inserted(){
    console.log('---inserted---')
  },
  update(){
    console.log('---update---')
  },
  componentUpdated(){
    console.log('---componentUpdated---')
  },
  unbind(){
    console.log('---unbind---')
  }
})

//权限指令
export const permission = () => ({
  bind(el, { arg }){
    const roles = store.getters.roles
    const hasRole = roles.includes('admin') || roles.includes(arg)
    if(!hasRole){
      el.style.display = 'none'
    }
  }
})