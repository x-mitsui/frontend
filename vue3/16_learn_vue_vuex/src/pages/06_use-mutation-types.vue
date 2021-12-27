<template>
  <h2>{{ $store.state.counter }}</h2>

  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
  <button @click="incrementN(10)">+10</button>
  <button @click="decrementN(10)">-10</button>
</template>

<script>
import { mapState } from "vuex";
import { INCREMENT_N } from "../store/mutation-types";
export default {
  computed: {
    sCounter() {
      // 缩短了模板中使用的长度，但是vuex每一个属性都要来这搞一份，比较麻烦
      return this.$store.state.counter;
    },
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
    incrementN(value) {
      // 可传对象
      // this.$store.commit("incrementN", { value });
      // 另一种提交风格
      this.$store.commit({
        type: [INCREMENT_N],
        value,
        otherNum: 10,
      });
    },
    decrementN(value) {
      // 可传值
      this.$store.commit("decrementN", value);
    },
  },
  components: {},
};
</script>

<style></style>
