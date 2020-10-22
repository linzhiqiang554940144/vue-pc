<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
  data() {
    return {
      zhCN
    };
  }
};
</script>

<style scoped lang="less">
#app {
  height: 100%;
  background: #f0f2f5;
}

/* 修改 nprogress 颜色 */
#nprogress .bar {
  background: yellow !important;
}
</style>
