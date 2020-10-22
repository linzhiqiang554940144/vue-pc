/**
 * 命名规范
 * 添加前缀: ADD_XXX
 * 删除前缀: DEL_XXX
 * 修改前缀: UPDATE_XXX
 * 设置前缀: SET_XXX
 * 其他个性前缀尽量简洁易懂
 */
//app
export const ADD_VISITED_VIEW = 'add_visited_view'  //新增访问页面记录tag
export const DEL_VISITED_VIEW = 'del_visited_view'  //删除访问页面记录tag
export const CLEAR_VISITED_VIEW = 'clear_visited_view'  //清空访问页面记录tag
export const SET_COLLAPSED = 'set_collapsed'        //设置菜单伸缩

//user
export const SET_NAME = 'set_name'  //设置用户名
export const SET_AVATAR = 'set_avatar'  //设置用户头像
export const SET_ROLES = 'set_roles'  //设置用户角色权限
export const SET_TOKEN = 'set_token'  //设置token

//permission
export const SET_ROUTES = 'set_routes'  //设置可访问路由