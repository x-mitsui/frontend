<template>
  <h2>当前计数：{{ $store.state.counter }}</h2>

  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
export default {
  computed: {
    sCounter() {
      return this.$store.state.counter;
    },
  },
  mounted() {
    this.$store.dispatch("getHomeMultidata");
  },
  methods: {
    increment() {
      this.$store.dispatch("incrementAction", "paramsz");
    },
    decrement() {
      this.$store.dispatch({
        type: "decrementAction",
      });
    },
  },
  setup() {},
};
</script>

<style></style>
