<template>
  <h2>{{ counter }}</h2>
  <h2>{{ age }}</h2>
  <h2>{{ name }}</h2>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
import useState from "../hooks/useState";
export default {
  setup() {
    return {
      // 两种使用方式均可以
      // ...useState({ sCounter: "counter", sName: "name", sAge: "age", sHeight: "height" }),
      ...useState(["counter", "name", "age", "height"]),
    };
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
  },
  components: {},
};
</script>

<style></style>
