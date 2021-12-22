<template>
  <div>
    <home />
    <button @click="increment">加1</button>
  </div>
</template>

<script>
import { provide, readonly, ref } from "vue";
import Home from "./Home.vue";
export default {
  setup() {
    const name = ref("James");
    let counter = ref(100);
    provide("name", readonly(name));
    provide("counter", readonly(counter));
    let increment = () => counter.value++;
    return {
      increment,
    };
  },
  components: {
    Home,
  },
};
</script>

<style lang="scss" scoped></style>
