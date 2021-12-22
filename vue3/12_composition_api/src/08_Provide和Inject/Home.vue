<template>
  <div>
    {{ name }}-{{ counter }}

    <button @click="homeIncrement">homeIncrement</button>
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const name = inject("name");
    const counter = inject("counter");
    // *不要在子组件直接更改父组件响应式变量
    let homeIncrement = () => counter.value++;
    return {
      name,
      counter,
      homeIncrement,
    };
  },
};
</script>

<style lang="scss" scoped></style>
