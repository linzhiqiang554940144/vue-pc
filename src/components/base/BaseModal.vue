<template>
  <div ref="formModal">
    <a-modal
      :getContainer="() => $refs.formModal"
      :visible="visible"
      :title="title"
      :width="width"
      :closable="false"
    >
      <template v-slot:footer>
        <a-button key="back" @click="cancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="submit">保存</a-button>
      </template>
      <a-form-model
        ref="actionForm"
        :model="formData"
        :rules="rules"
        v-bind="{ labelCol: { span: 5 }, wrapperCol: { span: 14 } }"
      >
        <a-form-model-item
          :label="label"
          v-for="({ tag, field, label, ...otherAttrs }) in config"
          :key="field"
          :prop="field"
          has-feedback
        >
          <component
            :is="tag ? `a-${tag}` : 'div'"
            v-model="formData[field]"
            v-bind="otherAttrs"
            @change="$emit('change', field, formData)"
          />
        </a-form-model-item>
        <slot :data="formData" />
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  model: {
    prop: "formObj",
    event: "form-change",
  },
  props: {
    visible: Boolean,
    loading: Boolean,
    width: {
      type: Number,
      default: 900,
    },
    title: {
      type: String,
      default: "",
    },
    config: {
      type: Array,
      default: () => [],
    },
    formObj: {
      type: Object,
      default: () => ({}),
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  mounted() {
    this.setInitFormData();
  },
  watch: {
    formData: {
      deep: true,
      handler(v) {
        this.$emit("form-change", v);
      },
    },
    formObj: {
      deep: true,
      handler(v) {
        this.formData = v;
      },
    },
  },
  methods: {
    submit(){
      //表单校验（成功才触发submit事件）
      this.$refs.actionForm.validate(valid => {
        if(valid) this.$emit('submit')
      })
    },
    cancel() {
      //移出校验效果
      this.$refs.actionForm.clearValidate();
      this.setInitFormData();
      this.$emit("cancel");
    },
    setInitFormData(v = this.formObj) {
      this.formData = Object.assign(
        {},
        v,
        ...this.config.map((v) => ({ [v.field]: "value" in v ? v.value : "" }))
      );
    },
  },
};
</script>

<style scoped>
</style>