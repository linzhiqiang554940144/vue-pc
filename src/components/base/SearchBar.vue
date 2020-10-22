<template>
  <div class="form-wrapper">
    <a-form-model ref="searchForm" layout="inline" :model="formData">
      <div class="search-form">
        <div class="btn-view">
          <a-button
            v-if="formBtn.indexOf('insert') !== -1"
            type="primary"
            icon="form"
            class="btn-success"
            @click="$emit('insert')"
          >新增</a-button>
          <a-button
            v-if="formBtn.indexOf('delete') !== -1"
            type="danger"
            icon="delete"
            @click="$emit('delete')"
          >删除</a-button>
          <!-- 更多操作按钮插槽 -->
          <slot name="button"/>
        </div>
        <div style="flex: 1"></div>
        <a-form-model-item
          :label="label"
          v-for="({ tag, field, label, ...otherAttrs }) in searchItems[0]"
          :key="field"
          :prop="field"
        >
          <!-- 动态form组件（第一排显示主要搜索） -->
          <component
            :is="tag ? `a-${tag}` : 'div'"
            v-model="formData[field]"
            v-bind="otherAttrs"
            @change="$emit('change', field, formData)"
          />
        </a-form-model-item>
        <slot name="form" :data="formData" v-if="!hasMore"/>
        <div class="btn-view">
          <a-button
            type="primary"
            icon="reload"
            :loading="loading"
            @click="$emit('query', formData)"
            v-if="formBtn.indexOf('query') !== -1"
          >查询</a-button>
          <a-button icon="sync" @click="reset" v-if="formBtn.indexOf('reset') !== -1">重置</a-button>
          <a-button :icon="showMore ? 'caret-down' : 'caret-right'" @click="showMore = !showMore" v-if="hasMore">更多</a-button>
        </div>
      </div>
      <div class="search-form justify-content-end p-r-10" style="background: #f5f7fa" v-show="showMore">
        <a-form-model-item
          v-for="({ tag, field, label, ...otherAttrs }) in searchItems[1]"
          :label="label"
          :key="field"
          :prop="field"
        >
          <!-- 动态form组件（点击更多显示） -->
          <component
            :is="tag ? `a-${tag}` : 'div'"
            v-model="formData[field]"
            v-bind="otherAttrs"
            @change="$emit('change', field, formData)"
          />
        </a-form-model-item>

        <slot name="form" :data="formData" v-if="hasMore"/>
      </div>
    </a-form-model>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  /**
   * @desc 双向绑定form data对象
   * @tip 初始值可绑定空对象{}
   * @reason 因为初始值会默认取config里的value(优先级高于v-model属性值) *详见setInitFormData method
   */
  model: {
    prop: 'formObj',
    event: 'form-change'
  },
  props: {
    /**
     * @desc form config 控件配置
     * @type Array [{ tag, field, label, placeholder, ... }, ...]
     * @tag form表单组件名称 *required
     * @field formData属性名 *required
     * @value 希望设置控件初始值时可使用 
     * @label form表单组件label名
     * @other 其他更多组件属性
     */
    config: {
      type: Array,
      default: () => ([])
    },
    /**
     * 双向绑定父组件使用的form data
     */
    formObj: {
      type: Object,
      default: () => ({})
    },
    /**
     * @desc: 按钮配置 [查询, 重置, 新增, 删除]
     * @type: Array ['query', 'reset', 'insert', 'delete']
     */
    formBtn: {
      type: Array,
      default: () => (["query", "reset"]),
    },
    /**
     * @desc: 主要查询条件个数(第一排显示)
     */
    mainCount: {
      type: Number,
      default: 3,
    },
    /**
     * @desc: 查询请求loading(节流)
     */
    loading: Boolean,
  },
  data() {
    return {
      // 内部的form data
      formData: {},
      showMore: false,
    };
  },
  mounted(){
    this.setInitFormData()
  },
  //维护v-model内外部数据同步
  watch: {
    formData: {
      deep: true,
      handler(v) {
        this.$emit('form-change', v)
      }
    },
    formObj: {
      deep: true,
      handler(v) {
        this.formData = v;
      },
    },
  },
  computed: {
    //裁剪config为主要、更多
    searchItems() {
      return [
        this.config.slice(0, this.mainCount),
        this.config.slice(this.mainCount),
      ];
    },
    //是否存在更多查询条件点击
    hasMore() {
      return this.config.length > this.mainCount
    }
  },
  methods: {
    //重置查询参数
    reset() {
      this.setInitFormData();
      this.$emit('reset')
    },
    //构造formData初始值(防止出现reset后undefined、以及需要默认值时)
    //至于为什么需要创建新的{} 了解: observe实现原理  https://segmentfault.com/q/1010000018510815
    setInitFormData(){
      this.formData = Object.assign({}, this.formObj, ...this.config.map(v => ({ [v.field]: 'value' in v ? v.value : ''})))
    }
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/styles/page.less";
</style>