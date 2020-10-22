<template>
  <div class="map-wrapper">
    <div id="jjMap" style="height: 100%"></div>
  </div>
</template>

<script>
import jjMap from "@c/map/jjMapApi";
export default {
  name: "JjMap",
  mounted() {
    jjMap.init()
  }
};
</script>

<style scoped lang="less">
.map-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>