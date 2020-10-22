<template>
  <section class="header">
    <div class="header-tags">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" :style="{fontSize: '20px', cursor: 'pointer', marginRight: '50px'}" @click="changeCollapse"/>
      <navbar />
    </div>
    <a-dropdown placement="bottomRight" class="header-dropdown">
      <div class="tags-view">
        <span class="username">{{ name }}</span>
        <a-avatar style="backgroundColor: rgb(43, 46, 61)" icon="user" />
      </div>
      <a-menu slot="overlay">
        <a-menu-item @click="$router.push('/screen')">
          <span>
            <a-icon type="area-chart" />&nbsp;数据大屏
          </span>
        </a-menu-item>
        <a-menu-item>
          <span>
            <a-icon type="setting" />&nbsp;系统设置
          </span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item @click="handleLogout">
          <span>
            <a-icon type="logout" />&nbsp;注销登录
          </span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navbar from "@l/backstage/section/Navbar";
export default {
  name: "AppHeader",
  components: {
    Navbar
  },
  computed: {
    ...mapGetters(["name", "collapsed"])
  },
  methods: {
    ...mapActions("user", ["logout"]),
    ...mapActions("app", ["setCollapsed", "clearAppState"]),
    handleLogout() {
      this.logout();
      this.clearAppState()
      this.$router.replace("/login");
    },
    changeCollapse(){
      this.setCollapsed(!this.collapsed)
    }
  }
};
</script>

<style scoped lang="less">
.header {
  padding: 0 40px 0 20px;
  height: 55px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-tags{
  display: flex;
  align-items: center;
}

.tags-view {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  font-size: 17px;
  color: #2c3e50;
  font-weight: 500;
  margin-right: 13px;
}

/deep/ .ant-dropdown-menu-item {
  padding: 5px 30px;

  &:hover {
    background-color: @primary-color;
    color: #ededed;
  }
}
</style>