<template>
  <h2>当前计数：{{ $store.state.counter }}</h2>

  <button @click="incrementAction">+1</button>
  <button @click="decrementAction">-1</button>
  <hr />
  <button @click="add">+1</button>
  <button @click="sub">-1</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {
    sCounter() {
      return this.$store.state.counter;
    },
  },
  setup() {
    const actions = mapActions(["incrementAction", "decrementAction"]);
    const action1 = mapActions({ add: "incrementAction", sub: "decrementAction" });
    return {
      ...actions,
      ...action1,
    };
  },
};
</script>

<style></style>
