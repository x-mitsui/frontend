<template>
  <div>
    <button @click="btnClick1">xxx</button>
    子组件的message：{{ modelValue }}
    <hr />
    <input type="text" :value="modelValue" @input="btnClick2" />
  </div>
</template>

<script>
export default {
  // 禁改props里的值
  props: {
    modelValue: String,
  },
  emits: ["update:modelValue"],
  methods: {
    btnClick1() {
      this.$emit("update:modelValue", "111");
    },
    btnClick2(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped></style>
