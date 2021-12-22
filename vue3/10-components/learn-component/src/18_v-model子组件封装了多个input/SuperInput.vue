<template>
  <div>
    <div>子组件的message：{{ modelValue }}</div>
    <div>子组件的title：{{ title }}</div>

    <input v-model="value1" />
    <input v-model="value2" />
  </div>
</template>

<script>
export default {
  // 禁改props里的值
  props: {
    modelValue: String,
    title: String,
  },
  emits: ["update:modelValue", "update:title"],
  computed: {
    value1: {
      get() {
        return this.modelValue;
      },
      set(value1) {
        this.$emit("update:modelValue", value1);
      },
    },
    value2: {
      get() {
        return this.title;
      },
      set(value2) {
        this.$emit("update:title", value2);
      },
    },
  },
};
</script>

<style scoped>
input {
  display: block;
}
</style>
