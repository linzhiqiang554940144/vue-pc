<template>
  <section class="navbar">
    <a-breadcrumb class="hamburger-container">
      <a-breadcrumb-item href>
        <a-icon type="home" />
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(r, i) in breadcrumbData" :key="i" href>
        <a-icon v-if="r.icon" :type="r.icon" />
        <span>{{ r.title }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </section>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    breadcrumbData() {
      //处理单个路由选项隐藏父路由title
      const effectRoutes = this.$route.matched.filter(v =>
        Object.prototype.hasOwnProperty.call(v.meta, "title")
      );
      return effectRoutes.map(r => ({
        title: r.meta.title,
        icon: r.meta.icon
      }));
    }
  }
};
</script>

<style scoped lang="less">
@import "~@/assets/styles/transition.less";

.hamburger-container {
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
}

/deep/ .ant-breadcrumb{
  font-size: 14px;
  font-weight: 500;

  .ant-breadcrumb-separator{
    margin: 0 15px;
  }

  .anticon{
    font-size: 15px;
  }
}
</style>