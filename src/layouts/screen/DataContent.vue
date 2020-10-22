<template>
  <div class="content-wrapper">
    <div class="data-block-wrapper" :style="{width: partWidth.left }">
      <slot name="left-view" />
    </div>

    <div class="data-block-wrapper" :style="{width: partWidth.mid }">
      <slot name="mid-view" />
    </div>

    <div class="data-block-wrapper" :style="{width: partWidth.right }">
      <slot name="right-view" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    partWidth: {
      type: Object,
      default: () => ({
        left: '32%',
        mid: '35%',
        right: '32%'
      })
    }
  }
};
</script>

<style scoped lang="less">

  .content-wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

</style>