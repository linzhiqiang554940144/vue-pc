<template>
  <div class="block" :style="{height: height + 'px'}">
    <div class="block-header" v-if="title">
      <div class="block-header-shadow_left"></div>
      <div class="block-header-title">
        <span>{{ title }}</span>
      </div>
      <div class="block-header-shadow_right"></div>
      <span class="label_more" v-if="hasMore" @click="moreAction">
        更多&gt;&gt;
      </span>
    </div>
    <div :class="['block-body',noPadding ? '' : 'limit']">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockWrapper",
  props: {
    title: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 300
    },
    //是否有边距
    noPadding: Boolean,
    hasMore: Boolean
  },
  methods: {
    moreAction () {
      this.$emit('clickMore')
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  margin: 15px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.block-header {
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  .label_more {
    position: absolute;
    right: 20px;
    color: rgba(2, 162, 211, 1);
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
}

.block-header-shadow_left {
  width: 0;
  height: 0;
  border-left: rgba(0, 0, 0, 0) solid 60px;
  border-bottom: @block-bg-color solid 36px;
}

.block-header-title {
  padding: 0 40px;
  height: 36px;
  background: @block-bg-color;
  text-align: center;
  line-height: 36px;
  border-top: 2px solid rgba(2, 162, 211, 0);
  border-image: linear-gradient(
      to right,
      rgba(2, 162, 211, 0),
      rgba(12, 229, 243, 1),
      rgba(2, 162, 211, 0)
    )
    30 30;

  span {
    color: skyblue;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    // text-shadow: 0 0 30px #8df;
  }
}

.block-header-shadow_right {
  width: 0;
  height: 0;
  border-right: rgba(0, 0, 0, 0) solid 60px;
  border-bottom: @block-bg-color solid 36px;
}

.block-body {
  flex-grow: 1;
  border: 2px solid rgba(2, 162, 211, 0);
  border-image: linear-gradient(rgba(2, 162, 211, 0), rgba(2, 162, 211, 0.8)) 30
    30;
  background-color: @block-bg-color;
}

.limit{
  padding: 0 30px;
}

.block-body-title {
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 15px;

  dt {
    height: 20px;
    width: 8px;
    background: #0fbcff;
    display: inline-block;
    margin-right: 10px;
    box-shadow: #0fbcff 0 0 5px 1px;
    border-radius: 5px;
  }

  span {
    color: skyblue;
    font-size: 17px;
    font-weight: 600;
    letter-spacing: 2px;
    margin-left: 10px;
  }
}
</style>