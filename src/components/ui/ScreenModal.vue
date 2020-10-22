<template>
  <div ref="modalWrapper">
    <a-modal
      :visible="visible"
      title="详情"
      :footer="null"
      :centered="true"
      width="90%"
      style="height:85%"
      wrapClassName="modal_box"
      :getContainer="() => $refs.modalWrapper"
      @cancel="$emit('change-visible', false)"
      destroy-on-close
    >
      <div class="m-t-5">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" :tab="title" style="height: 100%;">
            <div class="pull-left" style="width:100% ">
              <!-- 动态业务中心组件 -->
              <component :title="title" :is="componentName" hide-selection v-bind="otherParams" />
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script>
import sub1 from "@/views/backstage/page1/sub1/list";

export default {
  name: "ScreenModal",
  components: {
    sub1
  },
  //双向绑定
  model: {
    prop: 'visible',
    event: 'change-visible'
  },
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: "核心指标",
    },
    componentName: {
      type: String,
      default: "sub1",
    },
    otherParams: {
      type: Object,
      default: () => ({}),
    },
  },
  data(){
    return {
      showModal: false
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/styles/darkmodal.less";
</style>
