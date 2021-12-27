<template>
  <h2>{{ $store.state.counter }}</h2>

  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  <button @click="incrementN({ value: 10 })">+10</button>
  <button @click="decrementN(10)">-10</button>
</template>

<script>
import { mapMutations } from "vuex";
import { INCREMENT_N } from "../store/mutation-types";
export default {
  computed: {
    sCounter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    ...mapMutations(["increment", "decrement", INCREMENT_N, "decrementN"]),
    // ...mapMutations({
    //   incre: "increment",
    //   decre: "decrement",
    //   incre_n: INCREMENT_N,
    //   decre_n: "decrementN",
    // }),
  },
  setup() {
    const storeMutations = mapMutations(["increment", "decrement", INCREMENT_N, "decrementN"]);
    return {
      ...storeMutations,
    };
  },
};
</script>

<style></style>
