<template>
  <a-layout-sider
    v-model="collapse"
    collapsible
    :width="230"
    :style="{
    overflowY: 'scroll', 
    paddingBottom: '60px',
    position: 'fixed',
    left: 0,
    height: '100%',
    background: 'rgb(47,52,71)'
    }"
  >
    <div class="logo-view">
      <img :src="require('@/assets/icon/logo.png')" alt />
      <a-tooltip placement="bottom">
        <template slot="title">
          <span>{{ title }}</span>
        </template>
        <span v-show="!collapse" :style="{width: collapse ? '0': 'auto'}">{{ title }}</span>
      </a-tooltip>
    </div>
    <a-menu
      theme="dark"
      mode="inline"
      :default-selected-keys="[selectedKeys]"
      :selected-keys="[selectedKeys]"
      :default-open-keys="['/' + $route.path.split('/')[1]]"
      :inline-collapsed="collapse"
    >
      <template v-for="route in filterShowRoutes(routes)">
        <a-sub-menu :key="route.path" v-if="route.children.length > 1">
          <span slot="title">
            <a-icon :type="route.meta.icon" style="fontSize: 15px" />
            <span>{{ route.meta.title }}</span>
          </span>
          <a-menu-item
            v-for="child in route.children"
            :key="child.path"
            @click="toPage(`${route.path}/${child.path}`)"
          >{{ child.meta.title }}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="route.path" @click="toPage(`${route.path}`)">
          <a-icon :type="route.meta.icon" style="fontSize: 15px" />
          <span style="color: #EDEDED">{{ route.meta.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Sidebar",
  props: {
    title: {
      type: String,
      default: "基础后台示例"
    }
  },
  computed: {
    ...mapGetters(["collapsed", "routes"]),
    //判断是否为单子路由
    isSingleRoute() {
      const hasTitleRoute = this.$route.matched.filter(v =>
        Object.prototype.hasOwnProperty.call(v.meta, "title")
      );
      return hasTitleRoute.length === 1;
    },
    selectedKeys() {
      const pathArr = this.$route.path.split("/");
      if (this.isSingleRoute) {
        return `/${pathArr[1]}`;
      }
      pathArr.splice(0, 2);
      return pathArr.join("/");
    },
    collapse: {
      set(v) {
        this.setCollapsed(v);
      },
      get() {
        return this.collapsed;
      }
    }
  },
  methods: {
    ...mapActions("app", ["setCollapsed"]), 
    toPage(url) {
      this.$router.push(url);
    },
    filterShowRoutes(routes){
      let showRoutes = []
      routes.forEach(route => {
        if(!route.hidden){
          let temp = {...route}
          if(temp.children){
            temp.children = this.filterShowRoutes(temp.children)
          }
          showRoutes.push(temp)
        }
      })
      return showRoutes
    }
  }
};
</script>

<style scoped lang="less">
.logo-view {
  width: 100%;
  height: 80px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #232e44;

  img {
    width: 32px;
  }

  span {
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    display: inline-block;
    height: 25px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 500;
    color: #ecf0f1;
    letter-spacing: 2px;
    transition: all 0.2s;
  }
}

/deep/ .ant-layout-sider-children {
  height: auto;
}

/deep/ .ant-menu {
  background: rgb(47, 52, 71);
  color: #ededed;
}

/deep/ .ant-menu-dark {
  .ant-menu-inline.ant-menu-sub {
    background: rgb(43, 48, 67);
  }

  .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: @primary-color;
  }

}

/deep/ .ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: #000;
}

/deep/ .ant-layout-sider-trigger{
  background: #232e44;
}

::-webkit-scrollbar {
  display: none;
}
</style>