<template>
  <div>
    子组件的message：{{ modelValue }}
    <input v-model="value" />
  </div>
</template>

<script>
export default {
  // 禁改props里的值
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
input {
  display: block;
}
</style>
