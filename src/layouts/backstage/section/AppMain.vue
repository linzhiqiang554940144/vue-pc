<template>
<section class="app-main p-t-10" :style="{ minHeight: `calc(100% - ${copyright ? '90' : '40' }px)` }">
    <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path" />
        <!-- <keep-alive>
      </keep-alive> -->
    </transition>
</section>
</template>

<script>
import config from "@/config/index"
export default {
    name: "AppMain",
    computed: {
        copyright() {
            return config.APP.copyright
        }
    }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/transition.less";

.app-main {
    background: #fff;
    overflow-y: auto;
}
</style>
