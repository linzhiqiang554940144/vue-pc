<template>
  <div class="block-body-title" :style="{paddingBottom: noLimit ? '0' : '15px'}">
    <div class="title-wrapper">
      <dt v-if="!level" />
      <span :style="{fontSize: level === 'sub' ? '15px' : '17px'}">{{ title }}</span>
    </div>
    <div class="button-wrapper" v-if="hasBtn">
      <a-radio-group v-model="btnVal" @change="changeType" button-style="solid" size="small">
        <a-radio-button value="R">
          日
        </a-radio-button>
        <a-radio-button value="Z">
          周
        </a-radio-button>
        <a-radio-button value="Y">
          月
        </a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlockBodyTitle",
  props: {
    //标题
    title: {
      type: String,
      default: ""
    },
    //size 小一级的设为 sub
    level: {
      type: String,
      default: ""
    },
    //noPadding
    noLimit: Boolean,
    //是否显示右侧按钮
    hasBtn: Boolean
  },
  data () {
    return {
      btnVal: 'R'
    }
  },
  methods: {
    changeType () {
      this.$emit('change', this.btnVal)
    }
  }
};
</script>

<style scoped lang="less">
.block-body-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
}

.title-wrapper {
  display: flex;
  align-items: center;

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
    font-weight: 600;
    letter-spacing: 2px;
    margin-left: 10px;
  }
}

/deep/ .ant-radio-button-wrapper {
  margin: 0 3px;
  padding: 0 18px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0);
  border: 1px solid #0fbcff;
  color: #ededed;
  font-size: 12px;
  sfont-weight: 600;
}

/deep/
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
  background: rgba(15, 188, 255, 0.4);
}

/deep/ .ant-radio-button-wrapper:not(:first-child)::before {
  display: none;
}
</style>