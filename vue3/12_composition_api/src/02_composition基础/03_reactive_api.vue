<template>
  <div>
    Home Page
    <h2>{{ message }}</h2>
    <h2>{{ title }}</h2>
    <h2>{{ state.counter }}</h2>
    <button @click="increment">加1</button>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  props: {
    message: {
      type: String,
    },
  },
  setup() {
    const state = reactive({
      counter: 100,
    });
    const increment = () => {
      state.counter++;
      console.log(state.counter);
    };
    // 有了下面就没必要使用data了，而且它优先级也高于data
    return {
      title: "Haleo Mali",
      state,
      increment,
    };
  },
};
</script>

<style scoped></style>
