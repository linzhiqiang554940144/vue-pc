const getters = {
  //user
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  //permission
  routes: state => state.permission.routes,
  //app
  visitedViews: state => state.app.visitedViews,
  scrollView: state => state.app.scrollView,
  collapsed: state => state.app.collapsed,
}

export default getters
