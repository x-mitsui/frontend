<template>
  <h2>{{ $store.state.counter }}</h2>
  <h2>{{ sAge }}</h2>
  <h2>{{ sName }}</h2>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    sCounter() {
      // 缩短了模板中使用的长度，但是vuex每一个属性都要来这搞一份，比较麻烦
      return this.$store.state.counter;
    },
    // 好处，简短vuex数据长度；避免频繁将vuex数据频繁在computed重新写一份
    // ...mapState(["age", "name", "height"]),
    ...mapState({
      sAge: (state) => state.age,
      sName: (state) => state.name,
      sHeight: (state) => state.height,
    }),
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
