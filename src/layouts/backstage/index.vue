<template>
  <section class="page">
    <sidebar :title="title"/>
    <a-layout :style="{height: '100%', marginLeft: collapsed ? '80px' : '230px',transition: 'all 0.2s'}">
      <app-header />
      <section class="main-wrapper">
        <tags-view />
        <app-main />
        <app-footer />
      </section>
    </a-layout>
  </section>
</template>
<script>
import Sidebar from "@l/backstage/section/Sidebar";
import TagsView from "@l/backstage/section/TagsView";
import AppHeader from "@l/backstage/section/AppHeader";
import AppMain from "@l/backstage/section/AppMain";
import AppFooter from "@l/backstage/section/AppFooter";
import config from "@/config/index"

import { mapGetters } from "vuex";
export default {
  components: {
    Sidebar,
    TagsView,
    AppHeader,
    AppMain,
    AppFooter
  },
  computed: {
    ...mapGetters(["collapsed"]),
    title(){
      return config.APP.title
    }
  },
  created() {
    this.$notification.success({
      message: "欢迎进入业务中心"
    });
  }
};
</script>
<style scoped lang="less">
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-wrapper {
  height: calc(100% - 55px);
  transition: all 0.2s;
  overflow-y: auto;
}
</style>